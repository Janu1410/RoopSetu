import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { beautyCategories } from "@/constants/beauty-data";
import { buildServiceEntries } from "@/lib/service-showcase.mjs";
import styles from "./ServicesLookbook.module.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const serviceOrder = ["bridal", "makeup", "hairstyles", "nail-art"];

const serviceMeta: Record<string, { displayTitle: string; startingPrice: string }> = {
  bridal: {
    displayTitle: "Bridal & Festive",
    startingPrice: "₹5,500",
  },
  makeup: {
    displayTitle: "Expressive Makeup",
    startingPrice: "₹2,500",
  },
  hairstyles: {
    displayTitle: "Hair Artistry",
    startingPrice: "₹1,800",
  },
  "nail-art": {
    displayTitle: "Nail Art",
    startingPrice: "₹1,200",
  },
};

function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central Stem */}
      <path
        d="M20 370C40 280 75 190 140 100C165 65 195 30 220 15"
        stroke="#F4CF83"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
      {/* Bottom Leaf Outline & Vein */}
      <path
        d="M50 320C15 310 2 270 12 230C22 195 55 180 85 195C105 210 110 245 100 275C90 305 68 322 50 320Z"
        stroke="#F4CF83"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeOpacity="0.32"
      />
      <path
        d="M30 275C45 260 65 240 85 195"
        stroke="#F4CF83"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />
      {/* Middle Leaf Outline & Vein */}
      <path
        d="M90 230C65 200 60 150 80 110C100 75 140 70 165 95C185 120 180 160 160 190C140 220 110 235 90 230Z"
        stroke="#F4CF83"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeOpacity="0.32"
      />
      <path
        d="M95 185C115 160 135 130 165 95"
        stroke="#F4CF83"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />
      {/* Top Leaf Outline & Vein */}
      <path
        d="M145 125C135 90 145 50 175 25C200 2 230 12 235 45C240 75 220 105 190 120C170 130 155 130 145 125Z"
        stroke="#F4CF83"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeOpacity="0.32"
      />
      <path
        d="M165 85C185 65 205 45 220 15"
        stroke="#F4CF83"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />
    </svg>
  );
}

export default function ServicesLookbook() {
  const services = buildServiceEntries(beautyCategories, serviceOrder);
  const featureImage = services[0];

  if (!featureImage || !services.length) return null;

  return (
    <div id="services-lookbook" className="relative w-full">
      {/* 1. Services Hero Intro Banner matching Template */}
      <div className={styles.heroBanner}>
        {/* Left & Right Botanical Line-Art Branches */}
        <BotanicalBranch className="pointer-events-none absolute -bottom-6 left-2 sm:left-6 lg:left-12 h-[240px] sm:h-[320px] lg:h-[400px] w-auto select-none" />
        <BotanicalBranch className="pointer-events-none absolute -bottom-6 right-2 sm:right-6 lg:right-12 h-[240px] sm:h-[320px] lg:h-[400px] w-auto select-none -scale-x-100" />

        <div className={styles.heroInner}>
          <h2 className={styles.heroEyebrow}>&ldquo;LUXURY SERVICES&rdquo;</h2>
          <h3 className={`${styles.heroTitle} ${playfair.className}`}>Designed For Confidence</h3>
          <p className={`${styles.heroDescription} ${playfair.className}`}>
            At RoopSetu Studio, every service is thoughtfully curated with verified artists to deliver visible results while offering a relaxing, elevated experience. From advanced bridal transformations to handcrafted mehendi and couture hair artistry, we combine tradition with expertise.
          </p>
          <Link href="/services" className={styles.heroButton}>
            BOOK YOUR APPOINTMENT
          </Link>
        </div>
      </div>

      {/* 2. Signature Services 2-Column Showcase */}
      <section className={styles.section} aria-labelledby="service-showcase-heading">
        {/* Left Sticky Feature Aside matching Template */}
        <aside className={styles.feature}>
          <div className={styles.featureInner}>
            <h2 id="service-showcase-heading" className={styles.featureHeading}>
              <span>ROOPSETU&apos;S</span>
              <em className={playfair.className}>Signature Services</em>
            </h2>

            <div className={`relative ${styles.featureImage}`} style={{ minHeight: "260px" }}>
              <Image
                src={featureImage.image}
                alt={featureImage.alt}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 44vw"
                className={styles.image}
                style={{ objectPosition: featureImage.objectPosition }}
              />
            </div>

            <Link href="/services" className={styles.featureLink}>
              VIEW ALL SERVICES
            </Link>

            <p className={styles.featureFootnote}>BRIDAL · MAKEUP · HAIR · NAILS</p>
          </div>
        </aside>

        {/* Right Compact Services List with Prominent Italic Typography */}
        <div className={styles.serviceList} aria-label="RoopSetu signature beauty services">
          {services.map((service, index) => {
            const meta = serviceMeta[service.id] || {
              displayTitle: service.title,
              startingPrice: "₹1,500",
            };

            return (
              <article
                key={service.id}
                className={styles.service}
                aria-labelledby={`lookbook-${service.id}-heading`}
              >
                <div className={styles.serviceCopy}>
                  {/* Big Italic Serif Title with Number */}
                  <h3
                    id={`lookbook-${service.id}-heading`}
                    className={`${styles.serviceHeading} ${playfair.className}`}
                  >
                    {String(index + 1).padStart(2, "0")}. {meta.displayTitle}
                  </h3>

                  {/* Service Details: Image on left, Price + Italic Description + Button on right */}
                  <div className={styles.serviceDetails}>
                    <div className={`relative ${styles.serviceImage}`} style={{ minHeight: "220px" }}>
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 35vw, 440px"
                        className={styles.image}
                        style={{ objectPosition: service.objectPosition }}
                      />
                    </div>

                    <div className={styles.descriptionBlock}>
                      <p className={styles.servicePrice}>FROM: {meta.startingPrice}</p>
                      <p className={`${styles.descriptionText} ${playfair.className}`}>
                        {service.description}
                      </p>
                      <Link href={service.href} className={styles.serviceLink}>
                        VIEW DETAILS
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
