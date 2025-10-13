"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { moveUp } from "../../motionVarients";



export interface RecentNewsData {
  title: string;
  category: string[];
  description: string;
  recentnews: {
    image: string;
    date: string;
    category: string;
    description: string;
  }[];
  popularnews: {
    image: string;
    date: string;
    category: string;
    description: string;
  }[];
}

const PopularNews = ({
  data,
}: {
  data: RecentNewsData;
}) => {
  return (
    <div className="finsd">
      {data.popularnews.map((item, index) => (
        <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{amount: 0.1, once: true}} key={index} className="chklast">
          <div className="flex gap-5">
            <div className="w-[130px] md:w-[171px]">
              <div className="relative h-full">
                <Image src={item.image} alt="" width={486} height={301} className="rounded-lg img-fluid object-cover w-full h-full max-h-[171px]" />
                <div className="absolute inset-0 rounded-lg bg-[linear-gradient(180.12deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.75)_99.9%)] "></div>
              </div>
            </div>
            <div className="w-[calc(100%-130px)] md:w-[calc(100%-171px)]">
              <div className="flex justify-between text-sm text-colorpara">
                <p>{item.date}</p>
                <p>{item.category}</p>
              </div>
              <div className="mt-4">
                <p className="max-w-[11ch] text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] lettersp-1 overflow-hidden text-ellipsis line-clamp-2 display[-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">{item.description}</p>
              </div>
              <div className="mt-4 p-1 flex items-center justify-center bg-primary w-[27px] h-[27px] rounded-full transition-transform
                                 duration-300  rotate-45">
                <Image src="/assets/arrow.svg" alt="arrow" width={11} height={11} />
              </div>
            </div>
          </div>
          <div className="py-3 lg:py-7 linediv"><div className="bg-[#D3D3D3] h-[1px] w-full"></div></div>
        </motion.div>
      ))}
    </div>
  );
};

export default PopularNews;
