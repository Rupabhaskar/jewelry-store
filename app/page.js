import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 opacity-70" aria-hidden>
          <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full gold-gradient blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full silver-gradient blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-28 lg:pb-28 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 text-gold-600 ring-1 ring-gold-100 px-3 py-1 text-xs">New Collection</span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Timeless Jewelry in Pastel Elegance
              </h1>
              <p className="mt-4 text-base sm:text-lg text-silver-600 max-w-xl">
                Discover rings, necklaces, bangles, and earrings crafted with love — soft pastels with gold and silver accents for a refined, modern look.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors pastel-glow">Shop Now</Link>
                <a href="#categories" className="rounded-full border border-silver-200 px-5 py-3 text-sm hover:border-gold-400 hover:text-gold-600 transition-colors">Browse Categories</a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-silver-600 text-sm">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-gold-400" />Handcrafted</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-silver-400" />Hypoallergenic</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-mint-200" />Free Shipping</div>
              </div>
            </div>
            <div className="relative h-[380px] sm:h-[420px] lg:h-[520px]">
              <div className="absolute inset-0 overflow-hidden rounded-3xl ring-1 ring-silver-200">
                <Image 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center" 
                  alt="Elegant jewelry collection - Aurelia Jewelry" 
                  fill 
                  priority 
                  sizes="(min-width: 1024px) 560px, 100vw" 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10" />
              </div>
              <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl gold-gradient blur-xl opacity-70" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { name: "Necklaces", q: "necklaces" },
            { name: "Rings", q: "rings" },
            { name: "Bangles", q: "bangles" },
            { name: "Earrings", q: "earrings" },
            { name: "Pendants", q: "pendants" },
            { name: "Sets", q: "sets" },
          ].map((cat) => (
            <Link key={cat.q} href={{ pathname: "/products", query: { category: cat.q } }} className="group rounded-xl border border-silver-200 bg-white/70 p-4 hover:border-gold-400 hover:shadow-md transition-all">
              <div className="h-24 rounded-lg silver-gradient group-hover:gold-gradient transition-colors" />
              <div className="mt-3 text-sm font-medium group-hover:text-gold-600">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl silver-gradient ring-1 ring-silver-200 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold">Free gift wrapping on festival orders</h3>
            <p className="text-silver-600 text-sm sm:text-base mt-1">Add a message at checkout and make it memorable.</p>
          </div>
          <Link href="/products" className="rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors">Explore Collection</Link>
        </div>
      </section>
    </div>
  );
}
