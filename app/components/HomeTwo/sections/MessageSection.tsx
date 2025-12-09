"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveLeft, moveUp } from "../../motionVarients";
import {
  containerVariants,
  fadeTop,
  fadeSide
} from "@/public/assets/FramerAnimation/animation";
import SplitText from "@/components/SplitText";
import { HomeProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

const MessageSection = ({ data }: { data: HomeProps["sixthSection"] }) => {
const t = useApplyLang(data)
const isArabic = useIsPreferredLanguageArabic()

  return (
    <section
      className={`relative w-full bg-[#F6F6F6] ${isArabic ? "aftergd_ar" : "aftergd"} max-w-[1920px] mx-auto overflow-hidden`}
      
    >
    {/* <motion.section
      className="relative w-full bg-[#F6F6F6] aftergd max-w-[1920px] mx-auto overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    > */}
      <div className="relative z-10 block lg:hidden">
        <div className="container border-b border-[#D3D3D3] pb-5 pt-10 mb-10  w-[95%]">
          <h2>
            <SplitText
              tag="span"
              text={t.mainTitle}
              className="text-md lg:text-2xl xl:text-3xl 2xl:text-4xl text-black  font-light "
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
        <div className={`lg:absolute bottom-0  flex ${isArabic ? "pr-[15px] right-0" : "pl-[15px] left-0"}`}>
          <Image
            src={t.image}
            alt="Message"
            width={702}
            height={964}
            className={`w-[50%] lg:w-[100%] ${isArabic && "scale-x-[-1]"}`}
          />
          <div className="container justify-center flex flex-col gap-1">
            <h3 className="text-black text-sm md:text-xl font-medium ">
              {t.name}
            </h3>
            {t.designation.split("\n").map((word, index) => (
              <span key={index} className="text-xs font-light text-colorpara">
                {word}
                {index < t.designation.split("\n").length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2  ">
          <motion.div variants={moveLeft(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="py-8 lg:py-15 xl:py-[120px] 2xl:py-[142px]">
            <motion.div
              className="flex flex-col justify-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* h2 */}
              <motion.div
                className="border-b border-[#D3D3D3] pb-5 hidden lg:block w-[80%] lg:w-[75%]"
                variants={fadeSide}
              >
                <h2 className="text-md 2xl:text-xl font-light text-colorpara">
                  {t.mainTitle}
                </h2>
              </motion.div>

              {/* h1 */}
              <motion.div
                className="lg:pt-4 pb-4 xl:py-7 2xl:pt-[56px] 2xl:pb-[44px]"
                variants={fadeTop}
              >
                <div>
                  <SplitText
                    tag="h2"
                    text={t.subTitle}
                    className="text-xl xl:text-2xl 2xl:text-4xl text-black leading-[1.2] xl:leading-[1.1] font-light 2xl:max-w-[82%] lettersp-4"
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
                </div>
              </motion.div>

              {/* paragraphs */}
              <motion.div
                className="text-sm flex flex-col gap-3 2xl:gap-6 pe-4 xl:pe-[92px]"
                variants={containerVariants}
              >
                {t.description.split("\n").map((desc, index) => (
                  <motion.p
                    key={index}
                    className="text-sm font-light text-colorpara"
                    variants={fadeTop}
                  >
                    {desc}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative z-10 hidden lg:block">
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`lg:absolute bottom-0 ${isArabic ? "right-0" : "left-0"}`}
            >
              <Image
                src={t.image}
                alt={t.imageAlt}
                width={702}
                height={964}
                className={`lg:w-[380px] xl:w-[460px] 2xl:w-[702px] ${isArabic && " scale-x-[-1]"}`}
              />
            </motion.div>
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className={`w-full ${isArabic ? "lg:mr-[55%] 2xl:mr-[67%]" : "lg:ml-[55%] 2xl:ml-[67%]"} lg:mt-[62%] 2xl:mt-[51%]  flex flex-col gap-1 z-10 custom-position-founder`}
            >
              <h3 className="text-black text-lg xl:text-xl font-light">
                {t.name}
              </h3>
              {t.designation.split("\n").map((word, index) => (
                <span
                  key={index}
                  className="text-sm font-light text-colorpara"
                >
                  {word}
                  {index < t.designation.split("\n").length - 1 && <br />}
                </span>
              ))}
              {/* <p className="text-sm font-light text-foreground">
                {messageSectionData.founderTitle}
                <br />
                {messageSectionData.founderTitle2}
              </p> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
