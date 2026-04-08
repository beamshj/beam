"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useApplyLang } from "@/lib/applyLang";

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
      <div className="container">
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
            0: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1450: { slidesPerView: 6 },
          }}
        >
          {tData?.map((logo) => (
            <SwiperSlide key={logo._id}>
              <div className="relative w-full h-[55px] sm:h-[62px] lg:h-[70px] 2xl:h-[82px]">
                <Image
                  src={logo.image}
                  alt={logo.imageAlt}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
