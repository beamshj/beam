"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { AboutProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

interface Props {
  data: AboutProps["thirdSection"];
}

export default function ValuesGrid({ data }: Props) {
  const [hovered, setHovered] = useState<number | null>(0);
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic();

  return (
    <section className="container">
      <div className="py-10 md:py-20 2xl:py-[135px]">
        <motion.h3
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-xl font-light mb-3 lg:mb-6 xl:mb-[40px] 2xl:mb-[50px] leading-[1.2] text-black"
        >
          {t.title}
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5 gap-4 xl:gap-5 2xl:gap-[11px]">
          {t.items?.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              key={index}
              className={`flex flex-col w-full
                        ${"border-b-[1px] border-bdrcolor xl:border-none md:border-gray-300 pb-5 last:border-none"}`}
            >
              {/* Number ABOVE card */}
              <motion.div
                variants={moveUp(index * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className={`text-lg font-light mb-2 ${
                  hovered === index ? "text-black" : "text-bdrcolor"
                }`}
              >
                {index < 9 ? "0" + (index + 1) : index + 1}
              </motion.div>

              {/* Card */}
              <motion.div
                variants={moveUp(index * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(index)}
                className="relative h-[400px] lg:h-[430px] xl:h-[525px] 2xl:h-[729px] w-full 2xl:max-w-[295px] overflow-hidden rounded-[12px]  group cursor-pointer"
              >
                {/* Background image */}
                <Image
                  src={item.image}
                  alt={item.imageAlt}
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
                    {/* <h3
                      className={`
                        absolute rounded-full text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light transition-all duration-500 flex items-center justify-center
                        ${
                          hovered === index
                            ? "top-[26px] left-[26px] w-fit text-center border-none bg-[linear-gradient(131deg,rgba(66,186,220,1)_0%,rgba(126,90,163,1)_100%)] px-3"
                            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] lg:w-[220px] 2xl:w-[250px] text-center border border-white"
                        }
                        
                      `}
                    >
                      {item.title}
                    </h3> */}

                    <h3 className={`
                        absolute rounded-full  font-light transition-all duration-500 flex items-center justify-center ${isArabic ? "text-[1.3rem] md:text-md xl:text-lg" :"text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl"}
                        ${
                          hovered === index
                            ? "top-[26px] left-1/2 -translate-x-1/2 w-[190px] lg:w-[220px] 2xl:w-[250px] text-center border-none bg-[linear-gradient(131deg,rgba(66,186,220,1)_0%,rgba(126,90,163,1)_100%)] px-3"
                            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] lg:w-[220px] 2xl:w-[250px] text-center border border-white"
                        }
                        
                      `}
                    >
                      {item.title}
                    </h3>

                    {/* Points (only show on hover) */}
                    {hovered === index && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 w-full
               bg-gradient-to-t from-black/100 to-black/0 ${
                 isArabic ? "px-10" : "px-3"
               } pt-4 pb-5 values-description-about max-h-[75%] overflow-y-auto 2xl:overflow-y-hidden`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      >
                        {/* <ul className="list-disc list-outside pl-4 xl:pl-9 space-y-1 text-sm text-white font-light">
                          {item.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul> */}
                        {/* {item.description} */}
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
