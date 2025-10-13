"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVarients";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);
interface InclusionData {
  bgImage: string;
  title: string;
  description: string;
}

interface InclusionSectionProps {
  data: InclusionData;
}

const InclusionSection: React.FC<InclusionSectionProps> = ({ data }) => {

  useEffect(() => {
    gsap.from(".inclusion-section", {
      scrollTrigger: {
        trigger: ".inclusion-section",
        start: "center center",
        end: "bottom 50%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
      y: 150,
      rotationX: 75, // tilt as if lying on the floor
      transformOrigin: "top center", // pivot from bottom edge
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      perspective: 800, // adds depth
    });
  }, []);

  return (
    <section className="py-10 xl:py-20 2xl:py-[135px] ">
      <div className="container">
        <div className="relative h-[500px] 2xl:h-[638px] rounded-[12px] overflow-hidden ">
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
            className="absolute left-0 w-[83%] h-full"
          ></div>
          {/* Content pinned bottom-left */}
          <div className="absolute bottom-0 left-0 z-10 p-6 xl:p-[60px]">
            <motion.h2 variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-xl xl:text-3xl 2xl:text-4xl font-light mb-2 leading-[1.111111] text-white">
              {data.title}
            </motion.h2>
            <motion.p variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-sm font-light leading-[1.52] text-white max-w-[83ch]">
              {data.description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InclusionSection;
