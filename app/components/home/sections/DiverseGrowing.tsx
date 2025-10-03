"use client";
import React from "react";
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
  fadeInLeft,
  fadeInRight,
} from "@/public/assets/FramerAnimation/animation";
// Optional: Add modules if needed

const DiverseGrowing = () => {
  return (
    <section className="pt-8 md:pt-20 2xl:pt-[137px]">
      <div className="relative pb-12 md:pb-15 xl:pb-[150px] max-w-[1920px] mx-auto overflow-hidden">
        <div className="container">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }} // Trigger when only 10% of image enters viewport
            >
              <h2 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-tight text-black max-w-[20ch] lettersp-4 xl:mb-20 2xl:mb-40">
                {diverseGrowingData.heading}
              </h2>
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
                  <div className=" group overflow-hidden border relative 2xl:left-[50px] bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] min-w-full lg:min-w-[250px] 2xl:min-w-[597px] px-6 pt-4 pb-5 2xl:px-10 xl:py-4 w-fit m-auto">
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-center gap-4 pb-5">
                        <p className="text-xl 2xl:text-2xl font-light text-primary group-hover:text-black group-hover:-translate-x-3 transition-all duration-500">
                          {diverseGrowingData.secvalues[0].count}+
                        </p>
                        <Image
                          className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110 "
                          src={diverseGrowingData.secvalues[0].img}
                          alt={diverseGrowingData.secvalues[0].title}
                          width={50}
                          height={50}
                        />
                      </div>
                      <p className="text-md 2xl:text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                        {diverseGrowingData.secvalues[0].title}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-baseline">
                    <div className="relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                      {/* Animated gradient layer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between min-w-full lg:min-w-[250px] 2xl:min-w-[434px] 2xl:min-h-[310px] px-6 pt-4 pb-5 2xl:px-10 xl:py-4">
                        <div className="flex justify-between items-center gap-4 pb-5">
                          <p className="text-xl 2xl:text-2xl font-light text-[#7E5AA3] group-hover:text-black  group-hover:-translate-x-3 transition-all duration-500">
                            {diverseGrowingData.secvalues[1].count}+
                          </p>
                          <Image
                            className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                            src={diverseGrowingData.secvalues[1].img}
                            alt={diverseGrowingData.secvalues[1].title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <p className="text-md 2xl:text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                          {diverseGrowingData.secvalues[1].title}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col w-full gap-5 lg:gap-0 xl:max-w-[389px]">
                      {/* Card 1 */}
                      <div className="relative group overflow-hidden border bg-white xl:bg-white/30 xl:backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                        {/* Gradient hover overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-between px-6 pt-4 pb-5 2xl:px-10 xl:py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[389px] 2xl:min-h-[258px]">
                          <div className="flex justify-between items-center gap-4 pb-5">
                            <p className="text-xl 2xl:text-2xl font-light text-[#7E5AA3] group-hover:text-black  group-hover:-translate-x-3 transition-all duration-500">
                              {diverseGrowingData.secvalues[2].count}+
                            </p>
                            <Image
                              className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                              src={diverseGrowingData.secvalues[2].img}
                              alt={diverseGrowingData.secvalues[2].title}
                              width={50}
                              height={50}
                            />
                          </div>
                          <p className="text-md 2xl:text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                            {diverseGrowingData.secvalues[2].title}
                          </p>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="relative group overflow-hidden border bg-white xl:bg-white/30 xl:backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                        {/* Gradient hover overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-between px-6 pt-4 pb-5 2xl:px-10 xl:py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[389px] 2xl:min-h-[245px]">
                          <div className="flex justify-between items-center gap-4 pb-5">
                            <p className="text-xl 2xl:text-2xl font-light text-primary group-hover:text-black group-hover:-translate-x-3 transition-all duration-500">
                              {diverseGrowingData.secvalues[4].count}+
                            </p>
                            <Image
                              className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                              src={diverseGrowingData.secvalues[4].img}
                              alt={diverseGrowingData.secvalues[4].title}
                              width={50}
                              height={50}
                            />
                          </div>
                          <p className="text-md 2xl:text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                            {diverseGrowingData.secvalues[4].title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card with animated gradient background on hover */}
                    <div className="relative group overflow-hidden border bg-white xl:bg-white/30 xl:backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between px-6 pt-4 pb-5 2xl:px-10 xl:py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[417px] 2xl:min-h-[362px]">
                        <div className="flex justify-between items-center gap-4 xl:pb-5">
                          <p className="text-xl 2xl:text-2xl font-light text-[#7E5AA3] group-hover:text-black group-hover:-translate-x-3 transition-all duration-500">
                            {diverseGrowingData.secvalues[3].count}+
                          </p>
                          <Image
                            className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                            src={diverseGrowingData.secvalues[3].img}
                            alt={diverseGrowingData.secvalues[3].title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <p className="text-md 2xl:text-xl font-light text-[#626262] max-w-[18ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
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
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger when only 10% of image enters viewport
          className="absolute bottom-0 lg:left-[5%] z-[-1] responsive md:w-[50%] 2xl:w-[913px]"
        >
          <Image
            src={diverseGrowingData.image}
            alt={diverseGrowingData.heading}
            width={913}
            height={944}
            className=""
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DiverseGrowing;
