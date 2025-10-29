"use client";
import { useState } from "react";
import { accrData } from "../data";
import { motion, AnimatePresence } from "framer-motion";
import { moveUp } from "../../motionVarients";
import Image from "next/image";
const DataTab = () => {
  const [activeTab, setActiveTab] = useState<"affiliation" | "accreditations">(
    "affiliation"
  );

  const currentData =
    activeTab === "affiliation" ? accrData.affiliation : accrData.accrediations;
  const [isActive, setIsActive] = useState<number | null>(null);
  return (
    <section className="pb-10 lg:pb-20 xl:pb-25 2xl:pb-[135px]">
      <div className="container">
        <div className="flex items-center gap-5 border-b border-bdrcolor pb-[31px] mb-10 xl:mb-[65px]">
          <motion.button
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1, once: false }}
            className={
              activeTab === "affiliation" ? "tab-btn active" : "tab-btn"
            }
            onClick={() => setActiveTab("affiliation")}
          >
            <span>Affiliation</span>
          </motion.button>
          <motion.button
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1, once: false }}
            className={
              activeTab === "accreditations" ? "tab-btn active" : "tab-btn"
            }
            onClick={() => setActiveTab("accreditations")}
          >
            <span>Accreditation</span>
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 grid-bdr"
          >
            {currentData.items.map((item, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setIsActive(index)}
                onMouseEnter={() => setIsActive(index)}
                onMouseLeave={() => setIsActive(null)}
                className="tab-pan xl:min-h-[428px] flex flex-col justify-between bg-white hover:shadow-xl transition-shadow duration-300 p-6 relative group hover:rounded-tr-3xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/0 to-[#E6F7FF] z-10"></div>
                <div
                  className={`${
                    isActive === index ? "h-full" : " h-0   "
                  } absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-300 bg-gradient-to-b from-[#42BADC] to-[#7E5AA3]/76 z-10`}
                ></div>
                <div className="flex flex-col h-full justify-between relative z-30">
                  <div className="mb-4 flex flex-col relative overflow-hidden">
                    <div
                      className={`${
                        isActive === index
                          ? "opacity-100 -translate-y-full"
                          : "   "
                      }  group-hover:opacity-100 group-hover:-translate-y-full   transition-all duration-300`}
                    >
                      <Image
                        src={item.logo}
                        alt={item.title}
                        width={1920}
                        height={1280}
                        className="object-contain w-auto h-12 xl:h-[64px] 2xl:w-auto 2xl:h-auto group-hover:-translate-y-full transition-all duration-300"
                      />
                    </div>
                    {/* <div
                      className={`${
                        isActive === index
                          ? "opacity-100 -translate-y-full"
                          : " opacity-0 "
                      } group-hover:opacity-100 group-hover:-translate-y-full mt-6 transition-all duration-300`}
                    >
                      <h3 className="text-lg xl:text-xl font-light text-white leading-[1.2]">
                        {item.title}
                      </h3>
                    </div> */}
                  </div>
                  <div className="flex flex-col justify-end relative min-h-[4rem] overflow-visible">
                    <div
                      className={`${
                        isActive === index ? "opacity-0 -translate-y-full" : " "
                      } group-hover:opacity-0 group-hover:-translate-y-full   transition-all duration-150`}
                    >
                      <h3 className="text-lg font-light leading-[1.2] text-black mb-3">
                        {item.title}
                      </h3>
                    </div>
                    <div
                      className={`${
                        isActive === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-full"
                      } group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 left-0 w-full  transition-all duration-300`}
                    >
                      <p className="text-sm font-light text-white leading-relaxed max-w-[30ch]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DataTab;
