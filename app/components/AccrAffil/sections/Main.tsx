"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "../../motionVarients";
import SplitText from "@/components/SplitText";
import { AccreditationProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

const Main = ({ data }: { data: AccreditationProps["firstSection"] }) => {
  const t = useApplyLang(data)
  const isArabic = useIsPreferredLanguageArabic()
  return (
    <section className="pt-10 xl:pt-25 2xl:pt-[135px] pb-8 xl:pb-14 2xl:pb-[75px]">
      <div className="container">
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{
            amount: 0.1,
            once: true,
            margin: `-250px 0px -250px 0px`,
          }}
          className="relative overflow-hidden rounded-xl p-5 md:p-10 xl:p-15 xl:min-h-[435px] 2xl:min-h-[635px] flex items-end"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
          <motion.div
            variants={moveRight(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{
              amount: 0.1,
              once: true,
              margin: `-250px 0px -250px 0px`,
            }}
            className="absolute top-0 left-0 w-[90%] h-full bg-gradient-to-r from-[#066B7F] to-black/0 z-10 opacity-95"
          ></motion.div>
          <Image
            src={t.image}
            alt={t.imageAlt}
            width={1920}
            height={1280}
            className="absolute top-0 left-0 z-0 h-full object-cover"
          />
          <div className="relative z-30 text-white">
            <SplitText
              tag="h2"
              text={t.title}
              className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111111111111111] mb-5 font-light"
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
              text={t.description}
              className="font-light max-w-[98ch] text-sm"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="lines"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign={isArabic ? "right" : "left"}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Main;
