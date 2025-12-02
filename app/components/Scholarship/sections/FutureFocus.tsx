"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";
import { ScholarshipProps } from "../type";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import {applyLang} from "@/lib/applyLang";


const FutureFocus = ({
  data
}: {
  data: ScholarshipProps['firstSection'];
}) => {
  const isArabic = useIsPreferredLanguageArabic();
  const t = applyLang(isArabic, data);
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 xl:gap-18">
          {/* Left Content */}
          <div>
            <SplitText
              tag="h2"
              text={t.title}
              className=" text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[8ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-40px"
              textAlign="left"
            />

            <SplitText
              tag="p"
              text={t.description}
              className=" text-sm leading-[1.526315789473684]  font-light  text-colorpara"
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
          {/* Right Image */}
          <motion.div variants={moveUp(1.25)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="relative w-full h-[250px] md:h-auto rounded-[12px] overflow-hidden">
            <Image src={data.image} alt={t.imageAlt} fill className="object-cover transition-all duration-500" />
            <motion.div
              className="absolute bottom-0 w-full h-[60%] bg-gradient-to-b from-black/0 to-[#42BADCC9]/79"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FutureFocus;
