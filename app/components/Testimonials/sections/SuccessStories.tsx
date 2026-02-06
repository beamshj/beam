"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { moveUp } from "../../motionVarients";
import { TestimonialsProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

const SuccessStories = ({
  data,
}: {
  data: TestimonialsProps["secondSection"];
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic()

  return (
    <section className="pt-14 pb-8 md:py-20 lg:py-20 2xl:py-[135px]">
      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-0 md:gap-x-10 xl:gap-x-18">
          <div className="h-[250px] md:h-[400px] ">
            <div className="storyslide h-full ">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 1 },
                }}
                navigation={{
                  nextEl: ".swiper-button-next-story",
                  prevEl: ".swiper-button-prev-story",
                }}
                modules={[Navigation]}
                onSwiper={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                className="h-full"
              >
                {t.items.map((video, index) => {
                  const isPlaying = activeVideoIndex === index;

                  return (
                    <SwiperSlide key={index} className="flex items-stretch h-full">
                      <motion.div
                        variants={moveUp(index * 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.1, once: true }}
                        className="relative w-full h-full rounded-[12px] overflow-hidden flex-grow"
                      >
                        <Image src={video.poster} alt={video.poster} fill className={`object-cover transition-all duration-500 h-full ${isPlaying ? "blur-sm" : "" }`} />
                        <motion.div
                          className="absolute bottom-0 w-full h-full rounded-xl bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,rgba(0,0,0,0),rgba(126,90,163,0.6))]"
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                        {!isPlaying && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                            onClick={() => setActiveVideoIndex(index)}
                          >
                            <Image src="/images/testimonials/play.svg" alt="Play" width={90} height={90} />
                          </motion.div>
                        )}
                        {isPlaying && (
                          <iframe
                            src={`${video.video}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                            className="absolute inset-0 w-full h-full rounded-[12px]"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                          />
                        )}
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          {/* Right Side Text */}
          <div>
            <motion.h2
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: false }}
              className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[18ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-"
            >
              {t.title}
            </motion.h2>
            <motion.p
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: false }}
              className="text-sm leading-[1.526315789473684] font-light text-colorpara"
            >
              {t.description}
            </motion.p>
          </div>

        </div>
        {/* Navigation Buttons */}
        <div className="flex gap-4 md:mt-8">
          <button
            className={`swiper-button-prev-story transition cursor-pointer group ${isBeginning
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : ""
              }`}
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="overflow-visible"
            >
              <path
                d={isArabic ? "M14.43 5.92993L20.5 11.9999L14.43 18.0699" : "M9.57031 5.92993L3.50031 11.9999L9.57031 18.0699"}
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:stroke-[#23ABD2]"
              />
              <path
                d="M20.5 12H3.67"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isArabic ? "origin-right" : "origin-left"} transition-transform duration-500 group-hover:scale-x-[1.5] group-hover:stroke-[#23ABD2]`}
              />
            </svg>
          </button>

          <button className={`swiper-button-next-story transition cursor-pointer group ${isEnd ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} aria-label="Next" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="overflow-visible"
            >
              <path
                d={isArabic ? "M9.57031 5.92993L3.50031 11.9999L9.57031 18.0699" : "M14.43 5.92993L20.5 11.9999L14.43 18.0699"}
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:stroke-[#23ABD2]"
              />
              <path
                d="M3.5 12H20.33"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isArabic ? "origin-left" : "origin-right"} transition-transform duration-500 group-hover:scale-x-[1.5] group-hover:stroke-[#23ABD2]`}
              />
            </svg>
          </button>
        </div>

        <div className="pt-6 md:pt-12 lg:pt-18 2xl:pt-[95px] w-full md:absolute border-b border-[#D3D3D3]" />
      </div>
    </section>
  );
};

export default SuccessStories;
