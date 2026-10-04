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

export default function ServicesLookbook() {
  const services = buildServiceEntries(beautyCategories, serviceOrder);
  const featureImage = services[0];

  if (!featureImage || !services.length) return null;

  return (
    <section id="services-lookbook" className={styles.section} aria-labelledby="service-showcase-heading">
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
  );
}
