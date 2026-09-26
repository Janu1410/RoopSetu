import { notFound } from "next/navigation";
import { beautyCategories } from "@/constants/beauty-data";
import Navbar from "@/components/home/Navbar/Navbar";
import CategoryGalleryView from "@/components/beauty-guide/CategoryGalleryView";

export function generateStaticParams() {
  return beautyCategories.map((category) => ({
    category: category.href.replace("/", ""),
  }));
}

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Find the matching category by checking the href
  const categoryData = beautyCategories.find(
    (c) => c.href === `/${category}` || c.id === category,
  );

  if (!categoryData) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <CategoryGalleryView categoryData={categoryData} />
    </>
  );
}
