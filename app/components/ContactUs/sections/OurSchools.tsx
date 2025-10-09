"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { no } from "zod/v4/locales";

interface OurSchoolsProps {
  title: string;
  description: string;
  schools: {
    title: string;
    location: string;
    img: string;
  }[];
}

export default function OurSchools({ data }: { data: OurSchoolsProps }) {
  const { title, description, schools } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pb-12 md:pb-20 xl:pb-[135px]">
      <div className="container overflow-hidden">
        {/* Title + Description */}
        <div className="mb-[30px]">
          <h2 className="text-4xl font-light text-black leading-[1.1111]">
            {title}
          </h2>
          <p className="text-colorpara text-sm leading-[1.52] mt-[50px]">
            {description}
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-[19px] justify-between">
          {schools.map((school, i) => {
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(0)}
                animate={{
                  width: "100%",
                  maxWidth: isActive ? "850px" : "144px",
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className={`relative rounded-[12px] overflow-hidden h-[544px] cursor-pointer flex-shrink-0 md:flex-shrink-0 ${
                  isActive ? "z-20" : "z-10"
                }`}
              >
                {/* Image */}
                <Image
                  src={school.img}
                  alt={school.title}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isActive ? "grayscale-0" : "grayscale"
                  }`}
                />

                {/* Overlay */}
                {!isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                )}
                {isActive && (
                  <motion.div
                    style={{
                      background:
                        "linear-gradient(360deg, rgba(6, 120, 152, 0.71) 5.61%, rgba(0, 0, 0, 0) 91.64%)",
                    }}
                    className="absolute inset-0 z-[5]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                )}

                {/* Location Pill */}
                {isActive && school.location && (
                  <motion.div
                    className="absolute top-[42px] left-[40px] z-10 bg-[#E6F7FF] font-light text-sm leading-[1.42] px-[20px] py-[11px] rounded-[50px] inline-flex items-center gap-[8px] text-black"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src="/images/contact-us/icons/location.svg"
                      alt="location"
                      width={24}
                      height={24}
                    />
                    {school.location}
                  </motion.div>
                )}

                {/* Active / Inactive Content */}
                {isActive ? (
                  // ACTIVE CARD (expanded)
                  <div className="absolute bottom-[40px] left-[40px] right-[40px] flex flex-col md:flex-row justify-between items-end text-white z-10 gap-6 md:gap-0">
                    {/* Left content */}
                    <motion.div
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex flex-col"
                    >
                      <h3 className="text-xl font-light leading-[1.2]">
                        {school.title}
                      </h3>
                      <div className="mt-[15px] inline-flex items-center text-sm font-light">
                        Learn more{" "}
                        <Image
                          src="/images/arrow-right-tip.svg"
                          alt="arrow"
                          width={25}
                          height={24}
                          className="ml-[12px]"
                        />
                      </div>
                    </motion.div>

                    {/* Right arrow button */}
                    <div className="mt-4 md:mt-0">
                      <span className="w-[74px] h-[74px] flex items-center justify-center border border-white rounded-full">
                        <Image
                          src="/images/arrow-primary.svg"
                          alt="arrow"
                          width={24}
                          height={24}
                        />
                      </span>
                    </div>
                  </div>
                ) : (
                  // INACTIVE CARD: only arrow centered at bottom
                  <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-10">
                    <span className="w-[74px] h-[74px] flex items-center justify-center border border-white rounded-full">
                      <Image
                        src="/images/arrow-primary.svg"
                        alt="arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
