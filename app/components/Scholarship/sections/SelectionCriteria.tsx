"use client";

import SplitText from "@/components/SplitText";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../motionVarients";
import { ScholarshipProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";


const SelectionCriteria = ({
  data
}: {
  data: ScholarshipProps['thirdSection'];
}) => {
  const t = useApplyLang(data);
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px] ">
      <div className="container">
        <div>
          <div>
            <SplitText
              tag="h2"
              text={t.mainTitle}
              className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl  font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-8"
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
            <div>
              <SplitText
                tag="p"
                text={t.firstDescription}
                className=" text-sm leading-[1.526315789473684] max-w-[55ch] mb-6 lg:mb-7 last:lg:mb-[50px] font-light  text-colorpara"
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
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 mb-8 md:mb-0">
            {t.items.map((item, index) => {
              return (
                <motion.div variants={fadeIn(index*0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} key={index} className="flex flex-col gap-3 md:gap-5 p-4 md:p-0 bg-secondary md:bg-transparent">
                  <Image src={item.image} alt={item.imageAlt } width={53} height={54} className="w-fit h-10 xl:h-[54px]" />
                  <h3 className="text-md lg:text-xl xl:text-2xl 2xl:text-xl font-light xl:max-w-[11ch] leading-[1.2]">{item.title}</h3>
                  <hr />
                  <p className="text-colorpara font-light xl:max-w-[26ch] text-sm">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
          <div>
            <SplitText
              tag="h2"
              text={t.subTitle}
              className="text-md xl:text-lg 2xl:text-xl font-light leading-[1.111111111] text-black my-4 md:my-6 xl:mb-[25px] xl:mt-8 2xl:mt-[50px]"
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
            {/* <p className=" text-sm leading-[1.526315789473684] max-w-[81ch] mb-0 font-light  text-colorpara">{criteriaData.seconddescription}</p> */}
            <div>
              <SplitText
                tag="p"
                text={t.secondDescription}
                className=" text-sm leading-[1.526315789473684] max-w-[81ch] mb-0 font-light  text-colorpara"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectionCriteria;
