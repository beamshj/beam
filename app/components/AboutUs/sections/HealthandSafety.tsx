"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HealthSafetyProps {
  title: string;
  description: string;
  items: {
    id: number;
    title: string;
    image: string;
  }[];
}

export default function HealthSafety({
  title,
  description,
  items,
}: HealthSafetyProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-stretch">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed max-w-lg">
            {description}
          </p>

          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={`flex items-center justify-between border-b border-gray-200 pb-2 cursor-pointer transition-all duration-200 ${
                  active === index
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
                onMouseEnter={() => setActive(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-medium">
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <span>{item.title}</span>
                </div>

                {active === index && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-blue-500"
                  >
                    →
                  </motion.span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={items[active].image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={items[active].image}
                  alt={items[active].title}
                  fill
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
