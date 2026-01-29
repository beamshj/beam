"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp } from "@/public/assets/FramerAnimation/animation";
import { HomeProps } from "../type";

// ✅ Simple lazy loading
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => <div className="h-[100px] bg-gray-100 animate-pulse rounded" />,
});

const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

// Import Swiper styles at top level (they're small)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LogoSlider = ({ data }: { data: HomeProps["ninethSection"] }) => {
  const [modules, setModules] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    // ✅ Load Swiper modules only when needed
    import("swiper/modules").then((mod) => {
      setModules([mod.Autoplay, mod.Pagination]);
      setIsLoaded(true);
    });
  }, []);

  return (
    <motion.section
      className="py-8 xl:py-25 2xl:py-23 max-w-[1920px] mx-auto overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        {isLoaded ? (
          <Swiper
            modules={modules}
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
              992: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1400: { slidesPerView: 5, spaceBetween: 10 },
            }}
            className="alumni-swiper"
          >
            {data.items.map((value, index) => (
              <SwiperSlide key={index}>
                <div>
                  <Image
                    src={value.image}
                    alt={value.imageAlt}
                    width={196}
                    height={65}
                    loading="lazy"
                    quality={85}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-4">
            {data.items.map((value, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={value.image}
                  alt={value.imageAlt}
                  width={196}
                  height={65}
                  loading="lazy"
                  quality={85}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default LogoSlider;