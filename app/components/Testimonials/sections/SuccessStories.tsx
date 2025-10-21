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

export interface FocusData {
  title: string;
  description: string;
  image: string;
  videos: string[];
}

const SuccessStories = ({
  focusData,
}: {
  focusData: FocusData;
}) => {

  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  return (
    <section className="py-14 md:py-20 lg:py-20 2xl:py-[135px]">
      <div className="container  relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-18 items-center ">

          <div>
            <div className=" storyslide">
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

              >
                {focusData.videos.map((video, index) => {
                  const isPlaying = activeVideoIndex === index;

                  return (
                    <SwiperSlide key={index} className="flex items-stretch">
                      <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{amount: 0.1, once: true}} className="relative w-full h-[250px] md:h-[480px] rounded-[12px] overflow-hidden flex-grow">
                        {/* Background image */}
                        <Image src={focusData.image} alt={focusData.title} fill className={`object-cover transition-all duration-500 ${isPlaying ? "blur-sm" : ""}`} />
                        {/* Gradient overlay */}
                        <motion.div
                          className="absolute bottom-0 w-full h-full rounded-xl bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,rgba(0,0,0,0),rgba(126,90,163,0.6))]"
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />

                        {/* Play button */}
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

                        {/* Video iframe (YouTube) */}
                        {isPlaying && (
                          <iframe
                            src={`${video}?autoplay=1&controls=1&rel=0&modestbranding=1`}
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
                <div className=" pt-7 lg:pt-22 2xl:pt-[135px] w-full md:absolute border-b  border-[#D3D3D3]">
              <div className="  absolute bottom-0  ">
                <div className="flex gap-3 z-10 pb-5 md:pb-7 ">
                  <button
                    className="swiper-button-prev-story transition cursor-pointer group"
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
                        d="M9.57031 5.92993L3.50031 11.9999L9.57031 18.0699"
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
                        className="origin-left transition-transform duration-500 group-hover:scale-x-[1.5] group-hover:stroke-[#23ABD2]"
                      />
                    </svg>
                  </button> 

                  <button
                    className="swiper-button-next-story transition cursor-pointer group"
                    aria-label="Next"
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
                      d="M14.43 5.92993L20.5 11.9999L14.43 18.0699"
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
                      className="origin-right transition-transform duration-500 group-hover:scale-x-[1.5] group-hover:stroke-[#23ABD2]"
                    />
                  </svg>

                  </button>
                </div>

                </div>
                </div>
            </div>
          </div>
          <div>
            <motion.h2 variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{amount: 0.1, once: false}} className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[18ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-7">
              {focusData.title}
            </motion.h2>
            <motion.p variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{amount: 0.1, once: false}} className=" text-sm leading-[1.526315789473684]  font-light  text-colorpara">
              {focusData.description}
            </motion.p>

          </div>
        </div>
       
 
            
      </div>
    </section>
  );
};

export default SuccessStories;
