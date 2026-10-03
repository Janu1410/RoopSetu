import Image from "next/image";
import Link from "next/link";
import styles from "./BeautyMomentsMarquee.module.css";

const moments = [
  {
    image: "/images/hero/desktop/her-31.jpg",
    alt: "Bridal beauty look styled for a celebration",
    label: "Bridal beauty",
  },
  {
    image: "/images/makeup/mak-14.jpg",
    alt: "Soft glam makeup inspiration in warm tones",
    label: "Soft glam",
  },
  {
    image: "/images/hair/hai-22.jpg",
    alt: "Occasion-ready hair styling inspiration",
    label: "Hair artistry",
  },
  {
    image: "/images/nails/nai-1.jpg",
    alt: "A detailed nail art look for a special occasion",
    label: "Nail art",
  },
  {
    image: "/images/hero/desktop/her-34.jpg",
    alt: "Editorial beauty look for a festive moment",
    label: "Festive looks",
  },
  {
    image: "/images/makeup/mak-19.jpg",
    alt: "Polished occasion makeup with a luminous finish",
    label: "Makeup",
  },
  {
    image: "/images/hair/hai-25.jpg",
    alt: "An elegant hairstyle for a celebration",
    label: "Celebration hair",
  },
  {
    image: "/images/nails/nai-7.jpg",
    alt: "Colorful manicure inspiration",
    label: "Manicure",
  },
];

function ImageSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={styles.imageSet} aria-hidden={duplicate || undefined}>
      {moments.map((moment) => (
        <figure className={styles.card} key={`${duplicate ? "loop" : "gallery"}-${moment.image}`}>
          <Image
            src={moment.image}
            alt={duplicate ? "" : moment.alt}
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1200px) 42vw, 500px"
            className={styles.image}
          />
          <figcaption className={styles.label}>{moment.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function BeautyMomentsMarquee() {
  return (
    <section className={styles.section} aria-labelledby="beauty-moments-heading">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" /> RoopSetu beauty inspiration
        </p>
        <h2 className={styles.heading} id="beauty-moments-heading">
          Beauty, in its <em>element.</em>
        </h2>
        <p className={styles.description}>
          A moving collection of bridal details, expressive makeup, hair artistry and little moments of
          self-care.
        </p>
        <Link href="/beauty-categories" className={styles.link}>
          Explore beauty categories <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          <ImageSet />
          <ImageSet duplicate />
        </div>
      </div>
    </section>
  );
}
