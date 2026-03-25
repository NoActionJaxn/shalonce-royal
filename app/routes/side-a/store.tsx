import { useState, useMemo, useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import ProductCard, { ProductCardSkeleton } from "~/components/ProductCard";
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
  created: number;
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
      stripe.products.list({ active: true, limit: 20, expand: ["data.default_price"] }),
      getSanityClient()
        .fetch<WrestlingSiteSettings>(WRESTLING_SITE_SETTINGS_REQUEST)
        .catch(() => null),
    ]);

    const products: SerializedProduct[] = stripeProducts.data.map((p) => {
      const price = p.default_price;
      const resolved = price && typeof price === "object" && "unit_amount" in price ? price : null;

      return {
        id: p.id,
        name: p.name,
        description: p.description ?? undefined,
        images: p.images,
        created: p.created,
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

type SortOrder = "newest" | "oldest";

export default function Store() {
  const data = useLoaderData<LoaderData>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const products = useMemo(() => data?.products ?? [], [data]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [colCount, setColCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setColCount(4);
      else if (w >= 1024) setColCount(3);
      else if (w >= 640) setColCount(2);
      else setColCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) =>
      sortOrder === "newest" ? b.created - a.created : a.created - b.created,
    );
  }, [products, sortOrder]);

  const columns = useMemo(() => {
    const cols: SerializedProduct[][] = Array.from({ length: colCount }, () => []);
    sortedProducts.forEach((product, i) => {
      cols[i % colCount].push(product);
    });
    return cols;
  }, [sortedProducts, colCount]);

  return (
    <Page>
      <Container className="pt-16 space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Store</h1>
            <p className="text-sm text-slate-600">Official merchandise and digital goods.</p>
          </div>
          {products.length > 0 && (
            <button
              type="button"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setSortOrder((o) => (o === "newest" ? "oldest" : "newest"))}
            >
              {sortOrder === "newest" ? "Newest first ↓" : "Oldest first ↑"}
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex gap-6">
            {Array.from({ length: colCount }, (_, colIndex) => (
              <div key={colIndex} className="flex-1 space-y-6">
                {Array.from({ length: 2 }, (_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="py-16 text-center text-slate-500">
            No products available right now. Check back soon!
          </p>
        ) : (
          <div className="flex gap-6">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex-1 space-y-6">
                {col.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ))}
          </div>
        )}
      </Container>
    </Page>
  );
}
