"use client";
import React from "react";
import { logoSliderData } from "@/app/data/logoSlider";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
// Optional: Add modules if needed
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fadeUp } from "@/public/assets/FramerAnimation/animation";

const LogoSlider = () => {
  return (
    <motion.section
      className="py-12 md:py-25 2xl:py-23 max-w-[1920px] mx-auto overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={2}
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
            992: { slidesPerView: 3,spaceBetween: 20 },
            1024: { slidesPerView: 4,spaceBetween: 20 },
            1400: { slidesPerView: 5,spaceBetween: 10 },
          }}
          className="alumni-swiper"
        >
          {logoSliderData.logoSlider.map((value, index) => (
            <SwiperSlide key={index}>
              <div>
                <Image
                  src={value.img}
                  alt={"logo"}
                  width={value.width}
                  height={value.height}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default LogoSlider;
