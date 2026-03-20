import { useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import { getStripe } from "~/lib/stripe.server";
import { useCart } from "~/context/CartContext";
import type { Route } from "./+types/store.checkout.return";

interface LoaderData {
  status: string | null;
  customerEmail: string | null;
}

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderData> {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      return { status: null, customerEmail: null };
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      status: session.status ?? null,
      customerEmail: session.customer_details?.email ?? null,
    };
  } catch {
    return { status: null, customerEmail: null };
  }
}

export default function CheckoutReturn() {
  const data = useLoaderData<LoaderData>();
  const { clearCart } = useCart();

  useEffect(() => {
    if (data?.status === "complete") {
      clearCart();
    }
  }, [data?.status, clearCart]);

  if (data?.status === "complete") {
    return (
      <Page>
        <Container className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Thank you for your order!</h1>
          {data.customerEmail && (
            <p className="text-slate-600">
              A confirmation email has been sent to{" "}
              <span className="font-medium">{data.customerEmail}</span>.
            </p>
          )}
          <Link
            to="/side-a/store"
            className="inline-flex items-center justify-center bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Continue Shopping
          </Link>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
        <h1 className="text-3xl font-bold">Order Status</h1>
        <p className="text-slate-600">
          {data?.status === "open"
            ? "Your checkout session is still open. Please complete payment."
            : "We couldn't retrieve your order status. If you completed a purchase, you'll receive a confirmation email shortly."}
        </p>
        <Link
          to="/side-a/store"
          className="inline-flex items-center justify-center bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Back to Store
        </Link>
      </Container>
    </Page>
  );
}
