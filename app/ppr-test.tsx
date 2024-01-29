import { Product } from "../types/products";
import { headers } from "next/headers";

export async function RecommendedProducts() {
  headers();
  let products: Product[] = await fetch(
    // We intentionally delay the response to simulate a slow data
    // request that would benefit from streaming
    `https://app-router-api.vercel.app/api/products?delay=5000&filter=1`,
    {
      // We intentionally disable Next.js Cache to better demo
      // streaming
      cache: "no-store",
    },
  ).then((res) => res.json());

  return (
    <div className="space-y-6" data-headers={headers()}>
      <div>
        <div className="text-lg font-medium text-white">
          Recommended Products for You
        </div>
        <div className="text-sm text-gray-400">
          Based on your preferences and shopping habits
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="col-span-2 md:col-span-1">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function ProductSkeleton() {
  return (
    <div className="col-span-4 space-y-4 lg:col-span-1">
      <div className={`relative h-[167px] rounded-xl bg-gray-900 ${shimmer}`} />

      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-6 w-1/3 rounded-lg bg-gray-900" />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
    </div>
  );
}

export function RecommendedProductsSkeleton() {
  return (
    <div className="space-y-6 pb-[5px]">
      <div className="space-y-2">
        <div className={`h-6 w-1/3 rounded-lg bg-gray-900 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-gray-900 ${shimmer}`} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <div className="relative h-[167px] overflow-hidden rounded-xl">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-white">{product.name}</div>
        <div className="text-sm text-gray-400">{product.description}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-white">
          {product.price.amount.toFixed(5)}
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-transparent bg-gray-900 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
