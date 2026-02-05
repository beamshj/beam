"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { useApplyLang } from "@/lib/applyLang";
import { useState } from "react";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { AlumniCountryCardSection } from "../type";

interface CountrySectionType {
    data: AlumniCountryCardSection;
}

export default function CountryCards({ data }: CountrySectionType) {
    const t = useApplyLang(data);
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 2xl:gap-[33px]">
                {t.items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        variants={moveUp(idx * 0.5)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.2, once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card item={item} isActive={activeIndex === idx} onClick={() => setActiveIndex(idx)} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function Card({
    item,
    isActive,
    onClick,
}: {
    item: CountrySectionType["data"]["items"][number];
    isActive: boolean;
    onClick: () => void;
}) {
    const isArabic = useIsPreferredLanguageArabic();
    return (
        <div
            onClick={onClick}
            onMouseEnter={onClick}
            className="
        group relative w-full 2xl:w-[485px] h-[585px]
        rounded-[12px] border border-[#D3D3D3]
        overflow-hidden cursor-pointer
    "
            data-active={isActive}
        >
            {/* Base gradient */}
            <div
                className="
                absolute inset-0
                bg-[linear-gradient(180deg,#FFFFFF_0%,#E2F5FF_100%)]
            "
            />

            {/* Hover gradient */}
            <div
                className="
    absolute inset-0 opacity-0
    transition-opacity duration-500 ease-in-out
    bg-[linear-gradient(211deg,#42BADC_54.06%,rgba(126,90,163,0.1)_122.85%)]
    group-hover:opacity-100
group-data-[active=true]:opacity-100
  "
            />

            {/* Content */}
            <div className="relative z-10 h-full p-6 2xl:p-10 flex flex-col ">
                <div className="flex items-center gap-5">
                    <Image src={item.flag} alt={item.name} width={95} height={50} />
                    <span
                        className="
    hidden text-white font-light text-lg 2xl:text-xl
    group-hover:block
    group-data-[active=true]:block
  "
                    >
                        {item.name}
                    </span>
                </div>

                <div
                    className="
    text-black text-lg 2xl:text-xl font-light absolute bottom-[25px]
    group-hover:hidden
    group-data-[active=true]:hidden
  "
                >
                    {item.name}
                </div>

                {item.universities && (
                    <div
                        className="
      hidden text-white
      group-hover:block
      group-data-[active=true]:block
    "
                    >
                        <div className="h-px w-full bg-white my-[20px] 2xl:my-[30px]" />

                        <div
                            className={`
        text-sm leading-[1.52]
        [&_ul]:list-disc
        ${isArabic ? "[&_ul]:pr-4" : "[&_ul]:pl-4"}
        [&_li]:mb-1
      `}
                            dangerouslySetInnerHTML={{ __html: item.universities }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
