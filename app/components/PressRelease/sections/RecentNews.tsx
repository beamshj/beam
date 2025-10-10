"use client";
  
import Newslist from "./Newslist"
import PopularNews from "./PopularNews"
import UpcomingEvents from "./UpcomingEvents"
import { useState } from "react";
 

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
  upcomingData: {
    image: string;
    date: string;
    day:number,
    category: string;
    description: string;
  }[];
}

const RecentNews = ({
  RecentNewsData,
}: {
  RecentNewsData: RecentNewsData;
}) => { 
  
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px]">
      <div className="container">
       
          <div className="flex flex-col md:flex-row justify-between w-full md:items-center pb-4 md:pb-6 xl:pb-8 2xl:pb-12 mb-4 md:mb-6 xl:mb-8 2xl:mb-16 border-b border-bdrcolor gap-5 lg:gap-0">
            <h2 className="text-lg xl:text-2xl 2xl:text-4xl 2xl:max-w-[10ch] font-light leading-[1.111111111] text-black ">
              {RecentNewsData.title}
            </h2>
           
            <div className="flex gap-3 items-center">
            {RecentNewsData.category.map((item, index) => (
                <div key={index} className={`p-[1px] group transition-all duration-300    group  rounded-full hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)]
                ${index === activeIndex ? "bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)]" : "bg-bdrcolor"} `}
                onClick={() => setActiveIndex(index)}>
                  <div className={`cursor-pointer  px-2 md:px-3 xl:px-5 py-2 md:py-3 xl:py-3    rounded-full group-hover:bg-[#C9F3FF] group-hover:text-black
                 ${index === activeIndex ? "bg-[#C9F3FF] text-black" : "bg-white text-[#666666] "}`}   >
                    <p className="  smtext10 text-xs font-light  uppercase ">
                      {item}
                    </p>
                  </div>
                </div>

            ))}
                 
                 
              </div>
          
          </div> 

          <div className="lg:flex gap-12">
              <div className="lg:w-3/5">
                 <div className="pb-4 md:pb-6 xl:pb-8 2xl:pb-12 text-colorpara text-sm font-light"> <p>{RecentNewsData.description}</p></div>
                  <Newslist data={RecentNewsData}/>
                      
              </div>
              <div className="lg:w-2/5">
                  <div className="p-4 md:p-6 xl:p-10 bg-[#F6F6F6] rounded-xl mb-5 md:mb-7 mt-5 lg:mt-0">
                    <p className="text-sm font-light text-colorpara mb-5">Popular News</p>
                  <PopularNews data={RecentNewsData}/>
                  </div>
                  
                  <div className="p-4 md:p-6 xl:p-10 bg-[#F6F6F6] rounded-xl">
                    <p className="text-sm font-light text-colorpara mb-5">Up coming Events</p>
                  <UpcomingEvents data={RecentNewsData}/>
                  </div>
              </div>
            
          </div> 
      </div>
    </section>
  );
};

export default RecentNews;
