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
  <div className="grid grid-cols-2 w-full h-full absolute top-0 left-0 z-0">
    <div className="bg-black"></div>
    <div className="bg-[#1A1A1A]"></div>
  </div>

  {/* Content container on top */}
  <div className="relative z-10 container pt-[139px] pb-[89px]">
    <div className="grid grid-cols-2 text-white">
      {/* Left Column */}
      <div className="flex flex-col gap-[167px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[70px]">800 BEAM (2326)</h2>
            <p className="text-[70px] break-words">enquiries@beam.co.ae</p>
          </div>
          <p className="text-xl">
            The CityGate Tower<br />
            P.O.Box 88, Sharjah, UAE
          </p>
          <div className="flex gap-3">
            <div className="rounded-full border border-white p-3 hover:bg-primary cursor-pointer"><FaFacebookF className='text-lg'/></div>
            <div className="rounded-full border border-white p-3 hover:bg-primary cursor-pointer"><FaXTwitter className='text-lg'/></div>
            <div className="rounded-full border border-white p-3 hover:bg-primary cursor-pointer"><FaLinkedinIn className='text-lg'/></div>
            <div className="rounded-full border border-white p-3 hover:bg-primary cursor-pointer"><FaInstagram className='text-lg'/></div>
            <div className="rounded-full border border-white p-3 hover:bg-primary cursor-pointer"><FaYoutube className='text-lg'/></div>
          </div>
        </div>

        <div className="grid grid-cols-2 text-sm text-white">
          <div className="flex flex-col gap-3">
            <Link href="/about">About Us</Link>
            <Link href="/about">Our Schools</Link>
            <Link href="/about">Curriculum Overview</Link>
            <Link href="/about">Application Process</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/about">Blogs</Link>
            <Link href="/about">Media Gallery</Link>
            <Link href="/about">Press Release</Link>
            <Link href="/about">Register Your Interest</Link>
          </div>
        </div>
      </div>

      {/* Right Column (Empty or for future use) */}
      <div className='flex flex-col pl-[80px] gap-[73px]'>
        <h2 className='text-4xl'>Register Interest</h2>
        <div className=''>
          <form action="" className='flex flex-col gap-10'>
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
            <textarea name="" id="" className='border-b border-[#666666] focus:outline-none h-[115px]'></textarea>
            </div>
            <div className='mt-5 w-fit md:mt-17 p-[1px] group transition-all duration-300 border-[1px] border-primary rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]'>
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