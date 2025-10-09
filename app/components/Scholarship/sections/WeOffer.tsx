"use client";
  

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
              <p key={item} className=" text-sm leading-[1.526315789473684] mb-4 lg:mb-7 last:lg:mb-13 font-light  text-colorpara">{item}</p>
            ))} 
          
          </div>
          <div className="mt-8 lg:mt-0" >
          <div className="relative grid grid-cols-1 md:grid-cols-5 justify-between  gap-8 md:gap-10">
             
              {offerData.items.map((item ,index) => ( 
              <div className={`relative z-10 flex gap-4 md:gap-0 flex-row md:flex-col items-center aftercontent${index + 1}`} key={index}>
                <div className="w-14 h-14 lg:w-18 lg:h-18 flex items-center justify-center rounded-full bg-sky-200 border border-sky-400 text-xl font-semibold">
                  <p className=" text-sm font-light leading-[1.526315789473684] mb-0">{index + 1}</p>
                </div>
                <div className="md:mt-5 lg:mt-8 2xl:mt-17"><p className="text-md  lg:text-md text-center font-light leading-[1.526315789473684] mb-0">{item.title}</p></div>
              </div>
              ))} 
          </div>
          </div> 

         
        </div>
      </div>
    </section>
  );
};

export default WeOffer;
