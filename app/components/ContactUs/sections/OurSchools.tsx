"use client";
import dynamic from "next/dynamic";
const SplitText = dynamic(() => import("@/components/SplitText"), {
  ssr: false,
});
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
// import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";
import { BeamSchoolType } from "../../BeamSchools/type";
import { useApplyLang } from "@/lib/applyLang";
import { ContactPage } from "../type";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

export default function OurSchools({
  data,
  contactData
}: {
  data: BeamSchoolType;
  contactData: ContactPage;
}) {
  const { schools } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const t = useApplyLang(schools)
  const isArabic = useIsPreferredLanguageArabic()

  // Track screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create refs for all cards
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  // For mobile: activate card currently in view
  useEffect(() => {
    if (!isMobile) return;

    const observers = refs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: 0.6 }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, i) => {
        if (observer && refs.current[i]) {
          observer.unobserve(refs.current[i]!);
        }
      });
    };
  }, [isMobile]);

  return (
    <section className="pb-12 md:pb-20 xl:pb-[135px]">
      <div className="container overflow-hidden">
        {/* Title + Description */}
        <div className="mb-5 md:mb-8 xl:mb-[30px]">
          <SplitText
            tag="h1"
            text={
              isArabic
                ? contactData.secondSection.title_ar?.trim()
                  ? contactData.secondSection.title_ar
                  : contactData.secondSection.title
                : contactData.secondSection.title
            }

            className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-black leading-[1.1111]"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          />
          <motion.p variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-colorpara font-light text-sm leading-[1.52] mt-3 xl:mt-[50px]" >
            {isArabic ? contactData.secondSection.description_ar?.trim() ? contactData.secondSection.description_ar : contactData.secondSection.description : contactData.secondSection.description}
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex flex-wrap lg:flex-row gap-6 lg:gap-[1%] justify-between" >
          {t.map((school, i) => {
            const isActive = activeIndex === i;
            const showActive = isActive;

            return (
              <motion.div
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                onMouseEnter={() => !isMobile && setActiveIndex(i)}
                onMouseLeave={() => !isMobile && setActiveIndex(0)}
                animate={{
                  width: "100%",
                  maxWidth: showActive ? "45%" : "10%",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() =>
                  window.open(school.link, "_blank", "noopener,noreferrer")
                }
                className={`relative rounded-[12px] overflow-hidden h-[300px] md:h-[350px] xl:h-[544px] cursor-pointer flex-shrink-0 schl ${isActive ? "z-20" : "z-10"
                  }`}
              >
                {/* Image */}
                <Image src={school.image} alt={school.imageAlt} fill className={`object-cover transition-all duration-500 ${showActive ? "grayscale-0" : "grayscale"}`} sizes="(max-width: 768px) 100vw, 45vw" />
                {/* Overlay */}
                {!showActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-black to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                )}
                {showActive && (
                  <motion.div
                    style={{
                      background:
                        "linear-gradient(360deg, rgba(6, 120, 152, 0.71) 5.61%, rgba(0, 0, 0, 0) 91.64%)",
                    }}
                    className="absolute inset-0 z-[5]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                )}
                {/* Location Pill */}
                {showActive && school.location && (
                  <motion.div
                    className="absolute top-[22px] xl:top-[42px] left-5 xl:left-[40px] z-10 bg-[#E6F7FF] font-light text-sm leading-[1.42] px-[20px] py-[11px] rounded-[50px] inline-flex items-center gap-[8px] text-black"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={"/images/contact-us/icons/location.svg"}
                      alt="location"
                      width={24}
                      height={24}
                    />
                    {school.location.name}
                  </motion.div>
                )}
                {/* Active / Inactive Content */}
                {showActive ? (
                  // ACTIVE CARD
                  <div className="absolute w-full bottom-5 xl:bottom-10 px-5 xl:px-10 flex flex-row items-end justify-between xl:items-end text-white z-10 gap-2 md:gap-6 xl:gap-0">
                    {/* Left content */}
                    <motion.div
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex flex-col"
                    >
                      <h3 className="text-md lg:text-lg xl:text-xl font-light leading-[1.2]">
                        {school.title}
                      </h3>
                      <div className="mt-[15px] inline-flex items-center text-sm font-light">
                        {isArabic ? "تعرّف على المزيد" : "Learn more"}
                        <Image
                          src="/images/arrow-right-tip.svg"
                          alt="arrow"
                          width={25}
                          height={24}
                          className={`ml-[12px] ${isArabic && "rotate-180"}`}
                        />
                      </div>
                    </motion.div>
                    {/* Right arrow button */}
                    <div>
                      <span className="w-8 h-8 md:w-12 md:h-12 xl:w-[74px] xl:h-[74px] flex items-center justify-center border border-white rounded-full">
                        <Image
                          src="/images/arrow-primary.svg"
                          alt="arrow"
                          width={24}
                          height={24}
                          className={`w-auto h-4 xl:h-[24px] ${isArabic && "-rotate-90"}`}
                        />
                      </span>
                    </div>
                  </div>
                ) : (
                  // INACTIVE CARD
                  <div className="absolute bottom-[40px] left-5 xl:left-1/2 xl:-translate-x-1/2 z-10">
                    <span className="w-14 h-14 xl:w-[74px] xl:h-[74px] flex items-center justify-center border border-white rounded-full">
                      <Image
                        src="/images/arrow-primary.svg"
                        alt="arrow"
                        width={24}
                        height={24}
                        className={`w-auto h-4 xl:h-[24px] ${isArabic && "-rotate-90"}`}
                      />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
