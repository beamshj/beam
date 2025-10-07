"use client";
 
import Image from "next/image";
import { motion } from "framer-motion"; 

export interface VMItem {
  title: string; 
}

export interface offerData {
  title: string;
  description: string[];
  items: VMItem[];
}

const WeOffer = ({
  offerData,
}: {
  offerData: offerData;
}) => { 
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px] bg-secondary">
      <div className="container">
        <div> 
          <div>
            <h2 className="text-2xl 2xl:text-4xl max-w-[10ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12">
              {offerData.title}
            </h2>
            {offerData.description.map((item) => (
              <p key={item} className=" text-sm leading-[1.526315789473684] mb-[30px] font-light  text-colorpara">{item}</p>
            ))} 
          
          </div>
          <div>
            <ul>
              {offerData.items.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          </div>
          <section className="flex flex-col items-center justify-center py-16 px-4 bg-white">
            <div className="relative flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
              
              <div className="relative z-10 flex flex-col items-center aftercontent">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-200 border border-sky-400 text-xl font-semibold">
                  1
                </div>
                <div><p>Head of Department</p></div>
              </div>
          
               

              <div className="relative z-10 flex flex-col items-center aftercontent2">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-200 border border-sky-400 text-xl font-semibold">
                  2
                </div>
                <div><p>Head of Department</p></div>
              </div>

              
              <div className="relative z-10 flex flex-col items-center aftercontent">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-200 border border-sky-400 text-xl font-semibold">
                  3
                </div>
                <div><p>Head of Department</p></div>
              </div>

               
              <div className="relative z-10 flex flex-col items-center aftercontent2">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-200 border border-sky-400 text-xl font-semibold">
                  4
                </div>
                <div><p>Head of Department</p></div>
              </div>

               
              <div className="relative z-10 flex flex-col items-center ">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-200 border border-sky-400 text-xl font-semibold">
                  5
                </div>
                <div><p>Head of Department</p></div>
              </div>

            </div>
          </section>

         
        </div>
      </div>
    </section>
  );
};

export default WeOffer;
