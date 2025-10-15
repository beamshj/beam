"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { mainMenuItems } from "./menuItems"; 
import { filterMenuItems } from "./menuItems";
import SocialMediaIcons from "../Common/SocialMediaIcons";
import { AnimatePresence, motion } from "framer-motion";

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

 

    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  return (
    <>
      <header
        className={`w-full fixed z-50 transition-all duration-300 left-0 right-0 ${
          isSticky ? "top-0 bg-white shadow-md" : "top-7"
        }`}
      >
        <div className="container">
          <div className="bg-white flex justify-between lg:pl-3 rounded-[10px] h-[70px] lg:h-full" style={{boxShadow:"0px 4px 45px 0px #0000000F"}}>
            <div className="flex gap-12 items-center">
              <div className="flex items-center justify-center h-full gap-4">
                <div className="lg:py-3">
                  <Link href="/">
                  <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={158}
                    height={77}
                    className="h-[58px] lg:h-full"
                  /></Link>
                </div>
                <div className="h-full border-r-[1px] border-[#D3D3D3]"></div>
              </div>
              <div className="hidden lg:flex h-full items-center">
      <ul className="flex gap-[30px] text-black relative h-full items-center">
        {mainMenuItems.map((item) => (
          <li
            key={item.name}
            className="group relative  h-full flex items-center"
            onMouseEnter={() => setHoveredMenu(item.name)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            {/* Top-level Link */}
            <Link
              href={item.href}
              className="text-sm font-light transition-colors duration-300 ease-in-out group-hover:text-primary group-hover:underline group-hover:underline-offset-4"
            >
              {item.name}
            </Link>

            {/* Submenu */}
            {item.submenu && (
              <AnimatePresence>
                {hoveredMenu === item.name && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute left-0 top-full mt-2 w-[378px] bg-white shadow-xl rounded-lg py-3 px-4 flex flex-col  z-50"
                  >
                    {item.submenu.map((sub) => (
                      <li key={sub.name} className="border-b border-[#D3D3D3] last:border-b-0 py-3 linkhrs ">
                        <Link
                          href={sub.href}
                          className="flex gap-5 text-sm font-light text-black hover:text-primary transition-colors duration-200 "
                        >
                          <span>{sub.name}</span>
                          <span className="bg-primary rounded-full p-2 w-[27px] h-[27px] opacity-0 blks transition-all duration-500">
                            <Image
                              src="/assets/arrow.svg"
                              alt="Arrow"
                              className="rotate-45"
                              width={20}
                              height={20}
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            )}
          </li>
        ))}
      </ul>
    </div>
            </div>
            <div className="flex gap-5">
              <div className="hidden lg:flex items-center">
                <Link href={"/contact-us"}>
                    <button
                      className="uppercase border-primary border-[1px] px-3 py-1 flex items-center gap-2 rounded-[50px]
                                text-xs font-light cursor-pointer text-black transition-all duration-300 group
                                hover:bg-primary hover:text-white"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        Register Interest
                      </span>
                      <span
                        className="bg-primary rounded-full p-2 w-[27px] h-[27px] flex items-center justify-center
                                  transition-all duration-300 group-hover:bg-white"
                      >
                        <Image
                          src="/assets/arrow.svg"
                          alt="Arrow"
                          width={20}
                          height={20}
                          className="transition-transform duration-300 group-hover:rotate-45 group-hover:brightness-0"
                        />
                      </span>
                    </button>
                  </Link>

              </div>
              <div
                className={`transition-all duration-300 ${
                  isSticky ? "py-2 px-2" : "py-0 px-0"
                }`}
              >
                <div
  onClick={() => setIsMenuOpen(true)}
  className="rounded-[10px] bg-[#42BADC] h-full flex items-center justify-center px-[30px] xl:px-[35px] gap-3 cursor-pointer 
             transition-all duration-300 hover:bg-[#23ABD2] group"
>
  <div className="flex gap-[6px] flex-col w-[24px] relative transition-all duration-300">
    {/* Top line */}
    <div
      className="w-full h-[1px] bg-black transition-all duration-300 
             group-hover:scale-[0.8]  "
    ></div>

    {/* Middle line */}
    <div
      className="w-1/2 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:translate-x-[7px]  "
    ></div>

    {/* Bottom line */}
    <div
      className="w-full h-[1px] bg-black transition-all duration-300 
                 group-hover:scale-[0.8]  "
    ></div>
  </div>

  {!isMobile && (
    <p className="text-black text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
      MENU
    </p>
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
      <AnimatePresence>
  {isMenuOpen && (
    <motion.div
      key="menu-panel"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1], // smooth spring-like ease
      }}
      className="fixed top-0 lg:left-0 right-0 bottom-0 h-full w-[300px] md:w-[500px] lg:w-full z-50"
      style={{
        background:
          "linear-gradient(251.6deg, #42BADC -12.46%, #005871 100.42%)",
      }}
    >
      <div className="container h-full">
        <div className="relative flex flex-col h-full">
          {/* HEADER */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-between lg:pt-15 lg:pb-12 pt-8 pb-8 items-end lg:items-center gap-3"
          >
            <div className="hidden lg:block">
              <SocialMediaIcons />
            </div>

            <div className="lg:py-3 block lg:hidden">
              <Link href={"/"}>
                <Image
                  src="/assets/logo.svg"
                  alt="Logo"
                  width={158}
                  height={77}
                  className="h-[58px] w-fit lg:h-full brightness-0 invert"
                />
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:gap-[78px] h-full">
              {/* Register Interest Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link href={"/contact-us"} className="hidden lg:block">
                  <button
                    className="uppercase text-xs border-white text-white border-[1px] ps-5 pe-[12px] py-[11px]
                      flex items-center gap-2 rounded-[50px] font-light cursor-pointer
                      transition-all duration-300 group hover:bg-white hover:text-[#005871]"
                  >
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      Register Interest
                    </span>
                    <span
                      className="bg-primary rounded-full p-2 w-[27px] h-[27px]
                        flex items-center justify-center transition-all duration-300
                        group-hover:translate-x-1 group-hover:bg-[#005871]"
                    >
                      <Image
                        src="/assets/arrow.svg"
                        alt="Arrow"
                        width={20}
                        height={20}
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </span>
                  </button>
                </Link>
              </motion.div>

              {/* Close Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <button onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-3 pe-0 lg:pe-8 cursor-pointer group transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      className="transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
                    >
                      <line
                        x1="0.646447"
                        y1="17.6463"
                        x2="17.617"
                        y2="0.675762"
                        stroke="white"
                      />
                      <line
                        x1="1.35033"
                        y1="0.64313"
                        x2="18.4742"
                        y2="17.4589"
                        stroke="white"
                      />
                    </svg>

                    <span className="text-sm font-light text-white transition-all duration-300 group-hover:translate-x-1 hidden lg:block">
                      MENU
                    </span>
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-[1px] w-full bg-[#D3D3D3] origin-left"
          />

          {/* MENU CONTENT */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="py-10 lg:py-14 2xl:pt-[71px] 2xl:pb-[116px] h-full"
          >
             <div className="md:flex justify-baseline lg:h-full">
                  <div className="hidden lg:flex gap-6 lg:gap-[164px]">
                    {/* Left Column */}
                    <div className="flex overflow-y-auto h-full">
                      <ul className="flex flex-col gap-6 justify-between h-full">
                        {filterMenuItems.slice(0, -2).map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            className="transition-all duration-300 transform hover:translate-x-1 pe-3"
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-5 text-sm font-light text-black hover:text-primary transition-colors duration-200 group"
                            >
                              <p className="text-md md:text-lg 2xl:text-xl font-[200] leading-[1.2] text-white/50 hover:text-white transition-all duration-300">
                                {item.name}
                              </p>
                              <span className="bg-white rounded-full flex items-center justify-center w-[27px] h-[27px] opacity-0 transition-all duration-500 group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                  <path d="M9.93799 3.7063L13.7317 7.50005L9.93799 11.2938" stroke="#42BADC" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M3.10791 7.49988H13.6267" stroke="#42BADC" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col flex-1 overflow-y-auto h-full">
                      <ul className="flex flex-col gap-6 justify-end h-full">
                        {filterMenuItems.slice(-2).map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * (index + 5), duration: 0.4 }}
                            className="transition-all duration-300 transform hover:translate-x-1 pe-5"
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-5 text-sm font-light text-black hover:text-primary transition-colors duration-200 group"
                            >
                              <p className="text-md md:text-lg 2xl:text-xl font-[200] leading-[1.2] text-white/50 hover:text-white transition-all duration-300">
                                {item.name}
                              </p>
                              <span className="bg-white rounded-full flex items-center justify-center w-[27px] h-[27px] opacity-0 transition-all duration-500 group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                  <path d="M9.93799 3.7063L13.7317 7.50005L9.93799 11.2938" stroke="#42BADC" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M3.10791 7.49988H13.6267" stroke="#42BADC" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
 <div className="block lg:hidden  w-full">
                <ul className="flex flex-col gap-4">
                  {mainMenuItems.map((item) => (
                    <li key={item.name}>
                      <div
                        onClick={() =>
                          setHoveredMenu(hoveredMenu === item.name ? null : item.name)
                        }
                        className="flex justify-between items-center text-md font-light text-white/80 hover:text-[#23ABD2] cursor-pointer"
                      >
                        {item.name}
                        <span
                          className={`transform transition-transform duration-300 ${
                            hoveredMenu === item.name ? "rotate-90" : ""
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="rotate-180" viewBox="0 0 24 24" fill="none" ><path d="M15.0901 19.9201L8.57009 13.4001C7.80009 12.6301 7.80009 11.3701 8.57009 10.6001L15.0901 4.08008" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </span>
                      </div>

                      <AnimatePresence>
                        {hoveredMenu === item.name && item.submenu && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 pl-4 border-l border-[#23ABD2]/30"
                          >
                            {item.submenu.map((sub) => (
                              <li key={sub.name} className="py-2">
                                <Link
                                  href={sub.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-3 text-sm text-white/70 hover:text-[#23ABD2] transition-colors duration-200"
                                >
                                  <span>{sub.name}</span>
                                  
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </div> 
                  {/* Mobile menu remains same */}
                </div>

                <div className="block lg:hidden pb-10 absolute bottom-0">
                  <SocialMediaIcons />
                </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
      

      
    </>
  );
};

export default NavBar;
