"use client";
 
import Image from "next/image";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { moveUp } from "../../motionVarients";
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
  image: string;
  VMItems: VMItem[];
}

const VisionMissionSection = ({
  visionMissionItems,
}: {
  visionMissionItems: VisionMissionData;
}) => { 

 

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imageRef.current && overlayRef.current && containerRef.current) {
      gsap.set(imageRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(overlayRef.current, { y: '100%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 35%',
          toggleActions: 'play none none none', // Play once, don't reverse
        }
      });

      tl.to(imageRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power2.inOut',
      })
        .to(overlayRef.current, {
          y: '0%',
          duration: 0.4,
          ease: 'easeInOut',
        }, '-=0.4');
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="pt-10 xl:pt-[70px] 2xl:pt-[90px]">
      <div className="container" ref={containerRef}>
        <div className="grid md:grid-cols-2 gap-8 xl:gap-[90px]">
          {/* Left Content */}
          <div> 
             
              <SplitText
            tag="h2"
            text={visionMissionItems.mainTitle}
            className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-light leading-[1.111111111] text-black mb-3 xl:mb-[40px] 2xl:mb-[30px]"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          /> 
            <motion.p variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-colorpara text-sm leading-[1.526315789473684] mb-[30px]">
              {visionMissionItems.mainDescription}
            </motion.p>
            {/* Cards */}
            <div className="space-y-[20px] xl:space-y-[25px] 2xl:space-y-[30px]">
              {visionMissionItems.VMItems.map((item,index) => (
                <div key={item.id} className="flex items-stretch xl:gap-4   " >
                  {/* Left icon box - fixed width, stretched height */}
                  <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className={`flex-shrink-0 w-fit xl:w-[125px] flex items-center justify-center rounded-[12px] transition-colors duration-300  ${index === 0 ? 'bg-[#DDF7FF]' : 'bg-[#F5EBFF]'} group p-5 xl:py-0`}
                  >
                    <Image src={item.icon} alt={item.title} width={70} height={70} className="w-auto h-8  xl:h-[70px]" />
                  </motion.div>

                  {/* Right content - natural height */}
                  <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex flex-col justify-center flex-1 ml-[10px]">
                    <h3 className="text-xl font-light text-black leading-[1.2] mb-[15px]">
                      {item.title}
                    </h3>
                    <p className="text-[#6D6E71] text-sm leading-[1.526315789473684] max-w-[39ch]">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Image */}
          <div className="relative w-full h-[300px]  md:h-auto rounded-[12px] overflow-hidden" ref={imageRef}>
          
              <Image src={visionMissionItems.image} alt={'visionMissionItems.title'} fill className="object-cover  transition-all duration-500"/>
          
            <motion.div ref={overlayRef}
              className="absolute bottom-0 w-full h-[60%] bg-gradient-to-b from-black/0 to-[#42BADCC9]/79"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
