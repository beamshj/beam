"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export interface ValueItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  items: ValueItem[];
}

export default function MoreToExplore({ items }: Props) { 
  
  return (
    <section className="pt-10 pb-0 xl:py-20 2xl:py-[135px] bg-[#F6F6F6] overflow-hidden">
      <div className="container relative ">
        <h2 className="text-lg xl:text-2xl 2xl:text-4xl font-light mb-4 xl:mb-8 2xl:mb-[50px]">
          Building Milestones
        </h2>
        <div className="mt-[155px]">
        <div className="relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 1},
          1024: { slidesPerView: 1 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }} 
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="!overflow-visible"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="mb-9 flex flex-col items-start relative">
              
              {/* Year Badge */}
              <div className="mb-5 flex items-center border border-black rounded-full px-[15px] py-[7px] w-fit yrmn ">
                <p className="text-md md:text-lg 2xl:text-xl font-light text-black leading-[1]">
                  {item.year}
                </p>
              </div>

              {/* Timeline Dot + Line */}
              <div className="relative mb-5 w-full">
                <div className="w-[48px] h-[48px] bgseta    rounded-full flex items-center justify-center relative z-[2]">
                  <div className="w-[24px] h-[24px] bgactive rounded-full "></div>
                </div>
                <div className="absolute top-[25px] left-[28px] w-full h-[1px] bg-gradient-to-r from-[#7E5AA3] to-[#23ABD2]"></div>
              </div>

              {/* Content */}
              <div className="mt-5 lg:mt-[71px] vhidden">
                <p className="text-md md:text-lg 2xl:text-xl font-light text-black leading-[1] mb-3">
                  {item.title}
                </p>
                <p className="text-sm font-light text-colorpara leading-[1.2] max-w-[24ch]">
                  {item.description}
                </p>
              </div>

              {/* Image */}
              <div className="absolute -top-[26%] left-[35%] z-[2]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="object-cover rounded-[12px] h-[428px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="commentpagination cstss rounded-2xl swiper-pagination-custom absolute !-bottom-12 !left-[50%] !translate-x-[-50%]  !w-fit !m-auto bg-[#D3D3D3] flex justify-center gap-0"></div>
 
    </div>
        </div>
      </div>
    </section>
  );
}
