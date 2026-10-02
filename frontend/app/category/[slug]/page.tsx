import { HeroBanner } from "@/components/ui/HeroBanner";
import { ArticleCard } from "@/components/ui/ArticleCard";

// Mock data for the category
const categoryData = {
  title: "Bridal Makeup",
  subtitle: "Explore our collection of stunning bridal looks and tips.",
  backgroundImage:
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop",
  articles: [
    {
      id: "1",
      title: "10 Essential Tips for Long-Lasting Bridal Makeup",
      excerpt:
        "Ensure your makeup looks flawless from the morning prep to the final dance with these expert tips.",
      imageUrl:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2000&auto=format&fit=crop",
      category: "Bridal",
    },
    {
      id: "2",
      title: "Choosing the Right Foundation for Your Big Day",
      excerpt:
        "A comprehensive guide to matching your skin tone and type for the perfect bridal glow.",
      imageUrl:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2000&auto=format&fit=crop",
      category: "Makeup",
    },
    {
      id: "3",
      title: "The Ultimate Pre-Wedding Skincare Routine",
      excerpt:
        "Start prepping your skin months in advance with this esthetician-approved routine.",
      imageUrl:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop",
      category: "Skincare",
    },
    {
      id: "4",
      title: "Trending Hair Styles for Modern Brides",
      excerpt:
        "From messy updos to sleek waves, discover the most requested hairstyles this wedding season.",
      imageUrl:
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000&auto=format&fit=crop",
      category: "Hair",
    },
  ],
};

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeroBanner
        title={categoryData.title}
        subtitle={categoryData.subtitle}
        backgroundImageUrl={categoryData.backgroundImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
