"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";
import { BeamSchoolType } from "../../BeamSchools/type";

export default function OurSchools({
  data,
  title,
  description,
}: {
  data: BeamSchoolType;
  title: string;
  description: string;
}) {
  const { schools } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pb-12 md:pb-20 xl:pb-[135px]">
      <div className="container overflow-hidden">
        {/* Title + Description */}
        <div className="mb-5 md:mb-8 xl:mb-[30px]">
          <SplitText
            tag="h1"
            text={title}
            className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-black leading-[1.1111]"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          />
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-colorpara font-light text-sm leading-[1.52] mt-3 xl:mt-[50px]"
          >
            {description}
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={moveUp(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap lg:flex-row gap-6 lg:gap-[1%] justify-between"
        >
          {schools.map((school, i) => {
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(0)}
                animate={{
                  width: "100%",
                  maxWidth: isActive ? "45%" : "10%",
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                onClick={() =>
                  window.open(school.link, "_blank", "noopener,noreferrer")
                }
                className={`relative rounded-[12px] overflow-hidden h-[300px] md:h-[350px] xl:h-[544px] cursor-pointer flex-shrink-0 schl ${
                  isActive ? "z-20" : "z-10"
                }`}
              >
                {/* Image */}
                <Image
                  src={school.image}
                  alt={school.imageAlt}
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
                    className="absolute top-[42px] left-5 xl:left-[40px] z-10 bg-[#E6F7FF] font-light text-sm leading-[1.42] px-[20px] py-[11px] rounded-[50px] inline-flex items-center gap-[8px] text-black"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={"/images/contact-us/icons/location.svg"}
                      alt="location"
                      width={24}
                      height={24}
                    />
                    {school.location.name}
                  </motion.div>
                )}
                {/* Active / Inactive Content */}
                {isActive ? (
                  // ACTIVE CARD (expanded)
                  <div className="absolute w-full bottom-5 xl:bottom-10 px-5  xl:px-10 flex flex-row items-end justify-between xl:items-end text-white z-10 gap-2  md:gap-6 xl:gap-0">
                    {/* Left content */}
                    <motion.div
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex flex-col"
                    >
                      <h3 className="text-md lg:text-lg xl:text-xl font-light leading-[1.2]">
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
                    <div className="">
                      <span className="w-8 h-8 md:w-12 md:h-12 xl:w-[74px] xl:h-[74px] flex items-center justify-center border border-white rounded-full">
                        <Image
                          src="/images/arrow-primary.svg"
                          alt="arrow"
                          width={24}
                          height={24}
                          className="w-auto h-4 xl:h-[24px]"
                        />
                      </span>
                    </div>
                  </div>
                ) : (
                  // INACTIVE CARD: only arrow centered at bottom
                  <div className="absolute bottom-[40px] left-5 xl:left-1/2 xl:-translate-x-1/2 z-10">
                    <span className="w-14 h-14 xl:w-[74px] xl:h-[74px] flex items-center justify-center border border-white rounded-full">
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
        </motion.div>
      </div>
    </section>
  );
}
