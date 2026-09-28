import { notFound } from "next/navigation";
import ArticleDetailView from "@/components/beauty-guide/ArticleDetailView";
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
      matchedItem = getLookWithFallbacks(item, cat.id);
      matchedCategory = cat;
      break;
    }
  }

  // Fallback gracefully to first look if slug not found
  if (!matchedItem && beautyCategories[0]?.items[0]) {
    matchedItem = getLookWithFallbacks(
      beautyCategories[0].items[0],
      beautyCategories[0].id
    );
    matchedCategory = beautyCategories[0];
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
