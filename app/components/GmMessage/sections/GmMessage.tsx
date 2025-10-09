"use client";

import Image from "next/image";

interface GmMessageProps {
  title: string;
  photo: string;
  name: string;
  designation: string;
  intro: string;
  description: string;
}

export default function GmMessage({ data }: { data: GmMessageProps }) {
  const { title, intro, photo, name, designation, description } = data;

  return (
    <section className="pb-12 md:pb-20 xl:pb-[135px] pt-10 xl:pt-25">
      <div className="container mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-12 xl:gap-[91px]">
        {/* Left Column */}
        <div className="w-full xl:max-w-[54%]">
          <h2 className="text-lg md:text-xl xl:text-3xl 2xl:text-4xl leading-[1.1111] font-light text-black mb-3 xl:mb-[50px]">
            {" "}
            {title.split("\n").map((line, idx) => (
              <span key={idx} className="xl:flex">
                {" "}
                {line}{" "}
              </span>
            ))}{" "}
          </h2>

          <div className="text-colorpara font-light text-sm leading-[1.526] space-y-3 2xl:space-y-7">
            {intro.split("\n").map(
              (line, idx) =>
                line.trim() && (
                  <p key={idx} className="whitespace-pre-line ">
                    {line}
                  </p>
                )
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-ful max-w-[616px] xl:h-[906px] xl:w-[616px] bg-white">
          {/* Grey Div (desktop only) */}
          <div className="hidden xl:block absolute right-0 bottom-0 left-[44px] h-[813px] xl:w-[567px] rounded-[12px] bg-[#F6F6F6] overflow-hidden">
            <div className="absolute inset-0 rounded-[12px] z-20 bg-[linear-gradient(164.5deg,rgba(126,90,163,0)_52%,rgba(126,90,163,0.85)_105.08%)] opacity-60 pointer-events-none" />
          </div>

          {/* For small screens, simplified stacked structure */}
          <div className="relative xl:hidden w-full h-[300px] xl:h-full rounded-[12px] overflow-hidden bg-[#F6F6F6]">
            <div className="absolute inset-0 rounded-[12px] bg-[linear-gradient(163.29deg,rgba(66,186,220,0)_53.09%,#00C7FF_109.87%)] opacity-60 z-10 pointer-events-none" />
            <Image
              src={photo}
              alt={name}
              height={540}           
              width={616}
              className="object-contain xl:object-cover h-[300px] xl:h-[540px] z-0 rounded-[12px]"
            />

            {/* Info Box (mobile version) */}
            <div
              className="absolute z-20 bottom-6 w-[90%] sm:w-[70%] xl:w-[60%] rounded-[12px] p-[18px] 
              shadow-[0px_4px_66px_0px_rgba(0,0,0,0.16)] 
              bg-gradient-to-r from-[#F5EBFF] to-[#C9F3FF]"
            >
              <p className="text-lg sm:text-xl leading-[1.2] font-light text-black mb-[6px]">
                {name}
              </p>
              <p className="text-sm sm:text-base leading-[1.31] font-light text-[#666666]">
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
          <div className="hidden xl:block absolute right-0 left-[44px] z-10 bottom-0 h-full xl:w-[567px] rounded-[12px] overflow-hidden">
            <Image src={photo} alt={name} fill className="object-cover" />
          </div>

          <div
            className="hidden xl:block absolute z-30 left-0 bottom-[58px] rounded-[12px] py-[25px] px-[27px] 
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
      <div className="container mt-[50px] text-colorpara font-light text-sm leading-[1.526] space-y-3 xl:space-y-7">
        {description.split("\n").map(
          (line, idx) =>
            line.trim() && (
              <p key={idx} className="whitespace-pre-line">
                {line}
              </p>
            )
        )}
      </div>
    </section>
  );
}
