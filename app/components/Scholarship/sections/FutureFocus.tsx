"use client";
 
import Image from "next/image";
import { motion } from "framer-motion"; 

 

export interface FocusData {
  title: string;
  description: string;
  image: string;
}

const FutureFocus = ({
  focusData,
}: {
  focusData: FocusData;
}) => { 
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 xl:gap-18">
          {/* Left Content */}
          <div>
            <h2 className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[10ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12">
              {focusData.title}
            </h2>
            <p className=" text-sm leading-[1.526315789473684]  font-light  text-colorpara">
              {focusData.description}
            </p>
          
          </div>
          {/* Right Image */}
          <div className="relative w-full h-[250px] md:h-auto rounded-[12px] overflow-hidden">
           
              <Image
                src={focusData.image}
                alt={focusData.title}
                fill
                className="object-cover transition-all duration-500"
              /> 
            <motion.div
              className="absolute bottom-0 w-full h-[60%] bg-gradient-to-b from-black/0 to-[#42BADCC9]/79"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureFocus;
