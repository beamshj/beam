"use client";

import Image from "next/image";
import { useState } from "react";

export interface ValueItem {
  number: string;
  title: string;
  points: string[];
  image: string;
}

interface Props {
  values: ValueItem[];
}

export default function ValuesGrid({ values }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
      <div className="grid grid-cols-5 gap-4">
        {values.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 group cursor-pointer"
          >
            {/* Background image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={`
                object-cover transition-all duration-300 group-hover:scale-105
                ${
                  hovered === index
                    ? "brightness-100"
                    : "brightness-75 grayscale"
                }
              `}
            />

            {/* Overlay */}
            <div
              className={`
                absolute inset-0 z-10 flex flex-col justify-between p-4 text-white transition-all duration-300  
                ${
                  hovered === index
                    ? "bg-gradient-to-b from-black/60 to-black/90"
                    : "bg-black/40"
                }
              `}
            >
              <div className="text-lg font-medium">{item.number}</div>

              <div
                className={`text-xl font-semibold transition-all duration-300 ${
                  hovered === index
                    ? "self-start mt-2"
                    : "self-center mt-auto mb-auto"
                }`}
              >
                {item.title}
              </div>

              {hovered === index && item.points.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm">
                  {item.points.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
