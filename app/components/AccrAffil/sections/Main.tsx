"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "../../motionVarients";
import SplitText from "@/components/SplitText";
const Main = () => {
  return ( 
    <section className="pt-10 xl:pt-25 2xl:pt-[135px] pb-6 xl:pb-12 2xl:pb-[50px]">
      <div className="container">
        <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ amount: 0.1, once: false, margin: `-250px 0px -250px 0px`, }} className="relative overflow-hidden rounded-xl p-10 xl:p-15 2xl:min-h-[635px] flex items-end">
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
          <motion.div variants={moveRight(0.2)} initial="hidden" whileInView="show" viewport={{ amount: 0.1, once: false, margin: `-250px 0px -250px 0px`, }} className="absolute top-0 left-0 w-[90%] h-full bg-gradient-to-r from-[#066B7F] to-black/0 z-10 opacity-95"></motion.div>
          <Image src="/assets/images/accr-affil/main.jpg" alt="" width={1920} height={1280} className="absolute top-0 left-0 z-0 h-full object-cover" />
          <div className="relative z-30 text-white">
            <SplitText
              tag="h2"
              text="Accrediation"
              className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111111111111111] mb-5 font-light"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <SplitText
              tag="p"
              text="Our schools continually pursue international recognition and seek accreditation to reinforce a commitment to continuous improvement, innovation, and the security of our students and parents. The recognition of New England Association for Schools and Colleges (NEASC) and British Schools Overseas (BSO) is a confirmation of high-quality learning in all specific divisions. Having accredited status for our schools provides recognition of the ability to serve the wider community and the world with a focus on quality education."
              className="font-light max-w-[98ch] text-sm"
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
        </motion.div>
      </div>
    </section>
   );
}
 
export default Main;