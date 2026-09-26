export type LookItem = {
  id: string;
  image: string;
  alt: string;
  objectPosition?: string;
  title?: string;
  description?: string;
  tag?: string; // New: single tag for filtering (e.g., "Chrome", "French")
  steps?: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
};

export type LookCategory = {
  id: string;
  label: string;
  href: string;
  tagline: string;
  heroDescription?: string; // New: longer description for the hero banner
  items: LookItem[];
};

export const beautyCategories: LookCategory[] = [
  {
    id: "nail-art",
    label: "Nail Art",
    href: "/nails",
    tagline: "Sophisticated manicures, micro-french tips & chrome glazes.",
    heroDescription:
      "Discover curated nail design ideas from subtle everyday elegance to bold statement art.",
    items: [
      {
        id: "pink-chrome",
        alt: "Pink chrome nail art",
        image: "/images/nails/nai-10.jpg",
        title: "Soft Pink Chrome Finish",
        description:
          "A high-shine iridescent chrome top coat over a soft nude-pink gel base.",
        tag: "Chrome",
        steps: [
          {
            id: "01",
            title: "The Flawless Canvas",
            description:
              "A perfect chrome finish shows every bump. Gently push back cuticles and apply a smooth, self-leveling base.",
            image: "/images/nails/nai-3.jpg",
          },
          {
            id: "02",
            title: "The Blush Base",
            description:
              "Apply two sheer coats of soft baby pink gel polish. Cures completely, then apply a strictly NON-WIPE top coat.",
            image: "/images/nails/nai-4.jpg",
          },
          {
            id: "03",
            title: "The Magic Glaze",
            description:
              "While slightly warm from the lamp, use a sponge applicator to firmly rub the gold dust onto the nail.",
            image: "/images/nails/nai-5.jpg",
          },
        ],
      },
      {
        id: "lavender-marble",
        alt: "Lavender marble nail art",
        image: "/images/nails/nai-8.jpg",
        title: "Lavender Marble Swirls",
        description:
          "Delicate purple watercolor veins swirled across an opaque milky base.",
        tag: "Marble",
      },
      {
        id: "french-tips",
        alt: "Minimal French tip nails",
        image: "/images/nails/nai-7.jpg",
        title: "Minimal French Micro-Tips",
        description:
          "Ultra-thin white smile lines crafted on a natural sheer pink nail bed.",
        tag: "French",
      },
      {
        id: "rose-quartz",
        alt: "Rose quartz nails",
        image: "/images/nails/nai-11.jpg",
        title: "Rose Quartz Elegance",
        description:
          "Channel the crystal of love with these semi-sheer pink marble nails.",
        tag: "Rose Quartz",
      },
      {
        id: "floral-nails",
        alt: "Floral nail art",
        image: "/images/nails/nai-6.jpg",
        title: "Delicate Floral Art",
        description:
          "Intricate hand-painted florals for a romantic spring vibe.",
        tag: "Floral",
      },
    ],
  },
  {
    id: "makeup",
    label: "Makeup",
    href: "/makeup",
    tagline: "Smokey glam, soft dewy looks & bridal beauty.",
    heroDescription:
      "Explore our collection of makeup inspirations ranging from soft everyday glam to heavy bridal looks.",
    items: [
      {
        id: "smokey-eyes",
        alt: "Smokey eye makeup",
        image: "/images/makeup/mak-20.jpg",
        objectPosition: "center 20%",
        title: "Classic Smokey Glam",
        description:
          "A sultry, blended out smokey eye perfect for evening events.",
        tag: "Smokey",
      },
      {
        id: "espresso-glam",
        alt: "Espresso soft glam makeup",
        image: "/images/makeup/mak-17.jpg",
        title: "Espresso Soft Glam",
        description:
          "Warm brown tones and a snatched contour for that everyday latte look.",
        tag: "Soft Glam",
      },
      {
        id: "fairy-makeup",
        alt: "Ethereal soft glam makeup",
        image: "/images/makeup/mak-19.jpg",
        title: "Ethereal Fairy Glam",
        description:
          "Sparkling lids and glossy lips for a magical, soft appearance.",
        tag: "Soft Glam",
      },
      {
        id: "bridal-makeup",
        alt: "Indian bridal makeup",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "Traditional Bridal Makeup",
        description:
          "Bold red lips and striking eyes to complement traditional bridal wear.",
        tag: "Bridal",
      },
      {
        id: "blush-saree",
        alt: "Blush bridal saree makeup",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "Blush Saree Glam",
        description:
          "Soft pink monochrome makeup that matches perfectly with blush and pastel outfits.",
        tag: "Bridal",
      },
    ],
  },
  {
    id: "hairstyles",
    label: "Hairstyles",
    href: "/hairstyles",
    tagline: "Effortless waves, elegant updos & bridal braids.",
    heroDescription:
      "Find your next signature hairstyle, from messy beach waves to intricate bridal braids.",
    items: [
      {
        id: "easy-waves",
        alt: "Easy waves hairstyle",
        image: "/images/hair/hai-22.jpg",
        title: "Effortless Waves",
        description:
          "Loose, beachy waves that give a relaxed yet polished look.",
        tag: "Waves",
      },
      {
        id: "braided-style",
        alt: "Soft braided hairstyle",
        image: "/images/hair/hai-21.jpg",
        title: "Soft Boho Braid",
        description: "A messy but structured braid with face-framing pieces.",
        tag: "Braids",
      },
      {
        id: "long-hair",
        alt: "Elegant long hairstyle",
        image: "/images/hair/hai-26.jpg",
        title: "Sleek & Long",
        description: "Glass-like shine on perfectly straightened long hair.",
        tag: "Straight",
      },
      {
        id: "party-updo",
        alt: "Party updo hairstyle",
        image: "/images/hair/hai-27.jpg",
        title: "Voluminous Party Updo",
        description: "A high-impact updo with plenty of volume and texture.",
        tag: "Updos",
      },
      {
        id: "half-up",
        alt: "Bridal half-up hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Bridal Half-Up",
        description:
          "A romantic half-up half-down style, perfect for securing a veil.",
        tag: "Half-Up",
      },
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    href: "/fashion",
    tagline: "Traditional looks, saree drapes & festive styling.",
    heroDescription:
      "Get inspired by the latest trends in traditional and festive fashion, perfect for any celebration.",
    items: [
      {
        id: "blush-saree-fashion",
        alt: "Blush bridal saree fashion",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "The Blush Saree Drape",
        description:
          "A modern take on the traditional saree drape using pastel hues.",
        tag: "Saree",
      },
      {
        id: "bridal-style",
        alt: "Bridal fashion look",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "Royal Bridal Ensemble",
        description:
          "Rich fabrics and heavy embroidery for the quintessential bridal look.",
        tag: "Bridal",
      },
      {
        id: "rose-bun-fashion",
        alt: "Rose bridal bun look",
        image: "/images/makeup/mak-13.jpg",
        objectPosition: "center 18%",
        title: "Floral Bun Styling",
        description: "Incorporating fresh roses into a traditional low bun.",
        tag: "Accessories",
      },
      {
        id: "soft-glam-fashion",
        alt: "Soft glam fashion look",
        image: "/images/makeup/mak-17.jpg",
        title: "Modern Minimalist",
        description:
          "Clean lines and neutral tones for an understated elegance.",
        tag: "Minimalist",
      },
      {
        id: "half-up-fashion",
        alt: "Elegant celebration hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Festive Half-Up",
        description:
          "A versatile style that works beautifully with both lehengas and suits.",
        tag: "Festive",
      },
    ],
  },
  {
    id: "mehndi",
    label: "Mehndi",
    href: "/mehndi",
    tagline: "Intricate patterns, floral motifs & bridal designs.",
    heroDescription:
      "Explore stunning henna designs ranging from minimalist modern art to full traditional bridal mehndi.",
    items: [
      {
        id: "floral-pattern",
        alt: "Floral pattern inspiration",
        image: "/images/nails/nai-6.jpg",
        title: "Floral Mehndi Motifs",
        description: "Delicate floral patterns that trail elegantly.",
        tag: "Floral",
      },
      {
        id: "rose-pattern",
        alt: "Rose detail inspiration",
        image: "/images/nails/nai-11.jpg",
        title: "Rose Infused Design",
        description: "Bold rose motifs serving as the centerpiece.",
        tag: "Rose",
      },
      {
        id: "marble-pattern",
        alt: "Marble pattern inspiration",
        image: "/images/nails/nai-8.jpg",
        title: "Intricate Marbling",
        description: "A unique swirling pattern mimicking natural marble.",
        tag: "Modern",
      },
      {
        id: "blush-pattern",
        alt: "Blush floral detail",
        image: "/images/nails/nai-2.jpg",
        title: "Minimalist Florals",
        description: "Spaced-out, dainty flowers for a modern mehndi look.",
        tag: "Minimalist",
      },
      {
        id: "french-pattern",
        alt: "Fine line detail inspiration",
        image: "/images/nails/nai-7.jpg",
        title: "Geometric Precision",
        description: "Sharp, fine lines and geometric shapes.",
        tag: "Geometric",
      },
    ],
  },
  {
    id: "bridal",
    label: "Bridal",
    href: "/bridal",
    tagline: "Dream wedding beauty — makeup, hair & jewellery.",
    heroDescription:
      "Everything you need for the big day. Dive into our curated inspiration for brides.",
    items: [
      {
        id: "bridal-face",
        alt: "Bridal beauty inspiration",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "The Complete Bridal Glow",
        description: "Flawless base, bold lips, and heavy jewellery.",
        tag: "Makeup",
      },
      {
        id: "bridal-saree",
        alt: "Bridal saree inspiration",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "Pastel Bridal Elegance",
        description: "A softer, more contemporary approach to bridal styling.",
        tag: "Fashion",
      },
      {
        id: "bridal-bun-look",
        alt: "Rose bridal bun hairstyle",
        image: "/images/makeup/mak-13.jpg",
        objectPosition: "center 18%",
        title: "Traditional Bridal Bun",
        description: "The classic low bun wrapped in fresh gajra.",
        tag: "Hair",
      },
      {
        id: "bridal-half-up",
        alt: "Half-up bridal hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Modern Bridal Half-Up",
        description:
          "A beautiful alternative for brides who prefer their hair down.",
        tag: "Hair",
      },
      {
        id: "bridal-braid",
        alt: "Traditional bridal braid",
        image: "/images/hair/hai-25.jpg",
        objectPosition: "center 20%",
        title: "Heritage Braid",
        description:
          "A long, traditional braid accessorized with gold hairpieces.",
        tag: "Hair",
      },
    ],
  },
];
