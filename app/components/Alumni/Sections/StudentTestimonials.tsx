"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import SplitText from "@/components/SplitText";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { motion } from "framer-motion";
import { moveLeft, moveRight, moveUp } from "../../motionVarients";
import { useApplyLang } from "@/lib/applyLang";
import { AlumniTestimonialsSection } from "../type";

interface StudentTestimonialsSectionType {
    data?: AlumniTestimonialsSection;
}

export default function Testimonials({ data }: StudentTestimonialsSectionType) {
    console.log(data, "ds");
    const isArabic = useIsPreferredLanguageArabic();
    const t = useApplyLang(data!);

    return (
        <section className="container pt-10 xl:pt-25 2xl:pt-[135px] pb-10 xl:pb-25 2xl:pb-[135px]">
            {/* Header */}
            <div className="flex items-end justify-between mb-0">
                <div className="flex flex-col">
                    <SplitText
                        tag="h2"
                        text={t.headingOne}
                        className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-light leading-[1.111111111] text-black"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign={isArabic ? "right" : "left"}
                    />
                    <SplitText
                        tag="h2"
                        text={t.headingTwo}
                        className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-light leading-[1.111111111] text-black mb-4 md:mb-6 xl:mb-8 2xl:mb-12"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign={isArabic ? "right" : "left"}
                    />
                </div>
                {/* Navigation */}
                <div className="flex items-center mb-4 md:mb-6 xl:mb-8 2xl:mb-12">
                    {/* Prev */}
                    <button className="testimonial-prev group lg:p-1" aria-label="Previous">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="overflow-visible"
                        >
                            <path
                                d={
                                    isArabic
                                        ? "M14.43 5.92993L20.5 11.9999L14.43 18.0699"
                                        : "M9.57031 5.92993L3.50031 11.9999L9.57031 18.0699"
                                }
                                stroke="#D3D3D3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-300 group-hover:stroke-[#23ABD2]"
                            />

                            <path
                                d="M20.5 12H3.67"
                                stroke="#D3D3D3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`
                    ${isArabic ? "origin-right" : "origin-left"}
                    transition-transform duration-500
                    group-hover:scale-x-[1.5]
                    group-hover:stroke-[#23ABD2]
                `}
                            />
                        </svg>
                    </button>

                    {/* Next */}
                    <button className="testimonial-next group p-2" aria-label="Next">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="overflow-visible"
                        >
                            <path
                                d={
                                    isArabic
                                        ? "M9.57031 5.92993L3.50031 11.9999L9.57031 18.0699"
                                        : "M14.43 5.92993L20.5 11.9999L14.43 18.0699"
                                }
                                stroke="#D3D3D3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-300 group-hover:stroke-[#23ABD2]"
                            />

                            <path
                                d="M3.5 12H20.33"
                                stroke="#D3D3D3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`
                    ${isArabic ? "origin-left" : "origin-right"}
                    transition-transform duration-500
                    group-hover:scale-x-[1.5]
                    group-hover:stroke-[#23ABD2]
                `}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Slider */}
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".testimonial-prev",
                    nextEl: ".testimonial-next",
                }}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    1300: {
                        slidesPerView: 1.3,
                    },
                }}
            >
                {t.items.map((item, index) => (
                    <SwiperSlide key={item._id}>
                        <motion.div
                            variants={moveUp(index * 0.5)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="
                    bg-[#F6F6F6] rounded-[12px] overflow-hidden
                    flex flex-col md:flex-row
                    items-center
                    gap-6 md:gap-10
                "
                        >
                            {/* Left content */}
                            <div
                                className={`
                        px-4 pt-6 pb-0 sm:px-6 sm:py-6 ${isArabic ? "md:pr-10 md:pr-0" : "md:pl-10 md:pr-0"} py-10
                        flex-1
                                `}
                            >
                                <motion.div
                                    variants={moveRight(index * 1)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                >
                                    <Image
                                        src="/images/alumni/quote.svg"
                                        alt="Quote"
                                        width={98}
                                        height={73}
                                        className="pb-8 lg:pb-10 2xl:pb-12.5 hidden lg:block"
                                    />
                                </motion.div>

                                <motion.h4
                                    variants={moveUp(index * 1)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="text-lg lg:text-xl font-medium mb-3 md:mb-6 lg:mb-10"
                                >
                                    {item.name}
                                </motion.h4>

                                <motion.div
                                    variants={moveUp(index * 1.2)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="h-px w-full bg-[#D3D3D3] mb-3 md:mb-6 lg:mb-10"
                                />

                                <motion.div
                                    variants={moveUp(index * 1.6)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className={`
                            text-sm
                            leading-[1.52]
                            font-light text-[#626262]
                            [&_ul]:list-disc ${isArabic ? "[&_ul]:pr-6 sm:[&_ul]:pr-8" : "[&_ul]:pl-6 sm:[&_ul]:pl-8"}
                            2xl:w-[611px]
                        `}
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                            </div>

                            {/* Right image */}
                            <motion.div
                                variants={moveLeft(index * 1.6)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="
                        h-[300px] sm:h-[450px] md:h-auto
                        w-[380px]
                        2xl:w-[455px]
                        shrink-0
                    "
                            >
                                <Image
                                    src={item.profileImage}
                                    alt={item.name}
                                    width={455}
                                    height={806}
                                    className="
                            w-full h-full object-top md:object-cover
                            rounded-[12px]
                        "
                                />
                            </motion.div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
