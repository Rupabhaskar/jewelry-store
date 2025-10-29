"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useCart } from "@/app/providers";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: user?.email || "", address: "", city: "", zip: "" });
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const placeOrder = (e) => {
    e.preventDefault();
    if (!items.length) return;
    // Simulate order and save to localStorage
    const order = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      user: { email: form.email, name: form.name },
      shipping: { address: form.address, city: form.city, zip: form.zip },
      items: items.map((i) => ({ id: i.id, title: i.title, price: i.price, qty: i.qty, variant: i.variant, slug: i.slug })),
      total,
      currency: "INR",
      status: "confirmed",
    };
    try {
      const existing = JSON.parse(localStorage.getItem("aurelia_orders") || "[]");
      localStorage.setItem("aurelia_orders", JSON.stringify([order, ...existing]));
    } catch {}
    clear();
    router.push("/thank-you");
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-xl border border-silver-200 p-6">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <p className="mt-2 text-silver-600">Please login to continue.</p>
          <button onClick={() => router.push("/login")} className="mt-4 rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-8">
      <form onSubmit={placeOrder} className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Checkout</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-silver-600">Full Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
          </div>
          <div>
            <label className="text-sm text-silver-600">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
          </div>
        </div>
        <div>
          <label className="text-sm text-silver-600">Address</label>
          <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-silver-600">City</label>
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
          </div>
          <div>
            <label className="text-sm text-silver-600">ZIP</label>
            <input required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
          </div>
        </div>
        <button type="submit" disabled={!items.length} className="rounded-full bg-gold-400 disabled:opacity-50 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors">Place Order</button>
      </form>

      <div className="rounded-xl border border-silver-200 p-5 h-fit">
        <div className="font-medium">Order Summary</div>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((i) => (
            <li key={`${i.id}-${i.variant}`} className="flex justify-between">
              <span>{i.title} × {i.qty}</span>
              <span>₹{((i.price * i.qty) / 100).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between font-medium">
          <span>Total</span>
          <span>₹{(total / 100).toFixed(2)}</span>
        </div>
        <div className="mt-1 text-xs text-silver-600">Shipping: Free</div>
      </div>
    </div>
  );
}


