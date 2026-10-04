import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Sparkles } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export type ServicePlan = {
  id: string;
  category: string;
  planTitle: string;
  image: string;
  alt: string;
  items: { name: string; regularPrice: string }[];
  youSave: string;
  packagePrice: string;
  bookingHref: string;
};

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "signature",
    category: "SIGNATURE",
    planTitle: "Beauty Plan!",
    image: "/images/makeup/mak-14.jpg",
    alt: "Woman receiving radiant facial skincare treatment",
    items: [
      { name: "ADVANCED SKIN TREATMENT", regularPrice: "₹3,000" },
      { name: "CUSTOM MAKEUP APPLICATION", regularPrice: "₹2,500" },
      { name: "OCCASION HAIR STYLING", regularPrice: "₹1,800" },
    ],
    youSave: "₹1,800",
    packagePrice: "₹5,500",
    bookingHref: "/services?plan=signature",
  },
  {
    id: "essential",
    category: "ESSENTIAL",
    planTitle: "Glow Plan!",
    image: "/images/hero/desktop/her-30.jpg",
    alt: "Radiant woman touching dewy glowing skin",
    items: [
      { name: "PERSONALIZED CONSULTATION", regularPrice: "₹1,500" },
      { name: "DEEP CLEANSING GLOW FACIAL", regularPrice: "₹3,500" },
      { name: "LIGHT MAKEUP FINISH & HAIR", regularPrice: "₹4,000" },
      { name: "HANDCRAFTED MEHENDI TOUCH-UP", regularPrice: "₹1,500" },
    ],
    youSave: "₹2,500",
    packagePrice: "₹8,000",
    bookingHref: "/services?plan=essential",
  },
  {
    id: "bridal",
    category: "BRIDAL",
    planTitle: "Luxe Plan!",
    image: "/images/hero/desktop/her-31.jpg",
    alt: "Royal bride in traditional wedding styling",
    items: [
      { name: "PRE-BRIDAL SKIN PREPARATION", regularPrice: "₹4,500" },
      { name: "TRIAL MAKEUP & LOOK DESIGN", regularPrice: "₹3,500" },
      { name: "PREMIUM HD AIRBRUSH MAKEUP", regularPrice: "₹9,500" },
      { name: "KUNDAN JEWELRY & VEIL PINNING", regularPrice: "₹2,500" },
    ],
    youSave: "₹4,000",
    packagePrice: "₹16,000",
    bookingHref: "/services?plan=bridal",
  },
];

export default function ServicesPlansSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-plans-heading"
      className="relative overflow-hidden bg-[#FFF8F3] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 border-t border-[#F0DFD7] scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Editorial Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#FAF0E6] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5A001F] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Curated Beauty Plans · All-Inclusive</span>
          </div>
          <h2
            id="services-plans-heading"
            className={`${playfair.className} text-3xl font-bold tracking-tight text-[#5A001F] sm:text-4xl lg:text-5xl`}
          >
            Signature Packages &amp;{" "}
            <em className="font-normal italic">Transparent Pricing</em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6C5662] sm:text-base">
            Complete look coordination crafted by verified beauty professionals.
            Zero hidden salon markups, upfront pricing for every celebration.
          </p>
        </div>

        {/* 3 Golden Cards Grid Matching Template */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {SERVICE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col justify-between rounded-xl sm:rounded-2xl bg-[#F6CE78] p-6 sm:p-7 lg:p-8 border border-[#E9BE62] shadow-[0_10px_30px_rgba(138,18,56,0.07)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* Top Section: Category & Title on Left, Monochrome Image on Right */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="block font-black text-xs sm:text-[0.88rem] tracking-[0.16em] uppercase text-[#8A1238]">
                      {plan.category}
                    </span>
                    <h3
                      className={`${playfair.className} mt-1 text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold italic text-[#8A1238] leading-[1.08] tracking-tight`}
                    >
                      {plan.planTitle}
                    </h3>
                  </div>

                  <div className="relative shrink-0 w-[115px] h-[115px] sm:w-[130px] sm:h-[130px] lg:w-[140px] lg:h-[140px] overflow-hidden rounded-lg sm:rounded-xl border border-white/60 shadow-sm bg-[#3B1925]">
                    <Image
                      src={plan.image}
                      alt={plan.alt}
                      fill
                      sizes="160px"
                      className="object-cover grayscale contrast-125 brightness-[0.92]"
                    />
                  </div>
                </div>

                {/* Divider Rule */}
                <div className="my-5 sm:my-6 border-b border-[#8A1238]/30" />

                {/* Items List */}
                <div className="space-y-3.5 sm:space-y-4">
                  {plan.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between gap-2 text-[#8A1238]"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <span
                          className="text-xs sm:text-sm font-black text-[#8A1238] shrink-0"
                          aria-hidden="true"
                        >
                          ✦
                        </span>
                        <span className="font-extrabold text-[0.7rem] sm:text-[0.76rem] uppercase tracking-wider truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-bold text-[0.66rem] sm:text-[0.72rem] uppercase tracking-wider shrink-0 opacity-90">
                        REGULAR PRICE {item.regularPrice}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Savings Tag */}
                <div className="mt-4 sm:mt-5 text-right">
                  <span className="font-black text-[0.7rem] sm:text-xs uppercase tracking-wider text-[#8A1238]">
                    YOU SAVE {plan.youSave}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Price on Left, BOOK APPOINTMENT Button on Right */}
              <div className="mt-8 pt-5 border-t border-[#8A1238]/20 flex items-center justify-between gap-3">
                <span
                  className={`${playfair.className} text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold italic text-[#8A1238] tracking-tight leading-none`}
                >
                  {plan.packagePrice}
                </span>

                <Link
                  href={plan.bookingHref}
                  className="inline-flex items-center justify-center rounded-[3px] bg-[#5A001F] hover:bg-[#3D0015] text-white px-5 sm:px-6 py-3 sm:py-3.5 text-[0.68rem] sm:text-[0.74rem] font-black uppercase tracking-[0.14em] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A1238]"
                >
                  BOOK APPOINTMENT
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
