"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVarients";
import { AboutProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import LangLink from "@/lib/LangLink";

export default function MoreToExplore({
  data,
}: {
  data: AboutProps["seventhSection"];
}) {
  // const { title, items } = data;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic()

  useEffect(() => {
    const updateOffset = () => {
      if (headingRef.current) {
        const rect = headingRef.current.getBoundingClientRect();
        setLeftOffset(rect.left + 15);
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <section className="pt-10 pb-0 xl:py-20 2xl:py-[135px]">
      <div>
        <div ref={headingRef} className="container">
          <h2 className="text-lg xl:text-2xl 2xl:text-4xl font-light mb-4 xl:mb-8 2xl:mb-[50px]">
            <SplitText
              tag="span"
              text={t.title}
              className=""
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-10px"
              textAlign={isArabic ? "right" : "left"}
            />
          </h2>
        </div>
        <div
          style={{ paddingLeft: `${isArabic ? 0 : leftOffset}px`, paddingRight: `${isArabic ? leftOffset : 0}px` }}
          className="pr-3 sm:pr-0"
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={11}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3.9 },
            }}
            modules={[Pagination]}
            className="!pb-[60px]"
          >
            {t.items.map((card, idx) => (
              <SwiperSlide key={idx}>
                <LangLink href={card.link}>
                  <motion.div
                    variants={moveUp(idx * 0.1)}
                    initial="hidden"
                    animate="show"
                    viewport={{ once: false, amount: 0.7 }}
                    className="relative group h-[350px] 2xl:h-[468px] sm:max-w-[428px] overflow-hidden cursor-pointer rounded-[12px]"
                  >
                    <Image src={card.image} alt={card.title} layout="fill" objectFit="cover" className="transition-transform rounded-[12px] duration-300 scale-100 group-hover:scale-105 object-cover object-top" />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black to-transparent z-10"></div>
                    {/* Title */}
                    {card.title && (
                      <motion.h3
                        variants={moveUp(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.7 }}
                        className="absolute bottom-[15px] left-[15px] right-[15px] xl:bottom-[40px] xl:left-[40px] xl:right-[40px] z-20 leading-[1.2] text-white text-lg xl:text-xl font-light group-hover:!opacity-0"
                      >
                        {card.title}
                      </motion.h3>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[rgba(63,34,92,0.94)] opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center z-30">
                      <div className="w-[75px] h-[75px] border border-white rounded-full flex items-center justify-center text-white">
                        <img src="/images/arrow-primary.svg" alt="arrow-right-tip" width={15} height={15} className={`w-[15px] h-[15px] ${isArabic ? "-rotate-90" : ""}`} />
                      </div>
                    </div>
                  </motion.div>
                </LangLink>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom pagination styling (globally apply) */}
          <style jsx global>{`
            .swiper-pagination {
              text-align: center;
            }
            .swiper-pagination-bullet {
              background: #d3d3d3;
              border-radius: 0;
              width: 60px;
              height: 3px;
              margin: 0 !important;
            }
            .swiper-pagination-bullet-active {
              background: #42badc;
            }
          `}</style>
        </div>
      </div>
      <div className="container border-b border-[#D3D3D3] pb-5 xl:pb-20 2xl:pb-[135px]"></div>
    </section>
  );
}
