"use client";
import React from "react";
import { schoolData } from "@/app/data/ourSchools";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { fadeInLeft } from "@/public/assets/FramerAnimation/animation";
// Optional: Add modules if needed
import { Navigation, Pagination } from "swiper/modules";
import {
  fadeUp,
  cardVariants,
} from "@/public/assets/FramerAnimation/animation";
import SplitText from "@/components/SplitText";

const OurSchools = () => {
  const [selected, setSelected] = useState("");

  return (
    <section className="py-8 xl:pt-20 xl:pb-25 2xl:pt-[133px] 2xl:pb-[160px] ">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} >
        <div className="container">
          <div className="mb-5 xl:mb-7  2xl:mb-[53px]">
            <h2 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-tight text-black lettersp-4">
            {/* <SplitText
              tag="h2"
              text={schoolData.heading}
              className=""
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            /> */}
              {schoolData.heading}
            </h2>
          </div>
          <div className="pb-5 md:pb-7 border-b border-bdrcolor">
            <div className="flex-col md:flex-row flex justify-start md:justify-between items-start md:items-center gap-4 md:gap-0">
              <div className="flex gap-3 items-center">
                <div className="p-[1px] group transition-all duration-300  bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full ">
                  <div className="cursor-pointer  px-2 md:px-3 xl:px-5 py-2 md:py-3 xl:py-3 bg-white rounded-full">
                    <p className="text-black smtext10 text-xs font-light  uppercase ">
                      All
                    </p>
                  </div>
                </div>

                <div className="p-[1px] group h-fit transition-all duration-300  bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full ">
                  <div className="cursor-pointer px-2 md:px-4 xl:px-5 py-2 md:py-2 xl:py-3 bg-white rounded-full">
                    <p className="group-hover:text-black smtext10 text-xs font-light text-foreground uppercase ">
                      British Curriculum
                    </p>
                  </div>
                </div>
                <div className="p-[1px] group h-fit transition-all duration-300  bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full ">
                  <div className="cursor-pointer px-2 md:px-4 xl:px-5 py-2 md:py-2 xl:py-3 bg-white rounded-full">
                    <p className="group-hover:text-black smtext10 text-xs font-light text-foreground uppercase ">
                      American Curriculum
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="   ">
                  <div className="w-full">
                    <div className="relative inline-block min-w-[120px] lg:min-w-[348px]">
                      <select value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="appearance-none border border-bdrcolor cursor-pointer rounded-full pl-2 md:pl-4 pr-10 py-2 md:py-3 smtext10 text-xs focus:outline-none focus:ring-0 w-auto"
                      >
                        <option value="">Location</option>
                        {schoolData.schools.map((option) => (
                          <option key={option.location} value={option.location}>
                            {option.location}
                          </option>
                        ))}
                      </select>

                      {/* Custom arrow icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg
                          className="w-4 h-4 text-foreground"
                          fill="none"
                          stroke="#42BADC"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              // spaceBetween={20}
              slidesPerView={1}
              // navigation
              pagination={{
                clickable: true,
                el: ".cus-pagination",
                renderBullet: (index, className) => {
                  return `<span class="${className}"></span>`;
                },
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mt-5 md:mt-8 2xl:mt-15"
            >
              {schoolData.schools.map((school, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="bg-[#F5F5F5] rounded-[15px] p-1 hover:bg-[#F0F0F0] transition-all duration-300 group"
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="bg-[#F5F5F5] rounded-[15px] p-1 hover:bg-[#F0F0F0] transition-all duration-300 group">
                      <div className="rounded-xl overflow-hidden relative">
                        <Image src={school.img} alt={school.title} width={500} height={500} />
                        <div className="absolute opacity-0 delay-200 group-hover:-translate-y-2 group-hover:opacity-100 transition-all duration-300 top-5 right-5 p-2 bg-white/30 backdrop-blur-md  rounded-full w-[75px] h-[75px] flex items-center justify-center border border-[#42BADC]">
                          <Image src="/images/home/arrow-top.svg" alt={school.title} width={15} height={15} />
                        </div>
                        <div className="absolute bottom-2 left-2 p-2 bg-white rounded-md w-fit">
                          <Image src={school.logo} alt={school.title} width={109} height={45} />
                        </div>
                      </div>
                      <div className="p-2 md:p-3 xl:p-6 2xl:p-10">
                        <div className="flex justify-between items-center pb-3 border-b border-bdrcolor pt-3 2xl:pt-0">
                          <p className="text-xs font-light text-foreground">
                            {school.curriculum}
                          </p>
                          <div className="flex items-center gap-2">
                            <Image src="/images/home/location.svg" alt={school.title} width={12} height={16} />
                            <p className="text-xs font-light text-foreground">
                              {school.location}
                            </p>
                          </div>
                        </div>

                        <div className="my-4 2xl:mt-6 2xl:mb-8">
                          <h3 className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] lettersp-1">
                            {school.title}
                          </h3>
                        </div>

                        <div>
                          {school.labels.map((label, index) => (
                            <div key={index} className={`relative group overflow-hidden flex justify-between items-center px-3 py-[2.5px] rounded-[10px] transition-all duration-500`} >
                              <div
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                  index % 2 === 0
                                    ? "bg-[linear-gradient(90deg,#E2F5FF_0%,rgba(226,245,255,0)_100%)] group-hover:opacity-0"
                                    : "bg-[linear-gradient(90deg,#F5EBFF_0%,rgba(245,235,255,0)_100%)] group-hover:opacity-0"
                                }`}
                              ></div>

                              <div
                                className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                                  index % 2 === 0
                                    ? "group-hover:opacity-100 bg-[linear-gradient(90deg,#42BADC_0%,rgba(66,186,220,0)_100%)]"
                                    : "group-hover:opacity-100 bg-[linear-gradient(90deg,#7E5AA3_0%,rgba(126,90,163,0)_100%)]"
                                }`}
                              ></div>

                              <div className="relative z-10 flex justify-between items-center w-full">
                                <p className="xl:text-md font-light text-foreground leading-[1.8] transition-colors duration-500 group-hover:text-black">
                                  {label.count} +
                                </p>
                                <p className="text-sm font-light text-foreground leading-[1.8] transition-colors duration-500">
                                  {label.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="cus-pagination   flex justify-end gap-2"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OurSchools;
