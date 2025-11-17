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
import SectionReveal from "./SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = ({ data }: { data: HomeProps['fourthSection'] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imgRef.current || !imageLoaded) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        scale: 1.8,
        xPercent: -5,
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [imageLoaded]);

  return (
    <>
      <SectionReveal revealType="square" className="w-full">
        <motion.section
          className="w-full relative max-w-[1920px] mx-auto overflow-hidden 2xl:h-screen py-10 md:py-28 2xl:py-0"
          initial={{ opacity: 0, scale: 0.9, rotate: -4, x: -100 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Loading skeleton/placeholder */}
          {!imageLoaded && (
            <div className="w-full h-full absolute z-10 top-0 right-0 bg-gray-800 animate-pulse" />
          )}

          <Image
            src={data.image}
            ref={imgRef}
            alt="Video"
            width={1920}
            height={950}
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onLoadingComplete={() => setImageLoaded(true)}
            className={`w-full h-full object-cover absolute z-10 top-0 right-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            sizes="100vw"
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
                text={data.title}
                className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.2] text-white w-full md:w-3/4 font-light lettersp-4 text-center md:text-left"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="words"
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

              <motion.button
                onClick={openPopup}
                className="text-md md:text-lg 2xl:text-xl font-light justify-center md:justify-start flex text-white gap-5 items-center cursor-pointer group"
                variants={playFadeUp}
                aria-label="Play video"
              >
                <span className="group-hover:opacity-80 transition-opacity">Play</span>
                <div className="relative w-[95px] h-[95px] flex items-center justify-center">
                  <Image
                    src="/assets/home/play-icon.svg"
                    alt="Play"
                    width={95}
                    height={95}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="group-hover:opacity-80 transition-opacity">Here</span>
              </motion.button>
            </motion.div>
          </div>

          <div className="w-full h-full bg-[linear-gradient(90deg,_rgba(0,_0,_0,_0.9)_8.98%,_rgba(0,_0,_0,_0)_83.88%)] absolute top-0 left-0 z-20"></div>
        </motion.section>
      </SectionReveal>

      {/* Popup - Moved outside SectionReveal for proper z-index control */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex justify-center items-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute -top-12 md:-top-20 right-0 text-white text-lg md:text-lg z-50 w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform bg-white/10 rounded-full backdrop-blur-sm"
                aria-label="Close video"
              >
                ✕
              </button>

              {/* YouTube Embed */}
              <iframe
                src={`${data.videoLink}${data.videoLink.includes('?') ? '&' : '?'}autoplay=1`}
                title="Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoSection;