"use client";
  

import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { ScholarshipProps } from "../type";


const OurLegacy = ({
  data,
}: {
  data: ScholarshipProps['fourthSection'];
}) => { 
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px] relative " style={{backgroundImage: `url(${data.image})`, backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="absolute top-0 left-0 w-full h-full " style={{background: "linear-gradient(90.62deg, rgba(0, 0, 0, 0.86) 4.04%, rgba(0, 0, 0, 0) 93.9%)"}}></div>
      <div className="container relative z-10">
        <div> 
          <div>
            <SplitText
              tag="h2"
              text={data.title}
              className=" text-xl xl:text-2xl 2xl:text-4xl  font-light leading-[1.111111111] text-white mb-4 md:mb-6 xl:mb-8 2xl:mb-13"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
          
           <SplitText
                tag="p"
                text={data.description}
              className="text-sm lg:text-md xl:text-lg leading-[1.526315789473684] max-w-[55ch] mb-4 lg:mb-7 font-light  text-white"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
          
          
          </div>
          <div  className="md:flex gap-5 "> 
            <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mb-5 md:mb-0 w-fit p-[1px] group transition-shadow border-[1px] border-primary rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]">
            <a href={`#`}>
              <div className="cursor-pointer px-3 md:px-5 py-0 md:py-3 bg-transparent rounded-full flex items-center md:gap-2 transition-all duration-300">
                <div className="p-2 flex items-center justify-center w-fit  ">
                  <Image src="/images/scholarship/user.svg" alt="arrow" width={24} height={24} />
                </div>
                <p className="text-xs font-light text-white  transition-colors duration-300">
                  {data.buttonText}
                </p> 
              </div>
            </a>
            </motion.div>
            <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="w-fit p-[1px] group transition-shadow border-[1px] border-primary rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]">
              <a href={`mailto:${data.email}`}>
                <div className="cursor-pointer px-3 md:px-5 py-0 md:py-3 bg-transparent rounded-full flex items-center md:gap-2 transition-all duration-300">
                  <div className="p-2 flex items-center justify-center w-fit ">
                    <Image src="/images/scholarship/mail.svg" alt="arrow" width={24} height={24} />
                  </div>
                  <p className="text-xs font-light text-white  transition-colors duration-300">
                    {data.email}
                  </p> 
                </div>
              </a>
            </motion.div>
          </div> 
         
        </div>
      </div>
    </section>
  );
};

export default OurLegacy;
