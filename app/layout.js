import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Providers from "./providers";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aurelia Jewelry — Elegant Ornaments & Fine Craft",
  description: "Shop rings, necklaces, bangles, and more. Pastel elegance with gold & silver accents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Providers>
          <Header />
          <main className="min-h-[calc(100dvh-8rem)]">{children}</main>
          <footer className="border-t border-silver-100 dark:border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-6 w-6 rounded-full silver-gradient ring-1 ring-silver-200" />
                  <span className="font-semibold">Aurelia Jewelry</span>
                </div>
                <p className="text-sm text-silver-600">Pastel elegance with timeless gold & silver craftsmanship.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Shop</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/products" className="hover:text-gold-600">All Products</Link></li>
                  <li><Link href={{ pathname: "/products", query: { category: "rings" } }} className="hover:text-gold-600">Rings</Link></li>
                  <li><Link href={{ pathname: "/products", query: { category: "necklaces" } }} className="hover:text-gold-600">Necklaces</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Support</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/contact" className="hover:text-gold-600">Contact</Link></li>
                  <li><Link href="/login" className="hover:text-gold-600">Account</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Newsletter</h4>
                <form className="flex gap-2">
                  <input type="email" placeholder="you@example.com" className="w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
                  <button className="rounded-md bg-gold-400 text-white px-3 py-2 text-sm hover:bg-gold-600 transition-colors">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="text-center text-xs text-silver-600 py-6">© {new Date().getFullYear()} Aurelia Jewelry. All rights reserved.</div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
