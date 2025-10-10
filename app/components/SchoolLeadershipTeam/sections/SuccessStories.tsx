"use client";
 
import Image from "next/image";
import { motion } from "framer-motion"; 
import { useState } from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-18 items-center">
          
        <div>
        <div className="relative storyslide">
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
              <div className="relative w-full h-[250px] md:h-[420px] rounded-[12px] overflow-hidden flex-grow">
                
                {/* Background image */}
                <Image
                  src={focusData.image}
                  alt={focusData.title}
                  fill
                  className={`object-cover transition-all duration-500 ${isPlaying ? "blur-sm" : ""}`}
                />

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
                    <Image
                      src="/images/testimonials/play.svg"
                      alt="Play"
                      width={90}
                      height={90}
                    />
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
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
        </div>
          <div>
            <h2 className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[18ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-7">
              {focusData.title}
            </h2>
            <p className=" text-sm leading-[1.526315789473684]  font-light  text-colorpara">
              {focusData.description}
            </p>
          
          </div> 
        </div>
        
        <div className="pt-8 md:pt-12 lg:pt-20 2xl:pt-[135px]">
                <div className="pt-5 lg:pt-7 border-t border-[#D3D3D3]">
                <div className=" flex gap-3 z-10">
                  <button
                    className="swiper-button-prev-story   transition cursor-pointer group"
                    aria-label="Previous"
                  >
                    <Image
                      src="/images/icons/arrow-right.svg"
                      alt="Prev"
                      width={18}
                      height={18}
                      className="group-hover:scale-140 transition-all duration-300 brightness-44 opacity-25 group-hover:opacity-100 group-hover:brightness-100"
                    />
                  </button>
                  <button
                    className="swiper-button-next-story transition cursor-pointer group"
                    aria-label="Next"
                  >
                    <Image
                      src="/images/icons/arrow-right.svg"
                      alt="Next"
                      width={18}
                      height={18}
                      className="rotate-180 group-hover:scale-140 transition-all duration-300 brightness-44 opacity-25 group-hover:opacity-100 group-hover:brightness-100"
                    />
                  </button>
                </div>
                </div>
                </div>
      </div>
    </section>
  );
};

export default SuccessStories;
