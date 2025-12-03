"use client";

import Newslist from "./Newslist";
import PopularNews from "./PopularNews";
// import UpcomingEvents from "./UpcomingEvents";
import { useState } from "react";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { Category } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

interface RecentNewsProps {
  categories: Category[];
}

const RecentNews = ({ categories }: RecentNewsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const t = useApplyLang(categories)
  const isArabic = useIsPreferredLanguageArabic()

  // Get currently selected category name
  const selectedCategory = t[activeIndex];

  const sortedNews = Array.isArray(selectedCategory.news)
    ? [...selectedCategory.news]
        // first, filter to only non-popular news
        .filter((item) => item.popularNews === "false")
        // then sort by date (newest first)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px]">
      <div className="container">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between w-full md:items-center pb-4 md:pb-6 xl:pb-8 2xl:pb-12 mb-4 md:mb-6 xl:mb-8 2xl:mb-16 border-b border-bdrcolor gap-5 lg:gap-0">
          <SplitText
            tag="h2"
            text={!isArabic ? "Recent News" : "الأخبار الأخيرة"}
            className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[10ch] font-light leading-[1.111111111] text-black capitalize"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          ></SplitText>

          {/* Category Tabs */}
          <div className="flex gap-3 items-center">
            {t.map((cat, index) => (
              <motion.div
                variants={moveUp(index * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.1, once: true }}
                key={cat._id}
                className={`p-[1px] group transition-colors duration-300 rounded-full hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] 
                ${
                  index === activeIndex
                    ? "bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)]"
                    : "bg-bdrcolor"
                } `}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`cursor-pointer px-2 md:px-3 xl:px-5 py-2 md:py-3 xl:py-3 rounded-full group-hover:bg-[#C9F3FF] group-hover:text-black transition-colors duration-300    
                 ${
                   index === activeIndex
                     ? "bg-[#C9F3FF] text-black"
                     : "bg-white text-[#666666]"
                 }`}
                >
                  <p className="smtext10 text-xs font-light uppercase">
                    {cat.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* News + Sidebar layout */}
        <div className="lg:flex gap-12">
          <div className="lg:w-3/5">
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="pb-4 md:pb-6 xl:pb-8 2xl:pb-12 text-colorpara text-sm font-light"
            >
              <p>
                Stay informed with the latest updates, achievements, and events
                from BEAM Education. Explore our news stories to see how our
                schools are shaping futures.
              </p>
            </motion.div>

            {/* ✅ Pass selectedCategory to Newslist */}
            <Newslist
              data={sortedNews}
              selectedCategory={selectedCategory.name}
              reset={true}
            />
          </div>
          <div className="lg:w-2/5">
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="p-4 md:p-6 xl:p-10 bg-[#F6F6F6] rounded-xl mb-5 md:mb-7 mt-25 lg:mt-0"
            >
              <p className="text-sm font-light text-colorpara mb-5">
                {isArabic ? "أخبار شعبية" : "Popular News"}
              </p>
              <PopularNews
                data={
                  Array.isArray(selectedCategory.news)
                    ? selectedCategory.news
                    : []
                }
                selectedCategory={selectedCategory.name}
              />
            </motion.div>

            {/* <div className="p-4 md:p-6 xl:p-10 bg-[#F6F6F6] rounded-xl">
              <p className="text-sm font-light text-colorpara mb-5">
                Up coming Events
              </p>
              <UpcomingEvents
                data={RecentNewsData}
                selectedCategory={selectedCategory}
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
