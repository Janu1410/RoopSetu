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
  difficulty?: "Easy DIY" | "Intermediate" | "Pro Masterclass";
  estimatedTime?: string;
  savesCount?: string;
  kitPrice?: string;
  technique?: string;
  skinToneSuitability?: string;
  longevityTip?: string;
  keyTools?: string[];
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime?: string;
  articleStory?: ArticleStory;
  steps?: LookStep[];
  products?: LookProduct[];
};

export type LookCategory = {
  id: string;
  label: string;
  href: string;
  tagline: string;
  heroDescription?: string;
  items: LookItem[];
};

// Verified product kit collections with valid existing images in /images/products/
export const nailProductsKit: LookProduct[] = [
  {
    id: "p-opi-bubble",
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
    id: "p-beetles-top",
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
    id: "p-kodi-pearl",
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

export const makeupProductsKit: LookProduct[] = [
  {
    id: "p-hd-foundation",
    name: "Ultra-HD 24H Longwear Foundation",
    brand: "Estée Lauder / Pro Matte",
    price: "₹1,450",
    originalPrice: "₹1,800",
    rating: 4.9,
    reviewsCount: 4210,
    image: "/images/products/opi-v2.jpg",
    platform: "Nykaa",
    affiliateUrl: "https://www.nykaa.com",
    isHeroProduct: true,
  },
  {
    id: "p-gel-liner",
    name: "Waterproof Kohl & Gel Shadow Duo",
    brand: "Kodi Beauty / MAC",
    price: "₹899",
    originalPrice: "₹1,100",
    rating: 4.8,
    reviewsCount: 2150,
    image: "/images/products/kodi-v2.jpg",
    platform: "Amazon",
    affiliateUrl: "https://www.amazon.in",
  },
  {
    id: "p-glass-gloss",
    name: "Hydrating Peptide Lip Glaze & Cheek Tint",
    brand: "Beetles Luxe Glow",
    price: "₹650",
    originalPrice: "₹850",
    rating: 4.7,
    reviewsCount: 1320,
    image: "/images/products/beetles-v2.jpg",
    platform: "Tira",
    affiliateUrl: "https://www.amazon.in",
  },
];

export const hairProductsKit: LookProduct[] = [
  {
    id: "p-curling-wand",
    name: "Titanium Deep S-Wave Ceramic Styler",
    brand: "Alan Truman / Pro Hair",
    price: "₹1,899",
    originalPrice: "₹2,499",
    rating: 4.8,
    reviewsCount: 1670,
    image: "/images/products/opi.jpg",
    platform: "Amazon",
    affiliateUrl: "https://www.amazon.in",
    isHeroProduct: true,
  },
  {
    id: "p-shine-mist",
    name: "Keratin Glass Reflective Shine Mist",
    brand: "Moroccanoil Pro",
    price: "₹950",
    originalPrice: "₹1,200",
    rating: 4.9,
    reviewsCount: 980,
    image: "/images/products/beetles.jpg",
    platform: "Nykaa",
    affiliateUrl: "https://www.nykaa.com",
  },
  {
    id: "p-hair-hold",
    name: "Flexible Humidity-Shield Fixing Spray",
    brand: "Kodi Professional Hair",
    price: "₹599",
    originalPrice: "₹750",
    rating: 4.7,
    reviewsCount: 840,
    image: "/images/products/kodi.jpg",
    platform: "Amazon",
    affiliateUrl: "https://www.amazon.in",
  },
];

export const bridalProductsKit: LookProduct[] = [
  {
    id: "p-bridal-base",
    name: "Double Wear 24H Waterproof Foundation",
    brand: "Estée Lauder",
    price: "₹3,400",
    originalPrice: "₹3,800",
    rating: 4.9,
    reviewsCount: 5200,
    image: "/images/products/opi-v2.jpg",
    platform: "Nykaa",
    affiliateUrl: "https://www.nykaa.com",
    isHeroProduct: true,
  },
  {
    id: "p-bridal-powder",
    name: "Translucent Setting Powder",
    brand: "Laura Mercier",
    price: "₹2,100",
    originalPrice: "₹2,500",
    rating: 4.8,
    reviewsCount: 2300,
    image: "/images/products/kodi-v2.jpg",
    platform: "Tira",
    affiliateUrl: "https://www.amazon.in",
  },
  {
    id: "p-bridal-lip",
    name: "Matte Scarlet Velvet Lipstick",
    brand: "MAC Cosmetics",
    price: "₹1,750",
    originalPrice: "₹1,950",
    rating: 4.9,
    reviewsCount: 3100,
    image: "/images/products/beetles-v2.jpg",
    platform: "Nykaa",
    affiliateUrl: "https://www.nykaa.com",
  },
];

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
          "A high-shine iridescent pearl chrome glaze over a milky blush-pink gel base. The viral trend taking over weddings and everyday chic.",
        tag: "Chrome",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        savesCount: "148k saves",
        kitPrice: "₹1,898",
        author: {
          name: "Ananya Desai",
          role: "Senior Editorial Nail Curator",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "The Soft Pink Chrome — often called glazed donut nails with a warm festive twist — is our most requested manicure of the season.",
          whyViral:
            "It captures light at every angle without looking overly flashy. The secret is layering an ultra-fine pearl dust over a sheer milky blush.",
          skinToneTips:
            "For olive and warm Indian undertones, avoid pure white base polishes. Stick to peach-blush or warm petal-pink rubber bases.",
          mistakesToAvoid:
            "You must use a 100% NON-WIPE top coat and flash-cure it for exactly 30 seconds so it is warm and receptive for the chrome powder.",
        },
        steps: [
          {
            id: "01",
            title: "The Flawless Canvas Prep",
            description:
              "Push back cuticles gently, buff nail bed with 240-grit buffer, apply self-leveling rubber base, and dehydrate with alcohol.",
            image: "/images/nails/nai-1.jpg",
            time: "2 mins",
            proTip: "Dehydrating removes natural surface oils that cause lifting within 72 hours.",
          },
          {
            id: "02",
            title: "The Blush Base & Flash Cure",
            description:
              "Apply two sheer coats of soft baby pink gel polish. Cure each coat 60s under LED. Apply non-wipe top coat and flash cure 30s.",
            image: "/images/nails/nai-2.jpg",
            time: "60s LED",
            proTip: "Flash curing for 30s leaves the top coat warm so powder adheres mirror-smooth.",
          },
          {
            id: "03",
            title: "The Pearl Chrome Burnish & Seal",
            description:
              "Buff ultra-fine pearl powder across the nail using a silicone applicator. Cap free edges and lock with dual-layer top coat.",
            image: "/images/nails/nai-6.jpg",
            time: "60s Final",
            proTip: "Always cap free edges before the final cure so your chrome won't chip during daily tasks.",
          },
        ],
        products: nailProductsKit,
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
        estimatedTime: "20 mins",
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
        products: nailProductsKit,
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
        estimatedTime: "15 mins",
        savesCount: "115k saves",
        kitPrice: "₹1,299",
        products: nailProductsKit,
      },
      {
        id: "rose-quartz",
        alt: "Rose quartz nails",
        image: "/images/nails/nai-11.jpg",
        title: "Rose Quartz Crystal Nails",
        description:
          "Channel the crystal of love with semi-sheer blush marble veining and silver shimmer highlights.",
        tag: "Rose Quartz",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        savesCount: "86k saves",
        kitPrice: "₹1,580",
        products: nailProductsKit,
      },
      {
        id: "floral-nails",
        alt: "Floral nail art",
        image: "/images/nails/nai-6.jpg",
        title: "Hand-Painted Floral Art",
        description:
          "Intricate hand-painted springtime florals accented with subtle pearl beads and matte finish.",
        tag: "Floral",
        occasion: "Festive Garba",
        difficulty: "Pro Masterclass",
        estimatedTime: "30 mins",
        savesCount: "64k saves",
        kitPrice: "₹1,320",
        products: nailProductsKit,
      },
      {
        id: "glazed-nude",
        alt: "Milky glazed nude nails",
        image: "/images/nails/nai-1.jpg",
        title: "Milky Glazed Nude",
        description:
          "A clean, quiet luxury foundation with translucent nude jelly and mirror gloss shine.",
        tag: "Nude",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        estimatedTime: "15 mins",
        savesCount: "108k saves",
        kitPrice: "₹1,199",
        products: nailProductsKit,
      },
      {
        id: "gold-foil-accent",
        alt: "Rose gold foil accent nails",
        image: "/images/nails/nai-2.jpg",
        title: "Rose Gold Leaf Accents",
        description:
          "Warm peach base layered with handcrafted metallic foil leaf and sealed under builder gel.",
        tag: "Metallic",
        occasion: "Cocktail & Party",
        difficulty: "Easy DIY",
        estimatedTime: "20 mins",
        savesCount: "78k saves",
        kitPrice: "₹1,350",
        products: nailProductsKit,
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
          "A sultry, seamless gradient of matte espresso, warm bronze, and carbon black with fluttering silk lashes.",
        tag: "Smokey",
        occasion: "Cocktail & Party",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        savesCount: "210k saves",
        kitPrice: "₹2,150",
        products: makeupProductsKit,
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
        estimatedTime: "20 mins",
        savesCount: "135k saves",
        kitPrice: "₹1,850",
        products: makeupProductsKit,
      },
      {
        id: "fairy-makeup",
        alt: "Ethereal soft glam makeup",
        image: "/images/makeup/mak-19.jpg",
        title: "Ethereal Glass Glow",
        description:
          "Glass-skin illumination with champagne diamond lids and high-shine peptide lip glaze.",
        tag: "Dewy",
        occasion: "Festive Garba",
        difficulty: "Easy DIY",
        estimatedTime: "25 mins",
        savesCount: "98k saves",
        kitPrice: "₹1,650",
        products: makeupProductsKit,
      },
      {
        id: "bridal-makeup",
        alt: "Indian bridal makeup",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "Royal Heritage HD Bridal",
        description:
          "Sweat-proof 24H HD airbrush finish, kohl-rimmed regal eyes, and a classic velvet scarlet pout.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Pro Masterclass",
        estimatedTime: "60 mins",
        savesCount: "320k saves",
        kitPrice: "₹3,400",
        products: makeupProductsKit,
      },
      {
        id: "blush-saree",
        alt: "Blush bridal saree makeup",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "Blush Monochrome Glow",
        description:
          "Soft peach and rose monochrome tones designed to harmonize with pastel bridal lehengas.",
        tag: "Pastel",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        savesCount: "175k saves",
        kitPrice: "₹2,299",
        products: makeupProductsKit,
      },
      {
        id: "rose-glam",
        alt: "Rose petal bridal makeup",
        image: "/images/makeup/mak-13.jpg",
        objectPosition: "center 18%",
        title: "Dutch Rose Petal Glow",
        description:
          "Velvety flushed cheeks and blurred berry pout paired with radiant champagne lid shimmer.",
        tag: "Romantic",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        savesCount: "120k saves",
        kitPrice: "₹1,950",
        products: makeupProductsKit,
      },
      {
        id: "bronzed-glow",
        alt: "Sun-kissed bronze glam",
        image: "/images/makeup/mak-15.jpg",
        title: "Golden Hour Bronzed Glow",
        description:
          "Radiant terracotta sculpturing with warm gold metallic lid topper and caramel glazed pout.",
        tag: "Golden",
        occasion: "Cocktail & Party",
        difficulty: "Easy DIY",
        estimatedTime: "25 mins",
        savesCount: "110k saves",
        kitPrice: "₹1,750",
        products: makeupProductsKit,
      },
      {
        id: "winged-liner",
        alt: "Classic graphic winged eyeliner",
        image: "/images/makeup/mak-16.jpg",
        title: "Winged Graphic Statement",
        description:
          "Razor-sharp feline eyeliner with satin beige lid wash and fluttery outer-corner lashes.",
        tag: "Graphic",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        estimatedTime: "15 mins",
        savesCount: "94k saves",
        kitPrice: "₹1,250",
        products: makeupProductsKit,
      },
      {
        id: "berry-lip",
        alt: "Velvet berry lip makeup",
        image: "/images/makeup/mak-18.jpg",
        title: "Velvet Berry Cocktail Pout",
        description:
          "Deep plum stained lip bordered with chestnut liner, set against clean luminous skin.",
        tag: "Bold",
        occasion: "Cocktail & Party",
        difficulty: "Easy DIY",
        estimatedTime: "20 mins",
        savesCount: "82k saves",
        kitPrice: "₹1,450",
        products: makeupProductsKit,
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
        estimatedTime: "20 mins",
        savesCount: "128k saves",
        kitPrice: "₹1,499",
        products: hairProductsKit,
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
        estimatedTime: "25 mins",
        savesCount: "162k saves",
        kitPrice: "₹950",
        products: hairProductsKit,
      },
      {
        id: "long-hair",
        alt: "Elegant long hairstyle",
        image: "/images/hair/hai-26.jpg",
        title: "Sleek Glass Silk Straight",
        description:
          "Pin-straight strands treated with keratin shine mist for reflective liquid texture.",
        tag: "Straight",
        occasion: "Cocktail & Party",
        difficulty: "Easy DIY",
        estimatedTime: "20 mins",
        savesCount: "74k saves",
        kitPrice: "₹1,200",
        products: hairProductsKit,
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
        difficulty: "Pro Masterclass",
        estimatedTime: "35 mins",
        savesCount: "105k saves",
        kitPrice: "₹899",
        products: hairProductsKit,
      },
      {
        id: "half-up",
        alt: "Bridal half-up hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Romantic Sangeet Half-Up",
        description:
          "Twisted crown rolls flowing into cascading polished waves with concealed veil anchor combs.",
        tag: "Half-Up",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        savesCount: "190k saves",
        kitPrice: "₹1,150",
        products: hairProductsKit,
      },
      {
        id: "bubble-braid",
        alt: "Bubble ponytail hairstyle",
        image: "/images/hair/hai-24.jpg",
        title: "Modern Bubble Ponytail",
        description:
          "High ponytail divided into teased voluminous bubble segments with gold metallic ties.",
        tag: "Ponytail",
        occasion: "Festive Garba",
        difficulty: "Easy DIY",
        estimatedTime: "15 mins",
        savesCount: "88k saves",
        kitPrice: "₹750",
        products: hairProductsKit,
      },
      {
        id: "bridal-braid",
        alt: "Traditional bridal braid",
        image: "/images/hair/hai-25.jpg",
        objectPosition: "center 20%",
        title: "Heritage Royal Jada Braid",
        description:
          "Waist-length traditional braid studded with temple gold surya brooches and fresh fragrant Mogra.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Pro Masterclass",
        estimatedTime: "45 mins",
        savesCount: "195k saves",
        kitPrice: "₹1,650",
        products: hairProductsKit,
      },
      {
        id: "low-chignon",
        alt: "Low chignon bridal bun",
        image: "/images/hair/hai-28.jpg",
        title: "Low Architectural Chignon",
        description:
          "Clean horizontal bun nestled at the nape with concentric rings of fresh white jasmine blossoms.",
        tag: "Buns",
        occasion: "Bridal & Wedding",
        difficulty: "Pro Masterclass",
        estimatedTime: "30 mins",
        savesCount: "114k saves",
        kitPrice: "₹990",
        products: hairProductsKit,
      },
      {
        id: "retro-waves",
        alt: "Hollywood retro glam waves",
        image: "/images/hair/hai-29.jpg",
        title: "Vintage Hollywood S-Waves",
        description:
          "Structured side-parted waves creating a dramatic sculpted frame for evening wear.",
        tag: "Vintage",
        occasion: "Cocktail & Party",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        savesCount: "96k saves",
        kitPrice: "₹1,350",
        products: hairProductsKit,
      },
    ],
  },
  {
    id: "bridal",
    label: "Bridal & Festive",
    href: "/beauty-categories/bridal",
    tagline: "Dream wedding beauty — makeup, hair & jewellery harmony.",
    heroDescription:
      "Complete look coordination between complexion, hair styling, henna art, and wedding ensembles.",
    items: [
      {
        id: "royal-gujarat-bride",
        alt: "The Royal Gujarat Bride",
        image: "/images/hero/desktop/her-30.jpg",
        objectPosition: "center 18%",
        title: "The Royal Heritage Bride",
        description:
          "Grand heritage bridal styling. Velvet crimson zardozi, sweat-proof HD airbrush, and Mogra bun.",
        tag: "Heritage",
        occasion: "Bridal & Wedding",
        difficulty: "Pro Masterclass",
        estimatedTime: "90 mins",
        savesCount: "380k saves",
        kitPrice: "₹3,800",
        products: bridalProductsKit,
      },
      {
        id: "sangeet-reception-look",
        alt: "Sangeet reception ensemble",
        image: "/images/hero/desktop/her-31.jpg",
        title: "Modern Sangeet Glamour",
        description:
          "Contemporary reception beauty with champagne metallic shadow, glass skin, and loose cascades.",
        tag: "Sangeet",
        occasion: "Cocktail & Party",
        difficulty: "Intermediate",
        estimatedTime: "45 mins",
        savesCount: "220k saves",
        kitPrice: "₹2,400",
        products: bridalProductsKit,
      },
      {
        id: "pastel-lehenga-bride",
        alt: "Pastel lehenga bridal look",
        image: "/images/hero/desktop/her-32.jpg",
        title: "The Contemporary Pastel Bride",
        description:
          "Monochrome peach and rose complexion designed to complement pastel organza and tissue lehengas.",
        tag: "Pastel",
        occasion: "Bridal & Wedding",
        difficulty: "Pro Masterclass",
        estimatedTime: "60 mins",
        savesCount: "245k saves",
        kitPrice: "₹2,800",
        products: bridalProductsKit,
      },
      {
        id: "golden-zari-saree",
        alt: "Golden zari bridal saree",
        image: "/images/hero/desktop/her-33.jpg",
        title: "Golden Zari Silk Drape",
        description:
          "Authentic Kanjivaram and Gujarati seedha pallu drape paired with warm gold temple jewelry.",
        tag: "Saree",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        savesCount: "170k saves",
        kitPrice: "₹1,850",
        products: bridalProductsKit,
      },
      {
        id: "organza-festive-drape",
        alt: "Ivory organza festive drape",
        image: "/images/hero/desktop/her-34.jpg",
        title: "Ivory Organza Poise",
        description:
          "Lightweight organza saree with pearl waist belt and effortless brushed waves for daytime ceremonies.",
        tag: "Festive",
        occasion: "Festive Garba",
        difficulty: "Easy DIY",
        estimatedTime: "25 mins",
        savesCount: "130k saves",
        kitPrice: "₹1,450",
        products: bridalProductsKit,
      },
      {
        id: "sindoor-ceremony",
        alt: "Classic Sindoor Ceremony Look",
        image: "/images/hero/desktop/her-35.jpg",
        title: "Regal Pheras Ceremony",
        description:
          "Traditional ceremonial makeup with non-smudge crimson sindoor alignment and waterproof kohl.",
        tag: "Ceremony",
        occasion: "Bridal & Wedding",
        difficulty: "Pro Masterclass",
        estimatedTime: "60 mins",
        savesCount: "290k saves",
        kitPrice: "₹3,100",
        products: bridalProductsKit,
      },
      {
        id: "organic-henna-look",
        alt: "Organic Rajasthani Bridal Henna",
        image: "/images/hero/desktop/mehndi-generated.jpg",
        title: "Organic Rajasthani Henna",
        description:
          "Hyper-real shaded botanical roses and intricate lace cuffs using 100% natural Sojat henna.",
        tag: "Henna",
        occasion: "Bridal & Wedding",
        difficulty: "Pro Masterclass",
        estimatedTime: "75 mins",
        savesCount: "165k saves",
        kitPrice: "₹650",
        products: bridalProductsKit,
      },
    ],
  },
];

// Fallback resolver: returns rich human-written look data for any look
export function getLookWithFallbacks(look: LookItem, categoryId?: string): LookItem {
  const cat = categoryId || "nail-art";
  const defaultProducts =
    cat === "makeup" || cat === "bridal"
      ? makeupProductsKit
      : cat === "hairstyles"
      ? hairProductsKit
      : nailProductsKit;

  const defaultSteps: LookStep[] =
    cat === "makeup" || cat === "bridal"
      ? [
          {
            id: "01",
            title: "Skin Canvas Prep & Correction",
            description:
              "Hydrate with barrier cream, apply peach corrector to shadows, and buff 24H foundation in micro-layers.",
            image: "/images/makeup/mak-17.jpg",
            time: "10 mins",
            proTip: "A well-prepped canvas prevents cakiness under bright event lighting.",
          },
          {
            id: "02",
            title: "Smokey Dimension & Lash Architecture",
            description:
              "Blend warm transition shades, smudge waterproof gel liner, and apply lightweight wispy lashes.",
            image: "/images/makeup/mak-20.jpg",
            time: "15 mins",
            proTip: "Angle outer shadow upward to naturally lift eyes.",
          },
          {
            id: "03",
            title: "High-Shine Glaze & Setting Mist",
            description:
              "Line lips with warm chestnut liner, apply satin lipstick, and lock with double setting spray.",
            image: "/images/makeup/mak-14.jpg",
            time: "5 mins",
          },
        ]
      : cat === "hairstyles"
      ? [
          {
            id: "01",
            title: "Texture Prep & Heat Shield",
            description:
              "Mist dry hair with thermal protectant and puff volumizing powder into roots for structure.",
            image: "/images/hair/hai-22.jpg",
            time: "5 mins",
          },
          {
            id: "02",
            title: "Sculpted Waves or Weave",
            description:
              "Wrap uniform sections around titanium wand or weave textured fishtail plait with flexible grip.",
            image: "/images/hair/hai-26.jpg",
            time: "15 mins",
          },
          {
            id: "03",
            title: "Gloss Finish & Flora Pinning",
            description:
              "Run boar bristle brush through curls and anchor fresh flowers or jeweled pins with matte U-pins.",
            image: "/images/hair/hai-23.jpg",
            time: "5 mins",
          },
        ]
      : [
          {
            id: "01",
            title: "Canvas Dehydration & Prep",
            description:
              "Gently buff nail plate with 240-grit buffer, dehydrate with alcohol, and apply self-leveling rubber base.",
            image: "/images/nails/nai-1.jpg",
            time: "5 mins",
            proTip: "Dehydrating prevents edge lifting for up to 3 weeks.",
          },
          {
            id: "02",
            title: "Core Color & Flash Cure",
            description:
              "Apply two sheer coats of gel polish. Cure 60s under LED, then apply non-wipe top coat and flash cure 30s.",
            image: "/images/nails/nai-2.jpg",
            time: "60s LED",
          },
          {
            id: "03",
            title: "Chrome Burnish & Edge Lock",
            description:
              "Buff ultra-fine reflective pigment powder with silicone applicator and seal edges with non-wipe top coat.",
            image: "/images/nails/nai-6.jpg",
            time: "60s LED",
          },
        ];

  return {
    ...look,
    technique:
      look.technique ||
      (cat === "nail-art"
        ? "2-Coat Milky Sheer with 30s Flash-Cured Mirror Pearl Glaze"
        : cat === "makeup"
        ? "Micro-Layered 24H HD Matte Base with Smudged Velvet Contour"
        : cat === "hairstyles"
        ? "Ceramic S-Wave Sculpting with Anti-Humidity Hold"
        : "Royal Heritage Coordination: Complexion, Saree Drape & Henna"),
    skinToneSuitability:
      look.skinToneSuitability ||
      (cat === "nail-art"
        ? "Flattering for warm, golden and olive undertones — peach undertone prevents ashy cast"
        : cat === "makeup"
        ? "Warm terracotta and gold undertones tailored for South Asian event lighting"
        : cat === "hairstyles"
        ? "Face-framing curtain tendrils structured for all face shapes"
        : "Engineered for 4K video photography and high-heat indoor/outdoor celebrations"),
    longevityTip:
      look.longevityTip ||
      (cat === "nail-art"
        ? "Cap free edges and seal with dual-layer non-wipe top coat for 3-week retention"
        : cat === "makeup"
        ? "Lock T-zone with micro-fine silica powder and setting mist for zero flashback"
        : cat === "hairstyles"
        ? "Puff root-volumizing powder before pinning for all-day grip"
        : "Apply barrier primer 20 mins prior to foundation to resist sweat and humidity"),
    keyTools:
      look.keyTools ||
      (cat === "nail-art"
        ? ["240-Grit Buffer", "Silicone Applicator", "48W LED Lamp", "Fan Brush"]
        : cat === "makeup"
        ? ["Damp Beauty Sponge", "Angled Contour Brush", "Fine Felt-Tip Liner", "Fluffy Blending Brush"]
        : cat === "hairstyles"
        ? ["Titanium Deep Wave Wand", "Boar-Bristle Brush", "Sectioning Clips", "Matte U-Pins"]
        : ["Airbrush Compressor / HD Puff", "Veil Anchor Combs", "Jewelry Tape", "Sojat Henna Applicator"]),
    author: look.author || {
      name: "RoopSetu Beauty Editorial",
      role: "RoopSetu Beauty Editorial Desk",
    },
    readTime: look.readTime || "3 min read",
    estimatedTime: look.estimatedTime || "25 mins",
    savesCount: look.savesCount || "95k saves",
    kitPrice: look.kitPrice || "₹1,499",
    articleStory: look.articleStory || {
      intro: `Curated directly from our beauty community, the "${look.title || look.alt}" has become a sensation for modern celebrations.`,
      whyViral:
        "Its balanced aesthetics pair seamlessly with both contemporary outfits and traditional bridal lehengas, catching light effortlessly in photography.",
      skinToneTips:
        "Engineered to flatter warm, golden, and olive South Asian complexions with rich, harmonious undertones.",
      mistakesToAvoid:
        "Take time on the initial prep and canvas steps. Rushing the base layer is the #1 reason looks lose their longevity.",
    },
    steps: look.steps && look.steps.length > 0 ? look.steps : defaultSteps,
    products: look.products && look.products.length > 0 ? look.products : defaultProducts,
  };
}

// Helper: Flatten all 32 looks into a single searchable array
export function getAllBeautyLooks(): (LookItem & { categoryId: string; categoryLabel: string })[] {
  return beautyCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...getLookWithFallbacks(item, cat.id),
      categoryId: cat.id,
      categoryLabel: cat.label,
    }))
  );
}
