import Image from 'next/image'
import React from 'react'
import { menuItems } from './menuItems'
import Link from 'next/link'

const NavBar = () => {
  return (
   <>
    <header className='fixed top-5 left-0 right-0 z-50'>
    <div className='container'>
        <div className='bg-white flex justify-between pl-3 rounded-[10px]'>
          <div className='flex gap-12 items-center'>
          <div className='flex h-full gap-4'>
            <div className='py-3'>
            <Image src="/assets/logo.svg" alt="Logo" width={160} height={160} />
            </div>
            <div className='h-full border-r-[2px] border-[#D3D3D3]'></div>
          </div>
          <div className='py-3'>
            <ul className='flex gap-5 text-black'>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className='text-sm'>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div> 
          </div>
          <div className='flex gap-5'>
            <div className='flex items-center'>
            <button className='uppercase border-primary border-[1px] px-3 py-1 flex items-center gap-2 rounded-[50px] text-sm cursor-pointer'>Register Interest<span className='bg-primary rounded-full p-2'><Image src="/assets/arrow.svg" alt="Arrow" width={20} height={20} /></span></button>
            </div>
            <div className='rounded-[10px] bg-[#42BADC] h-full flex items-center justify-center px-[35px] gap-3 cursor-pointer'>
              <div className='flex gap-[6px] flex-col w-[24px]'>
                <div className='w-full h-[1px] bg-black'></div>
                <div className='w-1/2 h-[1px] bg-white'></div>
                <div className='w-full h-[1px] bg-black'></div>
              </div>
              <p className='text-black text-sm'>MENU</p>
            </div>
          </div>
        </div>
    </div>
    </header>
   </>
  )
}

export default NavBar