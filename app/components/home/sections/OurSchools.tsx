'use client'
import React from 'react';
import { schoolData } from '@/app/data/ourSchools'

import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';


const OurSchools = () => {

  const [selected, setSelected] = useState('');
  return (
    <section className='h-screen w-full pt-12 pb-12 md:pt-15 md:pb-15 xl:pt-[133px] xl:pb-[160px]'>

      <div className="container">
        <div className='mb-5 md:mb-8 xl:mb-[53px]'><h2 className='text-3xl md:text-4xl font-light leading-tight text-black'>{schoolData.heading}</h2></div>
        <div className='pb-5 md:pb-7 border-b border-bdrcolor'>
          <div className="flex justify-between items-center" >
            <div className="flex gap-3">
              <div className='p-[1px] group transition-all duration-300  bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full '>
                <div className='cursor-pointer  px-5 py-3 bg-white rounded-full'>
                  <p className='group-hover:text-black text-text-xs font-light text-foreground uppercase '>All</p>
                </div>
              </div>
              {schoolData.schools.map((school, index) => (
                <div key={index} className='p-[1px] group transition-all duration-300  bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full '>
                  <div className='cursor-pointer  px-5 py-3 bg-white rounded-full'>
                    <p className='group-hover:text-black text-text-xs font-light text-foreground uppercase '>{school.curriculum}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="   ">

                <div className="w-full">
                <div className="relative inline-block min-w-[120px]">
  <select
    value={selected}
    onChange={(e) => setSelected(e.target.value)}
    className="appearance-none border border-bdrcolor cursor-pointer rounded-full pl-4 pr-10 py-3 text-text-xs focus:outline-none focus:ring-0 w-auto"
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
      </div>


    </section>
  )
}

export default OurSchools