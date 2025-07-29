'use client'
import React, { useState } from 'react'
import { slides } from '@/app/data/heroSlides'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

const HeroSection = () => {
      const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <section className='h-screen w-full'>
         <Swiper
        modules={[Navigation]}
        navigation
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        loop
        className="h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <section
              className="relative h-screen bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 text-white max-w-5xl">
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  <span className="font-medium">{slide.title}</span>
                </h1>

                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 bg-sky-400 hover:bg-sky-500 text-white rounded-full text-sm font-medium transition duration-300"
                  >
                    REGISTER INTEREST
                  </a>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide Counter */}
      <div className="absolute right-6 bottom-6 z-20 text-white bg-black/60 px-4 py-1 rounded-full text-sm font-medium">
        {currentSlide} / {slides.length}
      </div>
    </section>
  )
}

export default HeroSection