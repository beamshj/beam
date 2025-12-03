"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  container,
  lineFade,
  playFadeUp,
} from "@/public/assets/FramerAnimation/animation";
import SplitText from "@/components/SplitText";
import { SchoolAchievementsProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";


const ProudMoments: React.FC<{data: SchoolAchievementsProps['firstSection']}> = ({ data }) => {
  // const { title, vdoLink, photo } = data;
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const t = useApplyLang(data)

  return (
    <div className="container  overflow-hidden">
      <div className="border-b border-bdrcolor py-10 xl:py-20 2xl:py-[135px] ">
        <motion.div
        className="relative w-full h-[300px]  md:h-[450px] xl:h-[600px] 2xl:h-[739px] overflow-hidden rounded-[12px]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        {/* Background Image */}
        <Image
          src={t.image}
          alt={t.imageAlt}
          fill
          className="object-cover absolute top-0 left-0 z-10 rounded-[12px]"
        />

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-[linear-gradient(90deg,_rgba(0,0,0,0.9)_9%,_rgba(0,0,0,0)_84%)]"></div>

        {/* Content */}
        <div className="relative z-30 h-full flex items-end px-5 md:px-10 xl:px-[97px] bottom-5 md:bottom-10  xl:bottom-[74px]">
          <motion.div
            className="flex flex-col w-full"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-white">
              <SplitText
                tag="span"
                text={t.title}
                className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.2] w-full md:max-w-[65%] font-light tracking-[0.04em] text-center md:text-left lettersp-4"
                delay={60}
                duration={0.3}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </h2>

            <motion.div
              className="w-full md:w-3/4 h-[1px] bg-gradient-to-r from-white to-transparent origin-left mt-5 xl:mt-[49px] mb-5 xl:mb-[68px]"
              variants={lineFade}
            />

            <motion.div
              className="flex items-center gap-3 md:gap-5 text-white text-md md:text-lg 2xl:text-xl font-light justify-start"
              variants={playFadeUp}
            >
              <span>Play</span>
              <Image
                src="/assets/home/play-icon.svg"
                alt="Play"
                width={95}
                height={95}
                onClick={openPopup}
                className="cursor-pointer w-10 h-10 md:w-15 md:h-15 xl:w-[95px] xl:h-[95px] transition-transform duration-300 hover:scale-105"
              />
              <span>Here</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Popup */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-[90%] max-w-4xl aspect-video"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Close button */}
                <button
                  onClick={closePopup}
                  className="absolute top-0 right-0 text-white text-2xl z-10 cursor-pointer p-2"
                >
                  ✕
                </button>

                {/* YouTube Embed */}
                <iframe
                  src={t.videoLink}
                  title="Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
    </div>
  );
};

export default ProudMoments;
