"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface visionData {
  title: string;
  items: {
    image: string;
    videos: string;
    name: string;
    designation: string;
  }[];
}

const GuidedVision = ({ visionData }: { visionData: visionData }) => { 
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  return (
    <section className="pb-14 md:pb-20 lg:pb-20 2xl:pb-[135px]">
      <div className="container">
        <div>
          <h2 className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[18ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-7 2xl:mb-12">
            {visionData.title}
          </h2>
        </div>
        <div className="">
          <div>
            <div className="relative storyslide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-18 items-center">
                {visionData.items.map((item, index) => {
                  const isPlaying = activeVideoIndex === index;

                  return (
                    <div key={index} className="relative w-full h-[250px] md:h-[420px] rounded-[12px] overflow-hidden flex-grow">
                      {/* Background image */}
                      <Image
                        src={item.image}
                        alt={""}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          isPlaying ? "blur-sm" : ""
                        }`}
                      />

                      {/* Gradient overlay */}
                      <motion.div
                        className="absolute bottom-0 w-full h-full rounded-xl bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,rgba(0,0,0,0),rgba(66,186,220,0.5))]"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                       <motion.div
                        className="absolute bottom-0 w-full h-full  "
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                     <div className="absolute bottom-7 left-7  flex flex-col gap-2 ">
                     <p className="text-white text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light  leading-[1.18] lettersp-1">{visionData.items[index].name}</p>
                     <p className="text-[#E0E0E0]">{visionData.items[index].designation}</p>
                     </div>
                      </motion.div>

                      {/* Play button */}
                      {!isPlaying && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                          onClick={() => setActiveVideoIndex(index)}
                        >
                          <Image
                            src="/images/testimonials/play.svg"
                            alt="Play"
                            width={90}
                            height={90}
                          />
                        </motion.div>
                      )}

                      {/* Video iframe (YouTube) */}
                      {isPlaying && (
                        <iframe
                          src={`${item.videos}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                          className="absolute inset-0 w-full h-full rounded-[12px]"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default GuidedVision;
