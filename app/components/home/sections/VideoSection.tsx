import React from 'react'
import Image from 'next/image'

const VideoSection = () => {
  return (
    <section className='w-full relative   2xl:h-screen py-25 md:py-28 2xl:py-0'>
        <Image src="/assets/home/video-poster.jpg" alt="Video" width={1920} height={950} className='w-full h-full object-cover absolute z-10 top-0'/>
        <div className="container flex items-center h-full">
            <div className="relative z-30 flex flex-col gap-10">
            <h2 className='text-4xl text-white w-full md:w-3/4 font-light lettersp-4 text-center md:text-left'>Get to Know Our School!</h2>
            <div className="w-full md:w-3/4 h-px bg-gradient-to-r from-white to-transparent"></div>
            <div className='text-xl font-light justify-center md:justify-start   flex text-white gap-5 items-center'>
                <span>Play</span>
                <Image
  src="/assets/home/play-icon.svg"
  alt="Play"
  width={95}
  height={95}
  className="cursor-pointer transition-transform duration-300 hover:scale-105"
/> <span>Here</span>
            </div>
            </div>
        </div>
        <div className="w-full h-full  bg-[linear-gradient(90deg,_rgba(0,_0,_0,_0.9)_8.98%,_rgba(0,_0,_0,_0)_83.88%)] absolute top-0 left-0 z-20"></div>
    </section>
  )
}

export default VideoSection