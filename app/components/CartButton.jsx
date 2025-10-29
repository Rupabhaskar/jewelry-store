"use client";

import Link from "next/link";
import { useCart } from "@/app/providers";

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <Link href="/cart" className="relative inline-flex items-center justify-center rounded-full border border-silver-200/70 px-3 py-1.5 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-1">
        <path d="M7 6h14l-2 9H8L7 6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 6L6 3H3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      </svg>
      Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-gold-400 text-white text-[11px] leading-5 text-center">{count}</span>
      )}
    </Link>
  );
}


