# RoopSetu: Comprehensive Three-Service Specification & Product Blueprint

**Version:** 1.0.0  
**Status:** Living Product Document & Architecture Specification  
**Project:** RoopSetu (रूपसेतु – The Bridge of Elegance)  
**Target Market:** India (Festive, Wedding, and Event-Styling Marketplace)  

---

## Table of Contents

1. [Executive Summary & Strategic Vision](#1-executive-summary--strategic-vision)
2. [Service 1: Beautician & Salon Discovery and Booking (The Foundation & MVP)](#2-service-1-beautician--salon-discovery-and-booking-the-foundation--mvp)
   - [2.1 Beautician / Partner Onboarding & Verification](#21-beautician--partner-onboarding--verification)
   - [2.2 Portfolio, Gallery & Media Management](#22-portfolio-gallery--media-management)
   - [2.3 Service Catalog, Packages & Dynamic Pricing](#23-service-catalog-packages--dynamic-pricing)
   - [2.4 Beautician Partner Dashboard & Management Tools](#24-beautician-partner-dashboard--management-tools)
   - [2.5 Client / Consumer Discovery & Geo-Search Engine](#25-client--consumer-discovery--geo-search-engine)
   - [2.6 Public Beautician Profile & Showcase Experience](#26-public-beautician-profile--showcase-experience)
   - [2.7 Booking, Inquiry & Communication Workflows](#27-booking-inquiry--communication-workflows)
   - [2.8 Ratings, Reviews & Social Proof](#28-ratings-reviews--social-proof)
3. [Service 2: Ethnic Wear & Jewelry Rental Marketplace (High Basket Size & Festive Growth)](#3-service-2-ethnic-wear--jewelry-rental-marketplace-high-basket-size--festive-growth)
   - [3.1 Market Context & Target Categories](#31-market-context--target-categories)
   - [3.2 Boutique & Vendor Onboarding Model](#32-boutique--vendor-onboarding-model)
   - [3.3 Rental Item Cataloging & Sizing System](#33-rental-item-cataloging--sizing-system)
   - [3.4 Rental Booking & Calendar Availability Workflow](#34-rental-booking--calendar-availability-workflow)
   - [3.5 Trust, KYC & Security Deposit Architecture](#35-trust-kyc--security-deposit-architecture)
   - [3.6 Logistics, Pick-Up/Delivery & Alterations](#36-logistics-pick-updelivery--alterations)
   - [3.7 Return, Quality Inspection & Refund Flow](#37-return-quality-inspection--refund-flow)
4. [Service 3: Beauty, Fashion & Trend Guide (The Organic SEO & Conversion Engine)](#4-service-3-beauty-fashion--trend-guide-the-organic-seo--conversion-engine)
   - [4.1 Content Pillars & Curated Categories](#41-content-pillars--curated-categories)
   - [4.2 Media Formats & Interactive Visual Lookbooks](#42-media-formats--interactive-visual-lookbooks)
   - [4.3 The "Book & Rent The Look" Direct Conversion Engine](#43-the-book--rent-the-look-direct-conversion-engine)
   - [4.4 Beautician-Generated Content & Portfolio Syndication](#44-beautician-generated-content--portfolio-syndication)
   - [4.5 Programmatic SEO & High-Intent Landing Pages](#45-programmatic-seo--high-intent-landing-pages)
5. [Cross-Service Synergy & The "Complete Occasion" Bundle](#5-cross-service-synergy--the-complete-occasion-bundle)
6. [Data Architecture & Prisma Schema Blueprint](#6-data-architecture--prisma-schema-blueprint)
7. [Startup Business Model & Monetization Strategy](#7-startup-business-model--monetization-strategy)
8. [Phased Rollout & Execution Roadmap](#8-phased-rollout--execution-roadmap)
9. [High-Growth Complementary Verticals & Future Market Trends (2025–2026)](#9-high-growth-complementary-verticals--future-market-trends-20252026)
   - [9.1 Wedding & Event Content Creators (BTS Reel Makers)](#91-wedding--event-content-creators-bts-reel-makers)
   - [9.2 Professional Saree, Dupatta & Safa/Pagdi Draping](#92-professional-saree-dupatta--safapagdi-draping)
   - [9.3 Dedicated Mehendi & Henna Artistry Marketplace](#93-dedicated-mehendi--henna-artistry-marketplace)
   - [9.4 Fresh Haldi Floral Jewelry & Custom Press-On Nails](#94-fresh-haldi-floral-jewelry--custom-press-on-nails)
   - [9.5 AI Virtual Try-On & Augmented Reality Preview](#95-ai-virtual-try-on--augmented-reality-preview)
   - [9.6 "RoopSetu Pre-Loved" Circular Fashion Resale](#96-roopsetu-pre-loved-circular-fashion-resale)

---

## 1. Executive Summary & Strategic Vision

**RoopSetu** solves a fragmented, high-friction problem in India: preparing for weddings, festivals (Navratri, Diwali, Eid), family functions, and parties. Today, a customer must independently search Instagram for makeup artists, visit crowded markets to rent Chaniya Cholis or bridal jewelry, and browse Pinterest for look inspiration without any connection between them.

RoopSetu unites these 3 dimensions into a cohesive, flywheel ecosystem:

```
                      ┌─────────────────────────────────────────┐
                      │          SERVICE 3: BEAUTY GUIDE        │
                      │  (Search Organic Traffic, Lookbooks,    │
                      │   Inspiration, Trend Discovery)         │
                      └────────────────────┬────────────────────┘
                                           │
                        "Shop & Book The Exact Look"
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         ▼                                                                   ▼
┌─────────────────────────────────┐                         ┌─────────────────────────────────┐
│     SERVICE 1: BEAUTICIAN       │                         │      SERVICE 2: ETHNIC RENTAL   │
│     MARKETPLACE (MVP)           │ ◄─────────────────────► │      MARKETPLACE (EXPANSION)    │
│ • Local discovery & portfolio   │    "Complete Occasion   │ • Chaniya Cholis, Sarees, Gowns │
│ • Home visit / Salon booking    │         Bundle"         │ • Polki, Kundan & Temple Jewelry│
│ • Verified badges & reviews     │                         │ • Calendar rental & deposits    │
└─────────────────────────────────┘                         └─────────────────────────────────┘
```

---

## 2. Service 1: Beautician & Salon Discovery and Booking (The Foundation & MVP)

Service 1 is the primary anchor of RoopSetu. It serves two distinct audiences: **Beauty Professionals (Service Providers)** and **Clients / Consumers**.

### 2.1 Beautician / Partner Onboarding & Verification

To establish marketplace trust, onboarding must be smooth yet rigorous.

#### Provider Profile Types
- **Independent / Freelance Beautician**: Travels to client locations (weddings, home makeup, hotels).
- **Home Studio Beautician**: Operates dedicated beauty setups at home.
- **Boutique Salon / Studio Owner**: Operates a physical commercial salon/studio with multiple chairs.

#### Verification Pipeline ("RoopSetu Verified" Gold Shield)
1. **Identity Proof (KYC)**: Aadhaar Card, PAN Card, or Driving License (uploaded to secure encrypted storage).
2. **Business Proof (Optional for Freelancers, Mandatory for Salons)**: Shop Act License, GSTIN, or Rental Agreement.
3. **Skill Accreditation**: Beauty Academy certificates, Cosmetology diplomas, or verified Instagram portfolio proof (>100 active work posts).
4. **Verification Statuses**:
   - `PENDING`: Registration complete; queued for internal admin review.
   - `VERIFIED`: Green/Gold badge visible to users; ranks higher in search results.
   - `NEEDS_REVISION`: Document illegible or missing key information.
   - `REJECTED`: Fails basic security criteria.

---

### 2.2 Portfolio, Gallery & Media Management

Beauty is 100% visual. Customers will not book without seeing recent, authentic work.

#### What Needs to Be Covered:
- **Categorized Work Portfolios**:
  - *Bridal Transformations* (Haldi, Mehendi, Sangeet, Wedding, Reception)
  - *Party & Glam Makeup* (Cocktail, Engagement, Prom, Corporate)
  - *Hair Styling* (Traditional Braids, Modern Updos, Curls, Floral settings)
  - *Nail Art* (Gel extensions, Acrylics, French ombre, Festival themes)
  - *Mehendi / Henna* (Bridal, Arabic, Indo-Western, Mandala)
  - *Skincare & Pre-Bridal* (Facials, D-tan, Bleach, Waxing, Threading)
- **Before / After Split Sliders**: High-converting interactive images displaying raw vs. finished look.
- **Media Optimization Pipeline**:
  - Automatic WebP/AVIF compression.
  - Watermarking with provider's handle and "RoopSetu Verified" logo to prevent portfolio theft by competitors.
- **Instagram Feed Sync**: Option to link their Instagram account so recent portfolio posts display automatically.

---

### 2.3 Service Catalog, Packages & Dynamic Pricing

Beauticians must be able to configure granular services and combination packages.

#### 1. Granular Service Item Model
Each service item contains:
- Service Name (*e.g., "HD Airbrush Bridal Makeup"*)
- Category (*e.g., "Bridal Makeup"*)
- Execution Time (*e.g., "120 mins"*)
- Base Price in INR (*e.g., "₹12,000"*)
- Service Delivery Mode:
  - *At Salon Only*
  - *At Client's Home Only*
  - *Both Available (with optional home-visit surcharge)*
- Inclusions & Exclusions (*e.g., "Includes eyelashes, contact lenses & saree draping. Excludes real floral jewelry."*)
- Products / Brands Used (*e.g., MAC, Huda Beauty, Kryolan, NARS, Charlotte Tilbury*) — builds immense trust with brides.

#### 2. Bundled Packages (High Average Order Value)
- **Full Bridal Package**: Pre-bridal skin prep (2 days prior) + Wedding Day HD Makeup + Hairdo + Saree/Lehenga Draping.
- **Bridal + Family Combo**: Bride + Mother + 2 Bridesmaids / Sisters discount package.
- **Festive / Navratri Special**: 3-Day or 9-Day makeup pass for Garba nights.

#### 2. Travel & Service Radius
- Home city (*e.g., Ahmedabad, Surat, Rajkot, Vadodara, Mumbai, Pune*).
- Operational areas / Pincodes covered.
- Maximum travel radius in KM (e.g., up to 25 km).
- Outstation / Destination Wedding availability toggle (charges for travel/lodging extra).

---

### 2.4 Beautician Partner Dashboard & Management Tools

Beauticians need an intuitive dashboard on both mobile and web:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BEAUTICIAN PARTNER DASHBOARD                     │
├───────────────┬───────────────────────────────┬────────────────────────┤
│ QUICK METRICS │ TODAY'S APPOINTMENTS          │ NEW INQUIRIES          │
│ • Profile Views: 412 │ • 11:00 AM - Riya (HD Makeup) │ • Priya S. (24 Nov)    │
│ • Bookings: 18      │ • 04:30 PM - Pooja (Hair/Nails)│   [Accept] [WhatsApp]  │
│ • Rating: 4.9 ★ (36)│ • Status: Confirmed           │ • Urgent Bridal Inquiry│
├───────────────┴───────────────────────────────┴────────────────────────┤
│ CALENDAR & SCHEDULE MANAGER                                            │
│ [Mon: Active] [Tue: Active] [Wed: OFF] [Thu: Active] [Fri-Sun: Busy]   │
│ Quick Action: [+ Add Blocked Date] [+ Edit Vacation Mode]             │
├────────────────────────────────────────────────────────────────────────┤
│ SERVICES & PRICING (A la carte & Bridal Packages)                     │
│ PORTFOLIO GALLERY (42 Photos, 4 Categories)                            │
│ BANKING & PAYOUT DETAILS (UPI / IFSC / Verified for direct token)      │
└────────────────────────────────────────────────────────────────────────┘
```

#### Key Capabilities:
- **Instant WhatsApp Deep-Linking**: A dedicated button allowing the beautician to open a pre-filled WhatsApp chat with clients who inquire.
- **Availability Calendar & Slot Blocker**: Easily mark dates as booked, holidays, or off-season.
- **Performance Analytics**: Weekly profile impressions, search appearances, phone/WhatsApp inquiry clicks.
- **Client Inquiry Tracker**: Manage leads through stages: `New Inquiry` ➔ `Consultation Done` ➔ `Confirmed / Advance Paid` ➔ `Completed`.

---

### 2.5 Client / Consumer Discovery & Geo-Search Engine

Consumers must find the right artist within 3 clicks.

#### Search & Filtering Matrix:
1. **Location**: Auto-detect GPS or dropdown: City ➔ Local Suburb / Neighborhood / Pincode.
2. **Service Type**: Multi-select pills (*Bridal, Engagement, Party, Mehendi, Nail Extensions, Hair Treatment*).
3. **Delivery Mode**: Toggle between *"Visit Salon"* or *"Artist Comes to My Home"*.
4. **Budget Range**: Price slider (e.g., ₹1,000 – ₹50,000+).
5. **Availability Date**: Date picker (crucial for wedding auspicious dates where 90% of artists are booked).
6. **Trust Filters**: *"RoopSetu Verified Only"*, *"Rating 4.5+ Stars"*, *"Female Beauticians Only"*.
7. **Sorting**: *"Highest Rated"*, *"Most Reviewed"*, *"Distance: Nearest First"*, *"Price: Low to High"*.

---

### 2.6 Public Beautician Profile & Showcase Experience

The public URL: `roopsetu.com/beautician/[username-or-slug]`

#### Profile Page Layout:
- **Hero Header**: Profile picture / Salon photo, Verified Shield, Badge (*"Top Rated Bridal Artist"*), Years of Experience, City/Area.
- **Primary Call-To-Action (Sticky on Mobile)**:
  - `[Inquire on WhatsApp]` (Instant lead generation).
  - `[Book Appointment]` (Structured date/service selection).
- **About & Bio**: Story, background, certifications, languages spoken.
- **Brands & Hygiene Guarantee**: Listed brands used, sanitized tools pledge.
- **Interactive Service Menu**: Accordion by category with prices and "Add to Booking".
- **Visual Portfolio Grid**: Filterable tabs (*Bridal, Hair, Nails, Mehendi*) with full-screen lightbox.
- **Google Maps Pin / Travel Coverage Map**.
- **Verified Client Reviews with Photos**.

---

### 2.7 Booking, Inquiry & Communication Workflows

To achieve early traction, RoopSetu supports a **two-tier interaction model**:

#### Tier A: Lightweight WhatsApp Inquiry (Zero-Friction MVP)
1. User clicks **"Inquire on WhatsApp"** on the artist's profile.
2. A lightweight modal asks: *Select Date*, *Occasion*, and *Service (e.g., Bridal)*.
3. RoopSetu records the lead in the database and opens WhatsApp with a pre-formatted message:
   > *"Hello [Artist Name], I found your profile on RoopSetu! I am looking for [Bridal Makeup] on [24th Nov] at [Vastrapur, Ahmedabad]. Are you available? Profile: roopsetu.com/beautician/xyz"*
4. *Benefit*: 0% payment drop-off; immediate conversational closing.

#### Tier B: Structured Booking with Advance Token (Phase 2)
1. User selects service, date, time slot, and location (Home or Salon).
2. User pays a 10%–20% refundable booking token online (via UPI/Razorpay) to block the date.
3. Beautician receives SMS/WhatsApp/Push notification: `[Accept]` or `[Decline]` within 2 hours.
4. If accepted: Token held in escrow until service completion; balance paid directly to the artist.
5. If declined: Full instant refund to the client.

---

### 2.8 Ratings, Reviews & Social Proof

- **Verified Bookings Only**: Only clients who scheduled or confirmed an inquiry can leave a star rating.
- **Multi-Factor Rating**:
  - Punctuality & Professionalism (1–5)
  - Makeup Quality & Longevity (1–5)
  - Hygiene & Cleanliness (1–5)
  - Value for Money (1–5)
- **Photo Reviews**: Clients upload raw photos of their look, creating the highest form of social proof for future brides.

---

## 3. Service 2: Ethnic Wear & Jewelry Rental Marketplace (High Basket Size & Festive Growth)

In India, buying heavy ethnic clothing and luxury jewelry makes little financial sense for modern consumers:
- A Navratri designer Chaniya Choli costs ₹15,000–₹40,000 to buy, but is worn for only 1 or 2 nights.
- Bridal Lehengas (Sabyasachi/Manish Malhotra style copies) cost ₹50,000–₹1,50,000 and sit in closets forever.
- Imitation Kundan, Polki, and Temple Jewelry sets cost ₹10,000–₹35,000.

**Rental Demand**: Consumers eagerly rent Chaniya Cholis for ₹1,500–₹5,000/night and Bridal Lehengas for ₹5,000–₹18,000 for a 3-day window.

---

### 3.1 Market Context & Target Categories

#### 1. Ethnic Outfits
- **Navratri Specials**: Heavy flair Kutchi work, Gamthi work, Mirror work, Digital print Chaniya Cholis.
- **Bridal & Wedding Wear**: Bridal Lehengas, Reception Gowns, Engagement Lehengas.
- **Pre-Wedding & Festivities**: Haldi Yellow Lehengas, Mehendi Green Attire, Sangeet Indo-Western outfits.
- **Sarees**: Kanjivaram, Banarasi Silk, Organza, Ready-to-wear pre-draped sarees.
- **Men's Occasion Wear (Phase 2 add-on)**: Sherwanis, Jodhpuri suits, Kurta jackets.

#### 2. Occasion Jewelry Sets
- **Bridal Sets**: Complete Dulhan sets (Mathapatti, Nath, Choker, Long Haar, Earrings, Hathphool, Bajuband).
- **Styles**: Jadau, Kundan, Polki, Temple Gold-finish, Antique Matte, American Diamond / Western.
- **Festive Accessories**: Oxidized silver Navratri jewelry, Kamarbandhs, Hair brooch accessories.

---

### 3.2 Boutique & Vendor Onboarding Model

RoopSetu operates on an **Asset-Light Marketplace Model**:
- **Do not purchase inventory yourself initially.**
- Onboard existing rental boutiques, independent costume designers, and bridal rental shops across key shopping clusters (e.g., *Ratanpole/C.G. Road in Ahmedabad, Ring Road in Surat, Chandni Chowk in Delhi, Dadar/Santacruz in Mumbai*).
- **Vendor Requirements**:
  - Physical shop/studio address verification.
  - Clear high-resolution photos of garments on mannequins or models.
  - Dedicated dry-cleaning partner or in-house steaming facility.

---

### 3.3 Rental Item Cataloging & Sizing System

Every rental listing requires specialized attributes:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      RENTAL ITEM SPECIFICATION CARD                     │
├─────────────────────────────────────────────────────────────────────────┤
│ Title: Royal Maroon Velvet Zardozi Bridal Lehenga                       │
│ Category: Bridal Lehenga | Occasion: Wedding / Reception               │
│ Rental Pricing:                                                         │
│ • 3-Day Rental: ₹6,500                                                  │
│ • 5-Day Rental: ₹9,500                                                  │
│ • Refundable Security Deposit: ₹10,000                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ SIZING & ALTERATION SPECS:                                              │
│ • Standard Size: M (Fits Bust 34–38", Waist 30–34")                     │
│ • Skirt Length: 42 inches | Flare: 5.5 meters                           │
│ • Alteration Available: YES (Free custom fitting on waist & blouse)     │
│ • Fabric: Micro Velvet with Can-Can inner net layering                  │
├─────────────────────────────────────────────────────────────────────────┤
│ INCLUSIONS: Lehenga Skirt, Blouse, Double Dupatta, Garment Bag          │
│ VENDOR: Shubham Bridal Rentals (C.G. Road, Ahmedabad) ★ 4.8 (82)        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 3.4 Rental Booking & Calendar Availability Workflow

1. **Date Window Selection**:
   - Outfits are rented in standard blocks:
     - **Day 1 (Delivery / Pickup)**: Received 24 hours prior to event for trial & steaming.
     - **Day 2 (Event Day)**: Day of wedding/Garba.
     - **Day 3 (Return Day)**: Handover to courier or store drop-off before 2:00 PM.
2. **Dynamic Availability Calendar**:
   - Prevents double-booking. Once rented for 24th–26th Oct, the system blocks those dates plus a 2-day buffer for professional dry cleaning.
3. **Try-Before-You-Rent (Optional)**:
   - For premium bridal lehengas, users can book a 30-minute studio trial appointment via the app before paying the rental deposit.

---

### 3.5 Trust, KYC & Security Deposit Architecture

Rentals carry fraud risk (e.g., non-return, severe stains, damage). RoopSetu tackles this with a robust safety stack:

#### 1. Mandatory Client KYC Verification
- Digital Aadhaar OTP verification via Digilocker/Sandbox API before booking confirmation.
- Alternate contact number (family member or spouse) required.

#### 2. Refundable Security Deposit Flow
- Customer pays: `Total = Rental Fee + Security Deposit` (e.g., `₹5,000 Rent + ₹7,000 Deposit`).
- Deposit is securely held in an automated escrow account.
- Upon successful return and condition clearance, the deposit is automatically refunded to the customer's UPI/account within 24–48 hours.

#### 3. Damage & Condition Grading Matrix
- **Normal Wear & Tear (Covered)**: Minor loose threads, removable dirt on lower hemline.
- **Moderate Damage (Partial Deduction)**: Broken zipper, torn hook, repairable tear, wine/grease stain requiring dry-cleaning spot treatment (₹500–₹1,500 deduction).
- **Irreparable Loss / Theft (Full Forfeit)**: Burn marks, deep cuts, non-return within 7 days (deposit forfeited, legal notice issued).

---

### 3.6 Logistics, Pick-Up/Delivery & Alterations

#### Delivery Modes:
1. **Self Pick-Up & Return (Zero Delivery Fee)**: Client visits the boutique directly, does a quick final trial, and picks up the bagged outfit.
2. **Local Delivery via Hyperlocal Couriers (Porter / Dunzo / Borzo)**:
   - Dispatched in heavy-duty dustproof garment bags.
   - Return pickup scheduled on Day 3 with an OTP-verified handover.

#### Blouse & Fit Customization:
- Blouses feature 2-inch internal margin stitches for quick tightening/loosening.
- Saree/Lehenga rental includes a measurement guide where the user inputs Bust, Waist, and Height in centimeters.

---

## 4. Service 3: Beauty, Fashion & Trend Guide (The Organic SEO & Conversion Engine)

Content is not just an informational blog; it is RoopSetu's **primary customer acquisition vehicle**. It answers every question a prospective bride, festive celebrant, or style enthusiast searches online.

---

### 4.1 Content Pillars & Curated Categories

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BEAUTY GUIDE TOPIC CLUSTERS                     │
├─────────────────────────┬──────────────────────────┬───────────────────┤
│ 1. BRIDAL INSPIRATION   │ 2. FESTIVE & ETHNIC LOOKS│ 3. HAIR & NAILS   │
│ • Regional Bridal Looks │ • Navratri Chaniya Choli │ • Bridal Bun &    │
│   (Gujarati, Marwari,   │   Coordination Ideas     │   Floral Styles   │
│   Bengali, South Indian)│ • Diwali Glow Up Routine │ • Trending Gel    │
│ • Haldi & Sangeet Looks │ • Karwa Chauth Special   │   Nail Art 2026   │
│ • Reception Glam Makeup │ • Indo-Western Fusion    │ • Saree Draping   │
│   Trends                │   Styling Guide          │   Techniques      │
├─────────────────────────┴──────────────────────────┴───────────────────┤
│ 4. SKINCARE & PRE-BRIDAL COUNTDOWNS                                    │
│ • 3-Month Pre-Bridal Skincare Calendar                                 │
│ • Finding the Right Foundation Shade for Indian Undertones             │
│ • Airbrush vs. HD Makeup: Which Should You Choose for Summer Weddings? │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 4.2 Media Formats & Interactive Visual Lookbooks

- **Curated Lookbooks**: Horizontal swipeable image decks showing 360-degree views of a look (Front face, eye detail, hair accessory placement, outfit pairing).
- **Bite-Sized Tutorials & Video Reels**: Short 30-to-60-second transformation reels showcasing techniques (e.g., *"How to secure a heavy bridal dupatta with double pins"*).
- **Interactive Quizzes**: *"Find Your Ideal Bridal Makeup Style (Minimalist Dewy vs. Royal Matte Glam)"* — leads directly to filtered beautician recommendations.

---

### 4.3 The "Book & Rent The Look" Direct Conversion Engine

Every article or lookbook page features an embedded **Conversion Box**:

```
┌────────────────────────────────────────────────────────────────────────┐
│ ✦ FEATURED LOOK: "Pastel Royal Rajputi Bridal Look"                   │
│ As seen in the article: "Top 10 Royal Pastel Bridal Trends for 2026"   │
├────────────────────────────────────────────────────────────────────────┤
│ [ Photo of Model ]  MAKEUP ARTIST CREDITS:                             │
│                     • Created by: Priya Sharma (Ahmedabad)             │
│                     • Speciality: Airbrush Dewy Finish                 │
│                     [★ 4.9 (48)]  [ BOOK THIS ARTIST - ₹15,000 ]       │
├────────────────────────────────────────────────────────────────────────┤
│ [ Photo of Outfit ] MATCHING ATTIRE & JEWELRY RENTAL:                  │
│                     • Pastel Peach Zari Lehenga (Shubham Boutique)     │
│                     • Green Emerald Polki Choker Set (Kundan Classics) │
│                     [ RENT THIS OUTFIT - ₹6,500 ] [ RENT JEWELRY ]     │
└────────────────────────────────────────────────────────────────────────┘
```

This transforms reading into instant high-intent transactions.

---

### 4.4 Beautician-Generated Content & Portfolio Syndication

- Top verified beauticians can submit their real bridal transformations to be featured on the Beauty Guide.
- *Incentive for Beauticians*: Massive free exposure and high-converting inbound client leads.
- *Benefit for RoopSetu*: Hundreds of unique, authentic, high-quality content pieces without needing a large in-house editorial team.

---

### 4.5 Programmatic SEO & High-Intent Landing Pages

RoopSetu will automatically generate and rank hundreds of city/category search pages:
- `roopsetu.com/bridal-makeup-artists-in-ahmedabad`
- `roopsetu.com/mehendi-artists-in-surat`
- `roopsetu.com/rent-chaniya-choli-in-ahmedabad`
- `roopsetu.com/bridal-lehenga-on-rent-in-vadodara`
- `roopsetu.com/hair-stylists-in-mumbai`

Each page includes schema-marked FAQs, verified listings, price ranges, and customer reviews to dominate Google Search results.

---

## 5. Cross-Service Synergy & The "Complete Occasion" Bundle

The real competitive advantage of RoopSetu over isolated apps (like Urban Company, which only does generic beauty, or local rental shops, which have no tech) is **Event Synergy**:

```
                              WEDDING / FESTIVAL EVENT
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
1. Discover Look                2. Book Verified Artist          3. Rent Matching Attire
   in Beauty Guide                 from Service 1                   from Service 2
   (e.g., Garba Theme)             (Waterproof Makeup)              (Heavy Mirror Chaniya Choli)
        │                                │                                │
        └────────────────────────────────┼────────────────────────────────┘
                                         ▼
                            "ROOPSETU OCCASION PASS"
                • 10% discount on rental when booking makeup artist
                • Coordinated trial timing
```

---

## 6. Data Architecture & Prisma Schema Blueprint

To support all three services seamlessly, the relational schema builds upon your current `User` and `BeauticianProfile` models:

```prisma
// ==========================================
// CORE USERS & IDENTITY
// ==========================================

enum Role {
  CLIENT
  BEAUTICIAN
  VENDOR
  ADMIN
}

model User {
  id               String   @id @default(uuid())
  email            String   @unique
  phone            String?  @unique
  firstName        String?
  lastName         String?
  role             Role     @default(CLIENT)
  isEmailVerified  Boolean  @default(false)
  isPhoneVerified  Boolean  @default(false)
  profileCompleted Boolean  @default(false)

  // Relationships
  beauticianProfile BeauticianProfile?
  vendorProfile     RentalVendorProfile?
  clientBookings    Booking[]
  rentalOrders      RentalOrder[]
  reviews           Review[]
  savedLooks        SavedLook[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ==========================================
// SERVICE 1: BEAUTICIANS & SALONS
// ==========================================

model BeauticianProfile {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  profilePhoto    String?
  city            String
  area            String
  travelRadius    Int      @default(15) // In KM
  serviceLocation String   // "SALON", "HOME", "BOTH"
  salonName       String?
  about           String   @db.Text
  experienceYears Int
  primaryCategory String
  languages       String[]

  verificationStatus VerificationStatus @default(PENDING)
  governmentIdUrl    String?
  certificateUrl     String?

  services        BeauticianService[]
  portfolio       PortfolioImage[]
  bookings        Booking[]
  reviews         Review[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model BeauticianService {
  id           String            @id @default(uuid())
  beauticianId String
  beautician   BeauticianProfile @relation(fields: [beauticianId], references: [id], onDelete: Cascade)

  name         String
  category     String
  price        Int
  durationMins Int
  description  String?
  isHomeVisit  Boolean           @default(true)

  createdAt    DateTime          @default(now())
}

model PortfolioImage {
  id           String            @id @default(uuid())
  beauticianId String
  beautician   BeauticianProfile @relation(fields: [beauticianId], references: [id], onDelete: Cascade)

  imageUrl     String
  title        String?
  category     String?
  isFeatured   Boolean           @default(false)

  createdAt    DateTime          @default(now())
}

model Booking {
  id           String            @id @default(uuid())
  clientId     String
  client       User              @relation(fields: [clientId], references: [id])
  beauticianId String
  beautician   BeauticianProfile @relation(fields: [beauticianId], references: [id])

  serviceDate  DateTime
  timeSlot     String
  address      String?
  totalAmount  Int
  tokenPaid    Int               @default(0)
  status       BookingStatus     @default(PENDING) // PENDING, CONFIRMED, COMPLETED, CANCELLED

  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
}

// ==========================================
// SERVICE 2: RENTALS (ETHNIC WEAR & JEWELRY)
// ==========================================

model RentalVendorProfile {
  id             String   @id @default(uuid())
  userId         String   @unique
  user           User     @relation(fields: [userId], references: [id])

  storeName      String
  storeAddress   String
  city           String
  area           String
  gstin          String?
  verifiedStatus VerificationStatus @default(PENDING)

  items          RentalItem[]

  createdAt      DateTime @default(now())
}

model RentalItem {
  id             String              @id @default(uuid())
  vendorId       String
  vendor         RentalVendorProfile @relation(fields: [vendorId], references: [id])

  title          String
  category       RentalCategory      // CHANIYA_CHOLI, BRIDAL_LEHENGA, SAREE, JEWELRY, GOWN
  description    String              @db.Text
  images         String[]
  size           String              // "S", "M", "L", "FREE_SIZE", "CUSTOM"
  color          String
  fabric         String?
  
  pricePerDay    Int
  price3Days     Int
  price5Days     Int
  securityDeposit Int
  
  isAvailable    Boolean             @default(true)
  orders         RentalOrderItem[]

  createdAt      DateTime            @default(now())
}

model RentalOrder {
  id             String            @id @default(uuid())
  clientId       String
  client         User              @relation(fields: [clientId], references: [id])

  startDate      DateTime
  endDate        DateTime
  totalRent      Int
  depositAmount  Int
  depositStatus  DepositStatus     @default(HELD) // HELD, REFUNDED, DEDUCTED
  orderStatus    RentalOrderStatus @default(BOOKED) // BOOKED, DISPATCHED, RETURNED, INSPECTED

  items          RentalOrderItem[]

  createdAt      DateTime          @default(now())
}

model RentalOrderItem {
  id         String      @id @default(uuid())
  orderId    String
  order      RentalOrder @relation(fields: [orderId], references: [id])
  itemId     String
  item       RentalItem  @relation(fields: [itemId], references: [id])
}

// ==========================================
// SERVICE 3: BEAUTY GUIDE & ARTICLES
// ==========================================

model Article {
  id              String   @id @default(uuid())
  slug            String   @unique
  title           String
  summary         String   @db.Text
  contentMarkdown String   @db.Text
  coverImage      String
  category        String   // "BRIDAL", "NAILS", "HAIR", "FESTIVE", "SKINCARE"
  tags            String[]
  authorName      String

  // Direct Attribution Links
  taggedBeauticianIds String[] // Displays "Book this artist"
  taggedRentalItemIds String[] // Displays "Rent this outfit"

  viewsCount      Int      @default(0)
  isPublished     Boolean  @default(false)
  publishedAt     DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Review {
  id           String             @id @default(uuid())
  userId       String
  user         User               @relation(fields: [userId], references: [id])
  beauticianId String?
  beautician   BeauticianProfile? @relation(fields: [beauticianId], references: [id])

  rating       Int                // 1 to 5
  comment      String?            @db.Text
  photos       String[]

  createdAt    DateTime           @default(now())
}

model SavedLook {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  lookUrl   String
  imageUrl  String
  title     String

  createdAt DateTime @default(now())
}

enum VerificationStatus {
  PENDING
  VERIFIED
  REJECTED
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

enum RentalCategory {
  CHANIYA_CHOLI
  BRIDAL_LEHENGA
  SAREE
  JEWELRY
  GOWN
}

enum DepositStatus {
  HELD
  REFUNDED
  DEDUCTED
}

enum RentalOrderStatus {
  BOOKED
  DISPATCHED
  RETURNED
  INSPECTED
}
```

---

## 7. Startup Business Model & Monetization Strategy

| Stream | Mechanism | Projected Pricing | When to Implement |
| :--- | :--- | :--- | :--- |
| **Freemium Pro Subscriptions ("RoopSetu Pro")** | Beauticians get unlimited portfolio uploads, verified gold badge, top placement in local search, and direct WhatsApp lead generation. | ₹499 – ₹999 / month (or ₹4,999 / year) | Phase 2 (Once first 50–100 artists are active) |
| **Booking Token Commission** | Platform charges 5%–10% convenience fee on online advance booking deposits. | 5%–10% per transaction | Phase 2–3 |
| **Rental Vendor Marketplace Commission** | Rental boutiques pay a commission on every successful rental order processed through the platform. | 10%–15% of rental order value | Phase 4 |
| **Featured Festive Spotlights** | Prime banners on the Home page & Beauty Guide during peak demand seasons (Navratri, Diwali, Winter Wedding season). | ₹2,500 – ₹10,000 / week per banner | Peak Seasons |
| **Lead Generation Pay-Per-Lead** | For high-ticket bridal inquiries (₹20,000+ orders), artists pay a micro-fee (₹99) to unlock verified bride contact details. | ₹49 – ₹99 per verified bridal lead | Phase 3 |

---

## 8. Phased Rollout & Execution Roadmap

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      ROOPSETU EXECUTION TIMELINE                       │
 ├────────────────────────────────────────────────────────────────────────┤
 │ PHASE 1 (WEEKS 1–4): BEAUTICIAN MARKETPLACE MVP                        │
 │ • Public Search & Discovery Directory (/services)                      │
 │ • Public Beautician Profile Showcase (/beautician/[id])                │
 │ • WhatsApp Direct Lead Modal                                           │
 │ • Cloud Image Storage (Cloudinary/S3) for real portfolio uploads       │
 ├────────────────────────────────────────────────────────────────────────┤
 │ PHASE 2 (WEEKS 5–8): BOOKINGS, REVIEWS & ADMIN DASHBOARD               │
 │ • Admin KYC verification workflow (Approve/Reject beautician badges)   │
 │ • Verified client review & rating system                               │
 │ • Beautician Partner Dashboard for schedule and lead management        │
 ├────────────────────────────────────────────────────────────────────────┤
 │ PHASE 3 (WEEKS 9–12): BEAUTY GUIDE & SEO EXPANSION                     │
 │ • Dynamic Markdown/CMS for beauty articles and lookbooks               │
 │ • "Book This Look" direct attribution widget                           │
 │ • Programmatic SEO landing pages for target cities                     │
 ├────────────────────────────────────────────────────────────────────────┤
 │ PHASE 4 (MONTHS 4+): ETHNIC WEAR & JEWELRY RENTAL MARKETPLACE          │
 │ • Boutique vendor onboarding portal                                    │
 │ • Rental item cataloging & size measurement builder                    │
 │ • Rental calendar booking & automated security deposit escrow          │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 9. High-Growth Complementary Verticals & Future Market Trends (2025–2026)

To transform RoopSetu from a regional listing directory into an **end-to-end festive and wedding celebration ecosystem**, the following high-growth services can be phased into the platform. These services have strong market demand, high profit margins, and natural synergy with the existing core pillars.

---

### 9.1 Wedding & Event Content Creators (BTS Reel Makers)

#### The Market Shift
Traditional wedding photography takes 60 to 90 days to deliver albums and edited films. Today’s Gen-Z and millennial brides and festival celebrants want **high-definition candid reels, TikToks, and behind-the-scenes (BTS) content within 24 hours** to share on Instagram while the wedding or festival excitement is peak.

#### Service Offering & Workflow
- **Deliverables**: 3 to 5 polished 4K Instagram Reels (using trending Indian wedding/festive audio tracks), raw footage unboxing/hair/makeup transformations, and first-look family reveals.
- **Delivery SLA**: 24-hour turnaround guaranteed via Google Drive / Dropbox link.
- **Equipment**: Flagship mobile devices (iPhone Pro Max, Samsung Ultra) with professional handheld gimbals and wireless lapel mics (non-intrusive vs. bulky cinema cameras).

#### Win-Win Flywheel for RoopSetu
```
       Client books Content Creator via RoopSetu
                          │
                          ▼
       Creator records Beautician's Makeup & Rented Lehenga
                          │
                          ▼
       Reels posted on Instagram with @RoopSetu tag
                          │
                          ▼
   Massive Viral Reach & Inbound Client Referrals (0 Ad Spend)
```
- **Monetization**: Creators charge ₹12,000–₹35,000 per day; RoopSetu captures a **12% booking commission**.

---

### 9.2 Professional Saree, Dupatta & Safa/Pagdi Draping

#### The Market Pain Point
Over 70% of modern urban women struggle to pleat and secure heavy 6-to-9 yard silk sarees (Kanjivaram, Banarasi, Paithani) or pin double-dupatta bridal ensembles. Similarly, groom families require 20 to 50 royal Safas/Pagdis (turbans) tied within a tight 2-hour window on the Baraat morning.

#### Service Specifications
- **Saree & Dupatta Draping Packages**:
  - *Single Occasion Drape*: ₹1,500 – ₹3,500 per person.
  - *Bridal Double-Dupatta Pinning & Can-Can Adjustment*: ₹3,000 – ₹6,000.
  - *Bridal Party / Bridesmaids Group Package (4–8 people)*: ₹8,000 – ₹15,000.
- **Groom & Baraati Safa/Pagdi Tying**:
  - *Groom Royal Designer Safa*: ₹2,500 – ₹5,000.
  - *Baraat Bulk Tying*: ₹150 – ₹300 per turban (minimum order: 15–20 pieces).
- **Checkout Upsell Integration**:
  - When booking a makeup artist or renting an outfit, users receive a smart 1-click upsell:  
    *“Add a Certified Saree & Dupatta Draper to your appointment for just ₹1,499.”*

---

### 9.3 Dedicated Mehendi & Henna Artistry Marketplace

#### Why It Deserves a Specialized Module
While often grouped under general salon services, Mehendi is treated as an independent sacred ritual with specialized pricing (Bridal Mehendi ranges from ₹7,000 to ₹50,000+).

#### Feature Set
- **Design Style Categorization**: Traditional Indian Bridal, Arabic/Indo-Arabic, Minimalist Mandala, Portrait Henna (drawing the couple's faces), and Stain Guarantee (100% organic chemical-free henna with dark stain promise).
- **Ceremony Booking Calculator**: Input the number of guests (e.g., 20 family hands) ➔ Calculates the required number of assistant artists and total cost.
- **High-Demand Seasonal Spikes**: Peak booking campaigns around Karwa Chauth, Teej, Eid, and the winter wedding rush (November to February).

---

### 9.4 Fresh Haldi Floral Jewelry & Custom Press-On Nails

#### The Micro-Commerce Opportunity
Complementing service bookings with instant festive goods increases platform Average Order Value (AOV).

#### 1. Fresh & Dry Floral Haldi Jewelry
- Handcrafted necklaces, maang tikkas, floral hathphools, and earrings made from real or artificial jasmine, roses, and marigolds.
- **Logistics**: Local florist/artisan partners prepare and deliver sets the morning of the ceremony to preserve freshness.

#### 2. Reusable Designer "Press-On" Nails
- High-grade acrylic/gel festive press-on nails tailored for Navratri, Diwali, and bridal events.
- Reusable, applied in under 5 minutes with medical-grade glue tabs, eliminating ₹2,500 salon extension costs and nail damage.
- Delivered directly to consumer doorsteps via courier within 2 to 3 days.

---

### 9.5 AI Virtual Try-On & Augmented Reality Preview

#### Technology Application
Integrated as a progressive web application (PWA) browser tool without requiring native app downloads:
- **Virtual Jewelry Try-On (AR)**: Users allow camera access to see how heavy Kundan, Polki, or Temple necklaces and earrings look against their neck, collarbone, and face shape before renting.
- **Lipstick & Foundation Shade Matcher**: AI analyzes selfie undertones (warm, cool, neutral, olive) and recommends the exact foundation shades and lipstick palettes for wedding day photography.
- **Conversion Metric**: Virtual try-on tools reduce rental returns by up to 40% and increase checkout completion by 35%.

---

### 9.6 "RoopSetu Pre-Loved" Circular Fashion Resale

#### The Sustainable Luxury Model
Thousands of brides own luxury bridal lehengas that were worn once for 6 hours and now sit in storage indefinitely.

#### Workflow
1. **Seller Listing**: A bride uploads photos, purchase bill, designer label, and condition details.
2. **Quality & Sanitization Check**: RoopSetu partners with local dry cleaners to inspect fabric condition, embellishments, and hygiene.
3. **Escrow Purchase**: The buyer pays online; funds are released to the seller only after the buyer confirms receipt and satisfaction.
4. **Platform Fee**: RoopSetu captures a **15% to 20% consignment fee** per transaction.

---

### 9.7 Comprehensive Ecosystem Matrix

| Expansion Vertical | Rollout Phase | Target Margin / Fee | Primary Integration Point |
| :--- | :--- | :--- | :--- |
| **Saree & Dupatta Draping** | Phase 1 (MVP Add-on) | 10%–15% commission | Checkout add-on with Beauticians |
| **Dedicated Mehendi Artists** | Phase 1 (MVP Add-on) | 10%–15% commission | Sub-category in Service 1 Directory |
| **BTS Wedding Content Creators** | Phase 2 (Growth) | 12%–15% commission | Cross-sell with Bridal Packages |
| **Press-On Nails & Floral Jewelry** | Phase 2 (Growth) | 20% margin on sales | Micro-store in Beauty Guide |
| **AI Virtual Try-On Preview** | Phase 3 (Expansion) | Drives rental conversions | Service 2 Rental Product Pages |
| **Pre-Loved Lehenga Resale** | Phase 4 (Scale) | 15%–20% consignment | Service 2 Rental / Buy Marketplace |

---

*This document serves as the operational and engineering blueprint for RoopSetu's development and market rollout.*

