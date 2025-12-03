"use client";

import SplitText from "@/components/SplitText";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import Link from "next/link";
import { BlogType } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

export default function LatestBlogs({
  data,
}: {
  data: BlogType["categories"][number]["blogs"];
}) {

  const t = useApplyLang(data)
  const isArabic = useIsPreferredLanguageArabic()

  const displayItems = [...t]
    .sort((a, b) => {
      const dateA = a.date
        ? new Date(a.date.split("/").reverse().join("-")).getTime()
        : 0; // fallback to 0 or some default

      const dateB = b.date
        ? new Date(b.date.split("/").reverse().join("-")).getTime()
        : 0;

      return dateB - dateA;
    })
    .slice(0, 2);

  return (
    <section className="pt-10 xl:pt-20 2xl:pt-[135px]">
      <div className="container">
        <SplitText
          tag="h2"
          text={`${isArabic ? "أحدث المدونات" : "Latest Blogs"}`}
          className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-black leading-[1.1111] mb-5 xl:mb-[30px] 2xl:mb-[50px]"
          delay={200}
          duration={0.6}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-10px"
          textAlign="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:gap-[20px] 2xl:gap-[33px] border-b border-bdrcolor pb-[50px] mb-[50px]">
          {displayItems.map((item, idx) => (
            <motion.div
              variants={moveUp(idx * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              key={idx}
              className="relative w-full h-[280px] md:h-[380px] xl:h-[470px] 2xl:h-[511px] 2xl:w-[743px] rounded-[12px] overflow-hidden cursor-pointer group"
            >
              <Link href={`/news-&-media/blog/blog-details/${item.slug}`}>
                {/* Main Image */}
                <Image
                  src={item.thumbnail || "/images/fallback.jpg"}
                  alt={item.thumbnailAlt}
                  fill
                  className="object-cover"
                />

                {/* Black Gradient (always visible) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)`,
                  }}
                />

                {/* Blue Gradient (hover - slides from bottom) */}
                <div
                  className="absolute inset-0 pointer-events-none transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  style={{
                    background: `linear-gradient(180.09deg, rgba(0,0,0,0) 50.09%, rgba(66,186,220,0.75) 99.92%)`,
                  }}
                />

                {/* Hover Arrow */}
                <div className={`absolute top-[30px] ${isArabic ? "left-[30px]" : "right-[30px]" } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <button className="bg-primary text-white w-[74px] h-[74px] rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
                    <span className={`transition-all duration-400 translate-y-3 ${isArabic ? "translate-x-3" : "-translate-x-3" } group-hover:-translate-y-0 group-hover:translate-x-0 block`}>
                      <Image
                        src="/images/arrow-right-up.svg"
                        alt="arrow"
                        width={24}
                        height={24}
                        className={`${isArabic && "-rotate-90"} object-contain`}
                      />
                    </span>
                  </button>
                </div>

                {/* Title & Date */}
                <div className="absolute bottom-[22px] left-0 px-5 lg:px-10 lg:bottom-[39px]  z-10">
                  <div className="flex justify-between">
                    <p className="text-sm opacity-80 leading-[1.52] text-[#D3D3D3]">
                      {/* {(item.date
                        ? new Date(item.date)
                        : new Date(item.createdAt)
                      )
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "/")} */}
                    </p>
                    <p className="text-sm opacity-80 leading-[1.52] text-[#D3D3D3] capitalize">
                      {/* {item.category} */}
                    </p>
                  </div>
                  <h3 className="text-md lg:text-lg xl:text-xl text-white font-light leading-[1.2] mt-[10px] max-w-[26ch] lettersp-1 capitalize line-clamp-2">
                    {item.title.toLowerCase()}
                  </h3>
                  <div>
                    <button className="bg-primary text-white w-[27px] h-[27px] rounded-full flex items-center justify-center mt-[15px] cursor-pointer">
                      <Image
                        src="/images/arrow-right-tip.svg"
                        alt="arrow"
                        width={15}
                        height={15}
                        className={`${isArabic && "rotate-180"}`}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
