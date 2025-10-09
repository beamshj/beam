"use client";
  

import Image from "next/image";
export interface VMItem {
  title: string; 
  description: string; 
  icon: string; 
}

export interface criteriaData {
  title: string;
  description: string;
  secondtitle:string;
  seconddescription:string;
  items: VMItem[];
}

const SelectionCriteria = ({
  criteriaData,
}: {
  criteriaData: criteriaData;
}) => { 
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px] ">
      <div className="container">
        <div> 
          <div>
            <h2 className="text-2xl 2xl:text-4xl  font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-8">
              {criteriaData.title}
            </h2> 
              <p className=" text-sm leading-[1.526315789473684] max-w-[55ch] mb-6 lg:mb-7 last:lg:mb-13 font-light  text-colorpara">{criteriaData.description}</p>
         
          
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 mb-8 md:mb-0"> 
              {criteriaData.items.map((item,index)=>{
                return(
                  <div key={index} className="flex flex-col gap-3 md:gap-5 p-4 md:p-0 bg-secondary md:bg-transparent">
                  <Image src={item.icon} alt=" " width={52} height={52} />
                  <p className="text-xl font-light max-w-[11ch] leading-[1.2]">{item.title}</p> 
                  <hr />
                  <p className="text-colorpara font-light max-w-[27ch]">{item.description}</p>
                  </div>
                )
              })} 

          </div>
          <div>
            <h3 className="text-xl font-light leading-[1.111111111] text-black my-4 md:my-6 xl:mb-8 2xl:mb-8 xl:mt-8 2xl:mt-13">
              {criteriaData.secondtitle}
            </h3> 
              <p className=" text-sm leading-[1.526315789473684] max-w-[81ch] mb-0 font-light  text-colorpara">{criteriaData.seconddescription}</p>
          </div>
          

         
        </div>
      </div>
    </section>
  );
};

export default SelectionCriteria;
