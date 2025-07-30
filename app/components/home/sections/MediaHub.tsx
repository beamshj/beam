'use client'
import React from 'react';
import { mediaHubData } from '@/app/data/MediaHub'
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
// Optional: Add modules if needed
import { Navigation, Pagination } from 'swiper/modules';

const Alumni = () => {

  return (
    <section>

      <div   >
        <div className="container border-t border-bdrcolor"></div>
        <div className='  pt-12 pb-12 md:pt-15 md:pb-15 xl:pt-[83px] xl:pb-[150px] '>
          <div className="container">
            <div className='mb-5 md:mb-8 xl:mb-[52px]'><h2 className='text-3xl md:text-4xl font-light leading-tight text-black  '  >{mediaHubData.heading}</h2></div>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            // }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="alumni-swiper"
          >
            {mediaHubData.mediaHub.map((value, index) => (
              <SwiperSlide key={index}>
                <div >
                  <div className='h-[557px] rounded-[15px] group' style={{ backgroundImage: `url(${value.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className='h-full rounded-[15px] transition-all duration-300 bg-[linear-gradient(180deg,_rgba(66,_186,_220,_0)_61.58%,_#42BADC_94.52%)] group-hover:bg-[#42BADC]'>
                    <div className='p-10'>
                      <p className='text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 '>{value.date}</p>
                      <p className='text-white text-xl font-light leading-[1.2] mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300'>{value.title}</p>
                      <div className='  transition-all duration-300 top-5 right-5 p-2  mt-15 opacity-0 group-hover:opacity-100 rounded-full w-[75px] h-[75px] flex items-center justify-center border border-white'>
                        <Image src='/images/home/arrow-top.svg' className='group-hover:translate-y-[-5px] transition-all duration-300 filter group-hover:fill-white' alt={value.title} width={15} height={15} />
                      </div>
                    </div>
                    <div className='px-3 py-1 border border-white rounded-full text-white absolute bottom-5 left-5'><p>{value.category}</p></div>
                 
                    </div>
                     </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="container border-t border-bdrcolor"></div>



      </div>


    </section>
  )
}

export default Alumni