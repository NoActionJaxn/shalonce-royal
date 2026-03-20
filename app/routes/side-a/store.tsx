import { useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import ProductCard from "~/components/ProductCard";
import { getStripe } from "~/lib/stripe.server";
import { getSanityClient } from "~/lib/client";
import { WRESTLING_SITE_SETTINGS_REQUEST } from "~/constants/requests";
import type { WrestlingSiteSettings } from "~/types/sanity";
import type { Route } from "./+types/store";

interface SerializedProduct {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: {
    id: string;
    unitAmount: number;
    currency: string;
  } | null;
}

interface LoaderData {
  siteTitle?: string;
  products: SerializedProduct[];
}

export async function loader(): Promise<LoaderData> {
  try {
    const stripe = getStripe();

    const [stripeProducts, settings] = await Promise.all([
      stripe.products.list({ active: true, expand: ["data.default_price"] }),
      getSanityClient()
        .fetch<WrestlingSiteSettings>(WRESTLING_SITE_SETTINGS_REQUEST)
        .catch(() => null),
    ]);

    const products: SerializedProduct[] = stripeProducts.data.map((p) => {
      const price = p.default_price;
      const resolved =
        price && typeof price === "object" && "unit_amount" in price ? price : null;

      return {
        id: p.id,
        name: p.name,
        description: p.description ?? undefined,
        images: p.images,
        price: resolved
          ? {
              id: resolved.id,
              unitAmount: resolved.unit_amount ?? 0,
              currency: resolved.currency,
            }
          : null,
      };
    });

    return { siteTitle: settings?.title, products };
  } catch {
    return { siteTitle: undefined, products: [] };
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  return [{ title: `${siteTitle} | Store` }];
};

export default function Store() {
  const data = useLoaderData<LoaderData>();
  const products = data?.products ?? [];

  return (
    <Page>
      <Container className="pt-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Store</h1>
          <p className="text-sm text-slate-600">
            Official merchandise and digital goods.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="py-16 text-center text-slate-500">
            No products available right now. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </Page>
  );
}
