"use client";
import React, { useState } from "react";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { SchoolAchievementsProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

const SchoolAchievements: React.FC<{data: SchoolAchievementsProps['secondSection']}> = ({ data }) => {
  // const { title, subtitle, achievements } = data;
  
const [isActive, setIsActive] = useState<number | null>(null);
const t = useApplyLang(data)
const isArabic = useIsPreferredLanguageArabic()

  return (
    <div className="py-10 xl:py-20 2xl:py-[135px]">
      <div className="container">
        {/* Header Section */}
        <div className="mb-5 xl:mb-[30px]">
          <SplitText
            tag="h2"
            text={t.title}
            className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light lettersp-4 xl:mb-[50px]"
            delay={200}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign={isArabic ? "right" : "left"}
          />
            <SplitText
              tag="span"
              text={t.description}
              className="text-sm font-light text-colorpara leading-[1.52] max-w-[72ch]"
              delay={200}
              duration={0.6}
              ease="power3.out"
              splitType="lines"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-10px"
              textAlign={isArabic ? "right" : "left"}
            />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 justify-between">
          {t.items.map((achievement, index) => (
            <motion.div
              key={index}
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
               onClick={() => setIsActive(index)}  
               onMouseEnter={() => setIsActive(index)}
               onMouseLeave={() => setIsActive(null)}
              className="group relative border border-bdrcolor rounded-2xl overflow-hidden transition-colors duration-300 2xl:w-[356px] 2xl:h-[287px] flex flex-col items-center justify-center p-[40px]"
            >
              {/* Default State - Logo and Title */}
              <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                <div className="mb-[20px] relative  ">
                  <Image
                    src={achievement.image}
                    alt={achievement.imageAlt} 
                   width={290}
                   height={108}
                    className="object-contain w-full h-auto"
                  />
                </div>
                <h3 className={`text-md md:text-lg xl:text-xl font-light leading-[1.2] text-black lettersp-1 ${isArabic && "text-right"}`}>
                  {achievement.title}
                </h3>
              </div>

              {/* Hover State - Gradient Background and Description */}
             <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-[40px] ${
          isActive === index ? "opacity-100" : ""
        }`}
        style={{
          background:
            isArabic ? "linear-gradient(to bottom right, #42BADC 46.06%, #ccb1e9 122.85%)" : "linear-gradient(211deg, #42BADC 46.06%, #ccb1e9 122.85%)",
        }}
      >
        <div className="flex h-full items-end">
          <p className="text-white text-sm leading-[1.52]">
            {achievement.description}
          </p>
        </div>
      </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolAchievements;
