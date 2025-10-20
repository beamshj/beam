"use client";

import { AnimatePresence, motion, easeIn, easeOut, easeInOut } from "framer-motion";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";
import { useState } from "react";

export interface VMItem {
  title: string;
  image: string;
}

export interface fsData {
  title: string;
  description: string;
  items: VMItem[];
}

const FosteringStrong = ({ fsData }: { fsData: fsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

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
        <div className="grid lg:grid-cols-[56%_39%] gap-[5%]">
          {/* Left Content */}
          <div>
            {/* Title + Description */}
            <div>
              <SplitText
                tag="h2"
                text={fsData.title}
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-[50ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <SplitText
                tag="p"
                text={fsData.description}
                className="text-sm leading-[1.526315789473684] font-light text-colorpara max-w-[54ch]"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </div>

            {/* Accordion / List */}
            <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12">
              {fsData.items.map((item, index) => {
                const isActive = activeIndex === index;
                const isOpen = openAccordion === index;

                return (
                  <motion.div
                    key={index}
                    variants={moveUp(index * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.1, once: true }}
                    className="border-b border-[#D3D3D3] transition-colors duration-300"
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex justify-between items-center w-full text-left pt-7 pb-5  cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <p
                          className={`text-sm font-light leading-[1.2] transition-colors duration-300 ${
                            isActive
                              ? "text-black"
                              : "text-colorpara group-hover:text-black"
                          }`}
                        >
                          0{index + 1}
                        </p>
                        <p
                          className={`text-[1.2rem] md:text-md xl:text-lg 2xl:text-xl font-light leading-[1.2] transition-colors duration-300 ${
                            isActive
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
                          <svg
                            className="w-4 h-4 transform rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </span>
                    </button>

                    {/* Accordion Content (Mobile Only) */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          key={`accordion-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: easeInOut }}
                          className="overflow-hidden lg:hidden"
                        >
                          <motion.img
                            key={item.image}
                            src={item.image}
                            alt={item.title}
                            variants={imageVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="w-full h-[250px] object-cover rounded-xl mb-4"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Image (Desktop only) */}
          <motion.div
            variants={moveUp(1.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="relative w-full h-[250px] lg:h-auto rounded-[12px] overflow-hidden hidden lg:block"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={fsData.items[activeIndex].image}
                src={fsData.items[activeIndex].image}
                alt={fsData.items[activeIndex].title}
                variants={imageVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="object-cover h-full w-full"
              />
            </AnimatePresence>

            <motion.div
              className="absolute bottom-0 w-full h-[60%] bg-gradient-to-b from-black/0 to-[#42BADCC9]/79"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.4, ease: easeInOut }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FosteringStrong;
