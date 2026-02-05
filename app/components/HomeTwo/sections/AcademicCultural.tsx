"use client";
import React, { useState } from "react";
import { academicCulturalData } from "@/app/data/AcademicCultural";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import {
  fadeUp,
  // fadeInRight,
} from "@/public/assets/FramerAnimation/animation";
import SplitText from "@/components/SplitText";
import { moveLeft } from "../../motionVarients";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { HomeProps } from "../type";
import { acdData } from "../data";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
gsap.registerPlugin(ScrollTrigger);

const AcademicCultural = ({ data }: { data: HomeProps["thirdSection"] }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic() // 2nd item active by default

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        xPercent: isArabic ? 60 : -60, // move image 15% to the right
        ease: "none",
        // yoyo: true,
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          once: false,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="pt-8 xl:pt-20 2xl:pt-[137px] max-w-[1920px] mx-auto overflow-hidden bg-[#F6F6F6]"
    >
      <div className="relative pb-12 md:pb-15 xl:pb-[150px]">
        <div className="container">
          <div>
            {/* Heading */}

            <SplitText
              tag="h2"
              text={t.title}
              className={`text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-light leading-tight text-black max-w-[13ch] lettersp-4 `}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign={isArabic ? "right" : "left"}
            />

            {/* Description */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }} className="mt-5 md:mt-6 2xl:mt-[43px] mb-5 md:mb-7 2xl:mb-[93px]" >
              <p className="text-sm font-light text-colorpara md:max-w-[68ch] 2xl:max-w-[82ch]" dangerouslySetInnerHTML={{ __html: t.description }} />
            </motion.div>

            {/* Top Divider */}
            <div className="">
              <div className={`${isArabic ? "bg-[linear-gradient(270deg,#000000_0%,rgba(0,0,0,0)_60%)] h-px lg:bg-[linear-gradient(270deg,#000000_0%,rgba(0,0,0,0)_30%)]" : "bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0)_60%)] h-px lg:bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0)_30%)]"}`}></div>
            </div>

            {/* List Items */}
            <div>
              {t.items.map((value, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    variants={moveLeft(index * 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex flex-col md:flex-row gap-2 md:gap-8 items-baseline md:items-center py-7 lg:py-10 group transition-colors hover:border-white relative z-[2]
                    ${isActive ? " border-b border-black" : ""}
                    ${index === data.items.length - 2 ? "ps-0 xl:ps-[8%] 2xl:ps-[15%]" : ""}
                    ${index === data.items.length - 1 ? "ps-0 xl:ps-[18%] 2xl:ps-[30%]" : ""}
                  `}
                    style={
                      !isActive
                        ? {
                          borderBottomWidth: "1px",
                          borderStyle: "solid",
                          borderImageSlice: 1,
                          borderImageSource:
                            "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
                        }
                        : {}
                    }
                  >
                    <div className={`w-0 group-hover:w-full absolute top-0 ${isArabic ? "right-0 bg-[linear-gradient(270deg,#42BADC_0%,rgba(66,186,220,0)_100%)]"
                          : "left-0 bg-[linear-gradient(90deg,#42BADC_0%,rgba(66,186,220,0)_100%)]"} h-full ${isActive
                          ? "transition-all duration-300 z-0 w-full"
                          : "transition-all duration-300 z-0 w-0"} `} ></div>

                    <div className={`transition-all duration-300 mb-3 xl:mb-0 ${isActive ? "px-2" : "group-hover:px-2"}`}>
                      <Image src={acdData.academicCulturalDataicons[index]} alt={value.title} width={60} height={75} className={`transition-all duration-300 w-15  h-auto ${isActive
                          ? "filter-[brightness(0)]"
                          : "group-hover:filter-[brightness(0)]"
                          }`}
                      />
                    </div>
                    <div>
                      <p className={`text-md md:text-lg 2xl:text-xl font-light text-black leading-[1.2] lettersp-1 relative z-10 ${index === academicCulturalData.accvalues.length - 1
                        ? "max-w-[15ch]"
                        : "max-w-[18ch]"
                        } transition-all duration-300 ${isActive ? "px-2 lg:px-0" : ""
                        }`}
                      >
                        {value.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Divider */}
            {/* <div className="bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,_0,_0,_0)_80%)] h-[1px]"></div> */}
          </div>
        </div>

        {/* Side Image */}
        <div className={`absolute bottom-0 ${isArabic ? "left-0 xl:left-[-10%]" : "right-0 xl:right-[-10%]"} hidden xl:block w-[640px] 2xl:w-[737px] z-20`}>
          <Image ref={imgRef} src={t.image} alt={t.imageAlt} width={737} height={1061} sizes="(max-width: 768px) 100vw, 737px" loading="lazy" className={isArabic ? "scale-x-[-1]" : ""} />
        </div>
      </div>
    </motion.section>
  );
};

export default AcademicCultural;