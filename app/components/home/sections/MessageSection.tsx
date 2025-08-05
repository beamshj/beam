"use client"
import React from "react";
import Image from "next/image";
import { messageSectionData } from "@/app/data/MessageSection";
import { motion } from "framer-motion";
import { containerVariants, fadeTop,  fadeSide, fadeInRight, fadeUp } from "@/public/assets/FramerAnimation/animation";

const MessageSection = () => {
  return (
    <motion.section className="relative w-full  2 bg-[#F6F6F6] aftergd"
      variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}>
      <div className="relative z-10 block lg:hidden">
        <div className="container border-b border-[#D3D3D3] pb-5 pt-10 mb-10  w-[95%]">
          <h2 className="text-3xl 2xl:text-4xl text-black  font-light ">
            {messageSectionData.heading}
          </h2>
        </div>
        <div className="lg:absolute bottom-0 left-0 flex ">
          <Image
            src={messageSectionData.image}
            alt="Message"
            width={702}
            height={964}
            className="w-[50%] sm:w-[100%]"
          />
          <div className="container justify-center flex flex-col gap-1      pt-10">
            <h3 className="text-black text-sm sm:text-xl font-light ">
              {messageSectionData.founder}
            </h3>
            <p className="text-xs sm:text-sm font-light">
              {messageSectionData.founderTitle}
              <br />
              {messageSectionData.founderTitle2}
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2  ">
        <div className="py-8 md:py-15 xl:py-[142px]">
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
          <h2 className="text-xl font-light">
            {messageSectionData.heading}
          </h2>
        </motion.div>

        {/* h1 */}
        <motion.div
          className="py-7 2xl:pt-[56px] 2xl:pb-[44px]"
          variants={fadeTop}
        >
          <h1 className="text-2xl 2xl:text-4xl text-black leading-[1] 2xl:leading-[1.1] font-light 2xl:max-w-[82%] lettersp-4">
            {messageSectionData.title}
          </h1>
        </motion.div>

        {/* paragraphs */}
        <motion.div
          className="text-sm flex flex-col gap-3 2xl:gap-6 pe-4 xl:pe-[92px]"
          variants={containerVariants}
        >
          {messageSectionData.desc.map((desc, index) => (
            <motion.p
              key={index}
              className="text-sm font-light text-foreground"
              variants={fadeTop}
            >
              {desc}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </div>
          <div className="relative z-10 hidden lg:block">
            <motion.div 
          variants={fadeTop}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, amount: 0.3 }}
           className="lg:absolute bottom-0 left-0  ">
                
              <Image
                src={messageSectionData.image}
                alt="Message"
                width={702}
                height={964}
                className="lg:w-[380px] xl:w-[460px] 2xl:w-[702px]"
              />
            </motion.div>
            <motion.div 
              variants={fadeInRight}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }}
            className="w-fit ml-[50px] 2xl:ml-auto h-full justify-center flex flex-col gap-1     bottom-[33%] 2xl:bottom-[26%] 2xl:bottom-[8%] z-10 relative">
              <h3 className="text-black text-xl font-light">
                {messageSectionData.founder}
              </h3>
              <p className="text-sm font-light">
                {messageSectionData.founderTitle}
                <br />
                {messageSectionData.founderTitle2}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MessageSection;
