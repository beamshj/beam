"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CardItem = {
  title: string;
  image: string;
};

type CardsProps = {
  data: {
    title: string;
    items: CardItem[];
  };
};

export default function MoreToExplore({ data }: CardsProps) {
  const { title, items } = data;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      if (headingRef.current) {
        const rect = headingRef.current.getBoundingClientRect();
        setLeftOffset(rect.left + 15);
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <section className="py-12 md:py-20 2xl:py-[135px]">
      <div>
        <div ref={headingRef} className="container">
          <h2 className="text-4xl font-light mb-[50px]">{title}</h2>
        </div>
        <div style={{ paddingLeft: `${leftOffset}px`, paddingRight: 0 }}>
          <Swiper
            slidesPerView={1.2}
            spaceBetween={11}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3.9 },
            }}
            modules={[Pagination]}
            className="!pb-[60px]"
          >
            {items.map((card, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative group h-[468px] max-w-[428px] overflow-hidden cursor-pointer rounded-[12px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform rounded-[12px] duration-300 scale-100 group-hover:scale-105"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black to-transparent z-10"></div>
                  {/* Title */}
                  {card.title && (
                    <div className="absolute bottom-[40px] left-[40px] z-20 leading-[1.2] text-white text-xl font-light">
                      {card.title}
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[rgba(63,34,92,0.94)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                    <div className="w-[75px] h-[75px] border border-white rounded-full flex items-center justify-center text-white">
                      <Image
                        src="/images/arrow-primary.svg"
                        alt="arrow-right-tip"
                        width={15}
                        height={15}
                        className="w-[15px] h-[15px]"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom pagination styling (globally apply) */}
          <style jsx global>{`
            .swiper-pagination {
              text-align: center;
            }
            .swiper-pagination-bullet {
              background: #d3d3d3;
              border-radius: 0;
              width: 60px;
              height: 3px;
              margin: 0 !important;
            }
            .swiper-pagination-bullet-active {
              background: #42badc;
            }
          `}</style>
        </div>
      </div>
      <div className="container border-b border-[#D3D3D3] pb-12 md:pb-20 2xl:pb-[135px]"></div>
    </section>
  );
}
