"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface VMItem {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  icon: string;
  image: string;
}

export interface VisionMissionData {
  mainTitle: string;
  mainDescription: string;
  VMItems: VMItem[];
}

const VisionMissionSection = ({
  visionMissionItems,
}: {
  visionMissionItems: VisionMissionData;
}) => {
  const [active, setActive] = useState(visionMissionItems.VMItems[0]?.id);

  const activeItem = visionMissionItems.VMItems.find(
    (item) => item.id === active
  );

  return (
    <section className="pt-[50px] xl:pt-[70px] 2xl:pt-[90px]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl 2xl:text-4xl font-light leading-[1.111111111] text-black mb-[30px] xl:mb-[40px] 2xl:mb-[50px]">
              {visionMissionItems.mainTitle}
            </h2>
            <p className="text-foreground text-sm leading-[1.526315789473684] mb-[30px]">
              {visionMissionItems.mainDescription}
            </p>
            {/* Cards */}
            <div className="space-y-[20px] xl:space-y-[25px] 2xl:space-y-[30px]">
              {visionMissionItems.VMItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 cursor-pointer"
                  onMouseEnter={() => setActive(item.id)}
                >
                  <div
                    className={`flex-shrink-0 w-[125px] h-[135px] flex items-center justify-center rounded-[12px] transition-colors duration-300 bg-[#F5EBFF] hover:bg-[#DDF7FF] group`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={70}
                      height={70}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-black leading-[1.2]">
                      {item.title}
                    </h3>
                    <p className="text-[#6D6E71] text-sm leading-[1.526315789473684]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Image */}
          {/* Right Image */}
          <div className="relative w-full h-[250px] md:h-auto rounded-[12px] overflow-hidden">
            {activeItem && (
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-cover transition-all duration-500"
              />
            )}
            <motion.div
              className="absolute bottom-0 w-full h-[60%] bg-gradient-to-b from-black/0 to-[#42BADCC9]/79"
              initial={{ y: "100%" }} // start completely below
              animate={{ y: "0%" }} // slide up into place
              transition={{ duration: 0.4, ease: "easeInOut" }}
              key={active}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
