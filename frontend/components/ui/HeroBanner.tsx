"use client";

import { motion } from "framer-motion";
import React from "react";

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  backgroundImageUrl?: string;
}

export function HeroBanner({
  title,
  subtitle,
  backgroundImageUrl,
}: HeroBannerProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
      {backgroundImageUrl ? (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-80" />
      )}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 font-medium"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
