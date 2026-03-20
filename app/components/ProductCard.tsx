import { useCart } from "~/context/CartContext";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);
}

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    images: string[];
    price: {
      id: string;
      unitAmount: number;
      currency: string;
    } | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product.price) return;
    addItem({
      priceId: product.price.id,
      productId: product.id,
      name: product.name,
      image: product.images[0],
      unitAmount: product.price.unitAmount,
      currency: product.price.currency,
    });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="aspect-video w-full overflow-hidden bg-slate-100">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-12 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1 space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
          {product.description && (
            <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {product.price ? (
            <span className="text-sm font-semibold text-slate-900">
              {formatPrice(product.price.unitAmount, product.price.currency)}
            </span>
          ) : (
            <span className="text-sm text-slate-500">Price unavailable</span>
          )}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.price}
            className="inline-flex items-center justify-center bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
