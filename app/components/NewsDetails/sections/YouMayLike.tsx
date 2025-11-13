"use client";

import Image from "next/image"; 
// import Link from "next/link";
export interface VMItem { 
  date: string;
  category: string;
  description:string;
  image:string;
  // slug:string;
}

export interface rsData {
  title: string; 
  items: VMItem[];
}
 
  const YouMayLike = ({
    rsData,
  }: {
    rsData: rsData;
  }) => { 
  return (
    <section className="pb-8 md:pb-12 lg:pb-20 2xl:pb-[135px] ">
      <div className="container"> 
        <div >
          <h2 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-tight text-black lettersp-4">
          {rsData.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-4 md:pt-6 xl:pt-8 2xl:pt-12 gap-7">
        
       {rsData.items.map((item, index) => (
          <div key={index}>
            {/* <Link href={`/news-&-media/press-release/${item.slug}`}> */}
            <div className="relative">
              <Image src={item.image} alt="" width={486} height={301} className="rounded-t-lg img-fluid object-cover w-full h-full" />
              <div className="absolute inset-0 bg-[linear-gradient(180.12deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.75)_99.9%)] "></div>
              </div>
            <div className="p-5 md:p-6 xl:p-10 border-1 border-[#D3D3D3]  rounded-b-lg">
              <div className="flex justify-between text-sm text-colorpara font-light">
                <p>{item.date}</p>
                <p>{item.category}</p>
              </div>
              <div className="mt-3">
              <p className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] lettersp-1 overflow-hidden text-ellipsis line-clamp-2 display[-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">{item.description}</p>
              </div>
              <div className="mt-3 p-1 flex items-center justify-center bg-primary w-[27px] h-[27px] rounded-full transition-transform
               duration-300  rotate-45">
                                <Image src="/assets/arrow.svg" alt="arrow" width={11} height={11} />
                              </div>
            </div>
            {/* </Link> */}
          </div>
          ))}          

        </div>
        
         
      </div> 
    </section>
  );
};

export default YouMayLike;
