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

export const mehndiProductsKit: LookProduct[] = [
  {
    id: "p-henna-cones",
    name: "100% Pure Organic Sojat Henna Cones (Pack of 4)",
    brand: "RoopSetu Certified Natural",
    price: "₹299",
    originalPrice: "₹399",
    rating: 4.9,
    reviewsCount: 3410,
    image: "/images/products/beetles.jpg",
    platform: "Amazon",
    affiliateUrl: "https://www.amazon.in",
    isHeroProduct: true,
  },
  {
    id: "p-stain-oil",
    name: "Mahogany Dark Stain Nilgiri & Clove Oil",
    brand: "Herbal Essence Care",
    price: "₹249",
    originalPrice: "₹350",
    rating: 4.8,
    reviewsCount: 1120,
    image: "/images/products/kodi.jpg",
    platform: "Amazon",
    affiliateUrl: "https://www.amazon.in",
  },
  {
    id: "p-seal-spray",
    name: "Botanical Lemon-Sugar Henna Fixing Mist",
    brand: "RoopSetu Craft",
    price: "₹199",
    originalPrice: "₹299",
    rating: 4.7,
    reviewsCount: 780,
    image: "/images/products/opi.jpg",
    platform: "Nykaa",
    affiliateUrl: "https://www.nykaa.com",
  },
];

// Verified Artists
export const defaultNailArtist: LookArtist = {
  name: "Priya Sharma",
  city: "Ahmedabad & Surat",
  rating: 4.95,
  reviews: 142,
  speciality: "Senior Bridal & Editorial Gel Specialist",
  whatsappNumber: "919876543210",
  experience: "8+ Years • 1,200+ Sets Created",
};

export const defaultMakeupArtist: LookArtist = {
  name: "Meera Trivedi",
  city: "Ahmedabad (Bodakdev & Prahlad Nagar)",
  rating: 5.0,
  reviews: 340,
  speciality: "Master Gujarati Bridal & HD Airbrush",
  whatsappNumber: "919876543210",
  experience: "11+ Years • Bollywood & Royal Weddings",
};

export const defaultHairArtist: LookArtist = {
  name: "Kavita Patel",
  city: "Surat (Vesu & City Light)",
  rating: 4.9,
  reviews: 185,
  speciality: "Textured Braids & Red Carpet Updos",
  whatsappNumber: "919876543210",
  experience: "7+ Years • Bridal Hair Collective",
};

export const defaultMehndiArtist: LookArtist = {
  name: "Riddhi Shah",
  city: "Ahmedabad & Surat",
  rating: 4.92,
  reviews: 215,
  speciality: "Organic Rajasthani Botanical Bridal Henna",
  whatsappNumber: "919876543210",
  experience: "9+ Years • 500+ Heritage Brides",
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
          "A high-shine iridescent pearl chrome glaze over a milky blush-pink gel base. The viral Pinterest trend taking over weddings and everyday chic.",
        tag: "Chrome",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        savesCount: "148,000+ saves",
        kitPrice: "₹1,898",
        author: {
          name: "Ananya Desai",
          role: "Senior Editorial Nail Stylist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "If your Pinterest feed looks anything like ours, you've seen this exact manicure everywhere. The Soft Pink Chrome — often called 'glazed donut nails' with a warm Indian wedding twist — has generated over 148,000 saves on our board alone.",
          whyViral:
            "It captures light at every angle without looking overly flashy. The secret is layering an ultra-fine pearl dust over a sheer milky blush, giving fingertips an elongated, manicured look that pairs seamlessly with diamond rings and pastel lehengas.",
          skinToneTips:
            "For olive and warm Indian undertones, avoid pure white base polishes which can look chalky. Stick to peach-blush or warm petal-pink rubber bases like O.P.I Bubble Bath to let the warmth of your skin shine through.",
          mistakesToAvoid:
            "The #1 mistake people make at home is wiping the top coat before rubbing the chrome dust. You must use a 100% NON-WIPE top coat and flash-cure it for exactly 30 seconds so it's still warm and tacky for the powder.",
        },
        steps: [
          {
            id: "01",
            title: "The Flawless Canvas Prep",
            description:
              "Push back cuticles gently using a wooden stick, buff the nail bed with a 240-grit buffer, and apply self-leveling rubber base. Dehydrate thoroughly with 99% isopropyl alcohol.",
            image: "/images/nails/nai-1.jpg",
            time: "5 mins",
            proTip: "Dehydrating the nail surface eliminates invisible natural oils that cause gel peeling within 3 days.",
          },
          {
            id: "02",
            title: "The Milky Blush Base & Flash Cure",
            description:
              "Apply two ultra-sheer coats of soft petal pink gel polish. Cure each coat for 60s under LED. Apply a non-wipe glossy top coat and flash cure for exactly 30s.",
            image: "/images/nails/nai-2.jpg",
            time: "60s LED",
            proTip: "Flash curing for only 30s keeps the top coat slightly warm, allowing chrome dust to adhere without any patchy streaks.",
          },
          {
            id: "03",
            title: "The Pearl Chrome Burnish & Seal",
            description:
              "Dip a silicone applicator into the ultra-fine pearl powder and firmly buff across the nail surface until it turns into a liquid mirror. Seal edges with a final 60s top coat.",
            image: "/images/nails/nai-6.jpg",
            time: "60s Final Lock",
            proTip: "Always cap the free edge with the brush tip before the final cure so your chrome won't chip during daily tasks.",
          },
        ],
        products: nailProductsKit,
        artistRecommendation: defaultNailArtist,
      },
      {
        id: "lavender-marble",
        alt: "Lavender marble nail art",
        image: "/images/nails/nai-8.jpg",
        title: "Lavender Marble Swirls",
        description:
          "Delicate lilac watercolor veins swirled across an opaque milky base with gold leaf flakes. Designed for festive celebrations and modern cocktail evenings.",
        tag: "Marble",
        occasion: "Cocktail & Party",
        difficulty: "Easy DIY",
        estimatedTime: "20 mins",
        savesCount: "92,000+ saves",
        kitPrice: "₹1,450",
        author: {
          name: "Ananya Desai",
          role: "Senior Editorial Nail Stylist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Marble nails used to require hours at high-end salons, but the blooming gel revolution has made this fluid watercolor technique accessible at home. This lavender and gold leaf pairing went viral for Sangeet season.",
          whyViral:
            "Every single nail turns out uniquely organic. The blooming gel allows lilac ink to spread gently like smoke on water, creating depth without harsh brush strokes.",
          skinToneTips:
            "Lilac looks stunning against dusky and golden skin tones when accented with warm 24k gold leaf flakes instead of cool silver foil.",
          mistakesToAvoid:
            "Don't wait too long after dropping your ink onto the blooming gel; cure it within 15-20 seconds to prevent the veins from bleeding into a solid blob.",
        },
        steps: [
          {
            id: "01",
            title: "Milky Cloud Base",
            description:
              "Apply two smooth coats of semi-translucent milky white gel polish. Cure each coat 60 seconds under LED.",
            image: "/images/nails/nai-8.jpg",
            time: "5 mins",
            proTip: "A milky semi-sheer base creates 3D depth underneath the marble layers.",
          },
          {
            id: "02",
            title: "Blooming Veins & Gold Leaf",
            description:
              "Brush on clear blooming gel without curing. Use a fine detail liner brush to float lilac ink ribbons across the nail, then tap mini gold leaf flakes onto the wet surface.",
            image: "/images/nails/nai-7.jpg",
            time: "3 mins",
            proTip: "Twirl your brush gently in a figure-8 motion to create authentic geological marble veins.",
          },
          {
            id: "03",
            title: "Glass High-Gloss Lock",
            description:
              "Cap all edges with a thick builder gel layer to level the gold leaf flakes smooth, followed by a non-wipe diamond top coat.",
            image: "/images/nails/nai-1.jpg",
            time: "60s LED",
            proTip: "Run your finger over the nail before curing; if you feel foil texture, add another dab of clear gel.",
          },
        ],
        products: nailProductsKit,
        artistRecommendation: defaultNailArtist,
      },
      {
        id: "french-tips",
        alt: "Minimal French tip nails",
        image: "/images/nails/nai-7.jpg",
        title: "Minimal French Micro-Tips",
        description:
          "Ultra-thin white smile lines crafted on a natural sheer nude-pink nail bed. The quintessential 'clean girl' aesthetic that never goes out of style.",
        tag: "French",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        estimatedTime: "15 mins",
        savesCount: "115,000+ saves",
        kitPrice: "₹1,299",
        author: {
          name: "Ananya Desai",
          role: "Senior Editorial Nail Stylist",
        },
        readTime: "2 min read",
        articleStory: {
          intro:
            "Thick acrylic French tips from the 2000s are officially out. In their place, the 1mm micro-French tip has taken Pinterest by storm as the ultimate luxury understated statement.",
          whyViral:
            "It gives the illusion of slender, clean, aristocratic hands. Perfect for corporate workdays, formal dinners, and brides who want timeless elegance in their ring photos.",
          skinToneTips:
            "Pick a sheer base that matches your natural nail bed rather than an opaque concealer pink. For warm undertones, caramel sheer gel creates the most flattering nude canvas.",
          mistakesToAvoid:
            "Drawing with a standard nail polish brush will make the tip line uneven and thick. Use a silicone stamper or a 7mm striper brush for razor-sharp micro-arcs.",
        },
        steps: [
          {
            id: "01",
            title: "Skin-Tone Base Alignment",
            description:
              "Apply one coat of translucent nude jelly polish to even out nail discoloration and cure 60s under LED.",
            image: "/images/nails/nai-7.jpg",
            time: "3 mins",
          },
          {
            id: "02",
            title: "The Silicone Stamper Hack",
            description:
              "Paint a thin strip of opaque white gel polish onto a clear silicone stamper and press the free edge of your nail in at a 45-degree angle.",
            image: "/images/nails/nai-2.jpg",
            time: "2 mins",
            proTip: "Press deeper into the stamper for longer nails, lighter for short almond nails.",
          },
          {
            id: "03",
            title: "Crisp Line Clean-Up & Cure",
            description:
              "Dip a flat angled brush in alcohol to sharpen smile line symmetry before curing 60s under LED. Seal with high-gloss top coat.",
            image: "/images/nails/nai-1.jpg",
            time: "60s LED",
          },
        ],
        products: nailProductsKit,
        artistRecommendation: defaultNailArtist,
      },
      {
        id: "rose-quartz",
        alt: "Rose quartz nails",
        image: "/images/nails/nai-11.jpg",
        title: "Rose Quartz Crystal Nails",
        description:
          "Channel the crystal of love and harmony with semi-sheer blush marble veining and subtle gold-foil veins. A bridal favorite across Ahmedabad and Surat.",
        tag: "Rose Quartz",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        savesCount: "86,000+ saves",
        kitPrice: "₹1,580",
        author: {
          name: "Ananya Desai",
          role: "Senior Editorial Nail Stylist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Rose Quartz nails mimic the natural milky depth and soft crystalline inclusions of the gemstone. Brides love this look because it pairs with both pastel lehengas and red bridal silk sarees.",
          whyViral:
            "The translucent layered depth makes the nails look like actual polished semi-precious stone rather than just flat painted polish.",
          skinToneTips:
            "Layering two slightly different shades of rose syrup gel enhances depth against golden and olive undertones.",
          mistakesToAvoid:
            "Don't make your white veins too straight or opaque; natural quartz has fractured, jagged micro-lines.",
        },
        steps: [
          {
            id: "01",
            title: "Rose Jelly Foundation",
            description: "Apply one coat of jelly rose pink gel polish and cure 60s.",
            image: "/images/nails/nai-11.jpg",
            time: "3 mins",
          },
          {
            id: "02",
            title: "Jagged Crystalline Veins",
            description:
              "Use a 5mm micro-detailer brush with milky white gel to paint delicate hairline fractures. Dab gently with a sponge brush to soften edges.",
            image: "/images/nails/nai-6.jpg",
            time: "5 mins",
            proTip: "Apply a second sheer pink coat over the veins to trap them inside the crystal.",
          },
          {
            id: "03",
            title: "Mirror Builder Glaze",
            description: "Seal with a medium-viscosity builder gel to give the stone authentic 3D curved depth.",
            image: "/images/nails/nai-10.jpg",
            time: "60s LED",
          },
        ],
        products: nailProductsKit,
        artistRecommendation: defaultNailArtist,
      },
      {
        id: "floral-nails",
        alt: "Floral nail art",
        image: "/images/nails/nai-6.jpg",
        title: "Delicate Floral Art",
        description:
          "Hand-painted springtime botanical petals accented with micro-pearl beads and a velvety soft-matte finish. Created for Mehendi parties and Garba festivities.",
        tag: "Floral",
        occasion: "Festive Garba",
        difficulty: "Pro / Salon",
        estimatedTime: "35 mins",
        savesCount: "64,000+ saves",
        kitPrice: "₹1,320",
        author: {
          name: "Ananya Desai",
          role: "Senior Editorial Nail Stylist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Intricate botanical nail art is having a huge moment on Pinterest for festive celebrations. Hand-painted micro floral patterns complement lehenga embroideries without competing for attention.",
          whyViral:
            "The artisan craftsmanship feels bespoke and personalized. When paired with delicate pearl beads, it looks like jewelry on your fingertips.",
          skinToneTips:
            "Muted sage greens and terracotta petals look striking against warm Indian complexions.",
          mistakesToAvoid:
            "Don't paint petals with runny gel; use high-pigment gel art paint that stays put without leveling out of shape.",
        },
        steps: [
          {
            id: "01",
            title: "Matte Canvas Base",
            description: "Apply a sheer neutral beige base and cure. Wipe with alcohol to remove stickiness.",
            image: "/images/nails/nai-6.jpg",
            time: "4 mins",
          },
          {
            id: "02",
            title: "Dotting Tool Petals",
            description:
              "Use a 0.8mm round ball dotting tool to place 5 connected teardrops forming small floral clusters.",
            image: "/images/nails/nai-1.jpg",
            time: "10 mins",
            proTip: "Flash cure each petal cluster for 10 seconds so colors don't bleed into one another.",
          },
          {
            id: "03",
            title: "Micro-Pearl Center & Velvet Top",
            description:
              "Place a 1mm pearl caviar bead in each floral core using rhinestone glue, then lock with velvet matte top coat.",
            image: "/images/nails/nai-2.jpg",
            time: "60s LED",
          },
        ],
        products: nailProductsKit,
        artistRecommendation: defaultNailArtist,
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
          "A sultry, seamless gradient of matte espresso, warm bronze, and carbon black with fluttering silk lashes. Perfect for cocktail receptions and evening parties.",
        tag: "Smokey",
        occasion: "Cocktail & Party",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        savesCount: "210,000+ saves",
        kitPrice: "₹2,150",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "4 min read",
        articleStory: {
          intro:
            "The classic smokey eye never dies, but the 2026 update is softer, more dimensional, and far more flattering. Instead of harsh jet-black panda eyes, the modern technique relies on seamless espresso gradients that make brown and hazel eyes pop.",
          whyViral:
            "Over 210,000 saves on Pinterest prove that Indian partygoers love high-drama eyes that withstand humidity, dance floors, and indoor flash photography.",
          skinToneTips:
            "For medium to deep skin tones, use rich chocolate or bronze as your transition shade rather than ash-grey. This keeps the look warm, radiant, and regal.",
          mistakesToAvoid:
            "Never apply black shadow directly onto bare lid skin; always lay down a smudge-proof waterproof gel pencil base first to anchor the powder and prevent creasing.",
        },
        steps: [
          {
            id: "01",
            title: "Warm Terracotta Transition",
            description:
              "Sweep a warm terracotta or cinnamon shadow across the crease with a fluffy dome blending brush using windshield-wiper motions.",
            image: "/images/makeup/mak-17.jpg",
            time: "4 mins",
            proTip: "Keep the crease diffuse and blown-out toward the brow bone to create an effortless lifting effect.",
          },
          {
            id: "02",
            title: "Waterproof Gel Base & Blend",
            description:
              "Line upper and lower lash lines with a creamy waterproof black gel liner. Before it sets, smudge the edges upward with a dense pencil brush.",
            image: "/images/makeup/mak-20.jpg",
            time: "6 mins",
            proTip: "Work on one eye at a time so the waterproof gel doesn't dry before you finish smudging.",
          },
          {
            id: "03",
            title: "Espresso Stamp & Silk Lashes",
            description:
              "Press intense matte espresso powder directly on top of the smudged gel to lock it for 16 hours. Finish with wispy silk half-lashes on the outer corners.",
            image: "/images/makeup/mak-14.jpg",
            time: "5 mins",
            proTip: "Half-lashes elongate your eye shape without pulling down your inner corners.",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
      },
      {
        id: "espresso-glam",
        alt: "Espresso soft glam makeup",
        image: "/images/makeup/mak-17.jpg",
        title: "Espresso Soft Glam",
        description:
          "Warm cocoa monochromatic tones with a sculptured bronze contour, feathered brows, and velvet nude lip.",
        tag: "Soft Glam",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        estimatedTime: "20 mins",
        savesCount: "135,000+ saves",
        kitPrice: "₹1,850",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Espresso makeup is the viral latte trend's richer, more sophisticated cousin. It uses monochromatic browns, coffees, and toffees to sculpt features without heavy contour lines.",
          whyViral:
            "It looks effortlessly polished in person and translates into glowing, flawless portraits under both sunlight and studio lights.",
          skinToneTips:
            "Brown tones naturally harmonize with South Asian complexions. Select a nude lip liner two shades deeper than your natural lip border for a plump 90s pout.",
          mistakesToAvoid:
            "Avoid grey-toned contours which can make complexion look dull or tired. Choose warm hazelnut or bronze sculpt powders.",
        },
        steps: [
          {
            id: "01",
            title: "Velvet Satin Skin Canvas",
            description: "Apply hydrating serum primer followed by sheer skin tint buffed with a dense kabuki brush.",
            image: "/images/makeup/mak-17.jpg",
            time: "4 mins",
          },
          {
            id: "02",
            title: "Warm Cocoa Monochromatic Wash",
            description:
              "Sweep warm cocoa shadow on eyelids and the same shade lightly as a soft cheek sculpt.",
            image: "/images/makeup/mak-19.jpg",
            time: "5 mins",
          },
          {
            id: "03",
            title: "Sculpted Nude Velvet Pout",
            description: "Line lips with warm chestnut pencil and tap a satin caramel lipstick in the center.",
            image: "/images/makeup/mak-12.jpg",
            time: "3 mins",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
      },
      {
        id: "fairy-makeup",
        alt: "Ethereal soft glam makeup",
        image: "/images/makeup/mak-19.jpg",
        title: "Ethereal Glass Glow Glam",
        description:
          "Korean glass-skin illumination with champagne diamond lids and high-shine peptide lip glaze. The ultimate dewy glow for festive nights.",
        tag: "Soft Glam",
        occasion: "Festive Garba",
        difficulty: "Easy DIY",
        estimatedTime: "25 mins",
        savesCount: "98,000+ saves",
        kitPrice: "₹1,650",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Glass skin meets Indian festive glow. Instead of glitter fall-out, this look uses micro-fine liquid illuminators that mimic fresh hydration on the cheekbones.",
          whyViral:
            "Younger audiences on Pinterest love dewy skin that feels breathable, light, and looks radiant in spontaneous phone selfies.",
          skinToneTips:
            "Skip frosty silver highlighters and choose liquid champagne gold or rose-gold pearls for sun-kissed warmth.",
          mistakesToAvoid:
            "Don't powder your high points. Only set your T-zone (sides of nose, center forehead) to keep glow deliberate, not oily.",
        },
        steps: [
          {
            id: "01",
            title: "Double Moisture Skin Prep",
            description: "Layer hyaluronic serum and ceramic barrier cream until skin feels plump and tacky.",
            image: "/images/makeup/mak-19.jpg",
            time: "5 mins",
          },
          {
            id: "02",
            title: "Liquid Highlighter Tap",
            description:
              "Dab liquid champagne illuminator onto highest points of cheekbones before applying lightweight foundation.",
            image: "/images/makeup/mak-17.jpg",
            time: "4 mins",
          },
          {
            id: "03",
            title: "Diamond Lid & Peptide Glaze",
            description: "Pat ultra-fine champagne shimmer across the lid and seal lips with clear peptide oil.",
            image: "/images/makeup/mak-20.jpg",
            time: "4 mins",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
      },
      {
        id: "bridal-makeup",
        alt: "Indian bridal makeup",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "Royal Heritage HD Bridal",
        description:
          "Sweat-proof 24H HD airbrush finish, kohl-rimmed regal eyes, and a classic velvet scarlet pout. Engineered for traditional Indian wedding rituals.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        estimatedTime: "60 mins",
        savesCount: "320,000+ saves",
        kitPrice: "₹3,400",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "5 min read",
        articleStory: {
          intro:
            "With over 320,000 saves, this is our most pinned bridal look of all time. Engineered specifically for 12-hour Gujarati and Marwari wedding celebrations where heat, humidity, pheras fire, and emotional moments put makeup to the test.",
          whyViral:
            "It balances timeless royal Indian bride aesthetics with modern HD camera clarity. There is zero flash flashback, and skin looks luminous rather than cakey.",
          skinToneTips:
            "Color correcting with warm peach/orange tones around the mouth and under-eyes is essential before foundation to prevent ashy gray tones under heavy stage lighting.",
          mistakesToAvoid:
            "Do not skip the double-setting spray technique (setting once after creams, and again after powders). This creates a flexible sweat-proof seal.",
        },
        steps: [
          {
            id: "01",
            title: "Waterproof HD Base & Correcting",
            description:
              "Color-correct with warm peach corrector, followed by 24-hour waterproof foundation buffed in micro-layers.",
            image: "/images/makeup/mak-14.jpg",
            time: "15 mins",
            proTip: "Use a damp sponge soaked in setting spray rather than plain water for 3x longer wear.",
          },
          {
            id: "02",
            title: "Royal Kohl & Cut-Crease Architecture",
            description:
              "Carve the eyelid with waterproof kohl pencil, blend into antique gold metallic foil in the inner two-thirds.",
            image: "/images/makeup/mak-20.jpg",
            time: "20 mins",
            proTip: "Set your waterline kohl with matte black eyeshadow on a flat brush so crying won't smudge it.",
          },
          {
            id: "03",
            title: "The Regal Scarlet Lip Lock",
            description:
              "Fill lips entirely with waterproof crimson lip liner, top with velvet matte scarlet lipstick, and blot twice.",
            image: "/images/makeup/mak-12.jpg",
            time: "10 mins",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
      },
      {
        id: "blush-saree",
        alt: "Blush bridal saree makeup",
        image: "/images/makeup/mak-12.jpg",
        objectPosition: "center 18%",
        title: "Blush Monochrome Glow",
        description:
          "Soft peach and rose monochrome tones designed to harmonize with modern pastel bridal lehengas and tissue silk sarees.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        savesCount: "175,000+ saves",
        kitPrice: "₹2,299",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Pastel bridal wear is the reigning queen of daytime weddings and Anand Karaj ceremonies. Heavy red lipsticks clash with powder pink and mint green lehengas; this monochrome blush palette creates pure harmony.",
          whyViral:
            "It looks fresh, youthful, and naturally radiant in natural morning light.",
          skinToneTips:
            "Peach-pink blushes flatter golden and warm undertones infinitely better than cool bubblegum pinks.",
          mistakesToAvoid:
            "Don't use overly shimmery blush on textured cheeks; keep the cheek blush satin-matte and add liquid highlighter strictly on the upper cheekbone crest.",
        },
        steps: [
          {
            id: "01",
            title: "Radiant Hydration Base",
            description: "Apply illuminating primer and medium-coverage satin foundation.",
            image: "/images/makeup/mak-12.jpg",
            time: "6 mins",
          },
          {
            id: "02",
            title: "Liquid Blush Drapery",
            description:
              "Dab warm peach liquid blush along cheekbones and blend softly into temple hairline.",
            image: "/images/makeup/mak-19.jpg",
            time: "5 mins",
          },
          {
            id: "03",
            title: "Soft Rosebud Lips & Brow Feathering",
            description: "Complete with warm rose tinted balm and micro-stroked brow pencil.",
            image: "/images/makeup/mak-17.jpg",
            time: "5 mins",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
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
          "Voluminous, glossy S-curls with mirror shine and flexible 24-hour hold. The Pinterest favorite for receptions and parties.",
        tag: "Waves",
        occasion: "Everyday Chic",
        difficulty: "Easy DIY",
        estimatedTime: "20 mins",
        savesCount: "128,000+ saves",
        kitPrice: "₹1,499",
        author: {
          name: "Kavita Patel",
          role: "Senior Bridal & Editorial Hair Specialist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Tight pageant curls are a thing of the past. The 'Old Money Brushed Wave' relies on wide, continuous S-waves that flow together like glossy liquid silk.",
          whyViral:
            "It instantly elevates any outfit — from an oversized blazer to a backless evening saree — with effortless luxury.",
          skinToneTips:
            "This style frames all face shapes beautifully. A subtle deep side part adds volume for round and heart face shapes.",
          mistakesToAvoid:
            "Do not brush out the curls while they are still hot! Let each curl cool completely in your hand before running a boar bristle brush through.",
        },
        steps: [
          {
            id: "01",
            title: "Heat Shield & Sectioning",
            description: "Mist dry hair thoroughly with heat protectant and divide into 4 horizontal tiers.",
            image: "/images/hair/hai-22.jpg",
            time: "4 mins",
          },
          {
            id: "02",
            title: "Uniform Direction Wrapping",
            description:
              "Wrap 1.5-inch sections around a 32mm titanium barrel, curling AWAY from the face on both sides.",
            image: "/images/hair/hai-26.jpg",
            time: "10 mins",
            proTip: "Hold barrel horizontally, not vertically, for that cohesive vintage ripple.",
          },
          {
            id: "03",
            title: "The Cool Down & Boar Brush",
            description:
              "Once cool, brush through with a wide paddle brush and mist with keratin shine spray.",
            image: "/images/hair/hai-27.jpg",
            time: "3 mins",
          },
        ],
        products: hairProductsKit,
        artistRecommendation: defaultHairArtist,
      },
      {
        id: "braided-style",
        alt: "Soft braided hairstyle",
        image: "/images/hair/hai-21.jpg",
        title: "Soft Textured Boho Braid",
        description:
          "A dimensional fishtail braid adorned with baby's breath blossoms and soft face-framing tendrils. Perfect for Garba nights and Mehendi functions.",
        tag: "Braids",
        occasion: "Festive Garba",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        savesCount: "162,000+ saves",
        kitPrice: "₹950",
        author: {
          name: "Kavita Patel",
          role: "Senior Bridal & Editorial Hair Specialist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "During festive Garba nights and outdoor mehendi celebrations, hair needs to stay secure while looking breathtaking. This textured braid has garnered over 162,000 saves for its romantic bohemian appeal.",
          whyViral:
            "Pancaking the braid edges gives it 3x more volume, making hair look thick and lush without heavy extensions.",
          skinToneTips:
            "Adding baby's breath or fresh jasmine sprigs along the braid creates stunning contrast against dark hair.",
          mistakesToAvoid:
            "Don't braid too loosely from the start. Braid firmly first, and then gently pull outward on the edges (pancake) after securing with an elastic.",
        },
        steps: [
          {
            id: "01",
            title: "Texturizing Powder at Roots",
            description: "Puff volumizing root powder across the crown and tease lightly for 2 inches of lift.",
            image: "/images/hair/hai-21.jpg",
            time: "4 mins",
          },
          {
            id: "02",
            title: "Loose Fishtail Weave",
            description:
              "Gather hair into a low side ponytail and weave an alternating 2-strand fishtail braid to the ends.",
            image: "/images/hair/hai-24.jpg",
            time: "12 mins",
          },
          {
            id: "03",
            title: "Pancake Flare & Floral Pins",
            description:
              "Pinch and pull each loop outward to double braid width. Pin miniature floral pins along the spine.",
            image: "/images/hair/hai-25.jpg",
            time: "5 mins",
            proTip: "Pull out two delicate wisps in front of ears to frame your jawline.",
          },
        ],
        products: hairProductsKit,
        artistRecommendation: defaultHairArtist,
      },
      {
        id: "party-updo",
        alt: "Party updo hairstyle",
        image: "/images/hair/hai-27.jpg",
        title: "Voluminous Red Carpet Updo",
        description:
          "A sculpted textured chignon with crown lift, designed to stay secure through hours of cocktail dancing.",
        tag: "Updos",
        occasion: "Cocktail & Party",
        difficulty: "Pro / Salon",
        estimatedTime: "35 mins",
        savesCount: "105,000+ saves",
        kitPrice: "₹899",
        author: {
          name: "Kavita Patel",
          role: "Senior Bridal & Editorial Hair Specialist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "An updo that looks red-carpet ready without appearing stiff or helmet-like. The secret lies in dimensional texturizing before pinning.",
          whyViral:
            "It showcases statement earrings and necklace sets without hair hiding your jewelry.",
          skinToneTips:
            "Leaving soft side tendrils softens the jawline and flatters square or oval faces.",
          mistakesToAvoid:
            "Avoid shiny bobby pins; use matte textured U-pins that grip the hair without sliding out during the night.",
        },
        steps: [
          {
            id: "01",
            title: "Crown Tease & Smooth Overlay",
            description: "Section the crown, backcomb underneath for structure, and smooth the top layer back.",
            image: "/images/hair/hai-27.jpg",
            time: "8 mins",
          },
          {
            id: "02",
            title: "Twisted Low Chignon",
            description:
              "Divide ponytail into two ribbons, twist together loosely, and coil into a horizontal bun.",
            image: "/images/hair/hai-28.jpg",
            time: "10 mins",
          },
          {
            id: "03",
            title: "Lock with Flexible Hold",
            description: "Anchor with 6 matte U-pins and spray with flexible humidity-resistant hairspray.",
            image: "/images/hair/hai-22.jpg",
            time: "4 mins",
          },
        ],
        products: hairProductsKit,
        artistRecommendation: defaultHairArtist,
      },
      {
        id: "half-up",
        alt: "Bridal half-up hairstyle",
        image: "/images/hair/hai-23.jpg",
        objectPosition: "center 20%",
        title: "Romantic Sangeet Half-Up",
        description:
          "Twisted crown rolls flowing into cascading polished waves with concealed veil anchor combs. A bridal hit across Gujarat.",
        tag: "Half-Up",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        savesCount: "190,000+ saves",
        kitPrice: "₹1,150",
        author: {
          name: "Kavita Patel",
          role: "Senior Bridal & Editorial Hair Specialist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Brides love half-up hairstyles because they get the security of pinned hair at the front with the romantic glamour of flowing curls in the back.",
          whyViral:
            "It comfortably holds a heavy dupatta or sheer veil without pulling on your scalp during ceremonies.",
          skinToneTips:
            "Pairs beautifully with backless cholis and high-neck bridal blouses.",
          mistakesToAvoid:
            "Ensure the anchor bobby pins form an 'X' shape under the twist so heavy hair extensions don't slide.",
        },
        steps: [
          {
            id: "01",
            title: "Thermal Wave Foundations",
            description: "Curl hair from mid-lengths to ends with 28mm barrel.",
            image: "/images/hair/hai-23.jpg",
            time: "10 mins",
          },
          {
            id: "02",
            title: "Dual Crown Twists",
            description: "Take 1-inch sections from above each temple, twist inward, and secure at the back.",
            image: "/images/hair/hai-29.jpg",
            time: "6 mins",
          },
          {
            id: "03",
            title: "Floral Brooch Anchor",
            description: "Slide a jeweled floral comb directly into the twist junction and lock with mist.",
            image: "/images/hair/hai-21.jpg",
            time: "4 mins",
          },
        ],
        products: hairProductsKit,
        artistRecommendation: defaultHairArtist,
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
          "A modern Gujarati seedha pallu draped in translucent tissue silk with pearl belt detailing. Lightweight and effortless for day weddings.",
        tag: "Saree",
        occasion: "Bridal & Wedding",
        difficulty: "Intermediate",
        estimatedTime: "20 mins",
        savesCount: "140,000+ saves",
        kitPrice: "₹1,250",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Tissue silk sarees are delicate and diaphanous. Heavy traditional pleating can make them bunch awkwardly, but this modern seedha pallu drape keeps lines sleek and fluid.",
          whyViral:
            "It gives brides the freedom to walk, dance, and sit comfortably without adjusting pins every 10 minutes.",
          skinToneTips:
            "Rose-gold and champagne tissue silks look luminous against warm undertones.",
          mistakesToAvoid:
            "Never pin directly through tissue silk without a mini felt safety pad; the metal pin can tear delicate zari threads.",
        },
        steps: [
          {
            id: "01",
            title: "Base Skirt Tuck & Height",
            description: "Tuck starting end firmly into mermaid petticoat, keeping hem 1cm off the floor.",
            image: "/images/makeup/mak-12.jpg",
            time: "4 mins",
          },
          {
            id: "02",
            title: "Front Pleat Architecture",
            description: "Make 6 equal 5-inch pleats and secure with a horizontal safety grip.",
            image: "/images/makeup/mak-13.jpg",
            time: "6 mins",
          },
          {
            id: "03",
            title: "Seedha Pallu Pearl Belt",
            description: "Bring the pallu over the right shoulder forward and cinch at waist with a pearl belt.",
            image: "/images/makeup/mak-14.jpg",
            time: "5 mins",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
      },
      {
        id: "bridal-style",
        alt: "Bridal fashion look",
        image: "/images/makeup/mak-14.jpg",
        objectPosition: "center 18%",
        title: "Heritage Crimson Velvet Ensemble",
        description:
          "Crimson zardozi embroidery paired with dual dupattas for ceremonial grandeur and lightweight mobility.",
        tag: "Bridal",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        estimatedTime: "30 mins",
        savesCount: "280,000+ saves",
        kitPrice: "₹2,400",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "4 min read",
        articleStory: {
          intro:
            "Dual dupatta draping is essential for modern Indian brides who want the grandeur of heavy heritage embroidery without carrying all the weight on their head.",
          whyViral:
            "The sheer net head dupatta stays featherlight on your bun while the heavy velvet dupatta sits securely on your shoulder.",
          skinToneTips:
            "Deep crimson red and warm vermilion enhance classic gold temple jewellery sets.",
          mistakesToAvoid:
            "Ensure the head dupatta is anchored to your hair bun with an inner hair comb, not directly to your hair pins.",
        },
        steps: [
          {
            id: "01",
            title: "Velvet Shoulder Pleating",
            description: "Pleat the primary heavy dupatta and anchor to left shoulder with padded pin.",
            image: "/images/makeup/mak-14.jpg",
            time: "8 mins",
          },
          {
            id: "02",
            title: "Sheer Veil Crown Anchor",
            description: "Center lightweight net veil over bridal bun and insert concealed teeth combs.",
            image: "/images/makeup/mak-13.jpg",
            time: "8 mins",
          },
          {
            id: "03",
            title: "Cross-Body Waist Pinch",
            description: "Tuck lower corner into right lehenga waistband for clean movement during pheras.",
            image: "/images/makeup/mak-20.jpg",
            time: "5 mins",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
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
        title: "Organic Floral Vines Henna",
        description:
          "Free-flowing Arabic vines with shaded rose petals and delicate lattice fingertips. Stains a rich deep mahogany within 48 hours.",
        tag: "Floral",
        occasion: "Festive Garba",
        difficulty: "Intermediate",
        estimatedTime: "45 mins",
        savesCount: "134,000+ saves",
        kitPrice: "₹548",
        author: {
          name: "Riddhi Shah",
          role: "Master Bridal Henna Artist",
        },
        readTime: "3 min read",
        articleStory: {
          intro:
            "Gone are the days of chemical black henna that damages skin. This organic Sojat henna design relies on slow-releasing eucalyptus and clove oils to achieve a natural midnight-mahogany stain.",
          whyViral:
            "Negative space between the floral vines makes hands appear slender and delicate, rather than cluttered.",
          skinToneTips:
            "Natural henna develops a rich warm chestnut-to-mahogany stain that flatters every skin tone.",
          mistakesToAvoid:
            "Never wash off dried henna with water! Scrape it off with a butter knife and apply coconut oil or mustard oil for the first 24 hours.",
        },
        steps: [
          {
            id: "01",
            title: "Skin Canvas Oil Cleansing",
            description: "Wash hands with soap, dry completely, and massage 3 drops of clove oil onto palms.",
            image: "/images/nails/nai-6.jpg",
            time: "5 mins",
          },
          {
            id: "02",
            title: "Continuous Vine Piping",
            description:
              "Pipe central floral clusters using fine 0.38mm cone tip, connecting with micro-leaf trails.",
            image: "/images/nails/nai-11.jpg",
            time: "25 mins",
          },
          {
            id: "03",
            title: "Lemon-Sugar Seal Mist",
            description:
              "Spray warm lemon-sugar syrup over dried henna to keep paste sticky on skin for 6-8 hours.",
            image: "/images/nails/nai-2.jpg",
            time: "5 mins",
            proTip: "Wear cotton socks or wrap lightly in tissue before sleeping to trap body heat.",
          },
        ],
        products: mehndiProductsKit,
        artistRecommendation: defaultMehndiArtist,
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
        estimatedTime: "60 mins",
        savesCount: "155,000+ saves",
        kitPrice: "₹650",
        author: {
          name: "Riddhi Shah",
          role: "Master Bridal Henna Artist",
        },
        readTime: "4 min read",
        articleStory: {
          intro:
            "Shaded rose henna creates a 3D optical illusion on the back of the hand. By varying pressure from the cone, the petals look velvety and multi-dimensional.",
          whyViral:
            "It looks like an intricate Victorian lace glove draped over your skin.",
          skinToneTips:
            "Deep mahogany stains provide high-contrast elegance against bridal ivory lehengas.",
          mistakesToAvoid:
            "Keep hands away from water, soap, and detergent for at least 18 hours after scraping the paste off.",
        },
        steps: [
          {
            id: "01",
            title: "Central Rose Outline",
            description: "Draw the outer petal contours with firm pressure for bold border definition.",
            image: "/images/nails/nai-11.jpg",
            time: "10 mins",
          },
          {
            id: "02",
            title: "Internal Micro-Shading",
            description:
              "Lightly drag a semi-dry cone across internal petals to create subtle gradient shading.",
            image: "/images/nails/nai-7.jpg",
            time: "20 mins",
          },
          {
            id: "03",
            title: "Clove Steam Heat Exposure",
            description:
              "Hold hands over warm clove smoke on an earthen pan for 2 minutes to trigger dark stain enzymes.",
            image: "/images/nails/nai-8.jpg",
            time: "5 mins",
          },
        ],
        products: mehndiProductsKit,
        artistRecommendation: defaultMehndiArtist,
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
        title: "The Regal Heritage Bride",
        description:
          "A masterpiece of bridal styling. Velvet crimson pout, sculptured bronze cheekbones, and intricate Mathapatti alignment.",
        tag: "Makeup",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        estimatedTime: "90 mins",
        savesCount: "380,000+ saves",
        kitPrice: "₹3,800",
        author: {
          name: "Meera Trivedi",
          role: "Master Bridal & Celebrity Cosmetologist",
        },
        readTime: "5 min read",
        articleStory: {
          intro:
            "Our most requested bridal signature in Ahmedabad and Surat. Recreates the royal poise of heritage maharanis with 21st-century durability.",
          whyViral:
            "It photographs majestically in both high-definition 4K video and candid guest flash photography.",
          skinToneTips:
            "Gold jewelry reflects warm light onto the face; balancing with warm terracotta blush prevents a washed-out look.",
          mistakesToAvoid:
            "Do not apply highlighter on the tip of the nose if you are wearing a heavy Nath (nose ring); it causes unwanted glare in close-up portraits.",
        },
        steps: [
          {
            id: "01",
            title: "24-Hour Sweat-Proof Airbrush",
            description: "Layer micro-fine silicone base to resist pheras warmth and stage heat.",
            image: "/images/makeup/mak-14.jpg",
            time: "25 mins",
          },
          {
            id: "02",
            title: "Regal Kohl & Antique Gold Foil",
            description:
              "Smudge charcoal kohl into deep coffee tones and pat pure 24k gold leaf foil on the center lid.",
            image: "/images/makeup/mak-20.jpg",
            time: "30 mins",
          },
          {
            id: "03",
            title: "Scarlet Pout & Mathapatti Pinning",
            description:
              "Lock lips with non-transfer crimson velvet and anchor jewellery with medical-grade skin tape.",
            image: "/images/makeup/mak-12.jpg",
            time: "15 mins",
          },
        ],
        products: makeupProductsKit,
        artistRecommendation: defaultMakeupArtist,
      },
      {
        id: "bridal-braid",
        alt: "Traditional bridal braid",
        image: "/images/hair/hai-25.jpg",
        objectPosition: "center 20%",
        title: "Heritage Royal Jada Braid",
        description:
          "Waist-length traditional south-meets-west braid studded with temple gold surya and chandra brooches and fresh fragrant Mogra.",
        tag: "Hair",
        occasion: "Bridal & Wedding",
        difficulty: "Pro / Salon",
        estimatedTime: "40 mins",
        savesCount: "195,000+ saves",
        kitPrice: "₹1,650",
        author: {
          name: "Kavita Patel",
          role: "Senior Bridal & Editorial Hair Specialist",
        },
        readTime: "4 min read",
        articleStory: {
          intro:
            "The Jada braid is an heirloom South Asian bridal tradition that has seen an enormous resurgence on Pinterest. Modern brides love incorporating gold brooches down the braid length.",
          whyViral:
            "From the back, it makes your walk down the aisle unforgettable as flowers and gold catch the ceremonial light.",
          skinToneTips:
            "Fresh white mogra flowers against dark glossy hair create timeless, regal contrast.",
          mistakesToAvoid:
            "Always braid with an invisible synthetic extension core so the weight of gold brooches doesn't pull down on your scalp.",
        },
        steps: [
          {
            id: "01",
            title: "Parijat Root Foundation",
            description: "Smooth crown with gloss pomade and anchor extension weft under crown hair.",
            image: "/images/hair/hai-25.jpg",
            time: "10 mins",
          },
          {
            id: "02",
            title: "Tight 3-Strand Plaiting",
            description:
              "Plait evenly down to waist level, binding with elastic every 4 inches for brooch anchors.",
            image: "/images/hair/hai-21.jpg",
            time: "15 mins",
          },
          {
            id: "03",
            title: "Brooch & Mogra Wreathing",
            description: "Pin gold circular brooches at each node and spiral fresh jasmine garlands around.",
            image: "/images/hair/hai-23.jpg",
            time: "15 mins",
          },
        ],
        products: hairProductsKit,
        artistRecommendation: defaultHairArtist,
      },
    ],
  },
];

// Fallback resolver: returns rich human-written look data for any look
export function getLookWithFallbacks(look: LookItem, categoryId?: string): LookItem {
  const cat = categoryId || "nail-art";
  const defaultProducts =
    cat === "makeup" || cat === "bridal" || cat === "fashion"
      ? makeupProductsKit
      : cat === "hairstyles"
      ? hairProductsKit
      : cat === "mehndi"
      ? mehndiProductsKit
      : nailProductsKit;

  const defaultArtist =
    cat === "makeup" || cat === "bridal" || cat === "fashion"
      ? defaultMakeupArtist
      : cat === "hairstyles"
      ? defaultHairArtist
      : cat === "mehndi"
      ? defaultMehndiArtist
      : defaultNailArtist;

  const defaultSteps: LookStep[] =
    cat === "makeup" || cat === "bridal"
      ? [
          {
            id: "01",
            title: "Skin Canvas Prep & Color Correction",
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
    author: look.author || {
      name: "RoopSetu Beauty Editorial",
      role: "Verified Cosmetologist & Stylist Collective",
    },
    readTime: look.readTime || "3 min read",
    estimatedTime: look.estimatedTime || "25 mins",
    savesCount: look.savesCount || "95,000+ saves",
    kitPrice: look.kitPrice || "₹1,499",
    articleStory: look.articleStory || {
      intro: `Curated directly from our viral Pinterest collection with over 1M monthly views, the "${look.title || look.alt}" has become a sensation for modern celebrations.`,
      whyViral:
        "Its balanced aesthetics pair seamlessly with both contemporary outfits and traditional bridal lehengas, catching light effortlessly in photography.",
      skinToneTips:
        "Engineered to flatter warm, golden, and olive South Asian complexions with rich, harmonious undertones.",
      mistakesToAvoid:
        "Take time on the initial prep and canvas steps. Rushing the base layer is the #1 reason looks lose their longevity.",
    },
    steps: look.steps && look.steps.length > 0 ? look.steps : defaultSteps,
    products: look.products && look.products.length > 0 ? look.products : defaultProducts,
    artistRecommendation: look.artistRecommendation || defaultArtist,
  };
}

// Helper: Flatten all looks into a single searchable array
export function getAllBeautyLooks(): (LookItem & { categoryId: string; categoryLabel: string })[] {
  return beautyCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...getLookWithFallbacks(item, cat.id),
      categoryId: cat.id,
      categoryLabel: cat.label,
    }))
  );
}
