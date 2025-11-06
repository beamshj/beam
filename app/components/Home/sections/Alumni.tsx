"use client";
import React from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import {
  fadeInLeft,
  cardVariants2,
  containerVariants2,
  fadeUp,
} from "@/public/assets/FramerAnimation/animation";
import { HomeProps } from "../type";
import Link from "next/link";
// Optional: Add modules if needed

const Alumni = ({ data }: { data: HomeProps["seventhSection"] }) => {
  const textParts = data.title.split("\n");
  return (
    <motion.section
      className="py-8 xl:pt-20 xl:pb-25 2xl:pt-[135px] 2xl:pb-[126px] max-w-[1920px] mx-auto overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container relative">
        <motion.div
          className="mb-5 md:mb-8 xl:mb-[64px]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-xl md:text-xl xl:text-2xl 2xl:text-3xl font-light text-black lettersp-4 leading-[1.3] 2xl:leading-tight">
            {textParts.map((part, index) => (
              <React.Fragment key={index}>
                <SplitText
                  text={part.replace(/<[^>]*>/g, "")}
                  tag="span"
                  className="block" // Add this to make it display as block
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
                {index < textParts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
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
              el: ".alumni-pagination", 
              bulletClass: "swiper-pagination-bullet alumni-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active alumni-bullet-active",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="alumni-swiper"
          >
            {data.items.map((value, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={cardVariants2}
                  className="border-t border-bdrcolor pt-4 md:pt-6 group overflow-hidden"
                >
                  <h3 className="text-md 2xl:text-xl font-light text-black transition-all duration-300">
                    {value.name}
                  </h3>
                  <p className="text-sm font-light text-[#626262] transition-all duration-300">
                    {value.course}
                  </p>
                  <div className="mt-9 aluminibg transform transition-transform duration-500 group-hover:scale-105 xl:h-[378px] xl:w-[368px] 2xl:h-[438px] 2xl:w-[428px]">
                    <Image
                      src={value.image}
                      alt={value.imageAlt}
                      width={351}
                      height={413}
                      className="w-full h-[260px] xl:h-full object-contain object-bottom-left"
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
            <Link href={data.link}>
              <div className="mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-bdrcolor bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]">
                <div className="cursor-pointer pl-4 pr-2 md:px-5 py-2 md:py-3 bg-white rounded-full flex items-center gap-2 transition-all duration-300">
                  <p className="group-hover:text-black text-xs font-light text-foreground uppercase transition-colors duration-300">
                    {data.buttonText}
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
            </Link>
          </div>
        </div>

        <div className="alumni-pagination flex justify-center xl:justify-end gap-2 mt-10 xl:mt-0 relative z-20 pointer-events-auto"></div>
      </div>
    </motion.section>
  );
};

export default Alumni;
