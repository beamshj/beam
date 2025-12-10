"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/public/assets/FramerAnimation/animation";
import { fadeInLeft } from "@/public/assets/FramerAnimation/animation";
import { HomeProps } from "../type";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { useApplyLang } from "@/lib/applyLang";
import LangLink from "@/lib/LangLink";

const JoinBeam = ({ data }: { data: HomeProps["tenthSection"] }) => {
  const isArabic = useIsPreferredLanguageArabic();
  const t = useApplyLang(data)
  return (
    <motion.section
      className="w-full lg:h-full h-[330px] relative max-w-[1920px] mx-auto overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full h-full absolute z-10 left-0 top-0 right-0 bottom-0">
        <Image
          src="/assets/home/joinbg.jpg"
          alt="Join Beam"
          fill
          className="hidden md:block object-cover h-full w-full"
        />
        <Image
          src="/assets/home/joinbgsmall.jpg"
          alt="Join Beam"
          fill
          className="md:hidden object-cover h-full w-full"
        />
      </div>
      <div className="container h-full z-30 relative">
        <div className="relative z-20 flex justify-center h-full text-white flex-col w-full md:w-[75%] gap-0 2xl:gap-10 pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-16 lg:pb-16 2xl:pt-20 2xl:pb-25 md:py-[160px]">
          <div className="flex flex-col gap-4 2xl:gap-7">
            <motion.h2
              className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light lettersp-4"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {t.title}
            </motion.h2>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-base 2xl:text-lg font-light max-w-[45ch]">
                {t.description}
              </p>
            </motion.div>
          </div>
          <LangLink
            href={"https://careers.beam.co.ae/en/job-search-results"}
            target="_blank"
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.4, duration: 0.2, ease: "easeOut" }}
              className={`mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 border-[1px] border-primary rounded-full ${isArabic ? "hover:-translate-x-[5px]" : "hover:translate-x-[5px]"} hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]`}
            >
              <div className="cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-transparent rounded-full flex items-center gap-2 transition-all duration-300">
                <p className="text-xs font-light text-white uppercase transition-colors duration-300">
                  {t.buttonText}
                </p>
                <div className={`p-2 flex items-center justify-center bg-primary w-fit rounded-full transition-transform duration-300 ${isArabic ? "-rotate-90 group-hover:-rotate-135" : "group-hover:rotate-45"}`}>
                  <Image
                    src="/assets/arrow.svg"
                    alt="arrow"
                    width={7}
                    height={7}
                  />
                </div>
              </div>
            </motion.div>
          </LangLink>
        </div>
      </div>
      <div className={`w-full h-full absolute top-0 ${isArabic ? "right-0 bg-gradient-to-r from-transparent via-black/20 to-black/70" : "left-0 bg-gradient-to-l from-transparent via-black/20 to-black/70"} z-20`}></div>
    </motion.section>
  );
};

export default JoinBeam;
