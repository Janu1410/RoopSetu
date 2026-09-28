import { notFound } from "next/navigation";
import ArticleDetailView from "@/components/beauty-guide/ArticleDetailView";
import {
  beautyCategories,
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

  return (
    <ArticleDetailView
      articleData={matchedItem}
      parentCategory={matchedCategory}
    />
  );
}
