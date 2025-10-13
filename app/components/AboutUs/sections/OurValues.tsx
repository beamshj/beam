"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
export interface ValueItem {
  number: string;
  title: string;
  points: string[];
  image: string;
}

interface Props {
  values: ValueItem[];
}

export default function ValuesGrid({ values }: Props) {
  const [hovered, setHovered] = useState<number | null>(0);

  return (
    <section className="container">
      <div className="py-10 md:py-20 2xl:py-[135px]">
        <motion.h2 variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-xl font-light mb-3 lg:mb-6 xl:mb-[40px] 2xl:mb-[50px] leading-[1.2] text-black">
          Our Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-[11px]">
          {values?.map((item, index) => (
            <motion.div variants={moveUp(index * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={index} className="flex flex-col w-full">
              {/* Number ABOVE card */}
              <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
                className={`text-lg font-light mb-2 ${
                  hovered === index ? "text-black" : "text-bdrcolor"
                }`}
              >
                {item.number}
              </motion.div>

              {/* Card */}
              <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(index)}
                className="relative h-[280px] lg:h-[400px] xl:h-[500px] 2xl:h-[729px] w-full xl:max-w-[295px] overflow-hidden rounded-[12px]  group cursor-pointer"
              >
                {/* Background image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover w-full transition-all duration-300 group-hover:scale-105 ${
                    hovered === index
                      ? "brightness-100"
                      : "brightness-75 grayscale"
                  }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end text-white">
                  <div
                    className={`absolute bottom-0 left-0 w-full
                      bg-gradient-to-t from-[#42BADC]/60 to-transparent
                      transition-all duration-500 ease-in-out
                      ${hovered === index ? "h-[41%]" : "h-0"}
                    `}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full w-full">
                    {/* Title that moves */}
                    <h3
                      className={`
                        absolute rounded-full 2xl:w-[250px]  py-2   text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl  font-light transition-all duration-500 flex items-center justify-center
                        ${
                          hovered === index
                            ? "top-3 left-1/2 -translate-x-1/2  text-left border-none bg-[linear-gradient(131deg,rgba(66,186,220,1)_0%,rgba(126,90,163,1)_100%)]"
                            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center border border-white"
                        }
                      `}
                    >
                      {item.title}
                    </h3>

                    {/* Points (only show on hover) */}
                    {hovered === index && (
                      <div
                        className="absolute bottom-0 left-0 w-full 
               bg-gradient-to-t from-black/100 to-black/0
               px-3 pt-4 pb-3"
                      >
                        <ul className="list-disc list-outside pl-4 xl:pl-9 space-y-1 text-sm text-white font-light">
                          {item.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
