"use client";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveLeft } from "../../motionVarients";
interface ProgramProps {
  title: string;
  subtitle?: string;
  description: string;
  photo: string;
}

export default function PLProgram({ data }: { data: ProgramProps }) {
  const { title, subtitle, photo, description } = data;

  return (
    <section className="py-10 md:py-20 xl:py-[135px]">
      <div className="container">
        <div className="flex flex-col xl:flex-row items-stretch gap-10 xl:gap-13 2xl:gap-[70px]">
          {/* Left Content */}
          <div className="xl:w-[49%] w-full  order-2 xl:order-1">
            <h2 className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-light leading-[1.111] mb-3 2xl:mb-[50px] lettersp-2">
              <SplitText
                tag="span"
                text={title}
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
            {subtitle && (
              <h3 className="text-md mb-2 xl:text-lg 2xl:text-xl text-black leading-[1.262857142857143] font-light lettersp-2">
               <SplitText
                tag="span"
                text={subtitle}
                className=""
                delay={200}
                duration={0.6}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-10px"
                textAlign="left"
              />
              </h3>
            )}
            <div className="text-colorpara w-65ch]">
              {description.split("\n").map((line, idx) => {
                console.log('Line:', line.replace(/<[^>]*>/g, '')); // Debug

                return line.trim() && (
                  <div key={idx} className="whitespace-pre-line">
                    <SplitText
                      tag="span"
                      text={line.replace(/<[^>]*>/g, '')}
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="lines"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="left"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <motion.div variants={moveLeft(2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative min-h-40 md:min-h-[300px] 2xl:w-[749px] w-full rounded-[12px] overflow-hidden shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] order-1 xl:order-2">
            <Image src={photo} alt={title}  fill className="object-cover rounded-[12px]" />
            <div
              style={{
                background:
                  "linear-gradient(183.56deg, rgba(66, 186, 220, 0) 43.99%, #7E5AA3 116.63%)",
              }}
              className="absolute inset-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
