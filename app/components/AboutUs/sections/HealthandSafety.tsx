"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { moveUp } from "../../motionVarients";
import SplitText from "@/components/SplitText";
import { AboutProps } from "../type";


export default function HealthSafety({ data }: { data:AboutProps['sixthSection']  }) {
  const [active, setActive] = useState(0);

  return (
    <section>
      <div className="container">
        <div className="grid xl:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <h2 className="text-lg lg:text-xl xl:text-3xl 2xl:text-4xl font-light text-black mb-3 xl:mb-10 2xl:mb-[50px]">
              <SplitText
                tag="span"
                text={data.title}
                className=""
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
            </h2>
            <motion.p
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-[#626262] text-sm mb-[50px] leading-[1.52] md:max-w-[55ch]"
            >
              {data.description}
            </motion.p>

            <div className="xl:hidden mb-10 rounded-xl overflow-hidden">
              {/* <Image src={items[active].image} alt={items[active].title} fill className="object-cover object-center" /> */}
              <Image
                src={data.items[active].image}
                alt={data.items[active].title}
                width={300}
                height={300}
                className="xl:object-contain object-cover w-full h-[250px] xl:object-top-left"
              />
            </div>

            <ul className="group space-y-[30px] order-3">
              {data.items.map((item, index) => (
                <motion.li
                  key={index}
                  variants={moveUp(index * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`flex text-xl xl:items-center border-bdrcolor border-b justify-between pb-2 xl:pb-5 cursor-pointer group ${
                    active === index ? "text-primary font-medium" : "text-black"
                  }`}
                  onMouseEnter={() => setActive(index)}
                >
                  <div className="flex items-center gap-3 font-light">
                    <span
                      className={`text-sm mt-2 hover:text-primary transition-all duration-300 ${
                        active === index ? "text-black" : "text-[#626262]"
                      }`}
                    >
                      {String(index+1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.2rem] xl:text-lg 2xl:text-xl font-light leading-[1.2] hover:text-primary transition-all duration-300">
                      {item.title}
                    </span>
                  </div>

                  {active === index && (
                    <motion.div className="group bg-primary text-white w-[27px] h-[27px] flex items-center justify-center rounded-full">
                      <Image
                        src="/images/arrow-right-tip.svg"
                        alt="arrow-right-tip"
                        width={15}
                        height={15}
                        className="w-[15px] h-[15px]"
                      />
                    </motion.div>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative justify-center items-center hidden xl:flex"
          >
            <div className="relative w-full h-[400px] md:h-[500px] xl:h-[600px] 2xl:h-[743px] rounded-[12px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={data.items[active].image}
                  className="absolute inset-0"
                >
                  <Image
                    src={data.items[active].image}
                    alt={data.items[active].title}
                    fill
                    className="object-cover object-center"
                  />
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(126, 90, 163, 0.72) 100%)",
                    }}
                    className="absolute bottom-0 h-[70%] w-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
