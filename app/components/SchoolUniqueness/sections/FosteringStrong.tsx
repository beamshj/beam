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
  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: easeIn } },
  };
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px]">
      <div className="container">
        <div className="grid lg:grid-cols-[56%_39%] gap-[5%] ">
          {/* Left Content */}
          <div>
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
            <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12">
              <div className="lg:hidden mt-10 rounded-xl overflow-hidden lg:w-auto w-full">
                
           
              <motion.div
            variants={moveUp(1.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
           >
            <AnimatePresence mode="wait">
            
             
            <motion.img
            key={fsData.items[activeIndex].image}
            src={fsData.items[activeIndex].image}
            alt={fsData.items[activeIndex].title}
            variants={imageVariants}
            initial="hidden"
            
                  width={300}
                  height={300}
            animate="show"
            exit="exit"
            className="  xl:object-cover w-full h-[350px] lg:h-full object-cover lg:object-top-left"
          />
            </AnimatePresence>
            
          </motion.div>

              </div>
                 {fsData.items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
           <motion.div
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className={`flex gap-3 border-b border-[#D3D3D3] transition-colors duration-300`}
              key={index}
              onClick={() => setActiveIndex(index)} // 
            >
              <motion.div
                variants={moveUp(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.1, once: true }}
                className="flex items-center gap-3 pt-7 pb-5 group cursor-pointer"
              >
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
              </motion.div>
            </motion.div>
        );
      })}
            </div>
          </div>
          {/* Right Image */}
          <motion.div
            variants={moveUp(1.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="relative w-full h-[250px] lg:h-auto rounded-[12px] overflow-hidden   hidden lg:block"
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
            className="object-cover h-full img-fluid"
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
