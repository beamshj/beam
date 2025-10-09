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
  image:string;
  btnname:string;
  btnemail:string;
   
}

const OurLegacy = ({
  criteriaData,
}: {
  criteriaData: criteriaData;
}) => { 
  return (
    <section className="py-8 md:py-12 lg:py-20 2xl:py-[135px] relative " style={{backgroundImage: `url(${criteriaData.image})`, backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="absolute top-0 left-0 w-full h-full " style={{background: "linear-gradient(90.62deg, rgba(0, 0, 0, 0.86) 4.04%, rgba(0, 0, 0, 0) 93.9%)"}}></div>
      <div className="container relative z-10">
        <div> 
          <div>
            <h2 className="text-2xl 2xl:text-4xl  font-light leading-[1.111111111] text-white mb-4 md:mb-6 xl:mb-8 2xl:mb-13">
              {criteriaData.title}
            </h2> 
              <p className=" text-md  lg:text-lg leading-[1.526315789473684] max-w-[55ch] mb-4 lg:mb-7   font-light  text-white">{criteriaData.description}</p>
         
          
          </div>
          <div className="md:flex gap-5 "> 
            <div className=" mb-5 md:mb-0 w-fit p-[1px] group transition-all duration-300 border-[1px] border-primary rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]">
            <a href={`#`}>
              <div className="cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-transparent rounded-full flex items-center md:gap-2 transition-all duration-300">
                <div className="p-2 flex items-center justify-center w-fit  ">
                  <Image
                    src="/images/scholarship/user.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-xs font-light text-white  transition-colors duration-300">
                  {criteriaData.btnname}
                </p> 
              </div>
            </a>
            </div>
            <div className="w-fit p-[1px] group transition-all duration-300 border-[1px] border-primary rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]">
              <a href={`mailto:${criteriaData.btnemail}`}>
                <div className="cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-transparent rounded-full flex items-center md:gap-2 transition-all duration-300">
                  <div className="p-2 flex items-center justify-center w-fit ">
                    <Image
                      src="/images/scholarship/mail.svg"
                      alt="arrow"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-xs font-light text-white  transition-colors duration-300">
                    {criteriaData.btnemail}
                  </p> 
                </div>
              </a>
            </div>
          </div> 
         
        </div>
      </div>
    </section>
  );
};

export default OurLegacy;
