"use client";
 
import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";
import Image from "next/image";


const Counter: React.FC = () => {
   

  return (
   <div className="flex gap-[7px]  ">
      <Link href="https://www.facebook.com/beamedusocial/" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-white/22 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
        <FaFacebookF className="text-sm text-white" />
      </Link>
      <Link href="https://x.com/beamedusocial" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-white/22 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
        <FaXTwitter className="text-sm text-white" />
      </Link>
      <Link href="https://www.linkedin.com/company/bukhatireducation/" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-white/22 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
        <FaLinkedinIn className="text-sm text-white" />
      </Link>
      <Link href="https://www.instagram.com/beamedusocial/" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-white/22 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
        <FaInstagram className="text-sm text-white" />
      </Link>
      <Link href="https://www.youtube.com/c/BukhatirEducation" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-white/22 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
        <FaYoutube className="text-sm text-white" />
      </Link>
    </div>
    
  )
};

export default Counter;
