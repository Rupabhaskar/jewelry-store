"use client";

import Image from "next/image";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&h=1000&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=1000&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&h=1000&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1600&h=1000&fit=crop&crop=center",
];

export default function HeroCarousel() {
  return (
    <div className="relative h-[380px] sm:h-[420px] lg:h-[520px]">
      <div className="absolute inset-0 overflow-hidden rounded-3xl ring-1 ring-silver-200">
        {HERO_IMAGES.map((src, idx) => (
          <div key={idx} className="carousel-slide">
            <Image
              src={src}
              alt="Aurelia Jewelry hero"
              fill
              priority={idx === 0}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
              style={{ animationDelay: `${idx * 6}s` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10" />
          </div>
        ))}
      </div>
      <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl gold-gradient blur-xl opacity-70" aria-hidden />
    </div>
  );
}


