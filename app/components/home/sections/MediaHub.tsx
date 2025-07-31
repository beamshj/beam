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
        <div className="container border-t border-bdrcolor "></div>
        <div className='  pt-12 pb-12 md:pt-15 md:pb-15 xl:pt-[83px] xl:pb-[150px] overflow-hidden '>
          <div className="container">
            <div className='mb-5 md:mb-8 xl:mb-[52px]'><h2 className='text-3xl md:text-4xl font-light leading-tight text-black  '  >{mediaHubData.heading}</h2></div>
          </div>
          <div className="container">
          <Swiper
            modules={[Autoplay, Pagination]}
             className="!overflow-visible alumni-swiper "
             
            spaceBetween={10}
            slidesPerView={1}
            loop={true} 
            
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              waitForTransition: true,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            breakpoints={{
              768: { slidesPerView: 2, 
                slidesOffsetBefore: 30,
                slidesOffsetAfter: 30, },
              1024: { slidesPerView: 3 
               },
              
      
            }} 
          >
            
            {mediaHubData.mediaHub.map((value, index) => (
              <SwiperSlide key={index}> 
                  <div className='h-[350px] lg:h-[450px] xl:h-[557px] rounded-[15px] group slidegpmn' style={{ backgroundImage: `url(${value.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className='h-full rounded-[15px] transition-all duration-300 hdriv   '>
                    <div className='p-10'>
                    <div className="group">
                      <p className="text-white text-sm font-light opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {value.date}
                      </p>
                      <p className="text-white text-xl font-light leading-[1.2] mt-6 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-300">
                        {value.title}
                      </p>
                    </div>

                      <div className='transition-all duration-300 delay-200 top-5 right-5 p-2 mt-3 xl:mt-15 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:delay-300 transform rounded-full w-[40px] h-[40px]  lg:w-[75px] lg:h-[75px] flex items-center justify-center border border-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <path d="M13.3696 1.60156L0.419922 14.5227" stroke="#000000" className='transition-all duration-300 filter strokclass' strokeMiterlimit="10"/>
                          <path d="M0.417969 1.14551H13.3677V13.8117" stroke="#000000" className='transition-all duration-300 filter strokclass' strokeMiterlimit="10"/>
                        </svg>
                      </div>

                    </div>
                    <div className='px-3 py-1 border border-white rounded-full text-white absolute bottom-5 left-5'><p>{value.category}</p></div>
                 
                    </div>
                  </div> 
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>

        <div className="container border-t border-bdrcolor"></div>



      </div>


    </section>
  )
}

export default Alumni