"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { moveUp } from "../../motionVarients";
import Pagination from "../../Common/Pagination";
import { useState, useEffect } from "react";
import Link from "next/link";

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
}

const Newslist = ({ data }: { data: RecentNewsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 3;

  useEffect(() => {
    setTotalPages(Math.ceil(data.recentnews.length / itemsPerPage));
  }, [data.recentnews.length]);

  // get the items for the current page
  const currentNews = data.recentnews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {currentNews.map((item, index) => ( 
            <motion.div
          variants={moveUp(index * 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: true }}
          key={index}
          className="mb-[25px] xl:mb-[50px] last:mb-0 group overflow-hidden
  bg-white hover:bg-[linear-gradient(180deg,#FFFFFF_0%,#E2F5FF_100%)] 
  transition-all duration-500 ease-in-out"
        >
          <Link href={`/news-&-media/news`}>
        
          <div className="relative ">
            <div className=" rounded-t-lg overflow-hidden">
              <Image
              src={item.image}
              alt=""
              width={486}
              height={301}
              className="  img-fluid object-cover w-full h-[210px] lg:h-[353px] group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180.12deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.75)_99.9%)] "></div>
          </div>
          <div className="p-5 md:p-6 xl:p-10 border-1 border-[#D3D3D3]  rounded-b-lg ">
            <div className="flex justify-between text-sm text-colorpara">
              <p>{item.date}</p>
              <p>{item.category}</p>
            </div>
            <div className="mt-4">
              <p className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] lettersp-1 overflow-hidden text-ellipsis line-clamp-2 display[-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                {item.description}
              </p>
            </div>
            <div className=" group-hover:translate-x-1 mt-4 p-1 flex items-center justify-center bg-primary w-[27px] h-[27px] rounded-full transition-transform duration-300  rotate-45">
              <Image
                src="/assets/arrow.svg"
                alt="arrow"
                width={11}
                height={11}
              />
            </div>
          </div>
          </Link> 
        </motion.div>
      ))}
      {/* Pagination */}
      <div className="absolute w-full left-0 removeMtmain">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Newslist;
