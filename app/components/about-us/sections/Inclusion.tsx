"use client";

import Image from "next/image";

interface InclusionData {
  bgImage: string;
  title: string;
  description: string;
}

interface InclusionSectionProps {
  data: InclusionData;
}

const InclusionSection: React.FC<InclusionSectionProps> = ({ data }) => {
  return (
    <section className="py-12 md:py-20 2xl:py-[135px]">
      <div className="relative h-[638px] rounded-[12px] overflow-hidden">
        {/* Background Image inside container */}
        <Image
          src={data.bgImage}
          alt={data.title}
          fill
          className="object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div
          style={{
            background:
              "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #066B7F 100%)",
          }}
          className="absolute left-0 w-[90%] h-full"
        ></div>

        {/* Content pinned bottom-left */}
        <div className="absolute bottom-0 left-0 z-10 p-6 xl:p-[60px]">
          <h2 className="text-3xl 2xl:text-4xl font-light mb-4 leading-[1.111111] text-white">
            {data.title}
          </h2>
          <p className="text-sm font-light leading-[1.52] text-white w-[91ch]">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InclusionSection;
