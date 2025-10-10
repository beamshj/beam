"use client";
import React from "react";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";

interface Achievement {
  id: number;
  logo: string;
  title: string;
  description: string;
}

interface SchoolAchievementsProps {
  data: {
    title: string;
    subtitle: string;
    achievements: Achievement[];
  };
}

const SchoolAchievements: React.FC<SchoolAchievementsProps> = ({ data }) => {
  const { title, subtitle, achievements } = data;
  return (
    <div className="py-10 xl:py-20 2xl:py-[135px]">
      <div className="container">
        {/* Header Section */}
        <div className="mb-3 xl:mb-[30px]">
          <h2 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light lettersp-4 xl:mb-[50px]">
            <SplitText
            tag="span"
            text={title}
            className=""
            delay={200}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          />
          </h2>
          <p className="text-sm font-light text-colorpara leading-[1.52] max-w-[63%]">
            <SplitText
            tag="span"
            text={subtitle}
            className=""
            delay={200}
            duration={0.6}
            ease="power3.out"
            splitType="lines"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          />
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 justify-between">
          {achievements.map((achievement,index) => (
            <motion.div key={achievement.id} variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
              className="group relative border border-bdrcolor rounded-2xl overflow-hidden transition-colors duration-300 2xl:w-[356px] 2xl:h-[287px] flex flex-col items-center justify-center p-[40px]"
            >
              {/* Default State - Logo and Title */}
              <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                <div className="mb-[20px] relative w-15 h-15 xl:w-[290px] xl:h-[108px]">
                  <Image
                    src={achievement.logo}
                    alt={achievement.title}
                    fill
                    className="object-contain w-15 h-auto"
                  />
                </div>
                <h3 className="text-md md:text-lg xl:text-xl font-light leading-[1.2] text-black lettersp-1">
                  {achievement.title}
                </h3>
              </div>

              {/* Hover State - Gradient Background and Description */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-[40px]"
                style={{
                  background:
                    "linear-gradient(211deg, #42BADC 54.06%, rgba(126, 90, 163, 0.1) 122.85%)",
                }}
              >
                <p className="text-white text-sm leading-[1.52]">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolAchievements;
