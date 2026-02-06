"use client";
import { ChevronsLeft } from "lucide-react";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface MainProps {
  data: {
  
    description: string;
    mainImg: string | StaticImageData;
    subData: {
      desc: string;
      list: string[];
    }
  }
}

const Main = ({ data }: MainProps) => {
  return (
    <section className="pt-13 pb-5 xl:py-20 2xl:py-[135px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch gap-x-6 gap-y-6 md:gap-y-0 md:gap-x-10 xl:gap-x-18">
          <div className="flex flex-col">
           
            <motion.p variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-colorpara text-sm leading-[1.526315789473684] mb-[30px]">{data.description}</motion.p>
            <motion.h3 variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-md font-seimibold mb-4 xl:mb-6">{data.subData.desc}</motion.h3>
            <ul className="space-y-2">
              {data.subData.list.map((item, index) => (
                <motion.li variants={moveUp(0.6 + index * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={index} className="flex items-center gap-2 group">
                  <ChevronsLeft className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-300" /> 
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-xl md:h-full min-h-[300px]">
            <Image 
              src={data.mainImg} 
              alt="Students Achievements" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              loading="lazy" 
              className="object-cover object-top" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;