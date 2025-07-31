'use client'
import React from 'react';
import { logoSliderData } from '@/app/data/logoSlider'
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

const LogoSlider = () => {

  return (
    <section className='py-12 md:py-15 xl:py-23'> 
          <div className="container"> 
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            breakpoints={{
              992: { slidesPerView: 3 },
              1024: { slidesPerView: 4},
              1400: { slidesPerView: 5},
              
      
            }}
            className="alumni-swiper"
          >
            {logoSliderData.logoSlider.map((value, index) => (
              <SwiperSlide key={index}> 
                  <div>
                    <Image src={value.img} alt={'logo'} width={value.width} height={value.height} />
                  </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>  
    </section>
  )
}

export default LogoSlider