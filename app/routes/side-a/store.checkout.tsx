import { useCallback } from "react";
import { Link } from "react-router";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import Container from "~/components/Container";
import Page from "~/components/Page";
import { stripePromise } from "~/lib/stripe.client";
import { useCart } from "~/context/CartContext";

export default function CheckoutPage() {
  const { items, itemCount } = useCart();

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/side-a/store/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ priceId: i.priceId, quantity: i.quantity })),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to create checkout session");
    }
    return data.clientSecret;
  }, [items]);

  if (itemCount === 0) {
    return (
      <Page>
        <Container className="flex flex-col items-center justify-center py-32 space-y-4">
          <p className="text-lg text-slate-600">Your cart is empty.</p>
          <Link
            to="/side-a/store"
            className="inline-flex items-center justify-center bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Browse Store
          </Link>
        </Container>
      </Page>
    );
  }

  if (!stripePromise) {
    return (
      <Page>
        <Container className="py-32 text-center">
          <p className="text-slate-600">Checkout is not available. Stripe is not configured.</p>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container className="py-16">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </Container>
    </Page>
  );
}
