export type LookProduct = {
  id: string;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewsCount?: number;
  image: string;
  platform: "Amazon" | "Nykaa" | "Tira";
  affiliateUrl: string;
  isHeroProduct?: boolean;
};

export type LookStep = {
  id: string;
  title: string;
  description: string;
  image: string;
  time?: string;
  proTip?: string;
};

export type LookArtist = {
  name: string;
  city: string;
  rating: number;
  reviews: number;
  speciality: string;
  whatsappNumber: string;
  experience?: string;
};

export type ArticleStory = {
  intro: string;
  whyViral: string;
  skinToneTips: string;
  mistakesToAvoid: string;
};

export type LookItem = {
  id: string;
  image: string;
  alt: string;
  objectPosition?: string;
  title?: string;
  description?: string;
  tag?: string; // single tag for filtering (e.g., "Chrome", "French")
  occasion?: string; // e.g. "Bridal & Wedding", "Festive Garba", "Everyday Chic", "Cocktail & Party"
  difficulty?: "Easy DIY" | "Intermediate" | "Pro / Salon";
  estimatedTime?: string;
  savesCount?: string;
  kitPrice?: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime?: string;
  articleStory?: ArticleStory;
  steps?: LookStep[];
  products?: LookProduct[];
  artistRecommendation?: LookArtist;
};

export type LookCategory = {
  id: string;
  label: string;
  href: string;
  tagline: string;
  heroDescription?: string;
  items: LookItem[];
};

// Common affiliate products kit for nail art
const defaultNailProducts: LookProduct[] = [
  {
    id: "p-opi",
    name: "Bubble Bath Sheer Gel Polish",
    brand: "O.P.I Professional",
    price: "₹850",
    originalPrice: "₹950",
    rating: 4.8,
    reviewsCount: 3120,
    image: "/images/products/opi.jpg",
    platform: "Nykaa",
    affiliateUrl: "https://www.nykaa.com",
    isHeroProduct: true,
  },
  {
    id: "p-beetles",
    name: "Mirror Gloss No-Wipe Gel Top Coat",
    brand: "Beetles Gel Polish",
    price: "₹599",
    originalPrice: "₹799",
    rating: 4.7,
    reviewsCount: 1840,
    image: "/images/products/beetles.jpg",
    platform: "Amazon",
    affiliateUrl: "https://www.amazon.in",
  },
  {
    id: "p-kodi",
    name: "Ultra-Fine Pearl Glaze Chrome Powder",
    brand: "Kodi Professional",
    price: "₹449",
    originalPrice: "₹550",
    rating: 4.9,
    reviewsCount: 940,
    image: "/images/products/kodi.jpg",
    platform: "Amazon",
    affiliateUrl: "https://www.amazon.in",
  },
];

const defaultArtist: LookArtist = {
  name: "Priya Sharma",
  city: "Ahmedabad & Surat",
  rating: 4.9,
  reviews: 142,
  speciality: "Bridal & Editorial Gel Specialist",
  whatsappNumber: "919876543210",
};

export const beautyCategories: LookCategory[] = [
  {
    id: "nail-art",
    label: "Nail Art",
    href: "/beauty-categories/nail-art",
    tagline: "Sophisticated manicures, micro-french tips & chrome glazes.",
    heroDescription:
      "Discover curated nail design ideas from subtle everyday elegance to bold statement chrome art.",
    items: [
      {
        id: "pink-chrome",
        alt: "Pink chrome nail art",
        image: "/images/nails/nai-10.jpg",
        title: "Soft Pink Chrome Finish",
        description:
          "A high-shine iridescent chrome glaze over a milky blush-pink gel base. The viral Pinterest trend.",
        tag: "Chrome",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        savesCount: "148k saves",
        kitPrice: "₹1,898",
        steps: [
          {
            id: "01",
            title: "The Flawless Canvas",
            description:
              "Push back cuticles gently, buff the nail bed with a 240-grit buffer, and apply self-leveling rubber base.",
            image: "/images/nails/nai-1.jpg",
            time: "2 mins",
            proTip: "Dehydrate nail surface with 99% isopropyl alcohol for 3-week retention.",
          },
          {
            id: "02",
            title: "The Blush Base",
            description:
              "Apply two sheer coats of soft baby pink gel polish. Cure each coat for 60s, then apply non-wipe top coat.",
            image: "/images/nails/nai-2.jpg",
            time: "60s LED",
            proTip: "Flash cure top coat for 30s instead of 60s so powder adheres mirror-smooth.",
          },
          {
            id: "03",
            title: "The Magic Glaze",
            description:
              "Rub ultra-fine pearl chrome dust firmly using a silicone applicator until reflection becomes seamless.",
            image: "/images/nails/nai-6.jpg",
            time: "60s Final",
            proTip: "Cap free edges and seal with double coat of gel builder.",
          },
        ],
        products: defaultNailProducts,
        artistRecommendation: defaultArtist,
      },
      {
        id: "lavender-marble",
        alt: "Lavender marble nail art",
        image: "/images/nails/nai-8.jpg",
        title: "Lavender Marble Swirls",
        description:
          "Delicate lilac watercolor veins swirled across an opaque milky base with gold leaf flakes.",
        tag: "Marble",
        occasion: "Cocktail & Party",
        difficulty: "Easy DIY",
        savesCount: "92k saves",
        kitPrice: "₹1,450",
        steps: [
          {
            id: "01",
            title: "Milky Cloud Base",
            description: "Apply two coats of semi-translucent milky white gel polish.",
            image: "/images/nails/nai-8.jpg",
            time: "5 mins",
          },
          {
            id: "02",
            title: "Blooming Veins",
            description: "Layer clear blooming gel and drop lilac ink into delicate swirling ribbons.",
            image: "/images/nails/nai-7.jpg",
            time: "3 mins",
          },
        ],
        products: defaultNailProducts,
        artistRecommendation: defaultArtist,
      },
      {
        id: "french-tips",
        alt: "Minimal French tip nails",
        image: "/images/nails/nai-7.jpg",
        title: "Minimal French Micro-Tips",
        description:
          "Ultra-thin white smile lines crafted on a natural sheer pink nail bed for timeless luxury.",
        tag: "French",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        savesCount: "115k saves",
        kitPrice: "₹1,299",
        products: defaultNailProducts,
        artistRecommendation: defaultArtist,
      },
      {
        id: "rose-quartz",
        alt: "Rose quartz nails",
        image: "/images/nails/nai-11.jpg",
        title: "Rose Quartz Elegance",
        description:
          "Channel the crystal of love with these semi-sheer pink marble nails and silver shimmer highlights.",
        tag: "Rose Quartz",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        savesCount: "86k saves",
        kitPrice: "₹1,580",
        products: defaultNailProducts,
        artistRecommendation: defaultArtist,
      },
      {
        id: "floral-nails",
        alt: "Floral nail art",
        image: "/images/nails/nai-6.jpg",
        title: "Delicate Floral Art",
        description:
          "Intricate hand-painted springtime florals accented with subtle pearl beads and matte finish.",
        tag: "Floral",
        occasion: "Festive Garba",
        difficulty: "Pro / Salon",
        savesCount: "64k saves",
        kitPrice: "₹1,320",
        products: defaultNailProducts,
        artistRecommendation: defaultArtist,
      },
    ],
  },
  {
    id: "makeup",
    label: "Makeup",
    href: "/beauty-categories/makeup",
    tagline: "Smokey glam, soft dewy looks & bridal beauty.",
    heroDescription:
      "Explore our collection of makeup inspirations ranging from soft everyday latte glam to royal HD bridal looks.",
    items: [
      {
        id: "smokey-eyes",
        alt: "Smokey eye makeup",
        image: "/images/makeup/mak-20.jpg",
        objectPosition: "center 20%",
        title: "Classic Smokey Glam",
        description:
          "A sultry, seamless gradient of matte espresso and carbon black with fluttering silk lashes.",
        tag: "Smokey",
        occasion: "Cocktail & Party",
        difficulty: "Intermediate",
        savesCount: "210k saves",
        kitPrice: "₹2,150",
        steps: [
          {
            id: "01",
            title: "Warm Transition Base",
            description: "Blend a warm terracotta matte shadow across crease with a fluffy dome brush.",
            image: "/images/makeup/mak-17.jpg",
            proTip: "Keep transition diffuse to avoid harsh edges under bright cocktail lighting.",
          },
          {
            id: "02",
            title: "Gel Liner Smudge",
            description: "Apply waterproof gel liner along the lash line and buff out with a dense pencil brush.",
            image: "/images/makeup/mak-20.jpg",
          },
        ],
        artistRecommendation: {
          name: "Ananya Dave",
          city: "Ahmedabad (Bodakdev)",
          rating: 4.95,
          reviews: 210,
          speciality: "Celebrity & Sangeet Makeup",
          whatsappNumber: "919876543210",
        },
      },
      {
        id: "espresso-glam",
        alt: "Espresso soft glam makeup",
        image: "/images/makeup/mak-17.jpg",
        title: "Espresso Soft Glam",
        description:
          "Warm cocoa monochromatic tones with a sculptured bronze contour and velvet nude lip.",
        tag: "Soft Glam",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        savesCount: "135k saves",
        kitPrice: "₹1,850",
        artistRecommendation: {
          name: "Ananya Dave",
          city: "Ahmedabad",
          rating: 4.95,
          reviews: 210,
          speciality: "Celebrity & Sangeet Makeup",
          whatsappNumber: "919876543210",
        },
      },
      {
        id: "fairy-makeup",
        alt: "Ethereal soft glam makeup",
        image: "/images/makeup/mak-19.jpg",
        title: "Ethereal Fairy Glam",
        description:
          "Glass-skin illumination with champagne diamond lids and high-shine peptide lip glaze.",
        tag: "Soft Glam",
        occasion: "Festive Garba",
        difficulty: "Easy DIY",
        savesCount: "98k saves",
        kitPrice: "₹1,650",
        artistRecommendation: {
          name: "Riddhi Shah",
          city: "Surat (Vesu)",
          rating: 4.88,
          reviews: 95,
          speciality: "Glass Skin & Dewy Looks",
          whatsappNumber: "919876543210",
        },
      },
      {
        id: "bridal-makeup",
        alt: "Indian bridal makeup",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "Royal Heritage Bridal",
        description:
          "Sweat-proof HD airbrush finish, kohl-rimmed regal eyes, and a classic velvet scarlet pout.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "320k saves",
        kitPrice: "₹3,400",
        artistRecommendation: {
          name: "Meera Trivedi",
          city: "Ahmedabad & Vadodara",
          rating: 5.0,
          reviews: 340,
          speciality: "Master Gujarati & Marwari Bridal",
          whatsappNumber: "919876543210",
        },
      },
      {
        id: "blush-saree",
        alt: "Blush bridal saree makeup",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "Blush Monochrome Glow",
        description:
          "Soft peach and rose monochrome tones designed to harmonise with pastel bridal lehengas.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        savesCount: "175k saves",
        kitPrice: "₹2,299",
        artistRecommendation: {
          name: "Meera Trivedi",
          city: "Ahmedabad",
          rating: 5.0,
          reviews: 340,
          speciality: "Master Gujarati & Marwari Bridal",
          whatsappNumber: "919876543210",
        },
      },
    ],
  },
  {
    id: "hairstyles",
    label: "Hairstyles",
    href: "/beauty-categories/hairstyles",
    tagline: "Effortless waves, elegant updos & bridal braids.",
    heroDescription:
      "Find your next signature hairstyle, from messy beach waves to intricate pearl-woven bridal braids.",
    items: [
      {
        id: "easy-waves",
        alt: "Easy waves hairstyle",
        image: "/images/hair/hai-22.jpg",
        title: "Old Money Brushed Waves",
        description:
          "Voluminous, glossy S-curls with mirror shine and flexible 24-hour hold.",
        tag: "Waves",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        savesCount: "128k saves",
        kitPrice: "₹1,499",
      },
      {
        id: "braided-style",
        alt: "Soft braided hairstyle",
        image: "/images/hair/hai-21.jpg",
        title: "Soft Textured Boho Braid",
        description:
          "A dimensional fishtail braid adorned with baby's breath and face-framing tendrils.",
        tag: "Braids",
        occasion: "Festive Garba",
        difficulty: "Intermediate",
        savesCount: "162k saves",
        kitPrice: "₹950",
      },
      {
        id: "long-hair",
        alt: "Elegant long hairstyle",
        image: "/images/hair/hai-26.jpg",
        title: "Sleek Glass Silk",
        description:
          "Pin-straight strands treated with keratin shine mist for reflective liquid texture.",
        tag: "Straight",
        occasion: "Cocktail & Party",
        difficulty: "Easy DIY",
        savesCount: "74k saves",
        kitPrice: "₹1,200",
      },
      {
        id: "party-updo",
        alt: "Party updo hairstyle",
        image: "/images/hair/hai-27.jpg",
        title: "Voluminous Red Carpet Updo",
        description:
          "A sculpted textured chignon with crown lift, designed to stay intact through hours of dancing.",
        tag: "Updos",
        occasion: "Cocktail & Party",
        difficulty: "Pro / Salon",
        savesCount: "105k saves",
        kitPrice: "₹899",
      },
      {
        id: "half-up",
        alt: "Bridal half-up hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Romantic Bridal Half-Up",
        description:
          "Twisted crown rolls flowing into cascading polished waves with concealed veil anchor combs.",
        tag: "Half-Up",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        savesCount: "190k saves",
        kitPrice: "₹1,150",
      },
    ],
  },
  {
    id: "fashion",
    label: "Fashion & Drapes",
    href: "/beauty-categories/fashion",
    tagline: "Traditional silhouettes, saree drapes & festive styling.",
    heroDescription:
      "Curated draping techniques and wardrobe color-matching palettes for weddings, Garba nights, and celebrations.",
    items: [
      {
        id: "blush-saree-fashion",
        alt: "Blush bridal saree fashion",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "Pastel Tissue Saree Drape",
        description:
          "A modern Gujarati seedha pallu draped in translucent tissue silk with pearl belt detailing.",
        tag: "Saree",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        savesCount: "140k saves",
      },
      {
        id: "bridal-style",
        alt: "Bridal fashion look",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "Heritage Velvet Ensemble",
        description:
          "Crimson zardozi work paired with dual dupattas for ceremonial grandeur and lightweight mobility.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "280k saves",
      },
      {
        id: "rose-bun-fashion",
        alt: "Rose bridal bun look",
        image: "/images/makeup/mak-13.jpg",
        objectPosition: "center 18%",
        title: "Dutch Gajra Bun Styling",
        description:
          "Concentric circles of fresh jasmine and crimson Dutch roses encasing an architectural bridal bun.",
        tag: "Accessories",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "115k saves",
      },
      {
        id: "soft-glam-fashion",
        alt: "Soft glam fashion look",
        image: "/images/makeup/mak-17.jpg",
        title: "Minimalist Linen Silhouette",
        description:
          "Subtle earth tones and relaxed drapery for intimate mehendi luncheons and modern poojas.",
        tag: "Minimalist",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        savesCount: "82k saves",
      },
      {
        id: "half-up-fashion",
        alt: "Elegant celebration hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Garba Night Fusion Drape",
        description:
          "Lightweight flared lehenga skirt with secure pin-free pleats engineered for energetic rotation.",
        tag: "Festive",
        occasion: "Festive Garba",
        difficulty: "Intermediate",
        savesCount: "95k saves",
      },
    ],
  },
  {
    id: "mehndi",
    label: "Mehndi",
    href: "/beauty-categories/mehndi",
    tagline: "Intricate patterns, organic dark stains & bridal motifs.",
    heroDescription:
      "Explore stunning henna designs ranging from minimalist finger jewelry to full heirloom bridal storytelling.",
    items: [
      {
        id: "floral-pattern",
        alt: "Floral pattern inspiration",
        image: "/images/nails/nai-6.jpg",
        title: "Organic Floral Vines",
        description:
          "Free-flowing Arabic vines with shaded rose petals and delicate lattice fingertips.",
        tag: "Floral",
        occasion: "Festive Garba",
        difficulty: "Intermediate",
        savesCount: "134k saves",
      },
      {
        id: "rose-pattern",
        alt: "Rose detail inspiration",
        image: "/images/nails/nai-11.jpg",
        title: "Hyper-Real Rose Henna",
        description:
          "Sculpted shaded botanical roses using 100% natural Rajasthani henna for deep mahogany stains.",
        tag: "Rose",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "155k saves",
      },
      {
        id: "marble-pattern",
        alt: "Marble pattern inspiration",
        image: "/images/nails/nai-8.jpg",
        title: "Geometric Mandala Central",
        description:
          "Hypnotic concentric mandala centered on the palm with lace cuffs along the wrist.",
        tag: "Modern",
        occasion: "Cocktail & Party",
        difficulty: "Intermediate",
        savesCount: "98k saves",
      },
      {
        id: "blush-pattern",
        alt: "Blush floral detail",
        image: "/images/nails/nai-2.jpg",
        title: "Minimalist Jewelry Henna",
        description:
          "Dainty haathphool imitation lines with micro-pearl dots. Perfect for bridesmaid chic.",
        tag: "Minimalist",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        savesCount: "112k saves",
      },
      {
        id: "french-pattern",
        alt: "Fine line detail inspiration",
        image: "/images/nails/nai-7.jpg",
        title: "Architectural Jali Work",
        description:
          "Razor-sharp symmetry, Mughal arch cutouts, and miniature bird motifs for heritage brides.",
        tag: "Geometric",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "178k saves",
      },
    ],
  },
  {
    id: "bridal",
    label: "Bridal Edition",
    href: "/beauty-categories/bridal",
    tagline: "Dream wedding beauty — makeup, hair & jewellery harmony.",
    heroDescription:
      "Everything a bride needs for the big day. Complete look coordination between complexion, hair, and jewels.",
    items: [
      {
        id: "bridal-face",
        alt: "Bridal beauty inspiration",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "The Regal Royal Bride",
        description:
          "Flawless waterproof airbrushing, sculpted cheekbones, deep ruby lips, and heritage kundan framing.",
        tag: "Makeup",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "340k saves",
        steps: [
          {
            id: "01",
            title: "Skin Hydration & Seal",
            description: "Deep hyaluronic acid treatment topped with water-resistant grip primer.",
            image: "/images/makeup/mak-15.jpg",
          },
          {
            id: "02",
            title: "Regal Kohl Eyes",
            description: "Smudged kajal locked with matte brown shadow and individual cluster lashes.",
            image: "/images/makeup/mak-20.jpg",
          },
        ],
        artistRecommendation: {
          name: "Meera Trivedi",
          city: "Ahmedabad & Surat",
          rating: 5.0,
          reviews: 340,
          speciality: "Master Gujarati & Marwari Bridal",
          whatsappNumber: "919876543210",
        },
      },
      {
        id: "bridal-saree",
        alt: "Bridal saree inspiration",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "The Contemporary Pastel Bride",
        description:
          "Ivory and blush monochrome styling with dewdrop skin and diamond emerald accents.",
        tag: "Fashion",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "220k saves",
        artistRecommendation: {
          name: "Ananya Dave",
          city: "Ahmedabad",
          rating: 4.95,
          reviews: 210,
          speciality: "Celebrity & Sangeet Makeup",
          whatsappNumber: "919876543210",
        },
      },
      {
        id: "bridal-bun-look",
        alt: "Rose bridal bun hairstyle",
        image: "/images/makeup/mak-13.jpg",
        objectPosition: "center 18%",
        title: "Architectural Gajra Bun",
        description:
          "Structural low chignon wrapped in concentric strings of fresh Madurai mogra blossoms.",
        tag: "Hair",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "185k saves",
      },
      {
        id: "bridal-half-up",
        alt: "Half-up bridal hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Romantic Sangeet Cascades",
        description:
          "Softly pinned crown curls with baby pearl pins designed for high-energy dance performances.",
        tag: "Hair",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        savesCount: "160k saves",
      },
      {
        id: "bridal-braid",
        alt: "Traditional bridal braid",
        image: "/images/hair/hai-25.jpg",
        objectPosition: "center 20%",
        title: "Heritage Jada Braid",
        description:
          "Waist-length traditional south-meets-west braid studded with temple gold surya and chandra brooches.",
        tag: "Hair",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        savesCount: "195k saves",
      },
    ],
  },
];

// Helper: Flatten all 30 looks into a single searchable array
export function getAllBeautyLooks(): (LookItem & { categoryId: string; categoryLabel: string })[] {
  return beautyCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryId: cat.id,
      categoryLabel: cat.label,
    }))
  );
}
