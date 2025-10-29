"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/providers";

export default function CartPage() {
  const { items, removeItem, updateItemQty, clear } = useCart();
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-silver-200 p-6 text-silver-600">
          Your cart is empty. <Link href="/products" className="text-gold-600">Browse products</Link>.
        </div>
      ) : (
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((i) => (
              <div key={`${i.id}-${i.variant}`} className="rounded-xl border border-silver-200 p-4 flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg bg-silver-50 ring-1 ring-silver-200">
                  <Image src={i.image || "/window.svg"} alt={i.title} width={80} height={80} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-sm text-silver-600">Variant: {i.variant}</div>
                  <div className="mt-2 inline-flex items-center rounded-full border border-silver-200">
                    <button onClick={() => updateItemQty(i.id, i.variant, i.qty - 1)} className="px-3 py-1.5">-</button>
                    <span className="px-4 select-none">{i.qty}</span>
                    <button onClick={() => updateItemQty(i.id, i.variant, i.qty + 1)} className="px-3 py-1.5">+</button>
                  </div>
                  <div className="text-gold-600 text-sm mt-1">₹{((i.price * i.qty) / 100).toFixed(2)}</div>
                </div>
                <button onClick={() => removeItem(i.id, i.variant)} className="text-sm text-silver-600 hover:text-gold-600">Remove</button>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-silver-200 p-5 h-fit">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{(total / 100).toFixed(2)}</span>
            </div>
            <div className="mt-1 text-xs text-silver-600">Taxes and shipping calculated at checkout.</div>
            <div className="mt-5 flex flex-col gap-3">
              <Link href="/checkout" className="rounded-full bg-gold-400 text-white px-5 py-3 text-sm text-center font-medium hover:bg-gold-600 transition-colors">Checkout</Link>
              <button onClick={clear} className="rounded-full border border-silver-200 px-5 py-3 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">Clear Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


