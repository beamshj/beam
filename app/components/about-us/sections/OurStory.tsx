"use client";

import Image from "next/image";

interface OurStoryData {
  title: string;
  imageTitle: string;
  highlight: string;
  description: string;
  imageUrl: string;
}

interface OurStorySectionProps {
  data: OurStoryData;
}

const OurStorySection: React.FC<OurStorySectionProps> = ({ data }) => {
  return (
    <section className="pt-12 md:pt-20 2xl:pt-[135px]">
      <div className="container">
        <div className="mb-[50px] md:mb-[60px] xl:mb-[70px]">
          <h1 className="text-4xl font-light leading-[1.111111111] text-black">
            {data.title}
          </h1>
        </div>
        {/* Title + Image */}
        <div className="relative rounded-[12px] overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="Our Story Background"
            width={1200}
            height={500}
            className="w-full h-[300px] md:h-[400px] lg:h-[455px] xl:h-[500px] 2xl:h-[605px] object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-black to-transparent"></div>

          <h2 className="absolute left-[20px] bottom-[20px] right-[20px] lg:right-0  xl:left-[50px] xl:bottom-[40px] 2xl:left-[60px] 2xl:bottom-[50px] text-white text-xl xl:text-3xl 2xl:text-4xl font-light leading-[1.111111111]">
            {data.imageTitle}{" "}
            <span className="text-primary">{data.highlight}</span>
          </h2>
        </div>

        {/* Description */}
        <div className="mt-[30px] xl:mt-[40px] 2xl:mt-[50px] text-sm text-foreground font-light leading-[1.526315789473684]">
          {data.description.split("\n\n").map((para, idx) => (
            <p key={idx}>
              {" "}
              {/* paragraph spacing */}
              {para.split("\n").map((line, i) => (
                <span key={i} className="block mb-[14px] xl:mb-6 last:mb-0">
                  {" "}
                  {/* line spacing */}
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
