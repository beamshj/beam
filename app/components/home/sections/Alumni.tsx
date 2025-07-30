'use client'
import React from 'react';
import { alumniData } from '@/app/data/alumni'
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
    <section className='  pt-12 pb-12 md:pt-15 md:pb-15 xl:pt-[135px] xl:pb-[126px]'>

      <div className="container">
        <div className='mb-5 md:mb-8 xl:mb-[64px]'><h2 className='text-3xl md:text-4xl font-light leading-tight text-black  ' dangerouslySetInnerHTML={{ __html: alumniData.heading }}></h2></div>

        <Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={24}
  slidesPerView={1}
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
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="alumni-swiper"
>
  {alumniData.alumni.map((value, index) => (
    <SwiperSlide key={index}>
      <div className='border-t border-bdrcolor pt-4 md:pt-6'>
        <h3 className='text-xl font-light text-black'>{value.name}</h3>
        <p className='text-sm font-light text-[#626262]'>{value.designation}</p>
        <div
          className={`mt-9 bg-[${value.bgcolor}] `}
        >
          <Image src={value.img} alt={value.name} width={351} height={413} />
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

{/* Custom pagination container */}
<div className='flex justify-between items-center'> 
        <div className='w-full'>
        <div className='mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-bdrcolor bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]'>
          <div className='cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-white rounded-full flex items-center gap-2 transition-all duration-300'>
            <p className='group-hover:text-black text-xs font-light text-foreground uppercase transition-colors duration-300'>
              Alumni Stories
            </p>
            <div className='p-2 flex items-center justify-center bg-primary w-fit rounded-full transition-transform duration-300 group-hover:rotate-45'>
              <Image src='/assets/arrow.svg' alt='arrow' width={7} height={7} />
            </div>
          </div>
        </div>
        </div>
<div className="custom-pagination   flex justify-end gap-2"></div>

</div>

        

      </div>


    </section>
  )
}

export default Alumni