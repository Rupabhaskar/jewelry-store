"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function LoginPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl silver-gradient ring-1 ring-silver-200 p-6">
          <h1 className="text-2xl font-semibold">You&apos;re logged in</h1>
          <p className="mt-1 text-silver-700 text-sm">{user.email}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => router.push("/checkout")} className="rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors">Go to Checkout</button>
            <button onClick={logout} className="rounded-full border border-silver-200 px-5 py-3 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">Logout</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl silver-gradient ring-1 ring-silver-200 p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-1 text-silver-700 text-sm">Use any email to continue.</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); login(email); router.push("/checkout"); }}>
          <div>
            <label className="text-sm text-silver-600">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
          </div>
          <button type="submit" className="rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors">Continue</button>
        </form>
      </div>
    </div>
  );
}


