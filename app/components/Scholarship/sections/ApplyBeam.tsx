// ApplyToday.tsx
import Image from "next/image";
import Link from "next/link";
import SplitText from "@/components/SplitText";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { useApplyLang } from "@/lib/applyLang";

interface ApplyTodayDataType {
    data: {
        title: string;
        description: string;
        email: string;
        footerText: string;
    };
}

export default function ApplyToday({ data }: ApplyTodayDataType) {
    const isArabic = useIsPreferredLanguageArabic();
    const t = useApplyLang(data)
    return (
        <section className="bg-[#F6F6F6]">
            <div className="container pt-10 xl:pt-25 2xl:pt-[135px] pb-10 xl:pb-25 2xl:pb-[135px]">
                <div className="flex flex-col">
                    {/* Title */}
                    <SplitText
                        tag="h2"
                        text={t.title}
                        className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-light leading-[1.111111111] text-black mb-4 xl:mb-6 2xl:mb-[30px]"
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

                    {/* Description + Email */}
                    <div className="flex flex-wrap items-center gap-5 2xl:gap-[30px]">
                        <motion.p
                            variants={moveUp(0.2)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="leading-[1.52] text-sm font-light text-[#626262]"
                        >
                            {t.description}
                        </motion.p>

                        <motion.div variants={moveUp(0.3)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <Link
                                href={`mailto:${t.email}`}
                                className="
                                    inline-flex text-sm items-center gap-3 2xl:gap-5 underline
                                    px-3 2xl:px-5 py-3 2xl:py-[22px]
                                    rounded-full
                                    border border-primary
                                    text-[#1A1A1A] font-light
                                    transition-all duration-300
                                    hover:bg-[#42BADC] hover:text-white group
                                "
                            >
                                {/* Mail icon */}
                                <Image
                                    src="/images/alumni/mail.svg"
                                    alt="mail"
                                    width={24}
                                    height={24}
                                    className="group-hover:invert transition-all duration-300"
                                />
                                {t.email}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Footer line */}
                    <motion.p
                        variants={moveUp(0.4)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-sm md:text-lg text-black font-light leading-[1.406] mt-[20px] 2xl:mt-[30px]"
                    >
                        {t.footerText}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
