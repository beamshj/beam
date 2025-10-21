"use client";
import React, { useState } from "react";
import { diverseGrowingData } from "@/app/data/DiverseGrowing";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import {
  fadeUp,
  // fadeInLeft,
  fadeInRight,
} from "@/public/assets/FramerAnimation/animation";
import Counter from "../../Common/Counter";
import SplitText from "@/components/SplitText";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const DiverseGrowing = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        xPercent: 15, // move image 15% to the right
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",   // start when image enters view
          end: "bottom top",     // finish when it leaves
          scrub: true,           // smooth scroll-linked motion
        },
      });
    });

    return () => ctx.revert();
  }, []);
   
  const [isActive, setIsActive] = useState<number | null>(null);

  const handleTouch = (id: number) => {
    setIsActive((prevId) => (prevId === id ? null : id)); // toggle same card, deactivate if tapped again
  };
  return (
    <section className="pt-8 xl:pt-20 2xl:pt-[137px]">
      <div className="relative pb-0 lg:pb-12 xl:pb-[150px] max-w-[1920px] mx-auto overflow-hidden">
        <div className="container">
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}  >

              <SplitText
                tag="h2"
                text={diverseGrowingData.heading}
                className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-[1.111111111] text-black max-w-[20ch] lettersp-4 xl:mb-30 2xl:mb-40"
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
            </motion.div>
            <div className="2xl:w-4/5 ml-auto mt-8 lg:mt-[140px]  xl:mt-[64px] relative">
              <motion.div
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.9 }}
                viewport={{ once: true, amount: 0.1 }} // Trigger when only 10% of image enters viewport
              >
                <div className="flex flex-col gap-5 lg:gap-0 xl:w-[80%] 2xl:w-fit m-auto xl:ml-auto mr-0 2xl:m-auto">
                  <div onTouchStart={() => handleTouch(1)} className={`group overflow-hidden border relative 2xl:left-[50px] bg-white/30 backdrop-blur-md border-[#ccc] 
                    rounded-[15px] min-w-full md:min-w- lg:min-w-[250px] 2xl:min-w-[597px] px-6 pt-4 pb-5 2xl:px-10 xl:py-4 w-fit m-auto 
                    transition-all duration-500 ease-in-out
                    ${isActive === 1 ? "bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]" : ""}`}>
                    {/* Hover Gradient Overlay */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isActive === 1 ? "opacity-100" : ""}`}>
                      <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                    </div>
                    

                    {/* Card Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-center gap-4 pb-5">
                        <p className={`text-xl 2xl:text-2xl font-light  group-hover:text-black group-hover:-translate-x-3 transition-all duration-500 ${isActive === 1 ? "text-black -translate-x-3" : "text-primary"}`}>
                          {/* {diverseGrowingData.secvalues[0].Xcount}+  */}
                          <Counter
                            from={0}
                            to={Number(diverseGrowingData.secvalues[0].count)}
                          />
                          +
                        </p>
                        <Image
                          className={`grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110 ${isActive === 1 ? "grayscale-0 scale-110" : ""}`}
                          src={diverseGrowingData.secvalues[0].img}
                          alt={diverseGrowingData.secvalues[0].title}
                          width={50}
                          height={50}
                        />
                      </div>
                      <p className={`text-md 2xl:text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500 ${isActive === 1 ? "text-black -translate-y-1" : ""}`}>
                        {diverseGrowingData.secvalues[0].title}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-baseline">
                    <div onTouchStart={() => handleTouch(2)} 
                        className={`relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] w-full 
                          transition-all duration-500 ease-in-out
                          ${isActive == 2   ? "bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]" : ""}
                        `}>
                      {/* Animated gradient layer */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive === 2 ? "opacity-100" : ""}`}>
                        <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between min-w-full lg:min-w-[250px] 2xl:min-w-[434px] 2xl:min-h-[310px] px-6 pt-4 pb-5 2xl:px-10 xl:py-4">
                        <div className="flex justify-between items-center gap-4 pb-5">
                          <p className={`text-xl 2xl:text-2xl font-light text-[#7E5AA3] group-hover:text-black  group-hover:-translate-x-3 transition-all duration-500 ${isActive === 2 ? "text-black -translate-x-3" : ""}`}>
                            <Counter
                              from={0}
                              to={Number(diverseGrowingData.secvalues[1].count)}
                            />
                            +
                          </p>
                          <Image
                            className={`grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110 ${isActive === 2 ? "grayscale-0 scale-110" : ""}`}
                            src={diverseGrowingData.secvalues[1].img}
                            alt={diverseGrowingData.secvalues[1].title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <p className={`text-md 2xl:text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500  ${isActive === 2 ? "text-black -translate-y-1" : ""}`}>
                          {diverseGrowingData.secvalues[1].title}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col w-full gap-5 lg:gap-0 xl:max-w-[389px]">
                      {/* Card 1 */}
                      <div onTouchStart={() =>   handleTouch(3)} className={` ${isActive == 3 ? "bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]" : ""} relative group overflow-hidden border bg-white/30  backdrop-blur-md border-[#ccc] rounded-[15px] w-full transition-all duration-500 ease-in-out`}>
                        {/* Gradient hover overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-between px-6 pt-4 pb-5 2xl:px-10 xl:py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[389px] 2xl:min-h-[258px]">
                          <div className="flex justify-between items-center gap-4 pb-5">
                            <p className={`text-xl 2xl:text-2xl font-light transition-all duration-500  ${isActive === 3 ? "text-black -translate-x-3" : "text-[#7E5AA3] group-hover:text-black  group-hover:-translate-x-3 "}`}>
                              <Counter
                                from={0}
                                to={Number(
                                  diverseGrowingData.secvalues[2].count
                                )}
                              />
                              +
                            </p>
                            <Image
                              className={`grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110 ${isActive === 3 ? "grayscale-0 scale-110" : ""}`}
                              src={diverseGrowingData.secvalues[2].img}
                              alt={diverseGrowingData.secvalues[2].title}
                              width={50}
                              height={50}
                            />
                          </div>
                          <p className={`text-md 2xl:text-xl font-light ${isActive === 3 ? "text-black -translate-y-1" : "text-[#626262] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500 "}`}>
                            {diverseGrowingData.secvalues[2].title}
                          </p>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div onTouchStart={() => handleTouch(4)} className={`relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] 
                        w-full transition-all duration-500 ease-in-out ${isActive === 4 ? "bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]" : ""}`}>
                        {/* Gradient hover overlay */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isActive === 4 ? "opacity-100" : ""}`}>
                          <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-between px-6 pt-4 pb-5 2xl:px-10 xl:py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[389px] 2xl:min-h-[245px]">
                          <div className="flex justify-between items-center gap-4 pb-5">
                            <p className={`text-xl 2xl:text-2xl font-light transition-all duration-500 ${isActive === 4 ? "text-black -translate-x-3" : "text-primary group-hover:text-black  group-hover:-translate-x-3 "}`}>
                              <Counter
                                from={0}
                                to={Number(
                                  diverseGrowingData.secvalues[4].count
                                )}
                              />
                              +
                            </p>
                            <Image
                              className={`grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110 ${isActive === 4 ? "grayscale-0 scale-110" : ""}`}
                              src={diverseGrowingData.secvalues[4].img}
                              alt={diverseGrowingData.secvalues[4].title}
                              width={50}
                              height={50}
                            />
                          </div>
                          <p className={`text-md 2xl:text-xl font-light max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500 ${isActive === 4 ? "text-black -translate-y-1" : "text-[#626262]"}`}>
                            {diverseGrowingData.secvalues[4].title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card with animated gradient background on hover */}
                    <div onTouchStart={() => handleTouch(5)} className={`relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] w-full 
                      transition-all duration-500 ease-in-out ${isActive === 5 ? "bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]" : ""}`}>
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between px-6 pt-4 pb-5 2xl:px-10 xl:py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[417px] 2xl:min-h-[362px]">
                        <div className="flex justify-between items-center gap-4 xl:pb-5">
                          <p className={`text-xl 2xl:text-2xl font-light transition-all duration-500 ${isActive === 5 ? "text-black -translate-x-3" : "text-[#7E5AA3] group-hover:text-black  group-hover:-translate-x-3 "}`}>
                            <Counter
                              from={0}
                              to={Number(diverseGrowingData.secvalues[3].count)}
                            />
                            +
                          </p>
                          <Image
                            className={`grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110 ${isActive === 5 ? "grayscale-0 scale-110" : ""}`}
                            src={diverseGrowingData.secvalues[3].img}
                            alt={diverseGrowingData.secvalues[3].title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <p className={`text-md 2xl:text-xl font-light transition-all duration-500 ${isActive === 5 ? "text-black -translate-y-1" : "text-[#626262] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500 "}`}>
                          {diverseGrowingData.secvalues[3].title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div
          className="relative pt-5 lg:pt-0 left-0 lg:absolute bottom-0 lg:left-[5%] z-[-1] responsive md:w-[50%] 2xl:w-[913px]"
        >
          <Image ref={imgRef}
            src={diverseGrowingData.image}
            alt={diverseGrowingData.heading}
            width={913}
            height={944}
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default DiverseGrowing;
