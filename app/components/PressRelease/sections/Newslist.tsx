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
}

const Newslist = ({
  data,
}: {
  data: RecentNewsData;
}) => { 
  return (
     <div>
                      {data.recentnews.map((item, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                              <div className="relative">
                                <Image src={item.image} alt="" width={486} height={301} className="rounded-t-lg img-fluid object-cover w-full h-[353px]" />
                                <div className="absolute inset-0 bg-[linear-gradient(180.12deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.75)_99.9%)] "></div>
                                </div>
                              <div className="p-5 md:p-6 xl:p-10 border-1 border-[#D3D3D3]  rounded-b-lg">
                                <div className="flex justify-between text-sm text-colorpara">
                                  <p>{item.date}</p>
                                  <p>{item.category}</p>
                                </div>
                                <div className="mt-4">
                                <p className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] lettersp-1 overflow-hidden text-ellipsis line-clamp-2 display[-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">{item.description}</p>
                                </div>
                                <div className="mt-4 p-1 flex items-center justify-center bg-primary w-[27px] h-[27px] rounded-full transition-transform
                                 duration-300  rotate-45">
                                                  <Image src="/assets/arrow.svg" alt="arrow" width={11} height={11} />
                                                </div>
                              </div>
                            </div>
                            ))}
     </div>
  );
};

export default Newslist;
