"use client";

import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { fadeIn, moveUp } from "../../motionVarients";
import { ScholarshipProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

const WeOffer = ({ data }: { data: ScholarshipProps["secondSection"] }) => {
  const t = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic();
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px] bg-secondary">
      <div className="container">
        <div>
          <div>
            <SplitText
              tag="h2"
              text={t.title}
              className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-[10ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign={isArabic ? "right" : "left"}
            />
            {(t.description.split("\n")).map((item, index) => (
              <motion.p
                variants={moveUp(index * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                key={item}
                className=" text-sm leading-[1.526315789473684] mb-4 lg:mb-7 last:lg:mb-13 font-light  text-colorpara"
              >
                {item}
              </motion.p>
            ))}
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="relative grid grid-cols-1 md:grid-cols-5 justify-between gap-6 md:gap-10 2xl:gap-0">
              {/* Vertical dotted line on mobile */}
              <motion.div
                className={`absolute top-0 ${isArabic ? "right" : "left"}-[1.25rem] border-l-2 border-dotted border-primary md:hidden`}
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              ></motion.div>

              {t.items.map((item, index) => (
                <motion.div
                  variants={fadeIn(index * 0.5)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className={`relative z-10 flex gap-4 md:gap-0 flex-row md:flex-col items-center aftercontent${
                    isArabic ? index + 1 + "_ar" : index + 1
                  }`}
                  key={index}
                >
                  <div className="w-10 h-10 min-w-max lg:w-18 lg:h-18 flex items-center justify-center rounded-full bg-sky-200 border border-sky-400 text-xl font-semibold">
                    <p className="text-sm font-light leading-[1.526315789473684] mb-0">
                      {isArabic ? (index + 1).toLocaleString("ar-EG") : (index + 1)}
                    </p>
                  </div>
                  <div className="md:mt-5 lg:mt-7 2xl:mt-[45px]">
                    <p className="text-sm lg:text-md 2xl:text-xl md:text-center font-light leading-[1.1] mb-0 xl:tracking-[-1px] 2xl:tracking-[-2px]">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeOffer;
