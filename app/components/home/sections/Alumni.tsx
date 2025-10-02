"use client";
import React from "react";
import { alumniData } from "@/app/data/alumni";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  cardVariants2,
  containerVariants2,
  fadeUp,
} from "@/public/assets/FramerAnimation/animation";
// Optional: Add modules if needed

const Alumni = () => {
  return (
    <motion.section
      className="  py-12 md:pt-20 md:pb-25 2xl:pt-[135px] 2xl:pb-[126px]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.div
          className="mb-5 md:mb-8 xl:mb-[64px]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="text-3xl md:text-4xl font-light   text-black lettersp-4 leading-[1] 2xl:leading-tight "
            dangerouslySetInnerHTML={{ __html: alumniData.heading }}
          ></h2>
        </motion.div>
        <motion.div
          variants={containerVariants2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="alumni-swiper"
          >
            {alumniData.alumni.map((value, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={cardVariants2}
                  className="border-t border-bdrcolor pt-4 md:pt-6 group overflow-hidden"
                >
                  <h3 className="text-xl font-light text-black transition-all duration-300">
                    {value.name}
                  </h3>
                  <p className="text-sm font-light text-[#626262] transition-all duration-300">
                    {value.designation}
                  </p>
                  <div className="mt-9 aluminibg transform transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={value.img}
                      alt={value.name}
                      width={351}
                      height={413}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Custom pagination container */}
        <div className="flex justify-between items-center">
          <div className="w-full">
            <div className="mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-bdrcolor bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]">
              <div className="cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-white rounded-full flex items-center gap-2 transition-all duration-300">
                <p className="group-hover:text-black text-xs font-light text-foreground uppercase transition-colors duration-300">
                  Alumni Stories
                </p>
                <div className="p-1 flex items-center justify-center bg-primary w-[27px] h-[27px] rounded-full transition-transform duration-300 group-hover:rotate-45">
                  <Image
                    src="/assets/arrow.svg"
                    alt="arrow"
                    width={11}
                    height={11}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-pagination   flex justify-end gap-2"></div>
      </div>
    </motion.section>
  );
};

export default Alumni;
