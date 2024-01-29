import type { Metadata } from "next";
import { Suspense } from "react";
import { RecommendedProducts, RecommendedProductsSkeleton } from "./ppr-test";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <>
      <h1>Next.js + Serwist</h1>
      <p>
        This is an example project that shows how to use Serwist with Next.js.
        And this content was added live without an app update
      </p>
      <Suspense fallback={<RecommendedProductsSkeleton />}>
        <RecommendedProducts />
      </Suspense>
    </>
  );
}
