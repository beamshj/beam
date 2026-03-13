"use client";
import { ChevronsRight } from "lucide-react";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { StudentsAchievementsProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

interface MainProps {
  data: StudentsAchievementsProps["firstSection"];
}

const Main = ({ data }: MainProps) => {
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic();
  return (
    <section className="pt-13 pb-5 xl:py-20 2xl:py-[135px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch gap-x-6 gap-y-6 md:gap-y-0 md:gap-x-10 xl:gap-x-18">
          <div className="flex flex-col">
            <motion.p
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-colorpara text-sm leading-[1.526315789473684] mb-[30px]"
            >
              {t.intro}
            </motion.p>
            <motion.h3
              variants={moveUp(0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-md font-seimibold mb-4 xl:mb-6"
            >
              {t.secondIntro}
            </motion.h3>
            <div
              className={`students-achievemnets-content-html text-colorpara ${isArabic ? "pr-[1.25rem]" : "pl-[1.25rem]"}`}
              dangerouslySetInnerHTML={{ __html: t.content }}
            />

            {/* <ul className="list-disc space-y-2 list-inside ">
              {t.subData.list.map((item, index) => (
                <motion.li variants={moveUp(0.6 + index * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={index}
                  className="text-colorpara group text-colorpara font-normal ">{item}
                </motion.li>
              ))}
            </ul> */}
          </div>
          <div className="relative overflow-hidden rounded-xl md:h-full min-h-[300px]">
            <Image
              src={t.image}
              alt={t.imageAlt}
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
};

export default Main;
