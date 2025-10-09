"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HealthSafetyProps {
  title: string;
  description: string;
  items: {
    id: number;
    title: string;
    image: string;
  }[];
}

export default function HealthSafety({ data }: { data: HealthSafetyProps }) {
  const [active, setActive] = useState(0);
  const { title, description, items } = data;

  return (
    <section>
     <div className="container">
        <div className="grid xl:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <h2 className="text-lg lg:text-xl xl:text-3xl 2xl:text-4xl font-light text-black mb-3 xl:mb-10 2xl:mb-[50px]">{title}</h2>
            <p className="text-[#626262] text-sm mb-[50px] leading-[1.52] md:max-w-[55ch]">
              {description}
            </p>

            <div className="xl:hidden mb-10 rounded-xl overflow-hidden w-fit xl:w-auto">
              {/* <Image src={items[active].image} alt={items[active].title} fill className="object-cover object-center" /> */}
              <Image src={items[active].image} alt={items[active].title} width={300} height={300} className="object-contain xl:object-cover w-full h-[250px] object-top-left" />
            </div>

            <ul className="group space-y-[30px] order-3">
              {items.map((item, index) => (
                <li key={item.id}
                  className={`flex text-xl xl:items-center border-bdrcolor border-b justify-between pb-2 xl:pb-5 cursor-pointer transition-all duration-300 ${active === index ? "text-primary font-medium" : "text-black"
                    }`}
                  onMouseEnter={() => setActive(index)}
                >
                  <div className="flex items-center gap-3 font-light">
                    <span className={`text-sm mt-2 ${active === index ? "text-black" : "text-[#626262]"}`} >
                      {String(item.id).padStart(2, "0")}
                    </span>
                    <span className="text-[1.2rem] xl:text-lg 2xl:text-xl font-light leading-[1.2]">
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
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative justify-center items-center hidden xl:flex">
            <div className="relative w-full h-[400px] md:h-[500px] xl:h-[600px] 2xl:h-[743px] rounded-[12px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[active].image}
                  className="absolute inset-0"
                >
                  <Image
                    src={items[active].image}
                    alt={items[active].title}
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
          </div>
        </div>
     </div>
    </section>
  );
}
