"use client";

import Image from "next/image";

interface FounderMessageProps {
  title: string;
  photo: string;
  name: string;
  designation: string;
  description: string;
}

export default function FounderMessage({
  data,
}: {
  data: FounderMessageProps;
}) {
  const { title, description, photo, name, designation } = data;

  return (
    <section className="pb-12 md:pb-20 xl:pb-[135px] pt-10 xl:pt-0">
      <div className="container mx-auto flex flex-col md:flex-row  md:items-center justify-between gap-5 xl:gap-[91px]">
        {/* Left Column */}
        <div className="w-full xl:max-w-[55%] order-2 xl:order-1">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.1111] font-light text-black mb-3 xl:mb-[30px] 2xl:mb-[50px]">
            {" "}
            {title.split("\n").map((line, idx) => (
              <span key={idx} className="xl:flex">
                {" "}
                {line}{" "}
              </span>
            ))}{" "}
          </h2>

          <div className="text-colorpara font-light text-sm leading-[1.526] space-y-2 xl:space-y-6">
            {description.split("\n").map(
              (line, idx) =>
                line.trim() && (
                  <p key={idx} className="whitespace-pre-line">
                    {line}
                  </p>
                )
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-full md:w-fit xl:max-w-[616px] xl:h-[948px] xl:w-[616px] bg-white order-1 xl:order-2">
          {/* Grey Div (desktop only) */}
          <div className="hidden xl:block absolute right-0 bottom-0 left-[44px] h-[813px] xl:w-[567px] rounded-[12px] bg-[#F6F6F6] overflow-hidden">
            <div className="absolute inset-0 rounded-[12px] z-20 bg-[linear-gradient(163.29deg,rgba(66,186,220,0)_53.09%,#00C7FF_109.87%)] opacity-60 pointer-events-none" />
          </div>

          {/* For small screens, simplified stacked structure */}
          <div className="relative xl:hidden w-full h-[340px] md:h-auto  xl:h-full rounded-[12px] overflow-hidden bg-[#F6F6F6]">
            <div className="absolute inset-0 rounded-[12px] bg-[linear-gradient(163.29deg,rgba(66,186,220,0)_53.09%,#00C7FF_109.87%)] opacity-60 z-10 pointer-events-none" />
            <Image src={photo} alt={name} height={540} width={616} className="object-contain xl:object-cover w-full h-[540px] z-0 rounded-[12px]" />
            {/* Info Box (mobile version) */}
            <div className="absolute z-20 bottom-6 w-full lg:w-[70%] xl:w-[60%] rounded-[12px] p-[18px] 
              shadow-[0px_4px_66px_0px_rgba(0,0,0,0.16)] 
              bg-gradient-to-r from-[#F5EBFF] to-[#C9F3FF]"
            >
              <p className="text-md xl:text-xl leading-[1.2] font-light text-black mb-[6px]">
                {name}
              </p>
              <p className="text-sm xl:text-base leading-[1.31] font-light text-[#666666]">
                {(() => {
                  const words = designation.trim().split(" ");
                  if (words.length <= 1) return designation;
                  const lastWord = words.pop();
                  const firstPart = words.join(" ");
                  return (
                    <>
                      {firstPart}
                      <br />
                      {lastWord}
                    </>
                  );
                })()}
              </p>
            </div>
          </div>

          {/* Original desktop design — unchanged */}
          <div className="hidden xl:block absolute right-0 left-[44px] z-10 bottom-0 h-full w-full xl:w-[567px] rounded-[12px] overflow-hidden">
            <Image src={photo} alt={name} fill className="object-cover w-full" />
          </div>

          <div  className="hidden xl:block absolute z-30 left-0 bottom-[58px] rounded-[12px] py-[25px] px-[27px] 
            xl:w-[445px] md:w-[300px] shadow-[0px_4px_66px_0px_rgba(0,0,0,0.16)]"
            style={{
              background: "linear-gradient(90deg, #F5EBFF 0%, #C9F3FF 100%)",
            }}
          >
            <p className="text-xl leading-[1.2] font-light text-black mb-[6px]">
              {name}
            </p>
            <p className="text-sm leading-[1.31] font-light text-[#666666]">
              {(() => {
                const words = designation.trim().split(" ");
                if (words.length <= 1) return designation;
                const lastWord = words.pop();
                const firstPart = words.join(" ");
                return (
                  <>
                    {firstPart}
                    <br />
                    {lastWord}
                  </>
                );
              })()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
