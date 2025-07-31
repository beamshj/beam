"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

/* import { motion } from "framer-motion"; */
// import c01web2 from "@/public/assets/img/home/slide1.jpg";
// import c01web3 from "@/public/assets/img/home/secbnr.jpg";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay ,EffectFade } from "swiper/modules";
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
      className="h-screen relative overflow-hidden "
      ref={triggerRef}
      suppressHydrationWarning
    >
     

      <div className="prject-sec h-full flex flex-wrap" style={{ width: `${4 * 100}vw` }} ref={sectionRef}>

      <Swiper
       modules={[Autoplay, EffectFade]}
       effect="fade"
       fadeEffect={{ crossFade: true }}
       autoplay={{ delay: 3000, disableOnInteraction: false }} 
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
              <div className="h-full w-full -z-40 absolute bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)]"></div>

              <div className="absolute w-full h-full">
                <div className="container h-full">
                  <div className="h-full relative w-full overflow-hidden">
                    <div
                      className="title absolute bottom-[80px] lg:bottom-[50px] transition-all ease-in-out grid grid-cols-1 md:grid-cols-7 items-end"

                    >
                      <div className="md:mb-[116px]  col-span-1 md:col-span-5">
                        <h1 className="text-3xl  text-white leading-[1.1] font-custom font-light  ">
                        <span className="text-primary">20 Years</span> of Inspiring Leaders with Faith, Knowledge & Innovation</h1>
                      </div>
                     
                      <div className="md:mb-[150px] flex justify-end flex-col items-end col-span-1 md:col-span-2">
                      
                          <div className='mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-bdrcolor bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full hover:-translate-x-2 hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]'>
                               <button className='cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-primary rounded-full flex items-center gap-2 transition-all duration-300'>
                                 <p className='group-hover:text-white text-xs font-light text-white uppercase transition-colors duration-300'>
                                 Register Interest
                                 </p>
                                 <div className='p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45'>
                                  
                                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                    <path d="M8.74639 1.76178L1.12891 9.36247" stroke="#42BADC" stroke-miterlimit="10"/>
                                    <path d="M1.12891 1.76178H8.74639V9.21251" stroke="#42BADC" stroke-miterlimit="10"/>
                                    </svg>
                                 </div>
                               </button> 
                             </div> 
                      </div>
                    </div>

              <div className="h-[1px] w-[80%] bg-[linear-gradient(90deg,_rgb(255_255_255_/_52%)_0%_0%,_rgba(255,255,255,0)_100%)] lg:bottom-[170px] absolute left-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
        <div className="absolute bottom-[30%] md:bottom-[50%] w-full ">
        <div className="container flex justify-end">
          <span className="text-[15px] text-white whitespace-nowrap font-light relative -right-3 md:right-inherit z-10 flex flex-col items-center">
            <div className="flex flex-col rotate-180">
          {Array.from({ length: totalSlides }).map((_, index) => (
                <span key={index} className={`font-medium w-[1px] h-[10px] mt-2 ${index === currentSlide - 1 ? 'bg-primary' : 'bg-white'}`}></span>
              ))}
              </div>
              <span className="mt-4 -rotate-90">{`0${totalSlides}`}</span> <span className="font-medium w-[1px] h-[8px] bg-white mt-1"></span> <span className="font-medium -rotate-90 mt-1"> {`0${currentSlide}`}</span>
              
          </span>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;