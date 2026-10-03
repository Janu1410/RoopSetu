import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { beautyCategories } from "@/constants/beauty-data";
import { buildServiceEntries } from "@/lib/service-showcase.mjs";
import styles from "./ServicesLookbook.module.css";

const serviceOrder = ["bridal", "makeup", "hairstyles", "nail-art"];
const services = buildServiceEntries(beautyCategories, serviceOrder);
const featureImage = services[0];

export default function ServicesLookbook() {
  if (!featureImage || !services.length) return null;

  return (
    <section id="services-lookbook" className={styles.section} aria-labelledby="service-showcase-heading">
      <aside className={styles.feature}>
        <div className={styles.featureInner}>
          <p className={styles.eyebrow}><Sparkles size={14} aria-hidden="true" /> RoopSetu · The beauty edit</p>
          <h2 id="service-showcase-heading" className={styles.featureHeading}>
            <span>Made for</span><em>your moment.</em>
          </h2>
          <div className={styles.featureImage}>
            <Image src={featureImage.image} alt={featureImage.alt} fill priority sizes="(max-width: 760px) 100vw, 44vw" className={styles.image} style={{ objectPosition: featureImage.objectPosition }} />
          </div>
          <Link href="/services" className={styles.featureLink}>
            Discover all services <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <p className={styles.featureFootnote}>BRIDAL · MAKEUP · HAIR · NAILS</p>
        </div>
      </aside>

      <div className={styles.serviceList} aria-label="RoopSetu beauty collections">
        {services.map((service, index) => (
          <article key={service.id} className={styles.service} aria-labelledby={`lookbook-${service.id}-heading`}>
            <div className={styles.serviceCopy}>
              <p className={styles.serviceIndex}>{String(index + 1).padStart(2, "0")} · ROOPSETU COLLECTION</p>
              <h3 id={`lookbook-${service.id}-heading`} className={styles.serviceHeading}>{service.title}</h3>
              <div className={styles.mobileImage}>
                <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 42vw" className={styles.image} style={{ objectPosition: service.objectPosition }} />
              </div>
              <div className={styles.serviceDetails}>
                <div className={styles.serviceImage}>
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 1100px) 42vw, 460px" className={styles.image} style={{ objectPosition: service.objectPosition }} />
                </div>
                <div className={styles.descriptionBlock}>
                  <p>{service.description}</p>
                  <Link href={service.href} className={styles.serviceLink}>
                    Explore this look <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
