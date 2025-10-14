"use client";

import Image from "next/image";
import { useState } from "react";
import SplitText from "@/components/SplitText";
export interface VMItem {
  image: string;
  title: string;
  description: string;
  list: string[];
}

export interface academicsData {
  title: string;
  description: string;
  items: VMItem[];
}

const BeyondAcademics = ({
  academicsData,
}: {
  academicsData: academicsData;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <section className="pb-0 md:pb-12 lg:pb-20 2xl:pb-[135px] ">
      <div className="container ">
        <div>
          <div>
            <SplitText
              tag="h2"
              text={academicsData.title}
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
            <SplitText
              tag="p"
              text={academicsData.description}
              className="text-sm leading-[1.526315789473684] max-w-[70ch] mb-6 lg:mb-7 last:lg:mb-13 font-light  text-colorpara"
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
          <div className="flex flex-col md:flex-row gap-8 md:gap-7 mb-8 md:mb-0">
            {academicsData.items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className={` relative h-[549px] rounded-[12px] flex flex-col p-4 md:p-0 overflow-hidden transition-all ease-in-out duration-400  ${
                    isActive ? "w-full md:w-[50%]" : "w-full  md:w-[25%]"
                  } group `}
                  style={{
                    background: `url(${item.image}) center/cover no-repeat`,
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-transparent to-black" />

                  <div
                    className={`absolute top-0 left-0 w-full h-full rounded-[12px] transition-all duration-500  ${
                      isActive ? "bg-[#42BADC]/60" : ""
                    }`}
                  ></div>

                  <div
                    className={`absolute  transition-all duration-400 top-[20px] right-[20px] xl:top-[40px] xl:right-[40px] p-2 bg-primary rounded-full w-[75px] h-[75px] flex items-center justify-center   ${
                      isActive ? "bg-white" : ""
                    }  `}
                  >
                    <Image
                      src="/images/home/arrow-top.svg"
                      alt={"ad"}
                      width={24}
                      className={`brightness-0 invert  ${
                        isActive ? "invert-0 brightness-100" : ""
                      }`}
                      height={24}
                    />
                  </div>

                  {/* Content Wrapper */}
                  <div className="absolute inset-0 flex flex-col justify-end p-[20px] 2xl:p-[40px] z-10 transition-all duration-500">
                    {/* Title */}
                    <h3
                      className={`text-[23px]  lg:text-[26px] xl:text-lg 2xl:text-xl font-light text-white leading-[1.2] max-w-[12ch]
            transition-all duration-500 ease-in-out transform ${
              isActive ? "-translate-y-[20px]" : ""
            } `}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <div
                      className={`transition-all duration-600 ease-in-out overflow-hidden`}
                      style={{
                        maxHeight: isActive ? 200 : 0, // animate between 0 and 500px
                        opacity: isActive ? 1 : 0, // optional fade effect
                      }}
                    >
                      <div>
                        <p className="text-[#E0E0E0] leading-[1.526315789473684] font-light max-w-[30ch]">
                          {item.description}
                        </p>
                        <ul className="mt-[20px] space-y-1 ml-5 list-disc">
                          {item.list.map((listItem, i) => (
                            <li key={i} className="text-[#E0E0E0] font-light">
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pt-0 md:pt-12 lg:pt-20 2xl:pt-[135px]">
          <hr />
        </div>
      </div>
    </section>
  );
};

export default BeyondAcademics;
