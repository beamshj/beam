"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BannerSliderData } from "@/app/data/BannerSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { HomeProps } from "../type";

const HeroSection = ({ data }: { data: HomeProps["bannerSection"] }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = BannerSliderData.slides.length;

  const [textVersion, setTextVersion] = useState(0);

  const handleRegisterClick = () => {
    window.location.href = "/contact-us?scroll=register";
  };

  // Ken Burns animation variants
  const kenBurnsVariants: Variants = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
      opacity: 0.7,
    },
    animate: {
      scale: 1.15,
      x: [0, -20, -40] as number[], // 👈 explicitly typed
      y: [0, -15, -30] as number[],
      opacity: 1,
      transition: {
        duration: 12,
        ease: [0.43, 0.13, 0.23, 0.96],
        opacity: {
          duration: 1.5,
          ease: "easeOut",
        },
      },
    },
  };
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section
      className="lg:h-screen h-[65dvh] md:h-[85dvh] relative overflow-hidden max-w-[1920px] mx-auto"
      ref={triggerRef}
      suppressHydrationWarning
    >
      <div
        className="prject-sec h-full flex flex-wrap"
        style={{ width: `${4 * 100}vw` }}
        ref={sectionRef}
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={1800}
          slidesPerView={1}
          spaceBetween={0}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex + 1);
            setTextVersion((v) => v + 1);
          }}
          className="w-full h-full"
        >
          {data.items.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                key={index}
                className="slide h-full w-screen relative overflow-hidden text-white"
              >
                <figure className="h-full w-full absolute -z-50 overflow-hidden">
                  <motion.div
                    key={`kenburns-${index}-${textVersion}`}
                    variants={isDesktop ? kenBurnsVariants : {}}
                    initial={isDesktop ? "initial" : false}
                    animate={isDesktop ? "animate" : false}
                    className="h-full w-full relative"
                    style={{
                      willChange: "transform, opacity",
                    }}
                  >
                    <Image
                      className="h-full w-full object-cover object-center"
                      src={slide?.image}
                      alt={slide.imageAlt}
                      width={1920}
                      height={1280}
                      priority={index === 0}
                    />
                  </motion.div>
                </figure>
                <div
                  key={`${index}-${textVersion}`}
                  className="h-full w-full -z-40 absolute bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)]"
                ></div>

                <div className="absolute w-full h-full">
                  <div className="container h-full">
                    <div className="h-full relative w-full overflow-hidden">
                      <div
                        className="title absolute bottom-5 lg:bottom-[30px] xl:bottom-[20px] 2xl:bottom-[50px] transition-all ease-in-out grid grid-cols-1 2xl:grid-cols-7 items-end gap-2"
                        key={`${index}-${textVersion}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="xl:mb-[35px] 2xl:mb-[65px] col-span-1 md:col-span-5"
                        >
                          <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-[1.8rem] md:text-2xl lg:text-2xl 2xl:text-4xl text-white leading-[1.2] 2xl:leading-[1.1] font-custom font-light lettersp-4 mb-0 md:mb-0 xl:-mb-6 md:max-w-[95%] xl:max-w-[74%] 2xl:max-w-none"
                          >
                            <span className="text-primary">
                              {slide.highlightText}{" "}
                            </span>
                            {slide.title}
                          </motion.h2>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.5,
                          }}
                          onClick={handleRegisterClick}
                          className="md:mb-[35px] lg:mb-[85px] xl:mb-[100px] 2xl:mb-[120px] flex justify-end flex-col xl:items-end col-span-1 md:col-span-2"
                        >
                          <div className="">
                            <div className="mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-bdrcolor bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full hover:-translate-x-2 hover:shadow-[0_0_15px_rgba(66,186,220,0.5)] ">
                              <a
                                href={"#"}
                                className="cursor-pointer pl-4 pr-2 md:px-4 py-[10px] md:py-3 bg-primary rounded-full flex items-center gap-2 transition-all duration-300"
                              >
                                <p className="group-hover:text-white text-xs font-light text-white uppercase transition-colors duration-300">
                                  Register Interest
                                </p>
                                <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="11"
                                    viewBox="0 0 10 11"
                                    fill="none"
                                  >
                                    <path
                                      d="M8.74639 1.76178L1.12891 9.36247"
                                      stroke="#42BADC"
                                      strokeMiterlimit="10"
                                    />
                                    <path
                                      d="M1.12891 1.76178H8.74639V9.21251"
                                      stroke="#42BADC"
                                      strokeMiterlimit="10"
                                    />
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -60 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.5,
                          }}
                          className="absolute left-[40%] bottom-[40px] 2xl:bottom-[60px] w-[80%] hidden md:block"
                        >
                          <div className="h-[1px] w-full bg-gradient-to-r from-white via-white/30 to-transparent"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-[10%] md:bottom-[37%] w-full ">
          <div className="container flex justify-end">
            <span className="text-[15px] text-white whitespace-nowrap font-light relative -right-3 md:right-2 z-10 flex flex-col items-center">
              <div className="flex flex-col rotate-180">
                {BannerSliderData.slides.map((_, index) => (
                  <span
                    key={index}
                    className={`font-medium w-[1px] h-[10px] mt-2 ${
                      index === currentSlide - 1 ? "bg-primary" : "bg-white"
                    }`}
                  ></span>
                ))}
              </div>
              <span className="mt-4 -rotate-90 font-light text-[15px]">{`0${totalSlides}`}</span>{" "}
              <span className="font-medium w-[1px] h-[8px] bg-white mt-1"></span>
              <span className="font-[700] text-[15px] -rotate-90 mt-1">
                {" "}
                {`0${currentSlide}`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
