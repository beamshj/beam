"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AboutProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

interface Props {
  data: AboutProps["historySection"];
}

export default function MoreToExplore({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);
  useEffect(() => {
    const updateMargin = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetLeft = rect.left;
        setContainerMarginLeft(offsetLeft);
      }
    };

    updateMargin();
    window.addEventListener("resize", updateMargin);
    return () => window.removeEventListener("resize", updateMargin);
  }, []);
  return (
    <section className="pt-10 xl:pt-20 2xl:pt-[135px] pb-[80px] xl:pb-[100px] 2xl:pb-[165px] bg-[#F6F6F6] overflow-hidden">
      <div className="container " ref={containerRef}>
        <h2 className="text-lg xl:text-2xl 2xl:text-4xl font-light md:mb-4 xl:mb-8 2xl:mb-[50px]">
          {t.title}
        </h2>
      </div>

      <div
        className=" relative"
        style={{
          paddingInline: "15px",
          ...(containerMarginLeft && {
            [isArabic
              ? "marginRight"
              : "marginLeft"]: `${containerMarginLeft}px`,
          }),
        }}
      >
        <div className="mt-5 md:mt-[155px] relative">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.1 },
              1024: { slidesPerView: 1.1 },
              1600: { slidesPerView: 1.05 },
            }}
            loop={true}
            speed={650}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="md:!overflow-visible aboutslide"
          >
            {t.items.map((item, index) => (
              <SwiperSlide key={index} className="relative">
                <motion.div
                  className="mb-9 flex flex-col items-start"
                  key={activeIndex}
                  // initial={{ opacity: 0, x: -80 }}
                  // animate={{ opacity: 1, x: 0 }}
                  // transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  {/* Year Badge (static) */}
                  <div className="flex items-center border border-black rounded-full px-[15px] py-[7px] w-fit yrmn relative">
                    <p className="font-light text-black leading-[1]">
                      {item.year}
                    </p>
                  </div>

                  {/* Timeline Dot + Line (static) */}
                  <div className="relative w-full dotline hidden md:block">
                    <div className="w-[48px] h-[48px] bgseta rounded-full flex items-center justify-center relative z-[2]">
                      <div className="w-[24px] h-[24px] bgactive rounded-full"></div>
                    </div>
                    <div className="absolute top-[25px] left-[28px] w-full h-[1px] bg-gradient-to-r from-[#7E5AA3] to-[#23ABD2]"></div>
                  </div>

                  {/* Animated Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="md:mt-5 lg:mt-[71px] vhidden h-[200px] mb-10"
                  >
                    <p className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] mb-3">
                      {item.title}
                    </p>
                    <div className="text-sm font-light text-colorpara leading-[1.3] max-w-[24ch] xl:max-w-[28ch]">
                      {item.description.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Animated Image */}
                  <motion.div
                    initial={{ opacity: 1, scale: 0.9, y: 0 }}
                    whileInView={{ opacity: 1, scale: 1, y: -40 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="md:absolute  md:left-[40%] lg:left-[35%] z-[2] "
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={500}
                      height={500}
                      className="object-cover rounded-[12px] h-[300px] w-full lg:h-[380px] xl:h-[425px] md:w-[85%] lg:w-[85%] 2xl:w-[100%]"
                    />
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination + Navigation */}
          <div className="flex gap-9 w-fit m-auto relative top-5 lg:top-10 left-0 xl:left-12">
            <button
              className="swiper-button-prev-custom transition cursor-pointer group"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="group-hover:scale-140  duration-300"
              >
                <path
                  d="M15.0901 19.9201L8.57009 13.4001C7.80009 12.6301 7.80009 11.3701 8.57009 10.6001L15.0901 4.08008"
                  stroke="#626262"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="commentpagination  cstss rounded-2xl swiper-pagination-custom !w-[170px] md:!w-[280px] !m-auto bg-[#D3D3D3] flex justify-center gap-0"></div>

            <button
              className="swiper-button-next-custom transition cursor-pointer group"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="group-hover:scale-140  duration-300 rotate-180"
              >
                <path
                  d="M15.0901 19.9201L8.57009 13.4001C7.80009 12.6301 7.80009 11.3701 8.57009 10.6001L15.0901 4.08008"
                  stroke="#626262"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
