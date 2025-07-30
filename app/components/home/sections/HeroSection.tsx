"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

/* import { motion } from "framer-motion"; */
// import c01web2 from "@/public/assets/img/home/slide1.jpg";
// import c01web3 from "@/public/assets/img/home/secbnr.jpg";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";


const HeroSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;


  return (
    <section
      className="h-screen relative overflow-hidden bg-primary"
      ref={triggerRef}
      suppressHydrationWarning
    >
      <div className="absolute bottom-[80px] lg:bottom-[40%] w-full ">
        <div className="container flex justify-end">
          <span className="text-[15px] text-white whitespace-nowrap font-light relative z-10 flex flex-col items-center">
            <div className="flex flex-col rotate-180">
          {Array.from({ length: totalSlides }).map((_, index) => (
                <span key={index} className={`font-medium w-[1px] h-[10px] mt-2 ${index === currentSlide - 1 ? 'bg-primary' : 'bg-white'}`}></span>
              ))}
              </div>
              <span className="mt-4 -rotate-90">{`0${totalSlides}`}</span> <span className="font-medium w-[1px] h-[8px] bg-white mt-1"></span> <span className="font-medium -rotate-90 mt-1"> {`0${currentSlide}`}</span>
              
          </span>
        </div>
      </div>

      <div className="prject-sec h-full flex flex-wrap" style={{ width: `${4 * 100}vw` }} ref={sectionRef}>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        className="w-full h-full"
      >

        {Array.from({ length: totalSlides }).map((_, index) => (
          <SwiperSlide key={index}>
            <div key={index} className="slide h-full w-screen relative overflow-hidden text-white">
              <figure className="h-full w-full absolute -z-50">
                <Image className="h-full w-full absolute object-cover object-center" src={"/assets/home/banner1.jpg"} alt={"slide1"} width={2500} height={1000} />
              </figure>
              <div className="h-full w-full -z-40 absolute bg-gradient-to-t from-black to-transparent opacity-70"></div>

              <div className="absolute w-full h-full">
                <div className="container h-full">
                  <div className="h-full relative w-full overflow-hidden">
                    <div
                      className="title absolute bottom-[80px] lg:bottom-[50px] transition-all ease-in-out grid grid-cols-6 items-end"

                    >
                      <div className="mb-[116px] col-span-5">
                        <h1 className="text-2xl text-white leading-none font-custom font-normal xl:w-[80%]">
                        <span className="text-primary">20 Years</span> of Inspiring Leaders with Faith, Knowledge & Innovation</h1>
                      </div>
                      <div className="mb-[150px] flex justify-end flex-col items-end">
                         <button className='uppercase border-primary border-[1px] px-3 py-1 flex items-center gap-2 rounded-[50px] text-sm cursor-pointer text-nowrap w-fit'>Register Interest<span className='bg-primary rounded-full p-2'><Image src="/assets/arrow.svg" alt="Arrow" width={20} height={20} /></span></button>
                      </div>
                    </div>

              <div className="h-[1px] w-[60%] bg-gradient-to-r from-white to-transparent lg:bottom-[170px] absolute left-[40%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;