"use client";

import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp, moveRight } from "../../motionVarients";
import { GmMessageProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";

export default function GmMessage({
  data,
}: {
  data: GmMessageProps["firstSection"];
}) {
  // const { title, intro, photo, name, designation, description } = data;
  const t = useApplyLang(data);

  return (
    <section className="pb-12 md:pb-20 xl:pb-[135px] pt-12  md:pt-20 xl:pt-25">
      <div className="container mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4 md:gap-12 xl:gap-[91px]">
        {/* Left Column */}
        <div className="w-full xl:max-w-[54%]">
          {/* {" "}
            {title.split("\n").map((line, idx) => (
              <span key={idx} className="xl:flex">
                {" "}
                {line}{" "}
              </span>
            ))}{" "} */}
          <SplitText
            tag="h2"
            text={t.title}
            className="text-lg md:text-xl xl:text-3xl 2xl:text-4xl leading-[1.1111] font-light text-black mb-6 xl:mb-[30px] 2xl:mb-[50px]"
            delay={100}
            duration={1}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          />

          {/* For small screens, simplified stacked structure */}
          <div className="relative xl:hidden w-full h-[440px] md:h-auto  xl:h-full rounded-[12px] overflow-hidden bg-[#F6F6F6] mb-[20px]">
            <div className="absolute inset-0 rounded-[12px]  bg-[linear-gradient(163.29deg,rgba(66,186,220,0)_53.09%,#00C7FF_109.87%)] opacity-60 z-10 pointer-events-none" />
            <Image
              src={t.image}
              alt={t.imageAlt}
              height={540}
              width={616}
              className="object-contain xl:object-cover w-fit xl:w-[547px] h-[540px] z-0 rounded-[12px]  absolute right-0 md:relative"
            />
            {/* Info Box (mobile version) */}
            <div
              className="absolute right-[5%] md:right-4 bottom-4 z-20 md:min-h-[250px]  md:bottom-6 w-[90%] md:w-[60%] lg:w-[70%] xl:w-[60%] rounded-[12px] p-[15px] 
                       shadow-[0px_4px_66px_0px_rgba(0,0,0,0.16)] flex flex-col justify-center
                       bg-gradient-to-r from-[#F5EBFF] to-[#C9F3FF]"
            >
              <p className="text-md md:text-xl leading-[1.2] font-light text-black mb-[6px]">
                {t.name}
              </p>
              <p className="text-sm xl:text-base leading-[1.31] font-light text-[#666666]">
                {(() => {
                  const words = t.designation.trim().split(" ");
                  if (words.length <= 1) return t.designation;
                  const lastWord = words.pop();
                  const firstPart = words.join(" ");
                  return (
                    <>
                      {firstPart}
                      <br />
                      {lastWord}
                    </>
                  );
                })()}
              </p>
            </div>
          </div>

          <div className="text-colorpara font-light text-sm leading-[1.526] space-y-3 2xl:space-y-7 mt-7 lg:mt-0">
            {t.firstDescription.split("\n").map(
              (line, idx) =>
                line.trim() && (
                  <div key={idx} className="whitespace-pre-line ">
                    <SplitText
                      tag="span"
                      text={line}
                      className=""
                      delay={100}
                      duration={1}
                      ease="power3.out"
                      splitType="lines"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-10px"
                      textAlign="left"
                    />
                  </div>
                )
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-ful max-w-[616px] xl:h-[906px] xl:w-[616px] bg-white">
          {/* Grey Div (desktop only) */}
          <div className="hidden xl:block absolute right-0 bottom-0 left-[44px] h-[813px] xl:w-[567px] rounded-[12px] bg-[#F6F6F6] overflow-hidden">
            <div className="absolute inset-0 rounded-[12px] z-20 bg-[linear-gradient(164.5deg,rgba(126,90,163,0)_52%,rgba(126,90,163,0.85)_105.08%)] opacity-60 pointer-events-none" />
          </div>

          {/* Original desktop design — unchanged */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="hidden xl:block absolute right-0 left-[44px] z-10 bottom-0 h-full xl:w-[567px] rounded-[12px] overflow-hidden"
          >
            <Image
              src={t.image}
              alt={t.imageAlt}
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={moveRight(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="hidden xl:block absolute z-30 left-0 bottom-[58px] rounded-[12px] py-[25px] px-[27px] 
            xl:w-[445px] md:w-[300px] shadow-[0px_4px_66px_0px_rgba(0,0,0,0.16)]"
            style={{
              background: "linear-gradient(90deg, #F5EBFF 0%, #C9F3FF 100%)",
            }}
          >
            <p className="text-xl leading-[1.2] font-light text-black mb-[6px]">
              {t.name}
            </p>
            <p className="text-sm leading-[1.31] font-light text-[#666666]">
              {(() => {
                const words = t.designation.trim().split(" ");
                if (words.length <= 1) return t.designation;
                const lastWord = words.pop();
                const firstPart = words.join(" ");
                return (
                  <>
                    {firstPart}
                    <br />
                    {lastWord}
                  </>
                );
              })()}
            </p>
          </motion.div>
        </div>
      </div>
      <div className="container mt-0 xl:mt-[50px] text-colorpara font-light text-sm leading-[1.526] space-y-3 xl:space-y-7">
        {t.secondDescription.split("\n").map(
          (line, idx) =>
            line.trim() && (
              <div key={idx} className="whitespace-pre-line">
                <SplitText
                  tag="span"
                  text={line}
                  className=""
                  delay={100}
                  duration={1}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-10px"
                  textAlign="left"
                />
              </div>
            )
        )}
      </div>
    </section>
  );
}
