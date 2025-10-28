// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import SplitText from "@/components/SplitText";
// import { moveUp } from "../../motionVarients";
// export interface visionData {
//   title: string;
//   items: {
//     image: string;
//     videos: string;
//     name: string;
//     designation: string;
//   }[];
// }

// const GuidedVision = ({ visionData }: { visionData: visionData }) => {
//   const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
//   return (
//     <section className="py-14 md:py-20 lg:py-20 2xl:py-[135px]">
//       <div className="container">
//         <div>

//           <SplitText
//             tag="h2"
//             text={visionData.title}
//             className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[18ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-7 2xl:mb-12"
//             delay={100}
//             duration={0.6}
//             ease="power3.out"
//             splitType="words"
//             from={{ opacity: 0, y: 40 }}
//             to={{ opacity: 1, y: 0 }}
//             threshold={0.1}
//             rootMargin="-100px"
//           />
//         </div>
//         <div className="">
//           <div>
//             <div className="relative storyslide">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-10 items-center">
//                 {visionData.items.map((item, index) => {
//                   const isPlaying = activeVideoIndex === index;

//                   return (
//                     <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{amount: 0.1, once: true}} key={index} className="relative w-full h-[300px] md:h-[480px] rounded-[12px] overflow-hidden flex-grow">
//                       {/* Background image */}
//                       <Image
//                         src={item.image}
//                         alt={""}
//                         fill
//                         className={`object-cover transition-all duration-500 ${
//                           isPlaying ? "blur-sm" : ""
//                         }`}
//                       />

//                       {/* Gradient overlay */}
//                       <motion.div
//                         className="absolute bottom-0 w-full h-full rounded-xl bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,rgba(0,0,0,0),rgba(66,186,220,0.5))]"
//                         initial={{ y: "100%" }}
//                         animate={{ y: "0%" }}
//                         transition={{ duration: 0.4, ease: "easeInOut" }}
//                       />
//                        <motion.div
//                         className="absolute bottom-0 w-full h-full  "
//                         initial={{ y: "100%" }}
//                         animate={{ y: "0%" }}
//                         transition={{ duration: 0.4, ease: "easeInOut" }}
//                     >
//                      <div className="absolute bottom-4 md:bottom-7 px-4 md:px-7  flex flex-col gap-2 ">
//                      <p className="text-white text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light  leading-[1.18] lettersp-1">{visionData.items[index].name}</p>
//                      <p className="text-[#E0E0E0]">{visionData.items[index].designation}</p>
//                      </div>
//                       </motion.div>

//                       {/* Play button */}
//                       {!isPlaying && (
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ duration: 0.4, ease: "easeInOut" }}
//                           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 w-10 h-10 md:w-16 md:h-16   xl:w-[90px] xl:h-[90px]"
//                           onClick={() => setActiveVideoIndex(index)}
//                         >
//                           <Image
//                             src="/images/testimonials/play.svg"
//                             alt="Play"
//                             width={90}
//                             height={90}
//                           />
//                         </motion.div>
//                       )}

//                       {/* Video iframe (YouTube) */}
//                       {isPlaying && (
//                         <iframe
//                           src={`${item.videos}?autoplay=1&controls=1&rel=0&modestbranding=1`}
//                           className="absolute inset-0 w-full h-full rounded-[12px]"
//                           allow="autoplay; fullscreen"
//                           allowFullScreen
//                         />
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default GuidedVision;

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";

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

  // helper to convert normal YT link to embed format
  const getEmbedUrl = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <section className="py-14 md:py-20 lg:py-20 2xl:py-[135px]">
      <div className="container">
        <div>
          <SplitText
            tag="h2"
            text={visionData.title}
            className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[18ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-7 2xl:mb-12"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
          />
        </div>
        <div>
          <div className="relative storyslide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-10 items-center">
              {visionData.items.map((item, index) => {
                const isPlaying = activeVideoIndex === index;

                return (
                  <motion.div
                    variants={moveUp(index * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.1, once: true }}
                    key={index}
                    className="relative w-full h-[300px] md:h-[480px] rounded-[12px] overflow-hidden flex-grow"
                  >
                    {/* Background image */}
                    <Image
                      src={item.image}
                      alt=""
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
                      className="absolute bottom-0 w-full h-full"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="absolute bottom-4 md:bottom-7 px-4 md:px-7 flex flex-col gap-2">
                        <p className="text-white text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light leading-[1.18] lettersp-1">
                          {visionData.items[index].name}
                        </p>
                        <p className="text-[#E0E0E0]">
                          {visionData.items[index].designation}
                        </p>
                      </div>
                    </motion.div>

                    {/* Play button */}
                    {!isPlaying && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 w-10 h-10 md:w-16 md:h-16 xl:w-[90px] xl:h-[90px]"
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

                    {/* Video iframe (YouTube embed) */}
                    {isPlaying && (
                      <iframe
                        src={`${getEmbedUrl(
                          item.videos
                        )}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                        className="absolute inset-0 w-full h-full rounded-[12px]"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidedVision;
