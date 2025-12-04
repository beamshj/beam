"use client";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveLeft } from "../../motionVarients";
import { PLProgramProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";


export default function PLProgram({
  data,
}: {
  data: PLProgramProps["firstSection"];
}) {
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic()

  return (
    <section className="py-10 md:py-20 xl:py-[135px]">
      <div className="container">
        <div className="flex flex-col xl:flex-row items-stretch gap-10 xl:gap-13 2xl:gap-[45px]">
          {/* Left Content */}
          <div className="xl:w-[85%]  2xl:w-[49%] w-full  order-2 xl:order-1">
            <SplitText
              tag="h2"
              text={t.mainTitle}
              className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-light leading-[1.111] mb-3 2xl:mb-[43px] lettersp-2"
              delay={200}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-10px"
              textAlign={isArabic ? "right" : "left"}
            />

            <SplitText
              tag="h3"
              text={t.subTitle}
              className="text-md mb-1 xl:text-lg 2xl:text-xl text-black leading-[1.4] font-light  "
              delay={200}
              duration={0.6}
              ease="power3.out"
              splitType="lines"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-10px"
              textAlign={isArabic ? "right" : "left"}
            />

            <div className="">
              {t.description.split("\n").map((line, idx) => {
                console.log("Line:", line.replace(/<[^>]*>/g, "")); // Debug

                return (
                  line.trim() && (
                    <div key={idx} className="whitespace-pre-line">
                      <SplitText
                        tag="span"
                        className="text-colorpara xl:max-w-[56ch]  text-sm font-light"
                        text={line.replace(/<[^>]*>/g, "")}
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
                  )
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            variants={moveLeft(2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative min-h-[300px] md:min-h-[300px] xl:min-h-[650px] 2xl:w-[749px] w-full rounded-[12px] overflow-hidden  order-1 xl:order-2"
          >
            <Image
              src={t.image}
              alt={t.imageAlt}
              fill
              className="object-cover rounded-[12px]"
            />
            <div
              style={{
                background:
                  "linear-gradient(183.56deg, rgba(66, 186, 220, 0) 43.99%, #7E5AA3 116.63%)",
              }}
              className="absolute  w-full h-[50%] bottom-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
