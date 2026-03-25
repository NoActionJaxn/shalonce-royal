import { getStripe } from "~/lib/stripe.server";
import type { Route } from "./+types/store.api.checkout";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { items?: { priceId: string; quantity: number }[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Validate each item has required fields
  for (const item of items) {
    if (
      typeof item.priceId !== "string" ||
      typeof item.quantity !== "number" ||
      item.quantity < 1
    ) {
      return Response.json({ error: "Invalid item in cart" }, { status: 400 });
    }
  }

  try {
    const stripe = getStripe();

    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: items.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      return_url: `${origin}/side-a/store/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout session creation failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
