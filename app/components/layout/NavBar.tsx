"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { mainMenuItems } from "./menuItems";
import { sliderMenuItems } from "./menuItems";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === "overlay") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // detect window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // filter menu based on device
  const filteredSliderMenuItems = isMobile
    ? sliderMenuItems
    : sliderMenuItems.slice(3);

  return (
    <>
      <header
        className={`w-full fixed z-50 transition-all duration-300 left-0 right-0 ${
          isSticky ? "top-0 bg-white shadow-md" : "top-7"
        }`}
      >
        <div className="container">
          <div className="bg-white flex justify-between lg:pl-3 rounded-[10px] h-[70px] lg:h-full">
            <div className="flex gap-12 items-center">
              <div className="flex items-center justify-center h-full gap-4">
                <div className="lg:py-3">
                  <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={158}
                    height={77}
                    className="h-[58px] lg:h-full"
                  />
                </div>
                <div className="h-full border-r-[1px] border-[#D3D3D3]"></div>
              </div>
              <div className="hidden lg:block py-3">
                <ul className="flex gap-[30px] text-black">
                  {mainMenuItems.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm font-light">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="hidden lg:flex items-center">
                <button className="uppercase border-primary border-[1px] px-3 py-1 flex items-center gap-2 rounded-[50px] text-xs font-light cursor-pointer">
                  Register Interest
                  <span className="bg-primary rounded-full p-2 w-[27px] h-[27px]">
                    <Image
                      src="/assets/arrow.svg"
                      alt="Arrow"
                      width={20}
                      height={20}
                    />
                  </span>
                </button>
              </div>
              <div
                className={`transition-all duration-300 ${
                  isSticky ? "py-2 px-2" : "py-0 px-0"
                }`}
              >
                <div
                  onClick={() => setIsMenuOpen(true)}
                  className="rounded-[10px] bg-[#42BADC] h-full flex items-center justify-center px-[30px] xl:px-[35px] gap-3 cursor-pointer"
                >
                  <div className="flex gap-[6px] flex-col w-[24px]">
                    <div className="w-full h-[1px] bg-black"></div>
                    <div className="w-1/2 h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-black"></div>
                  </div>
                  {isMobile ? (
                    // <p className="text-black text-sm font-medium">MENU</p>
                    ""
                  ) : (
                    <p className="text-black text-sm font-medium">MENU</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              id="overlay"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      )}

      {/* Sliding Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 h-full w-[300px] xl:w-[400px] 2xl:w-[430px] bg-white z-50 transform transition-transform duration-400 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-4">
            <Image src="/assets/logo.svg" alt="Logo" width={140} height={60} />
            <button onClick={() => setIsMenuOpen(false)}>
              <span className="text-base font-bold text-black hover:text-primary transition-colors duration-300 cursor-pointer">
                ✕
              </span>
            </button>
          </div>

          {/* Gradient Divider */}
          <div className="h-[2px] w-full bg-gradient-to-r from-primary to-transparent" />

          {/* Menu + Social */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Menu items */}
            <ul className="flex flex-col gap-6 p-6 xl:pt-10">
              {filteredSliderMenuItems.map((item) => (
                <li
                  key={item.name}
                  className="transition-all duration-300 transform hover:translate-x-1"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base xl:text-sm font-light text-black cursor-pointer hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons + Divider at top */}
            <div className="mt-auto">
              {/* Divider right above icons */}
              <div className="h-[2px] w-full bg-gradient-to-r from-primary to-transparent" />

              {/* Icons */}
              <div className="flex gap-[7px] p-6">
                <Link href="https://www.facebook.com/beamedusocial/" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-black/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
                  <FaFacebookF className="text-sm" />
                </Link>
                <Link href="https://x.com/beamedusocial" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-black/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
                  <FaXTwitter className="text-sm" />
                </Link>
                <Link href="https://www.linkedin.com/company/bukhatireducation/" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-black/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
                  <FaLinkedinIn className="text-sm" />
                </Link>
                <Link href="https://www.instagram.com/beamedusocial/" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-black/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
                  <FaInstagram className="text-sm" />
                </Link>
                <Link href="https://www.youtube.com/c/BukhatirEducation" target="_blank" className="rounded-full xl:w-[46px] xl:h-[46px] w-[36px] h-[36px] border border-black/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer transition-colors duration-300">
                  <FaYoutube className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
