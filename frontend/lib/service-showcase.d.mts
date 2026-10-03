import type { LookCategory } from "../constants/beauty-data";

export type ServiceEntry = {
  id: string;
  title: string;
  href: string;
  description: string;
  image: string;
  alt: string;
  objectPosition: string;
};

export function buildServiceEntries(
  categories: LookCategory[],
  priorityIds?: string[],
): ServiceEntry[];
