"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
}

export function ArticleCard({
  id,
  title,
  excerpt,
  imageUrl,
  category,
}: ArticleCardProps) {
  return (
    <Link href={`/articles/${id}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 uppercase tracking-wider">
            {category}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{excerpt}</p>
          <div className="mt-auto flex items-center text-sm font-medium text-pink-600">
            Read article
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
