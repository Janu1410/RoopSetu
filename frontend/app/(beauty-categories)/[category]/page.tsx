import { notFound } from "next/navigation";
import { beautyCategories } from "@/constants/beauty-data";
import Navbar from "@/components/home/Navbar/Navbar";
import CategoryGalleryView from "@/components/beauty-guide/CategoryGalleryView";
import LuxuryFooter from "@/components/home/LuxuryFooter";

export function generateStaticParams() {
  return beautyCategories.map((category) => ({
    category: category.href.replace("/beauty-categories/", "").replace("/", ""),
  }));
}

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Find the matching category by checking the href or id
  const categoryData = beautyCategories.find(
    (c) =>
      c.href === `/beauty-categories/${category}` ||
      c.href === `/${category}` ||
      c.id === category
  );

  if (!categoryData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2B1B20]">
      <Navbar />
      <CategoryGalleryView categoryData={categoryData} />
      <LuxuryFooter />
    </main>
  );
}
