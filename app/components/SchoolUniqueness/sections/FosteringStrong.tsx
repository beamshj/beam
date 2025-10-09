"use client";

import Image from "next/image";
import { motion } from "framer-motion";



export interface VMItem {
  title: string;
}
export interface fsData {
  title: string;
  description: string;
  image: string;
  items: VMItem[];
}


const FosteringStrong = ({
  fsData,
}: {
  fsData: fsData;
}) => {
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px]">
      <div className="container">
        <div className="grid lg:grid-cols-[57%_40%] gap-[3%] ">
          {/* Left Content */}
          <div >
            <div>
              <h2 className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-[50ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12">
                {fsData.title}
              </h2>
              <p className="text-sm leading-[1.526315789473684]  font-light  text-colorpara max-w-[54ch]">
                {fsData.description}
              </p>
            </div>
            <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12">
              <div className="xl:hidden mt-10 rounded-xl overflow-hidden xl:w-auto w-fit">
                <Image src={fsData.image} alt={fsData.title} width={300} height={300} className="object-contain xl:object-cover w-full h-[250px] object-top-left" />
              </div>
              {fsData.items.map((item, index) => {
                return (
                  <div className="flex gap-3 border-b border-[#D3D3D3]" key={index}>
                    <div key={index} className="flex  items-center gap-3 pt-7 pb-5 group cursor-pointer">
                      <p className="text-sm font-light  leading-[1.2] text-colorpara group-hover:text-black transition-colors duration-300">0{index + 1}</p>
                      <p className="text-[1.2rem] md:text-md xl:text-lg 2xl:text-xl font-light   leading-[1.2] group-hover:text-primary transition-colors duration-300">{item.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Right Image */}
          <div className="relative w-full h-[250px] lg:h-auto rounded-[12px] overflow-hidden lg:ms-10 hidden xl:block" >
            <Image src={fsData.image} alt={fsData.title} fill className="object-cover transition-all duration-500 img-fluid" />
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

export default FosteringStrong;
