"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  container,
  lineFade,
  playFadeUp,
} from "@/public/assets/FramerAnimation/animation";
import SplitText from "@/components/SplitText";
import { HomeProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";

gsap.registerPlugin(ScrollTrigger);
const VideoSection = ({ data }: { data: HomeProps["fourthSection"] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const t = useApplyLang(data);

  useEffect(() => {
    if (!imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        scale: 1.8, // zoom in slightly
        xPercent: -5, // subtle pan left
        yPercent: -3, // subtle pan up
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom", // start when entering viewport
          end: "bottom top", // end when leaving
          scrub: true, // smooth sync with scroll
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      className="w-full relative max-w-[1920px] mx-auto overflow-hidden 2xl:h-screen py-10 md:py-28 2xl:py-0"
      initial={{ opacity: 0, scale: 0.9, rotate: -4, x: -100 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Image
        src={t.image}
        ref={imgRef}
        alt="Video"
        width={1920}
        height={950}
        className="w-full h-full object-cover absolute z-10 top-0 right-0"
      />
      <div className="container flex items-center h-full">
        <motion.div
          className="relative z-30 flex flex-col gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SplitText
            tag="h2"
            text={t.title}
            className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.2] text-white w-full md:w-3/4 font-light lettersp-4 text-center md:text-left"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />

          <motion.div
            className="w-full md:w-3/4 h-px bg-gradient-to-r from-white to-transparent origin-left"
            variants={lineFade}
          ></motion.div>
          <motion.div
            className="text-md md:text-lg 2xl:text-xl font-light justify-center md:justify-start flex text-white gap-5 items-center"
            variants={playFadeUp}
          >
            <span>Play</span>
            <Image
              src="/assets/home/play-icon.svg"
              alt="Play"
              width={95}
              height={95}
              onClick={openPopup}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            />
            <span>Here</span>
          </motion.div>

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
                    className="absolute top-0 right-0 text-white text-lg z-10 cursor-pointer"
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
                  ></iframe>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="w-full h-full  bg-[linear-gradient(90deg,_rgba(0,_0,_0,_0.9)_8.98%,_rgba(0,_0,_0,_0)_83.88%)] absolute top-0 left-0 z-20"></div>
    </motion.section>
  );
};

export default VideoSection;
