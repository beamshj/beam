"use client";
import { ChevronsRight } from "lucide-react";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { StaticImageData } from "next/image";
import Image from "next/image";
interface MainProps {
  data: {
    title: string;
    description: string;
    mainImg: string | StaticImageData ;
    subData: {
      desc: string;
      list: string[];

    }
  }
}

const manipulation = ({ data }: MainProps) => {

  return (
    <section className="pt-13 pb-5 xl:py-20 2xl:py-[135px]">
      <div className="container">
           
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-x-6 gap-y-6 md:gap-y-0 md:gap-x-10 xl:gap-x-18">
          <div>
            <SplitText
              tag="h2"
              text={data.title}
              className={`font-light leading-[1.111111111] text-black mb-8 md:mb-6 xl:mb-8 2xl:mb-12 text-lg xl:text-2xl 2xl:text-4xl max-w-xl`}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="left"
            />
            {/* <h2 className={`font-light leading-[1.111111111] text-black mb-8 md:mb-6 xl:mb-8 2xl:mb-12 text-lg xl:text-xl 2xl:text-2xl `}>{data.title}</h2> */}
              <motion.p variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-colorpara text-sm leading-[1.526315789473684] mb-[30px]" >{data.description}</motion.p>
            <motion.h3 variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-md font-seimibold mb-4 xl:mb-6">{data.subData.desc}</motion.h3>
            <ul className="space-y-2">
              {data.subData.list.map((item, index) => (
                <motion.li variants={moveUp(0.6 + index * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={index} className="flex items-center gap-2 group"><ChevronsRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-300" /> <span>{item}</span></motion.li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col h-full">
            <div className="relative overflow-hidden rounded-xl h-full">
              <Image src={data.mainImg} alt="Students Achievements" width={800} height={865} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default manipulation;