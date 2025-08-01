'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { menuItems } from './menuItems'
import Link from 'next/link'

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
   <>
    <header className={`w-full fixed z-50 transition-all duration-300  left-0 right-0 z-50 ${
        isSticky ? ' top-0 bg-white shadow-md' : 'top-7'
      }`} >
    <div className='container'>
        <div className='bg-white flex justify-between pl-3 rounded-[10px]'>
          <div className='flex gap-12 items-center'>
          <div className='flex h-full gap-4'>
            <div className='py-3'>
            <Image src="/assets/logo.svg" alt="Logo" width={154} height={77} />
            </div>
            <div className='h-full border-r-[1px] border-[#D3D3D3]'></div>
          </div>
          <div className='py-3'>
            <ul className='flex gap-[30px] text-black'>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className='text-sm font-light'>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div> 
          </div>
          <div className='flex gap-5'>
            <div className='flex items-center'>
            <button className='uppercase border-primary border-[1px] px-3 py-1 flex items-center gap-2 rounded-[50px] text-xs font-light cursor-pointer'>Register Interest
              <span className='bg-primary rounded-full p-2 w-[27px] h-[27px]'><Image src="/assets/arrow.svg" alt="Arrow" width={20} height={20} /></span></button>
            </div>
            <div  className={` ${ isSticky ? ' py-1' : 'py-0'
      }`} >
            <div className='rounded-[10px] bg-[#42BADC] h-full flex items-center justify-center px-[35px] gap-3 cursor-pointer'>
              <div className='flex gap-[6px] flex-col w-[24px]'>
                <div className='w-full h-[1px] bg-black'></div>
                <div className='w-1/2 h-[1px] bg-white'></div>
                <div className='w-full h-[1px] bg-black'></div>
              </div>
              <p className='text-black text-sm font-medium'>MENU</p>
            </div>
            </div>
          </div>
        </div>
    </div>
    </header>
   </>
  )
}

export default NavBar