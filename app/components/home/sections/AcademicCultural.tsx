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
  fadeInLeft,
  fadeInRight,
} from "@/public/assets/FramerAnimation/animation";
import SplitText from "@/components/SplitText";
const AcademicCultural = () => {
  const [activeIndex, setActiveIndex] = useState(1); // 2nd item active by default

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="pt-8 xl:pt-20 2xl:pt-[137px] max-w-[1920px] mx-auto overflow-hidden bg-[#F6F6F6]">
      <div className="relative pb-12 md:pb-15 xl:pb-[150px]">
        <div className="container">
          <div>
            {/* Heading */}
            <div >
            <h2 className="">
                
             
              <SplitText
              tag="span"
              text={academicCulturalData.heading}
                  className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-light leading-tight text-black max-w-[13ch] lettersp-4"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
         </h2>
            </div>

            {/* Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mt-5 md:mt-6 2xl:mt-[43px] mb-5 md:mb-7 2xl:mb-[93px]"
            >
              <p
                className="text-sm font-light text-foreground md:max-w-[68ch] 2xl:max-w-[82ch]"
                dangerouslySetInnerHTML={{ __html: academicCulturalData.desc }}
              />
            </motion.div>

            {/* Top Divider */}
            <div className="bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,_0,_0,_0)_60%)] h-[1px] lg:bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,_0,_0,_0)_30%)]"></div>

            {/* List Items */}
            <div>
              {academicCulturalData.accvalues.map((value, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex flex-col md:flex-row gap-2 md:gap-8 items-baseline md:items-center py-7 lg:py-10 group transition-all duration-300
    ${
      isActive
        ? "bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)] border-b border-white"
        : ""
    }
    ${
      index === academicCulturalData.accvalues.length - 2
        ? "ps-0 xl:ps-[8%] 2xl:ps-[15%]"
        : ""
    }
    ${
      index === academicCulturalData.accvalues.length - 1
        ? "ps-0 xl:ps-[18%] 2xl:ps-[30%]"
        : ""
    }
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
                    <div
                      className={`transition-all duration-300 mb-3 xl:mb-0 ${
                        isActive ? "px-2" : "group-hover:px-2"
                      }`}
                    >
                      <Image
                        src={value.img}
                        alt={value.title}
                        width={value.imgwidth}
                        height={value.imgheight}
                        className={`transition-all duration-300 w-15 xl:w-auto h-auto ${
                          isActive
                            ? "filter-[brightness(0)]"
                            : "group-hover:filter-[brightness(0)]"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-md md:text-lg 2xl:text-xl font-light text-black leading-[1.2] lettersp-1 ${
                          index === academicCulturalData.accvalues.length - 1
                            ? "max-w-[15ch]"
                            : "max-w-[18ch]"
                        } transition-all duration-300 ${
                          isActive ? "px-2 lg:px-0" : ""
                        }`}
                      >
                        {value.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Divider */}
            {/* <div className="bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,_0,_0,_0)_80%)] h-[1px]"></div> */}
          </div>
        </div>

        {/* Side Image */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="absolute bottom-0 right-0 hidden xl:block w-[640px] 2xl:w-[737px]"
        >
          <Image
            src={academicCulturalData.image}
            alt={academicCulturalData.heading}
            width={737}
            height={1061}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AcademicCultural;
