"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";

export interface VMItem {
  title: string;
}
export interface fsData {
  title: string;
  description: string;
  image: string;
  items: VMItem[];
}

const FosteringStrong = ({ fsData }: { fsData: fsData }) => {
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
                <Image
                  src={fsData.image}
                  alt={fsData.title}
                  width={300}
                  height={300}
                  className="object-contain xl:object-cover w-full h-[350px] lg:h-full object-cover lg:object-top-left"
                />
              </div>
              {fsData.items.map((item, index) => {
                return (
                  <motion.div
                    variants={moveUp(index * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.1, once: true }}
                    className="flex gap-3 border-b border-[#D3D3D3]"
                    key={index}
                  >
                    <motion.div
                      variants={moveUp(0.5)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ amount: 0.1, once: true }}
                      key={index}
                      className="flex  items-center gap-3 pt-7 pb-5 group cursor-pointer"
                    >
                      <p className="text-sm font-light  leading-[1.2] text-colorpara group-hover:text-black transition-colors duration-300">
                        0{index + 1}
                      </p>
                      <p className="text-[1.2rem] md:text-md xl:text-lg 2xl:text-xl font-light   leading-[1.2] group-hover:text-primary transition-colors duration-300">
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
            <Image
              src={fsData.image}
              alt={fsData.title}
              fill
              className="object-cover transition-all duration-500 img-fluid"
            />
            <motion.div
              className="absolute bottom-0 w-full h-[60%] bg-gradient-to-b from-black/0 to-[#42BADCC9]/79"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FosteringStrong;
