import Navbar from "@/components/home/Navbar/Navbar";
import { beautyCategories } from "@/constants/beauty-data";
import CategoryHubSection from "@/components/beauty-guide/CategoryHubSection";

export const metadata = {
  title: "Beauty Categories | RoopSetu",
  description: "Explore all beauty categories from Nails to Bridal looks.",
};

export default function BeautyCategoriesHubPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230]">
      <Navbar />
      
      <div className="pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7A0B2E]">
            Explore Collections
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-[#2B1B20] sm:text-5xl lg:text-6xl">
            Beauty Inspiration Hub
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#6F6267] sm:text-[16px]">
            Discover curated looks, tutorials, and endless inspiration across all our beauty categories. Find the perfect style for your next big moment.
          </p>
        </div>
      </div>

      <div className="space-y-24 pb-24 sm:space-y-32 sm:pb-32">
        {beautyCategories.map((category, index) => (
          <CategoryHubSection 
            key={category.id} 
            category={category} 
            reverse={index % 2 !== 0} 
          />
        ))}
      </div>
    </main>
  );
}
