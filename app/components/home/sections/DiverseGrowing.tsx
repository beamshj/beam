'use client'
import React from 'react';
import { diverseGrowingData } from '@/app/data/DiverseGrowing'
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Optional: Add modules if needed 

const DiverseGrowing = () => {

  return (
    <section className='  pt-12  md:pt-15 xl:pt-[137px]   '>
      <div className='relative pb-12 md:pb-15 xl:pb-[150px] max-w-[1920px] mx-auto'>
        <div className="container">
          <div  >
            <div>
              <h2 className='text-3xl md:text-4xl font-light leading-tight text-black max-w-[20ch]'>{diverseGrowingData.heading}</h2>
            </div>
            <div className='2xl:w-4/5 ml-auto mt-8 lg:mt-[140px]  xl:mt-[64px] relative'  >


              <div className="flex flex-col gap-5 lg:gap-0  lg:w-fit m-auto">
                <div className="relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] min-w-full lg:min-w-[250px] 2xl:min-w-[597px] px-10 py-4 w-fit m-auto">
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-center gap-4">
                      <p className="text-2xl font-light text-primary group-hover:text-black pb-5 group-hover:-translate-x-3 transition-all duration-500">
                        {diverseGrowingData.secvalues[0].count}+
                      </p>
                      <Image
                        className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110 "
                        src={diverseGrowingData.secvalues[0].img}
                        alt={diverseGrowingData.secvalues[0].title}
                        width={50}
                        height={50}
                      />
                    </div>
                    <p className="text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                      {diverseGrowingData.secvalues[0].title}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 items-baseline'>
                  <div className="relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                    {/* Animated gradient layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between min-w-full lg:min-w-[250px] 2xl:min-w-[434px] lg:min-h-[310px] px-10 py-4">
                      <div className="flex justify-between items-center gap-4">
                        <p className="text-2xl font-light text-primary group-hover:text-black pb-5 group-hover:-translate-x-3 transition-all duration-500">
                          {diverseGrowingData.secvalues[1].count}+
                        </p>
                        <Image
                          className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                          src={diverseGrowingData.secvalues[0].img}
                          alt={diverseGrowingData.secvalues[0].title}
                          width={50}
                          height={50}
                        />
                      </div>
                      <p className="text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                        {diverseGrowingData.secvalues[1].title}
                      </p>
                    </div>
                  </div>


                  <div className='flex flex-col w-full gap-5 lg:gap-0'>
                    {/* Card 1 */}
                    <div className="relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                      {/* Gradient hover overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between px-10 py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[389px] lg:min-h-[258px]">
                        <div className="flex justify-between items-center gap-4">
                          <p className="text-2xl font-light text-primary group-hover:text-black pb-5 group-hover:-translate-x-3 transition-all duration-500">
                            {diverseGrowingData.secvalues[2].count}+
                          </p>
                          <Image
                            className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                            src={diverseGrowingData.secvalues[0].img}
                            alt={diverseGrowingData.secvalues[0].title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <p className="text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                          {diverseGrowingData.secvalues[2].title}
                        </p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                      {/* Gradient hover overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between px-10 py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[389px] lg:min-h-[245px]">
                        <div className="flex justify-between items-center gap-4">
                          <p className="text-2xl font-light text-primary group-hover:text-black pb-5 group-hover:-translate-x-3 transition-all duration-500">
                            {diverseGrowingData.secvalues[4].count}+
                          </p>
                          <Image
                            className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                            src={diverseGrowingData.secvalues[0].img}
                            alt={diverseGrowingData.secvalues[0].title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <p className="text-xl font-light text-[#626262] max-w-[9ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                          {diverseGrowingData.secvalues[4].title}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Card with animated gradient background on hover */}
                  <div className="relative group overflow-hidden border bg-white/30 backdrop-blur-md border-[#ccc] rounded-[15px] w-full">
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="w-full h-full bg-[linear-gradient(90deg,_#42BADC_0%,_rgba(66,_186,_220,_0)_100%)]"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between px-10 py-4 min-w-full lg:min-w-[250px] 2xl:min-w-[417px] lg:min-h-[362px]">
                      <div className="flex justify-between items-center gap-4">
                        <p className="text-2xl font-light text-primary group-hover:text-black pb-5 group-hover:-translate-x-3 transition-all duration-500">
                          {diverseGrowingData.secvalues[3].count}+
                        </p>
                        <Image
                          className="grayscale group-hover:grayscale-0 transition-all duration-400 group-hover:scale-110"
                          src={diverseGrowingData.secvalues[0].img}
                          alt={diverseGrowingData.secvalues[0].title}
                          width={50}
                          height={50}
                        />
                      </div>
                      <p className="text-xl font-light text-[#626262] max-w-[18ch] group-hover:text-black group-hover:-translate-y-1 transition-all duration-500">
                        {diverseGrowingData.secvalues[3].title}
                      </p>
                    </div>
                  </div>

                </div>


              </div>



            </div>


          </div>
        </div>

        <Image src={diverseGrowingData.image} alt={diverseGrowingData.heading} width={913} height={944} className='absolute bottom-0 lg:left-[5%] z-[-1] responsive' />
      </div>

    </section>
  )
}

export default DiverseGrowing