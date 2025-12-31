"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { moveUp } from "../../motionVarients";
import Link from "next/link";
import { NewsItem } from "../type";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

interface PopularNewsProps {
  data: NewsItem[];
  selectedCategory: string;
}

const PopularNews = ({ data, selectedCategory }: PopularNewsProps) => {
  const filteredPopularnews = data.filter(
    (item) => item.category === selectedCategory && item.popularNews === "true"
  );
  const isArabic = useIsPreferredLanguageArabic()
  return (
    <>
      {filteredPopularnews.length > 0 ? (
        <div className="finsd">
          {filteredPopularnews.slice(0, 3).map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              key={index}
              className="chklast"
            >
              <Link href={`/news-&-media/press-release/${item.slug}`}>
                <div className="flex gap-5 group">
                  <div className="w-[130px] md:w-[171px] ">
                    <div className="relative h-full rounded-lg overflow-hidden">
                      <Image
                        src={item.coverImage}
                        alt={item.coverImageAlt}
                        width={486}
                        height={301}
                        className=" img-fluid object-cover w-full h-full max-h-[171px] group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      />
                      <div className="absolute inset-0 rounded-lg bg-[linear-gradient(180.12deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.75)_99.9%)] "></div>
                    </div>
                  </div>
                  <div className="w-[calc(100%-130px)] md:w-[calc(100%-171px)]">
                    <div className="flex justify-between text-sm text-colorpara">
                      <p>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>{item.category}</p>
                    </div>
                    <div className="mt-4">
                      <p className="max-w-[11ch] text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] lettersp-1 overflow-hidden text-ellipsis line-clamp-2 display[-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {item.title}
                      </p>
                    </div>
                    <div
                      className="mt-4 p-1 flex items-center justify-center bg-primary w-[27px] h-[27px] rounded-full transition-transform
                              group-hover:translate-x-1    duration-300  rotate-45"
                    >
                      <Image
                        src="/assets/arrow.svg"
                        alt="arrow"
                        width={11}
                        height={11}
                      />
                    </div>
                  </div>
                </div>
                <div className="py-3 lg:py-7 linediv">
                  <div className="bg-[#D3D3D3] h-[1px] w-full"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[14px] font-light text-colorpara">
            {isArabic ? "لا توجد أخبار شائعة للفئة المحددة." : "No popular news found for the selected category."}
        </p>
      )}
    </>
  );
};

export default PopularNews;
