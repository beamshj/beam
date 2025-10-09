"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryModal from "./GalleryModal";

const filters = ["all", "school", "alumni"];

export interface GalleryItem {
  category: string;
  title: string;
  images: string[];
}

export interface GalleryList {
  title: string;
  items: GalleryItem[];
}

export default function GalleryList({ data }: { data: GalleryList }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? data.items
      : data.items.filter(
          (item) => item.category.toLowerCase() === activeFilter
        );

  return (
    <section className="py-10 xl:py-20 2xl:py-[135px]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-5 2xl:pb-[31px] mb-10 2xl:mb-[65px] border-b border-bdrcolor">
          <h2 className="text-lg md:text-xl xl:text-3xl 2xl:text-4xl font-light text-black leading-[1.1111] mb-6 lg:mb-0">
            {data.title}
          </h2>

          {/* Filters */}
          <div className="flex gap-3">
            {filters.map((f) => (
              <button
                key={f}
                className={`px-[20px] py-[11px] text-xs text-black rounded-[50px] border border-bdrcolor font-light ${
                  activeFilter === f ? "bg-[#C9F3FF]" : "bg-white"
                }`}
                onClick={() => setActiveFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] 2xl:gap-[33px]">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="relative w-full 2xl:w-[485px] h-[380px] xl:h-[480px] 2xl:h-[551px] rounded-[12px] overflow-hidden cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              {/* Main Image */}
              <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
              {/* Black Gradient (always visible) */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)`,
                }}
              />

              {/* Blue Gradient (only on hover, slides from bottom) */}
              <div className="absolute inset-0 pointer-events-none transform translate-y-full group-hover:translate-y-0 transition-transform duration-400"
                style={{
                  background: `linear-gradient(180.09deg, rgba(0,0,0,0) 50.09%, rgba(66,186,220,0.75) 99.92%)`,
                }}
              />

              {/* Hover Arrow */}
              <div className="absolute top-[30px] right-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-primary text-white w-[74px] h-[74px] rounded-full flex items-center justify-center">
                  <Image
                    src="/images/arrow-right-up.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* Title & Thumbnails */}
              <div className="absolute bottom-[20px] left-[20px] lg:bottom-[40px] lg:left-[40px] text-white z-10">
                <h3 className="text-md lg:text-lg xl:text-xl font-light leading-[1.2] mb-[10px]">
                  {item.title}
                </h3>

                <div className="flex -space-x-3">
                  {item.images.slice(1, 5).map((img, idx) => {
                    const isLast = idx === 3 && item.images.length > 4;
                    return (
                      <div
                        key={idx}
                        className="relative w-[33px] h-[33px] rounded-full overflow-hidden border-[1.1px] border-white"
                      >
                        <img
                          src={img}
                          alt={`thumb-${idx}`}
                          className="w-full h-full object-cover"
                        />
                        {isLast && (
                          <div className="absolute inset-0 bg-primary flex items-center justify-center text-xs md:text-sm font-medium">
                            +{item.images.length - 4}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {selectedItem && (
        <GalleryModal
          item={{
            title: selectedItem.title,
            gallery: selectedItem.images, // map images → gallery
          }}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
