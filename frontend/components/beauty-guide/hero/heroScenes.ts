export interface HeroScene {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  objectPosition: string;
}

export const heroScenes: HeroScene[] = [
  {
    id: "bridal",
    category: "Bridal",
    title: "Made for\nthe moment.",
    description: "Beauty inspiration for the looks you will remember.",
    image: "/images/hero/desktop/her-30.jpg",
    objectPosition: "center 20%",
  },
  {
    id: "nail-art",
    category: "Nail Art",
    title: "Details worth\nsaving.",
    description: "Your next manicure, beautifully discovered.",
    image: "/images/hero/desktop/her-35.jpg",
    objectPosition: "center 20%",
  },
  {
    id: "fashion",
    category: "Fashion",
    title: "Dressed for\nthe moment.",
    description: "Discover silhouettes, colour, and looks worth saving.",
    image: "/images/hero/desktop/her-31.jpg",
    objectPosition: "center 20%",
  },
  {
    id: "hairstyles",
    category: "Hairstyles",
    title: "Your next\nsignature look.",
    description: "From effortless waves to intricate bridal styles.",
    image: "/images/hero/desktop/her-32.jpg",
    objectPosition: "center 20%",
  },
  {
    id: "makeup",
    category: "Makeup",
    title: "Looks worth\nrecreating.",
    description: "Soft colour, beautiful definition, endless inspiration.",
    image: "/images/hero/desktop/her-33.jpg",
    objectPosition: "center 20%",
  },
  {
    id: "mehndi",
    category: "Mehndi",
    title: "Art worth\nwearing.",
    description: "Intricate patterns for celebrations and special moments.",
    image: "/images/hero/desktop/mehndi-generated.jpg",
    objectPosition: "center 20%",
  },
];
