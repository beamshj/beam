"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { moveUp } from "../../motionVarients";

type Member = {
  id: number;
  name: string;
  designation: string;
  image: string;
  bullets?: string[];
};

type Slide = Member & {
  left: number;
  width: number;
  height: number;
  zIndex: number;
  isActive: boolean;
};

export default function LeadershipCarousel({ data }: { data: Member[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  ); // default for SSR
  const [mounted, setMounted] = useState(false);
  const [containerPaddingRight, setContainerPaddingRight] = useState(0);

  const n = data.length;
  const gap = 40;

  const sizes = {
    active: {
      "2xl": { w: 459, h: 653 },
      xl: { w: 400, h: 580 },
      lg: { w: 280, h: 370 },
      md: { w: 240, h: 350 },
      sm: { w: 220, h: 300 },
    },
    nonActive: {
      "2xl": { w: 255, h: 255 },
      xl: { w: 220, h: 220 },
      lg: { w: 160, h: 160 },
      md: { w: 140, h: 140 },
      sm: { w: 120, h: 120 },
    },
  };

  // Update windowWidth on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Safe size getters
  const getSafeActiveSize = () => {
    if (windowWidth >= 1536) return sizes.active["2xl"];
    if (windowWidth >= 1280) return sizes.active.xl;
    if (windowWidth >= 1024) return sizes.active.lg;
    if (windowWidth >= 768) return sizes.active.md;
    return { w: windowWidth - 32, h: 420 }; // mobile fallback
  };

  const getSafeNonActiveSize = () => {
    if (windowWidth >= 1536) return sizes.nonActive["2xl"];
    if (windowWidth >= 1280) return sizes.nonActive.xl;
    if (windowWidth >= 1024) return sizes.nonActive.lg;
    if (windowWidth >= 768) return sizes.nonActive.md;
    return { w: 0, h: 0 }; // hide non-active on tablet/mobile
  };

  const activeSize = getSafeActiveSize();
  const nonActiveSize = getSafeNonActiveSize();

  const getMaxNonActive = () => {
    if (windowWidth >= 1536) return 3;
    if (windowWidth >= 1024) return 2;
    if (windowWidth >= 768) return 1;
    return 0; // tablet/mobile shows only active
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % n);
  };

  const slidesWithPosition = (): Slide[] => {
    const maxNonActive = getMaxNonActive();
    const visibleSlides: Slide[] = [];

    for (let i = 0; i <= maxNonActive; i++) {
      const realIndex = (activeIndex + i) % n;
      const isActive = i === 0;

      const width = isActive ? activeSize.w : nonActiveSize.w;
      const height = isActive ? activeSize.h : nonActiveSize.h;

      // ACTIVE slide always on the rightmost
      const left = (() => {
        if (isActive) return maxNonActive * (nonActiveSize.w + gap); // active always rightmost
        // Position non-active slides behind active
        return (maxNonActive - i) * (nonActiveSize.w + gap);
      })();

      const zIndex = isActive ? 20 : 10 + (maxNonActive - i);

      visibleSlides.push({
        ...data[realIndex],
        left,
        width,
        height,
        zIndex,
        isActive,
      });
    }

    return visibleSlides;
  };

  const slides = slidesWithPosition();
  const activeSlide = data[activeIndex];

  useLayoutEffect(() => {
    // Try to find the nearest container on mount
    const container = document.querySelector(
      ".container"
    ) as HTMLElement | null;
    if (!container) return;

    const updatePadding = () => {
      const rect = container.getBoundingClientRect();
      setContainerPaddingRight(window.innerWidth - rect.right);
    };

    updatePadding(); // initial
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-[400px] w-full bg-gray-100 rounded-[12px]" />;
  }
  return (
    <section className="overflow-hidden mx-auto max-w-[1920px] py-10 xl:py-20 2xl:py-[135px] ">
      <div className="container flex flex-col 2xl:hidden h-full mb-[30px] lg:mb-[35px]">
        <motion.h1
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-[1.111] font-light mb-3 xl:mb-[30px] 2xl:mb-[50px] text-black lettersp-4 pl-2"
        >
          Schools’ Leadership Team
        </motion.h1>
        <motion.p
          variants={moveUp(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-sm font-light leading-[1.52] mb-3 xl:mb-[30px] 2xl:mb-[50px] text-colorpara pl-2"
        >
          Our leadership team brings together a wealth of experience, vision,
          and passion. With a strong commitment to excellence and innovation,
          they guide our journey forward — empowering teams, shaping strategy,
          and driving meaningful impact every step of the way.
        </motion.p>
      </div>
      <div
        className={`flex flex-col md:flex-row gap-[15px] md:gap-[36px] lg:gap-[56px] items-stretch ${
          windowWidth < 1024 ? "container" : ""
        }`}
        style={{ paddingRight: windowWidth < 1024 ? 0 : containerPaddingRight }}
      >
        {/* Slides container */}
        <div
          className="relative flex items-stretch justify-center"
          style={{
            width:
              windowWidth < 768
                ? "100%"
                : activeSize.w + getMaxNonActive() * (nonActiveSize.w + gap),
            height: windowWidth < 768 ? 420 : activeSize.h,
          }}
        >
          <div
            style={{
              marginLeft: containerPaddingRight,
            }}
            className="hidden 2xl:block absolute top-0 left-0 max-w-[50%] h-full"
          >
            <motion.h1
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-[1.111] font-light mb-3 xl:mb-[30px] 2xl:mb-[50px] text-black lettersp-4 pl-2"
            >
              Schools’ Leadership Team
            </motion.h1>
            <motion.p
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-sm font-light leading-[1.52]  text-colorpara"
            >
              Our leadership team brings together a wealth of experience,
              vision, and passion. With a strong commitment to excellence and
              innovation, they guide our journey forward — empowering teams,
              shaping strategy, and driving meaningful impact every step of the
              way.
            </motion.p>
          </div>
          {slides.map((m) => (
            <motion.div
              key={m.id}
              className="absolute bottom-0 rounded-[12px] overflow-hidden cursor-pointer"
              animate={{
                left: m.left,
                width: m.width,
                height: m.height,
                zIndex: m.zIndex,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={() => setActiveIndex(m.id - 1)}
            >
              <Image
                src={m.image}
                alt={m.name}
                width={Math.max(1, Math.round(m.width))}
                height={Math.max(1, Math.round(m.height))}
                className={`w-full h-full object-cover ${
                  !m.isActive ? "saturate-0" : ""
                }`}
              />

              {m.isActive && (
                <div className="absolute left-0 bottom-0 right-0 w-full h-[50%] bg-gradient-to-b from-transparent to-[#42BADC]" />
              )}
              {!m.isActive && (
                <div className="absolute inset-0 bg-black/40 rounded-[12px]" />
              )}
            </motion.div>
          ))}
        </div>
        {/* Active Slide Content */}
        <div className="w-fit flex flex-col justify-between mt-3 md:mt-0">
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-sm text-[#666666] font-light"
          >
            <span className="text-black">{"0" + n}</span>/
            {"0" + (activeIndex + 1)}
          </motion.p>
          <div>
            <motion.h3
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-xl font-light text-black"
            >
              {activeSlide.name}
            </motion.h3>
            <motion.p
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-sm text-[#666666] mt-[30px]"
            >
              {activeSlide.designation}
            </motion.p>
            <motion.ul
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-[50px] space-y-2 text-sm text-black"
            >
              {activeSlide.bullets?.map((b, i) => (
                <motion.li
                  key={i}
                  variants={moveUp(i * 0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex items-start gap-[13px]"
                >
                  <span className="mt-1">
                    <Image
                      src="/images/arrow-black.svg"
                      alt="arrow-right"
                      width={14}
                      height={14}
                      className="w-[14px] h-[14px] rotate-45"
                    />
                  </span>
                  <span>{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 flex justify-start"
          >
            <button
              onClick={next}
              className="w-[50px] h-[50px] 2xl:w-[75px] 2xl:h-[75px] rounded-full border border-bdrcolor flex items-center justify-center transition-all hover:scale-105"
            >
              <Image
                src="/images/arrow-primary.svg"
                alt="arrow-right"
                width={20}
                height={20}
                className="w-[20px] h-[20px] rotate-45"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
