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
            <h2 className="text-2xl 2xl:text-4xl max-w-[10ch] font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12">
              {criteriaData.title}
            </h2> 
              <p className=" text-sm leading-[1.526315789473684] mb-4 lg:mb-7 last:lg:mb-13 font-light  text-colorpara">{criteriaData.description}</p>
         
          
          </div>
          

         
        </div>
      </div>
    </section>
  );
};

export default SelectionCriteria;
