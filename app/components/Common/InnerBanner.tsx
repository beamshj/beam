"use client";

import Image from "next/image";
import Breadcrump from "./BreadCrump";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

interface PageBnrProps {
    BannerData?: {
        BannerTitle: string;
        BannerImg: string;
    };
    data: {
        banner?: string;
        bannerAlt?: string;
        pageTitle?: string;
    };
}

const InnerBanner = ({ BannerData, data }: PageBnrProps) => {
    const pathname = usePathname();
    const t = useApplyLang(data);
    const isArabic = useIsPreferredLanguageArabic();
    const xValue = isArabic ? 30 : -30;

    const lastWordPrimaryColor = pathname.includes("/general-managers-message") ? true : false;
    return (
        <section className="relative h-[320px] md:h-[380px] xl:h-[470px] 2xl:h-[635px] flex flex-col justify-end pb-[25px] md:pb-[30px] xl:pb-[35px]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-full z-0" >
                <Image src={t.banner || BannerData?.BannerImg || ""} alt={t.bannerAlt || BannerData?.BannerTitle || ""} width={1920} height={800} className="w-full h-full object-cover" sizes="100vw" priority loading="eager" fetchPriority="high" />
            </motion.div>

            <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-black/0 from-0% via-black/60 via-60% to-black/80 to-100%"></div>
            <div className="container relative z-10">
                <div>
                    <motion.h2
                        initial={{
                            opacity: 0,
                            x: xValue,
                            clipPath: isArabic ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            clipPath: "inset(0 0% 0 0)",
                        }}
                        transition={{ duration: 1.3, ease: "easeOut" }}
                        className="text-white text-xl md:text-2xl xl:text-2xl 2xl:text-3xl leading-[1.125] mb-[25px] md:mb-[30px] xl:mb-[40px] 2xl:mb-[50px] font-light"
                    >
                        {!lastWordPrimaryColor
                            ? (() => {
                                  const title = t.pageTitle || BannerData?.BannerTitle || "";
                                  const [firstWord, ...rest] = title.split(" ");
                                  return (
                                      <>
                                          {firstWord}{" "}
                                          {rest.length > 0 && <span className="text-primary">{rest.join(" ")}</span>}
                                      </>
                                  );
                              })()
                            : (() => {
                                  const title = t.pageTitle || BannerData?.BannerTitle || "";
                                  const words = title.trim().split(" ");
                                  const lastWord = words.pop(); // removes and returns last word
                                  const rest = words.join(" ");

                                  return (
                                      <>
                                          {rest && <>{rest} </>}
                                          <span className="text-primary">{lastWord}</span>
                                      </>
                                  );
                              })()}
                    </motion.h2>
                </div>
                <div className={`h-[1px] w-[60%] ${
                        isArabic
                            ? "bg-gradient-to-l from-white to-transparent"
                            : "bg-gradient-to-r from-white to-transparent"
                    } mb-[15px] md:mb-[20px] xl:mb-[25px]`}
                ></div>
                <Breadcrump />
            </div>
        </section>
    );
};

export default InnerBanner;
