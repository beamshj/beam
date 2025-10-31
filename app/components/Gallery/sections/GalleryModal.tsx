"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  title: string;
  gallery: string[];
  description: string;
}

interface GalleryModalProps {
  item: GalleryItem; // single album item
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? item.gallery.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === item.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75"
    >
      <div className="container overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute bg-black/75 inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative z-10 w-full overflow-y-auto">
          {/* Header */}
          <div className="relative flex items-center justify-center mb-[15px]">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-white text-lg lg:text-xl font-light leading-[1.2] md:text-center w-full">
              {item.title.length > 15
                ? item.title.slice(0, 15) + "..."
                : item.title}
            </div>

            <button
              onClick={onClose}
              className="ml-auto mr-1 text-white text-[60px] font-extralight z-20 cursor-pointer hover:scale-110 hover:text-primary transition-all duration-300"
            >
              &times;
            </button>
          </div>

          {/* Image Viewer */}
          <div className="rounded-[12px] flex flex-col items-center justify-center relative w-full">
            {/* Prev */}
            <div
              onClick={goPrev}
              className="absolute left-0 lg:top-1/2 top-0 lg:-translate-y-1/2 translate-y-0 cursor-pointer flex items-center justify-center w-[42px] h-[42px] border rounded-full hover:bg-primary transition-colors duration-300"
            >
              <SlArrowLeft className="text-white" />
            </div>

            {/* Image */}
            <div className="relative mt-14 lg:mt-0 w-full lg:w-[800px] rounded-[12px] xl:w-[1000px] 2xl:w-[1264px] h-[350px] 2xl:h-[640px] max-h-[640px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.gallery[currentIndex]}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.gallery[currentIndex]}
                    alt={`slide-${currentIndex}`}
                    fill
                    className="object-cover rounded-[12px]"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </motion.div>

                {/* Overlay background (auto height) */}
                <div className="absolute bottom-0 left-0 w-full bg-black/54 rounded-b-[12px] p-[14px] md:p-[24px] xl:p-[30px]">
                  <p className="text-white text-[13px] md:text-xs font-light leading-[1.526315789473684] text-center">
                    {item.description}
                  </p>
                </div>
              </AnimatePresence>
            </div>

            {/* Next */}
            <div
              onClick={goNext}
              className="absolute right-0 lg:top-1/2 top-0 lg:-translate-y-1/2 translate-y-0 cursor-pointer border p-3 w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
            >
              <SlArrowRight className="text-white" />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap justify-center items-center mt-[15px] lg:mt-[30px] gap-[10px]">
            {item.gallery.map((img, idx) => {
              const isActive = currentIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => selectImage(idx)}
                  className="relative flex items-center justify-center rounded-[12px] overflow-hidden cursor-pointer transition-all duration-200"
                >
                  <div className="relative rounded-[12px] flex items-center justify-center w-[80px] h-[60px] lg:w-[102px] lg:h-[73px]">
                    <Image
                      src={img}
                      alt={`thumb-${idx}`}
                      fill
                      className="object-cover rounded-[12px] w-full h-full"
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-primary/50 rounded-[12px] pointer-events-none transition-opacity duration-200" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

export default GalleryModal;
