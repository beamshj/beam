"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
export interface VMItem {
  details: string[];
  name: string;
  designation: string;
  icon: string;
}

export interface commentsData {
  title: string;
  description: string;
  items: VMItem[];
}

const Comments = ({ commentsData }: { commentsData: commentsData }) => {
  return (
    <section className="pt-8 md:pt-12 lg:pt-20 2xl:pt-[135px] pb-4 md:pb-5 lg:pb-10 2xl:pb-[40px] overflow-hidden ">
      <div className="container">
        <div>
          <div>
            {/* <h2 className="text-lg lettersp-4 lg:text-xl xl:text-2xl 2xl:text-4xl  font-light leading-[1.111111111] text-black "
              dangerouslySetInnerHTML={{ __html: commentsData.title }}
            /> */}
            <div className="mb-4 md:mb-6 xl:mb-8 2xl:mb-8">
              {commentsData.title.split(/<br\s*\/?>/gi).map((part, index) => (
                <div key={index} className="">
                  <SplitText
                    tag="h2"
                    text={part.replace(/<[^>]*>/g, '')}
                    className="text-lg lettersp-4 lg:text-xl xl:text-2xl 2xl:text-4xl font-light leading-[1.111111111] text-black "
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                  />
                  {index < commentsData.title.split(/<br\s*\/?>/gi).length - 1 && <br />}
                </div>
              ))}
            </div>
            <p className=" text-sm leading-[1.526315789473684] max-w-[85ch] mb-6 font-light  text-colorpara">
              {commentsData.description}
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-10 right-0 flex gap-3 z-10">
              <button
                className="swiper-button-prev-custom   transition cursor-pointer group"
                aria-label="Previous"
              >
                <Image
                  src="/images/icons/arrow-right.svg"
                  alt="Prev"
                  width={18}
                  height={18}
                  className="group-hover:scale-140 transition-all duration-300 brightness-44 opacity-25 group-hover:opacity-100 group-hover:brightness-100"
                />
              </button>
              <button
                className="swiper-button-next-custom transition cursor-pointer group"
                aria-label="Next"
              >
                <Image
                  src="/images/icons/arrow-right.svg"
                  alt="Next"
                  width={18}
                  height={18}
                  className="rotate-180 group-hover:scale-140 transition-all duration-300 brightness-44 opacity-25 group-hover:opacity-100 group-hover:brightness-100"
                />
              </button>
            </div>
          </div>
          <div className="">
            <div className="relative testimonialslider">
              <Swiper
                spaceBetween={20}
                slidesPerView={1.2}
                breakpoints={{
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 1.7 },
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
                className="!overflow-visible mt-5"
              >
                {commentsData.items.map((item, index) => (
                  <SwiperSlide key={index} className="flex items-stretch">
                    <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{amount: 0.1, once: true}} className={`flex flex-col justify-between w-full p-5 lg:p-6 xl:p-10 rounded-2xl ${index % 2 === 0 ? "bg-[#F5EBFF]" : " bg-[#E6F7FF]"} `}
                    >
                      {/* ⭐ Stars */}
                      <div className="flex gap-1 mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Image key={i} src="/images/testimonials/star.svg" alt="star" width={15} height={15} /> ))}
                      </div>

                      {/* 💬 Content */}
                      <p className="flex-grow text-sm leading-[1.5263] font-light text-colorpara">
                        {item.details}
                      </p>

                      {/* 👤 Profile */}
                      <div className="flex gap-2 lg:gap-4 md:w-[80%] border-t border-black pt-5 mt-8">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={90}
                          height={90}
                          className="rounded-full w-[30px] h-[30px] lg:w-[90px] lg:h-[90px]"
                        />
                        <div>
                          <p className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] mb-2 lg:mb-3">
                            {item.name}
                          </p>
                          <p className="text-sm leading-[1.5263] font-light text-colorpara">
                            {item.designation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="commentpagination rounded-2xl swiper-pagination-custom absolute !-bottom-8 !left-[50%] !translate-x-[-50%]  !w-fit !m-auto bg-[#D3D3D3] flex justify-center gap-0"></div>

            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Comments;
