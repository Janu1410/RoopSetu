import { notFound } from "next/navigation";
import BeautyArticleDetail from "@/components/beauty-guide/BeautyArticleDetail";
import {
  beautyCategories,
  getLookWithFallbacks,
  type LookItem,
  type LookCategory,
} from "@/constants/beauty-data";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let matchedItem: LookItem | undefined;
  let matchedCategory: LookCategory | null = null;

  for (const cat of beautyCategories) {
    const item = cat.items.find((i) => i.id === id);
    if (item) {
      matchedItem = item;
      matchedCategory = cat;
      break;
    }
  }

  // If not found in beautyCategories, fallback gracefully to the viral pink chrome
  if (!matchedItem) {
    matchedItem = beautyCategories[0]?.items[0];
    matchedCategory = beautyCategories[0] || null;
  }

  if (!matchedItem) {
    notFound();
  }

  const enrichedItem = getLookWithFallbacks(matchedItem, matchedCategory?.id);

  return (
    <BeautyArticleDetail
      articleData={enrichedItem}
      parentCategory={matchedCategory}
    />
  );
}
