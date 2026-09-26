import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const featuredCategories = [
  {
    title: "Bridal Makeup",
    description: "Expert guides for your big day",
    imageUrl:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2000&auto=format&fit=crop",
    link: "/category/bridal",
  },
  {
    title: "Everyday Skincare",
    description: "Routines for glowing skin",
    imageUrl:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop",
    link: "/category/skincare",
  },
];

export function EditorialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">
              Editorial Beauty Guides
            </h2>
            <p className="text-gray-600 max-w-xl">
              Dive deep into human-written, expert-curated beauty routines and
              tips.
            </p>
          </div>
          <Link
            href="/category/bridal"
            className="hidden md:inline-flex items-center text-pink-600 font-semibold hover:text-pink-700 transition-colors group"
          >
            See All Articles
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group block relative h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <Image
                src={cat.imageUrl}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-pink-400 font-medium uppercase tracking-wider text-sm mb-2">
                  {cat.description}
                </p>
                <h3 className="text-3xl font-serif text-white">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/category/bridal"
            className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-pink-600 text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-colors"
          >
            See All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
