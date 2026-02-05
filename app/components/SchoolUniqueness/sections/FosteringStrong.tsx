"use client";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  easeIn,
  easeOut,
  easeInOut,
} from "framer-motion";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";
import { useState } from "react";
import { SchoolUniquenessProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";


const FosteringStrong = ({ data }: { data: SchoolUniquenessProps['firstSection'] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const t = useApplyLang(data)
  const isArabic = useIsPreferredLanguageArabic()

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: easeIn } },
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
    setActiveIndex(index);
  };

  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px]">
      <div className="container">
        <div className="grid lg:grid-cols-[56%_39%] 2xl:grid-cols-[auto_657px] gap-4 2xl:gap-17">
          {/* Left Content */}
          <div>
            {/* Title + Description */}
            <div>
              <SplitText
                tag="h2"
                text={t.title}
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-[50ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12"
                delay={10}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign={isArabic ? "right" : "left"}
              />
              {/* <SplitText
                tag="p"
                text={t.description}
                className="text-sm leading-[1.526315789473684] font-light text-colorpara max-w-[54ch]"
                delay={10}
                duration={0.6}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign={isArabic ? "right" : "left"}
              /> */}
              <motion.div variants={moveUp(0.2)} initial={"hidden"} animate={"show"}>
              <p className={`text-sm leading-[1.526315789473684] font-light text-colorpara max-w-[54ch] ${isArabic ? "text-right" : "text-left"}`}>{t.description}</p>
              </motion.div>
            </div>

            {/* Accordion / List */}
            <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12">
              {t.items.map((item, index) => {
                const isActive = activeIndex === index;
                const isOpen = openAccordion === index;

                return (
                  <motion.div key={index} variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ amount: 0.1, once: true }} className="border-b border-[#D3D3D3] transition-colors duration-300" >
                    {/* Header */}
                    <button onClick={() => toggleAccordion(index)} className={`flex justify-between items-center w-full ${isArabic ? "text-right" : "text-left"} pt-7 pb-5  cursor-pointer group`}>
                      <div className="flex items-cente gap-3">
                        <p className={`text-sm font-light leading-[1.2] transition-colors duration-300 mt-[7px] ${isActive ? "text-black" : "text-colorpara group-hover:text-black"}`}>
                          0{index + 1}
                        </p>
                        <p className={`text-[1.2rem] md:text-md xl:text-lg font-light leading-[1.2] transition-colors duration-300 text-black
                         ${isActive
                              ? "text-primary"
                              : "group-hover:text-primary"
                            }`}
                        >
                          {item.title}
                        </p>
                      </div>
                      {/* Accordion icon for mobile */}
                      <span className="lg:hidden transition-transform duration-300">
                        {isOpen ? (
                          <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                    </button>

                    {/* Accordion Content (Mobile Only) */}
                    <AnimatePresence mode="wait">
                      {isOpen && (
                        <motion.div key={`accordion-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: easeInOut }} className="overflow-hidden lg:hidden relative" >
                          <div className="w-full h-[250px] rounded-xl mb-4 overflow-hidden relative">
                            <Image src={item.image} alt={item.imageAlt} fill loading="lazy" sizes="(max-width: 768px) 100vw" className="object-cover" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Image (Desktop only) */}
          <div className="relative w-full h-[250px] lg:h-auto rounded-[12px] overflow-hidden hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div key={t.items[activeIndex].image} variants={imageVariants} initial="hidden" animate="show" exit="exit" className="absolute inset-0" >
                <Image src={t.items[activeIndex].image} alt={t.items[activeIndex].imageAlt} width={1657} height={1400} loading="lazy" sizes="(min-width: 1024px) 39vw, 100vw"
                 className="object-cover w-full h-full " />
              </motion.div>
            </AnimatePresence>
            <motion.div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-b from-black/0 to-[#42BADCC9]/79" 
            initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.4, ease: easeInOut }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FosteringStrong;
