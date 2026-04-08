"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useApplyLang } from "@/lib/applyLang";
import { moveUp } from "../../motionVarients";
import { motion } from "framer-motion";

interface Logo {
  _id: string;
  image: string;
  imageAlt: string;
  imageAlt_ar: string;
}

interface LogoGridSectionProps {
  data: Logo[];
}

export default function LogoSlider({ data }: LogoGridSectionProps) {
  const tData = useApplyLang(data);
  return (
    <section className="w-full bg-white pb-10 xl:pb-25 2xl:pb-[135px]">
      <motion.div
        variants={moveUp(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{
          amount: 0.1,
          once: true,
        }}
        className="container"
      >
        <Swiper
          modules={[Autoplay]}
          loop={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={700}
          spaceBetween={16.3}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1450: { slidesPerView: 6 },
          }}
        >
          {tData?.map((logo, i) => (
            <SwiperSlide key={logo._id}>
              <motion.div
                variants={moveUp(i * 0.09)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative w-full h-[115px] xl:h-[110px] 2xl:h-[115px]"
              >
                <Image
                  src={logo.image}
                  alt={logo.imageAlt}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
