"use client";

export const dynamic = "force-dynamic";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, getProducts } from "../data/products";

function ProductsContent() {
  const params = useSearchParams();
  const category = params.get("category") || "";
  const products = useMemo(() => getProducts(category || undefined), [category]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">All Products</h1>
          {category ? (<p className="text-silver-600 text-sm mt-1">Filtered by {category}</p>) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/products" className={`rounded-full px-3 py-1.5 text-sm border ${!category ? "bg-gold-100 text-gold-700 border-gold-200" : "border-silver-200"}`}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c} href={{ pathname: "/products", query: { category: c } }} className={`rounded-full px-3 py-1.5 text-sm border ${category === c ? "bg-gold-100 text-gold-700 border-gold-200" : "border-silver-200"}`}>{c[0].toUpperCase() + c.slice(1)}</Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="group rounded-xl border border-silver-200 bg-white/70 p-3 hover:border-gold-400 hover:shadow-md transition-all">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-silver-50">
              <Image src={p.images?.[0] || "/window.svg"} alt={p.title} width={600} height={600} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="mt-3">
              <div className="text-sm text-silver-600">{p.category}</div>
              <div className="font-medium">{p.title}</div>
              <div className="text-gold-600 mt-1">₹{(p.price / 100).toFixed(2)}</div>
            </div>
            {p.images?.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {p.images.slice(0,4).map((img, idx) => (
                  <div key={idx} className="h-14 w-full overflow-hidden rounded-md bg-silver-50">
                    <Image src={img} alt={`${p.title} ${idx+1}`} width={150} height={150} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">Loading…</div>}>
      <ProductsContent />
    </Suspense>
  );
}


