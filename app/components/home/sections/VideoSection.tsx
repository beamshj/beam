import React from 'react'
import Image from 'next/image'

const VideoSection = () => {
  return (
    <section className='w-full relative   xl:h-screen py-25 xl:py-0'>
        <Image src="/assets/home/video-poster.jpg" alt="Video" width={1920} height={950} className='w-full h-full object-cover absolute z-10 top-0'/>
        <div className="container flex items-center h-full">
            <div className="relative z-30 flex flex-col gap-10">
            <h2 className='text-4xl text-white w-3/4'>Get to Know Our School!</h2>
            <div className="w-3/4 h-px bg-gradient-to-r from-white to-transparent"></div>
            <div className='text-xl flex text-white gap-5 items-center'>
                <span>Play</span>
                <Image src="/assets/home/play-icon.svg" alt="Play" width={95} height={95} className='cursor-pointer'/>
                <span>Here</span>
            </div>
            </div>
        </div>
        <div className="w-full h-full  bg-gradient-to-l from-transparent via-black/60 to-black/100 absolute top-0 left-0 z-20"></div>
    </section>
  )
}

export default VideoSection