"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const CartButton = dynamic(() => import("./CartButton"), { ssr: false });

function NavLinks() {
  return (
    <>
      <Link href="/products" className="hover:text-gold-600 transition-colors">All Products</Link>
      <Link href={{ pathname: "/products", query: { category: "necklaces" } }} className="hover:text-gold-600 transition-colors">Necklaces</Link>
      <Link href={{ pathname: "/products", query: { category: "rings" } }} className="hover:text-gold-600 transition-colors">Rings</Link>
      <Link href={{ pathname: "/products", query: { category: "bangles" } }} className="hover:text-gold-600 transition-colors">Bangles</Link>
      <Link href={{ pathname: "/products", query: { category: "earrings" } }} className="hover:text-gold-600 transition-colors">Earrings</Link>
    </>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-silver-100 dark:bg-black/60 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/favicon.ico" alt="Aurelia Jewelry" width={32} height={32} className="rounded" />
          <span className="text-lg font-semibold tracking-wide">Aurelia Jewelry</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <CartButton />
          <Link href="/account" className="rounded-full border border-silver-200/70 px-3 py-1.5 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">Account</Link>
          <Link href="/login" className="rounded-full bg-gold-100 text-gold-600 px-3 py-1.5 text-sm hover:bg-gold-200 transition-colors">Login</Link>
        </div>

        {/* Mobile menu button */}
        <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center rounded-md border border-silver-200 bg-white/70 p-2 hover:border-gold-400 hover:text-gold-600 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
          <nav className="grid gap-2 text-sm">
            <NavLinks />
          </nav>
          <div className="mt-3 flex items-center gap-3">
            <CartButton />
            <Link href="/account" className="rounded-full border border-silver-200/70 px-3 py-1.5 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">Account</Link>
            <Link href="/login" className="rounded-full bg-gold-100 text-gold-600 px-3 py-1.5 text-sm hover:bg-gold-200 transition-colors">Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}


