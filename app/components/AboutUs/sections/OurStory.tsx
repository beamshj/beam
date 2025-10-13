"use client";
import SplitText from "@/components/SplitText";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
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
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.15,
        x: -40,
        y: -20,
        duration: 16,
        ease: 'power1.inOut',
        yoyo: true, // This makes it reverse
        repeat: -1, // Infinite loop
      });
    }
  }, []);
  return (
    <section className="pt-10 xl:pt-20 2xl:pt-[135px]">
      <div className="container">
        <div className="mb-3 md:mb-6 xl:mb-15 2xl:mb-[50px]">
          <h1 className="text-lg md:text-xl xl:text-3xl 2xl:text-4xl font-light leading-[1.111111111] text-black"> 
          <SplitText
            tag="span"
            text={data.title}
            className=""
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          />
          </h1>
        </div>
        {/* Title + Image */}
        <div className="relative rounded-[12px] overflow-hidden">
          <Image src={data.imageUrl} alt="Our Story Background" width={1200} height={500} className="w-full h-50 md:h-[300px] lg:h-[455px] xl:h-[500px] 2xl:h-[605px] object-cover" ref={imageRef} />
          {/* Gradient overlay */}
          <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-black to-transparent"></div>
          <motion.h2 variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="absolute left-[20px] bottom-[20px] right-[20px] lg:right-0  xl:left-[50px] xl:bottom-[40px] 2xl:left-[60px] 2xl:bottom-[50px] text-white text-md md:text-lg max-w-[20ch] xl:max--w-0 xl:text-xl 2xl:text-4xl font-light leading-[1.111111111]">
            {data.imageTitle}{" "}
            <span className="text-primary">{data.highlight}</span>
          </motion.h2>
          
        </div>

        {/* Description */}
        <div className="mt-[30px] xl:mt-[40px] 2xl:mt-[50px] text-sm text-foreground font-light leading-[1.526315789473684]">
          {data.description.split("\n\n").map((para, idx) => (
            <p key={idx}>
              {" "}
              {/* paragraph spacing */}
              {para.split("\n").map((line, i) => (
                <motion.span variants={moveUp(i * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={i} className="text-colorpara block mb-[14px] xl:mb-6 last:mb-0">
                  {" "}
                  {/* line spacing */}
                  {line}
                </motion.span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
