import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

// Verified retail, luxury showroom and store management imagery
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury clothing showroom and retail visual merchandising",
  },
  {
    src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern apparel store with premium display fixtures",
  },
  {
    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Executive retail boutique and flagship store interior",
  },
  {
    src: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1200&q=80",
    alt: "High-end retail shopping experience and visual display",
  },
  {
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80",
    alt: "Organized fashion showroom racks and inventory",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    alt: "Celebration and grand showroom retail floor",
  },
  {
    src: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=1200&q=80",
    alt: "Footwear and luxury sports apparel retail display",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    alt: "Curated fashion collection and store aesthetics",
  },
];

export default function TiltedGridHeroDemo() {
  return (
    <TiltedGridHero
      images={IMAGES}
      className="h-[560px] w-full rounded-2xl border border-border bg-slate-950 text-white shadow-2xl"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center pointer-events-none">
        <div className="px-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-400/10 rounded-full border border-amber-400/20 mb-3">
            Retail Excellence In Motion
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-md">
            14+ Years Leading
            <br />
            Flagship Showrooms & Brands
          </h1>
        </div>
        <p className="max-w-md text-balance px-6 text-sm text-slate-300 drop-shadow">
          Visual merchandising, SOP enforcement, inventory control, and multi-crore sales operations in motion.
        </p>
      </div>
    </TiltedGridHero>
  );
}
