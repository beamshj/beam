'use client'
import React from 'react';
import { academicCulturalData } from '@/app/data/AcademicCultural'
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Optional: Add modules if needed 

const AcademicCultural = () => {

  return (
    <section className='  pt-12  md:pt-15 xl:pt-[137px]  bg-[#F6F6F6]'>
      <div className='relative pb-12 md:pb-15 xl:pb-[150px] max-w-[1920px] mx-auto'>
        <div className="container">
          <div  >
            <div>
              <h2 className='text-3xl md:text-4xl font-light leading-tight text-black max-w-[13ch]'>{academicCulturalData.heading}</h2>
            </div>
            <div className='mt-5 lg:mt-[43px] mb-5 lg:mb-[93px]'>
              <p className='text-sm font-light text-foreground max-w-[82ch]' dangerouslySetInnerHTML={{ __html: academicCulturalData.desc }}></p>
            </div>
            <div className='bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,_0,_0,_0)_60%)] h-[1px] lg:bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,_0,_0,_0)_30%)] h-[1px] ' ></div>
            <div  >
              {academicCulturalData.accvalues.map((value, index) => (
                <div className={`flex flex-col md:flex-row gap-2 md:gap-8 items-baseline md:items-center py-7 lg:py-10 group  hover:bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)] transition-all duration-300 
              ${index === academicCulturalData.accvalues.length - 2 ? 'ps-0 xl:ps-[8%] 2xl:ps-[15%]' : ''} ${index === academicCulturalData.accvalues.length - 1 ? 'ps-0 xl:ps-[18%] 2xl:ps-[30%]' : ''}`} key={index}>
                  <div className='group-hover:px-2 transition-all duration-300'>
                    <Image src={value.img} alt={value.title} width={value.imgwidth} height={value.imgheight} className=' group-hover:filter-[brightness(0)] transition-all duration-300' />
                  </div>
                  <div>
                    <p className={`text-xl font-light text-black leading-[1.2] ${index === academicCulturalData.accvalues.length - 1 ? 'max-w-[17ch]' : 'max-w-[19ch]'}   transition-all duration-300`}>
                      {value.title}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            <div className='bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,_0,_0,_0)_80%)] h-[1px] ' ></div>
          </div>
        </div>

        <Image src={academicCulturalData.image} alt={academicCulturalData.heading} width={737} height={1061} className='absolute bottom-0 right-0 hidden xl:block w-[640px] 2xl:w-[737px]' />
      </div>

    </section>
  )
}

export default AcademicCultural