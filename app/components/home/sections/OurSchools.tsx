'use client'
import React from 'react';
import { schoolData } from '@/app/data/ourSchools'
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Optional: Add modules if needed
import { Navigation, Pagination } from 'swiper/modules';

const OurSchools = () => {

  const [selected, setSelected] = useState('');
  return (
    <section className='  pt-12 pb-12 md:pt-15 md:pb-15 xl:pt-[133px] xl:pb-[160px]'>

      <div className="container">
        <div className='mb-5 md:mb-8 xl:mb-[53px]'><h2 className='text-3xl md:text-4xl font-light leading-tight text-black'>{schoolData.heading}</h2></div>
        <div className='pb-5 md:pb-7 border-b border-bdrcolor'>
          <div className="flex-col md:flex-row flex justify-start md:justify-between items-start md:items-center gap-4 md:gap-0" >
            <div className="flex gap-3">
              <div className='p-[1px] group transition-all duration-300  bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full '>
                <div className='cursor-pointer  px-2 md:px-5 py-2 md:py-3 bg-white rounded-full'>
                  <p className='group-hover:text-black smtext10 text-xs font-light text-foreground uppercase '>All</p>
                </div>
              </div>
              
                <div className='p-[1px] group transition-all duration-300  bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full '>
                  <div className='cursor-pointer  px-2 md:px-5 py-2 md:py-3 bg-white rounded-full'>
                    <p className='group-hover:text-black smtext10 text-xs font-light text-foreground uppercase '>British Curriculum</p>
                  </div>
                </div> 
                <div className='p-[1px] group transition-all duration-300  bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full '>
                  <div className='cursor-pointer  px-2 md:px-5 py-2 md:py-3 bg-white rounded-full'>
                    <p className='group-hover:text-black smtext10 text-xs font-light text-foreground uppercase '>American Curriculum</p>
                  </div>
                </div> 
            </div>
            <div>
              <div className="   ">

                <div className="w-full">
                  <div className="relative inline-block min-w-[120px]">
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      className="appearance-none border border-bdrcolor cursor-pointer rounded-full pl-2 md:pl-4 pr-10 py-2 md:py-3 smtext10 text-xs focus:outline-none focus:ring-0 w-auto"
                    >
                      <option value="">Location</option>
                      {schoolData.schools.map((option) => (
                        <option key={option.location} value={option.location}>
                          {option.location}
                        </option>
                      ))}
                    </select>

                    {/* Custom arrow icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg
                        className="w-4 h-4 text-foreground"
                        fill="none"
                        stroke="#42BADC"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        <Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={20}
  slidesPerView={1}
  // navigation
  pagination={{ clickable: true }}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="mt-5 md:mt-15"
>
  {schoolData.schools.map((school, index) => (
    <SwiperSlide key={index}>
      <div className='bg-[#F5F5F5] rounded-[15px] p-1 hover:bg-[#F0F0F0] transition-all duration-300 group'>
        <div className='rounded-xl overflow-hidden relative'>
          <Image src={school.img} alt={school.title} width={500} height={500} />
          <div className='absolute opacity-0 group-hover:opacity-100 transition-all duration-300 top-5 right-5 p-2 bg-white/30 backdrop-blur-md  rounded-full w-[75px] h-[75px] flex items-center justify-center border border-[#42BADC]'>
            <Image src='/images/home/arrow-top.svg' alt={school.title} width={15} height={15} />
          </div>
          <div className='absolute bottom-2 left-2 p-2 bg-white rounded-md w-fit'>
            <Image src={school.logo} alt={school.title} width={109} height={45} />
          </div>
        </div>
        <div className='p-5 md:p-5 xl:p-10'>
          <div className="flex justify-between items-center pb-3 border-b border-bdrcolor">
            <p className='text-xs font-light text-foreground'>{school.curriculum}</p>
            <div className='flex items-center gap-2'>
              <Image src="/images/home/location.svg" alt={school.title} width={12} height={16} />
              <p className='text-xs font-light text-foreground'>{school.location}</p>
            </div>
          </div>

          <div className='mt-6 mb-8'>
            <p className='text-xl font-light text-black'>{school.title}</p>
          </div>

          <div>
            <div className="flex justify-between items-center px-3 rounded-[10px] bg-[linear-gradient(90deg,_#DDF7FF_0%,_rgba(221,_247,_255,_0)_100%)] transition-all duration-500  group-hover:bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)] ">
              <p className='text-md font-light text-foreground leading-[1.8] group-hover:text-black'>{school.activeStudents} +</p>
              <p className='text-sm font-light text-foreground leading-[1.8]'>Active Students</p>
            </div>
            <div className="flex justify-between items-center px-3 rounded-[10px] bg-[linear-gradient(90deg,_#F5EBFF_0%,_rgba(245,_235,_255,_0)_100%)] transition-all duration-500  group-hover:bg-[linear-gradient(90deg,_#7E5AA3_0%,_rgba(126,_90,_163,_0)_100%)]">
              <p className='text-md font-light text-foreground leading-[1.8] group-hover:text-black'>{school.nationalities} +</p>
              <p className='text-sm font-light text-foreground leading-[1.8]'>Nationalities</p>
            </div>
            <div className="flex justify-between items-center px-3 rounded-[10px] bg-[linear-gradient(90deg,_#E2F5FF_0%,_rgba(226,_245,_255,_0)_100%)] transition-all duration-500 group-hover:bg-[linear-gradient(90deg,_#9FDAF9_0%,_rgba(159,_218,_249,_0)_100%)]">
              <p className='text-md font-light text-foreground leading-[1.8] group-hover:text-black'>{school.teachers} +</p>
              <p className='text-sm font-light text-foreground leading-[1.8]'>Teachers</p>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

        </div>
      </div>


    </section>
  )
}

export default OurSchools