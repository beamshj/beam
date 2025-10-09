"use client";
 
import Image from "next/image"; 

 

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

const UpcomingEvents = ({
  data,
}: {
  data: RecentNewsData;
}) => { 
  return (
     <div>
                      {data.upcomingData.map((item, index) => (
                           <div key={index} className="">
                             <div className="flex gap-5">
                              <div className="w-[130px] md:w-[171px]">
                                <div className="relative h-full bg-[#C9F3FF] rounded-xl">
                                  <div className="bg-[#42BADC] rounded-t-xl text-sm py-4 font-light  text-white text-center">
                                     <p>{item.date}</p></div>
                                  <div className="flex items-center justify-center">
                                  <p className="text-xl text-black pt-5">{item.day}</p>
                                  </div>
                                  </div>
                              </div>
                              <div className="w-[calc(100%-130px)] md:w-[calc(100%-171px)]">
                                <div className="flex justify-between text-sm text-colorpara">
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
                              <div className="py-3 lg:py-5"><div className="bg-[#D3D3D3] h-[1px] w-full"></div></div>
                           </div>
                            ))}
     </div>
  );
};

export default UpcomingEvents;
