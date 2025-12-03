"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { mainMenuItems } from "./menuItems";
import { filterMenuItems } from "./menuItems";
import SocialMediaIcons from "../Common/SocialMediaIcons";
import { AnimatePresence, motion } from "framer-motion";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { useApplyLang } from "@/lib/applyLang";
import { usePathname, useRouter } from "next/navigation";
import LangLink from "@/lib/LangLink";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isArabic = useIsPreferredLanguageArabic();
  const tMainMenuItems = useApplyLang(mainMenuItems);
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = () => {
    if (pathname.startsWith("/ar")) {
      // going EN: remove "/ar"
      const newPath = pathname.replace("/ar", "") || "/";
      router.push(newPath);
    } else {
      // going AR: add "/ar"
      router.push("/ar" + pathname);
    }
  };
  const handleRegisterClick = () => {
    window.location.href = "/contact-us?scroll=register";
  };

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isMobile]);

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

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 1024);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  return (
    <>
      <header
        className={`w-full fixed z-[999] transition-all duration-300 left-0 right-0 ${
          isSticky ? "top-0 bg-white shadow-md" : "top-7"
        }`}
      >
        <div className="container">
          <div
            className={`bg-white flex justify-between ${
              isArabic ? "lg:pr-3" : "lg:pl-3"
            } rounded-[10px] h-[70px] lg:h-full`}
            style={{ boxShadow: "0px 4px 45px 0px #0000000F" }}
          >
            <div className="flex gap-12 items-center">
              <div className="flex items-center justify-center h-full gap-4">
                <div className="lg:py-3">
                  <Link href="/">
                    <Image
                      src={
                        isArabic ? "/assets/logo-ar.png" : "/assets/logo.svg"
                      }
                      alt="Logo"
                      width={158}
                      height={77}
                      className="h-[58px] lg:h-full"
                    />
                  </Link>
                </div>
                <div className=" hidden lg:block h-full border-r-[1px] border-[#D3D3D3]"></div>
              </div>
              <div className="hidden lg:flex h-full items-center">
                <ul className="flex gap-[30px] text-black relative h-full items-center">
                  {tMainMenuItems
                    .filter(
                      (item) =>
                        item.href !== "/contact-us" &&
                        item.href !==
                          "https://careers.beam.co.ae/en/job-search-results/"
                    )

                    .map((item) => (
                      <li
                        key={item.name}
                        className="group relative  h-full flex items-center"
                        onMouseEnter={() => setHoveredMenu(item.name)}
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        {/* Top-level Link */}
                        <LangLink
                          href={item.href}
                          className="text-sm font-light transition-colors duration-300 ease-in-out group-hover:text-primary group-hover:underline group-hover:underline-offset-4"
                        >
                          {item.name}
                        </LangLink>

                        {/* Submenu */}
                        {item.submenu && (
                          <AnimatePresence>
                            {hoveredMenu === item.name && (
                              <motion.ul
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{
                                  duration: 0.25,
                                  ease: "easeInOut",
                                }}
                                className={`absolute ${
                                  isArabic ? "right-0" : "left-0"
                                } top-full mt-2 w-[378px] bg-white shadow-xl rounded-lg py-3 px-4 flex flex-col  z-50`}
                              >
                                {item.submenu.map((sub) => (
                                  <li
                                    onClick={() => setHoveredMenu(null)}
                                    key={sub.name}
                                    className="border-b border-[#D3D3D3] last:border-b-0 py-3 linkhrs "
                                  >
                                    <LangLink
                                      href={sub.href}
                                      className="flex gap-5 text-sm font-light text-black hover:text-primary transition-colors duration-200"
                                    >
                                      <span>{sub.name}</span>
                                      <span className="bg-primary rounded-full p-2 w-[27px] h-[27px] opacity-0 blks transition-all duration-500">
                                        <Image
                                          src="/assets/arrow.svg"
                                          alt="Arrow"
                                          className={`${
                                            isArabic
                                              ? "-rotate-135"
                                              : "rotate-45"
                                          }`}
                                          width={20}
                                          height={20}
                                        />
                                      </span>
                                    </LangLink>
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
            <div className="flex gap-2  sm:gap-5">
              <div className="flex items-center gap-5">
                {process.env.NODE_ENV === "development" && (
                  <button
                    onClick={switchLanguage}
                    className="cursor-pointer hover:text-primary transition-colors duration-300"
                  >
                    {isArabic ? "English" : "العربية"}
                  </button>
                )}

                <button
                  onClick={handleRegisterClick}
                  className="uppercase border-primary border-[1px] px-3 py-1 flex items-center gap-2 rounded-[50px]
                                text-[10px] sm:text-xs font-light cursor-pointer text-black transition-all duration-300 group
                                hover:bg-primary hover:text-white"
                >
                  <span
                    className={`transition-transform duration-300 ${
                      isArabic
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  >
                    {isArabic ? "سجل اهتمام" : "Register Interest"}
                  </span>
                  <span
                    className="hidden sm:flex bg-primary rounded-full p-2 w-[27px] h-[27px]  items-center justify-center
                                  transition-all duration-300 group-hover:bg-white"
                  >
                    <Image
                      src="/assets/arrow.svg"
                      alt="Arrow"
                      width={20}
                      height={20}
                      className={`transition-transform duration-300 group-hover:brightness-0 ${
                        isArabic
                          ? "-rotate-90 group-hover:-rotate-135"
                          : "group-hover:rotate-45"
                      }`}
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
                  className="rounded-[10px] bg-[#42BADC] h-full flex items-center justify-center px-[20px] sm:px-[30px] xl:px-[35px] gap-3 cursor-pointer 
             transition-all duration-300 hover:bg-[#23ABD2] group"
                >
                  <div className="flex gap-[6px] flex-col w-[24px] relative transition-all duration-300">
                    {/* Top line */}
                    <div
                      className="w-full h-[1px] bg-black transition-all duration-300 
             group-hover:scale-[0.8]  "
                    ></div>

                    {/* Middle line */}
                    <div className="w-1/2 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:translate-x-[7px]  "></div>

                    {/* Bottom line */}
                    <div
                      className="w-full h-[1px] bg-black transition-all duration-300 
                 group-hover:scale-[0.8]  "
                    ></div>
                  </div>

                  {!isMobile && (
                    <p className="text-black text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
                      {isArabic ? "القائمة" : "MENU"}
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-1000"
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
            initial={
              isMobile ? { x: "100%", opacity: 0 } : { y: "-100%", opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={
              isMobile ? { x: "100%", opacity: 0 } : { y: "-100%", opacity: 0 }
            }
            transition={{
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="fixed top-0 right-0 bottom-0 lg:left-0 h-screen w-[300px] md:w-[500px] lg:w-full z-1000"
            style={{
              background:
                "linear-gradient(251.6deg, #42BADC -12.46%, #005871 100.42%)",
            }}
          >
            <div className="container h-full flex flex-col">
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
                    <Link
                      href={"/contact-us"}
                      className="hidden lg:block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <button
                        onClick={handleRegisterClick}
                        className="uppercase text-xs border-white text-white border-[1px] ps-5 pe-[12px] py-[11px] flex items-center gap-2 rounded-[50px] font-light cursor-pointer transition-all duration-300 group hover:bg-white hover:text-[#005871]"
                      >
                        <span className="transition-all duration-300 group-hover:translate-x-1">
                          {isArabic ? "سجل اهتمام" : "Register Interest"}
                        </span>
                        <span className="bg-primary rounded-full p-2 w-[27px] h-[27px] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#005871]">
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

              {/* SCROLLABLE MENU CONTENT */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex-1 overflow-y-auto py-8 lg:py-14 max-h-[60%] xl:max-h-full"
              >
                <div className="md:flex justify-baseline lg:h-full">
                  {/* Left Column */}
                  <div className="hidden lg:flex gap-6 lg:gap-[164px]">
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
                            transition={{
                              delay: 0.1 * (index + 5),
                              duration: 0.4,
                            }}
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
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* MOBILE MENU */}
                  <div className="block lg:hidden w-full">
                    <ul className="flex flex-col gap-4">
                      {mainMenuItems.map((item) => {
                        const hasSubmenu =
                          item.submenu && item.submenu.length > 0;
                        return (
                          <li key={item.name}>
                            <div
                              onClick={() =>
                                hasSubmenu
                                  ? setHoveredMenu(
                                      hoveredMenu === item.name
                                        ? null
                                        : item.name
                                    )
                                  : null
                              }
                              className="flex justify-between items-center text-[19px] font-light text-white/80 hover:text-[#23ABD2] cursor-pointer"
                            >
                              {hasSubmenu ? (
                                <span>{item.name}</span>
                              ) : (
                                <Link
                                  href={item.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-white/80 hover:text-[#23ABD2] transition-colors duration-200"
                                >
                                  {item.name}
                                </Link>
                              )}

                              {hasSubmenu && (
                                <span
                                  className={`transform transition-transform duration-300 ${
                                    hoveredMenu === item.name ? "rotate-90" : ""
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="17"
                                    className="rotate-180"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                  >
                                    <path
                                      d="M15.0901 19.9201L8.57009 13.4001C7.80009 12.6301 7.80009 11.3701 8.57009 10.6001L15.0901 4.08008"
                                      stroke="#ffffff"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>

                            {/* Submenu */}
                            <AnimatePresence mode="wait">
                              {hoveredMenu === item.name && hasSubmenu && (
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
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* SOCIAL ICONS FIXED AT BOTTOM */}
              <div className="block lg:hidden pb-10 absolute bottom-0 w-full">
                <SocialMediaIcons />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
