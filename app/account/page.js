"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers";
import Link from "next/link";

export default function AccountPage() {
  const { user, login, logout } = useAuth();
  const [profile, setProfile] = useState(() => {
    if (typeof window === "undefined") return { name: "", phone: "", email: "" };
    try {
      const saved = JSON.parse(localStorage.getItem("aurelia_profile") || "{}");
      return { name: "", phone: "", email: "", ...saved };
    } catch {
      return { name: "", phone: "", email: "" };
    }
  });
  const [orders] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("aurelia_orders") || "[]");
    } catch {
      return [];
    }
  });

  const saveProfile = (e) => {
    e.preventDefault();
    try { localStorage.setItem("aurelia_profile", JSON.stringify(profile)); } catch {}
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl silver-gradient ring-1 ring-silver-200 p-6">
          <h1 className="text-2xl font-semibold">Your Account</h1>
          <p className="mt-2 text-silver-600">Please login to view your profile and orders.</p>
          <Link href="/login" className="mt-4 inline-block rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="rounded-2xl silver-gradient ring-1 ring-silver-200 p-6">
          <h2 className="text-lg font-semibold">Profile</h2>
          <form className="mt-4 grid gap-4" onSubmit={saveProfile}>
            <div>
              <label className="text-sm text-silver-600">Name</label>
              <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
            </div>
            <div>
              <label className="text-sm text-silver-600">Email</label>
              <input type="email" value={profile.email || user?.email || ""} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
            </div>
            <div>
              <label className="text-sm text-silver-600">Phone</label>
              <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="rounded-full bg-gold-400 text-white px-5 py-2.5 text-sm font-medium hover:bg-gold-600 transition-colors">Save</button>
              <button type="button" onClick={logout} className="rounded-full border border-silver-200 px-5 py-2.5 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">Logout</button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Past Orders</h2>
          <Link href="/products" className="text-sm text-gold-600 hover:underline">Shop more</Link>
        </div>
        {orders.length === 0 ? (
          <div className="mt-4 rounded-xl border border-silver-200 p-6 text-silver-600">No past orders yet.</div>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-xl border border-silver-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-silver-600">Order ID: {o.id}</div>
                  <div className="text-sm">{new Date(o.createdAt).toLocaleString()}</div>
                  <div className="text-sm font-medium">Total: ₹{(o.total / 100).toFixed(2)}</div>
                  <div className="text-xs rounded-full bg-gold-100 text-gold-700 px-2 py-1">{o.status}</div>
                </div>
                <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {o.items.map((i, idx) => (
                    <div key={idx} className="rounded-lg border border-silver-200 p-3">
                      <div className="text-sm font-medium">{i.title}</div>
                      <div className="text-xs text-silver-600">Variant: {i.variant} · Qty: {i.qty}</div>
                      <div className="text-xs text-gold-700 mt-1">₹{((i.price * i.qty) / 100).toFixed(2)}</div>
                      <Link href={`/products/${i.slug}`} className="mt-2 inline-block text-xs text-gold-600 hover:underline">View product</Link>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-silver-600">
                  Ship to: {o.shipping.address}, {o.shipping.city} {o.shipping.zip}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


