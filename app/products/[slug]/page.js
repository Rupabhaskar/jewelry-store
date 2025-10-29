"use client";

import { useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "@/app/data/products";
import { useCart } from "@/app/providers";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState("default");
  const [activeIndex, setActiveIndex] = useState(0);

  const product = useMemo(() => getProductBySlug(params.slug), [params.slug]);
  if (!product) return notFound();

  const onAdd = () => {
    addItem({ id: product.id, title: product.title, price: product.price, variant, qty, image: product.images?.[0], slug: product.slug });
  };

  const onBuyNow = () => {
    onAdd();
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-2 gap-8">
      <div>
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-silver-50 ring-1 ring-silver-200">
          <Image src={product.images?.[activeIndex] || "/window.svg"} alt={product.title} width={1000} height={1000} className="h-full w-full object-cover" priority />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {(product.images || []).map((img, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} className={`h-20 overflow-hidden rounded-lg ring-1 ${activeIndex === i ? "ring-gold-400" : "ring-silver-200"}`}>
              <Image src={img} alt={`${product.title} ${i + 1}`} width={200} height={200} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold">{product.title}</h1>
        <div className="mt-2 text-gold-600 text-xl">₹{(product.price / 100).toFixed(2)}</div>
        <p className="mt-3 text-silver-600">{product.description}</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-silver-600">Variant</label>
            <div className="mt-2 flex gap-2">
              {["default", "small", "medium", "large"].map((v) => (
                <button key={v} onClick={() => setVariant(v)} className={`rounded-full px-3 py-1.5 text-sm border ${variant === v ? "bg-gold-100 text-gold-700 border-gold-200" : "border-silver-200"}`}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-silver-600">Quantity</label>
            <div className="mt-2 inline-flex items-center rounded-full border border-silver-200">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5">-</button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1.5">+</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={onAdd} className="rounded-full border border-silver-200 px-5 py-3 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">Add to Cart</button>
            <button onClick={onBuyNow} className="rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors pastel-glow">Buy Now</button>
          </div>
          <div className="text-sm text-silver-600">Material: {product.material}</div>
        </div>
      </div>
    </div>
  );
}


