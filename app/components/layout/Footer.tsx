import React from 'react'
import Image from 'next/image'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Link from 'next/link'

const Footer = () => {
  return (
<footer className="relative w-full">
  {/* Background 2-column grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full absolute top-0 left-0 z-0">
    <div className="bg-black"></div>
    <div className="bg-black md:bg-[#1A1A1A]"></div>
  </div>

  {/* Content container on top */}
  <div className="relative z-10 container py-12 md:py-25   2xl:pt-[139px] 2xl:pb-[89px]">
    <div className="grid grid-cols-1 lg:grid-cols-2 text-white">
      {/* Left Column */}
      <div className="flex flex-col gap-5 md:gap-25 2xl:gap-[167px]">
        <div className="flex flex-col gap-5 md:gap-10">
          <div className="flex flex-col md:gap-3">
            <h2 className="text-xl 2xl:text-2xl font-light lettersp-4">800 BEAM (2326)</h2>
            <p className="text-xl 2xl:text-2xl font-light lettersp-4 break-words">enquiries@beam.co.ae</p>
          </div>
          <p className="text-md 2xl:text-lg font-light lettersp-2">
            The CityGate Tower<br />
            P.O.Box 88, Sharjah, UAE
          </p>
          <div className="flex gap-3">
            <div className="rounded-full w-[46px] h-[46px] border border-white hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"><FaFacebookF className='text-sm'/></div>
            <div className="rounded-full w-[46px] h-[46px] border border-white hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"><FaXTwitter className='text-sm'/></div>
            <div className="rounded-full w-[46px] h-[46px] border border-white hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"><FaLinkedinIn className='text-sm'/></div>
            <div className="rounded-full w-[46px] h-[46px] border border-white hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"><FaInstagram className='text-sm'/></div>
            <div className="rounded-full w-[46px] h-[46px] border border-white hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"><FaYoutube className='text-sm'/></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 text-sm text-white">
  <div className="flex flex-col gap-3 text-sm font-light">
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">About Us</span>
    </Link>
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">Our Schools</span>
    </Link>
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">Curriculum Overview</span>
    </Link>
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">Application Process</span>
    </Link>
  </div>

  <div className="flex flex-col gap-3 text-sm font-light">
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">Blogs</span>
    </Link>
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">Media Gallery</span>
    </Link>
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">Press Release</span>
    </Link>
    <Link href="/" className="group relative overflow-hidden hover:text-primary">
      <span className="block transition-transform duration-300 group-hover:translate-x-1">Register Your Interest</span>
    </Link>
  </div>
</div>

      </div>

      {/* Right Column (Empty or for future use) */}
      <div className='flex flex-col md:pl-5 md:pl-10 2xl:pl-[144px] gap-2 md:gap-8 2xl:gap-[73px] mt-12 md:mt-0'>
        <h2 className='text-2xl 2xl:text-4xl font-light lettersp-4'>Register Interest</h2>
        <div className=''>
          <form action="" className='flex flex-col gap-5 2xl:gap-10'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Name</label>
            <input type="text" className='border-b border-[#666666] focus:outline-none'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Email</label>
            <input type="email" className='border-b border-[#666666] focus:outline-none'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Phone</label>
            <input type="text" className='border-b border-[#666666] focus:outline-none'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Message</label>
            <textarea name="" id="" className='border-b border-[#666666] focus:outline-none h-10 2xl:h-[115px]'></textarea>
            </div>
            <div className='w-fit mt-5 md:mt-7  2xl:mt-17 p-[1px] group transition-all duration-300 border-[1px] border-primary rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]'>
                                      <div className='cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-transparent rounded-full flex items-center gap-2 transition-all duration-300'>
                                        <p className='text-xs font-light text-white uppercase transition-colors duration-300'>
                                          Submit
                                        </p>
                                        <div className='p-2 flex items-center justify-center bg-primary w-fit rounded-full transition-transform duration-300 group-hover:rotate-45'>
                                          <Image src='/assets/arrow.svg' alt='arrow' width={7} height={7} />
                                        </div>
                                      </div>
                                    </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer