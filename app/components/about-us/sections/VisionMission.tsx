"use client";

import { useState } from "react";
import Image from "next/image";

export interface VisionMissionItem {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  image: string;
}

const VisionMissionSection = ({
  visionMissionItems,
}: {
  visionMissionItems: VisionMissionItem[];
}) => {
  const [active, setActive] = useState(visionMissionItems[0].id);

  const activeItem = visionMissionItems.find((item) => item.id === active);

  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Vision and Mission <br /> That Matter
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
            Our vision lights the path toward excellence, guided by faith and
            values. We are committed to nurturing a diverse community where
            students become lifelong learners and principled global citizens.
          </p>

          {/* Cards */}
          <div className="space-y-4">
            {visionMissionItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300
                  ${
                    active === item.id
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "hover:bg-gray-50"
                  }`}
                onMouseEnter={() => setActive(item.id)}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${item.iconBg}`}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-80 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          {activeItem && (
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              className="object-cover transition-all duration-500"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
