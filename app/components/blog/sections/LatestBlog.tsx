"use client";

import SplitText from "@/components/SplitText";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
interface BlogItem {
  image: string;
  title: string;
  date: string;
  category: string;
}

export default function LatestBlogs({ data }: { data: BlogItem[] }) {
  const displayItems = [...data]
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-")).getTime();
      const dateB = new Date(b.date.split("/").reverse().join("-")).getTime();
      return dateB - dateA;
    })
    .slice(0, 2);

  return (
    <section className="pt-10 xl:pt-20 2xl:pt-[135px]">
      <div className="container">
        <h2 className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-black leading-[1.1111] mb-5 xl:mb-[30px] 2xl:mb-[50px]">
          <SplitText
            tag="span"
            text="Latest Blogs"
            className=""
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
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:gap-[20px] 2xl:gap-[33px] border-b border-bdrcolor pb-[50px] mb-[50px]">
          {displayItems.map((item, idx) => (
            <motion.div variants={moveUp(idx * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
              key={idx}
              className="relative w-full h-[280px] md:h-[380px] xl:h-[470px] 2xl:h-[511px] 2xl:w-[743px] rounded-[12px] overflow-hidden cursor-pointer group"
            >
              {/* Main Image */}
              <Image
                src={item.image || "/images/fallback.jpg"}
                alt={item.title}
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
              <div className="absolute top-[30px] right-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-primary text-white w-[74px] h-[74px] rounded-full flex items-center justify-center">
                  <Image
                    src="/images/arrow-right-up.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* Title & Date */}
              <div className="absolute bottom-[22px] left-[22px] lg:bottom-[39px] lg:left-[39px] z-10">
                <p className="text-sm opacity-80 leading-[1.52] text-[#D3D3D3]">
                  {item.date}
                </p>
                <h3 className="text-md md:text-lg xl:text-xl text-white font-light leading-[1.2] mt-[10px] max-w-[80%]">
                  {item.title}
                </h3>
                <div>
                  <button className="bg-primary text-white w-[27px] h-[27px] rounded-full flex items-center justify-center mt-[15px]">
                    <Image
                      src="/images/arrow-right-tip.svg"
                      alt="arrow"
                      width={15}
                      height={15}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
