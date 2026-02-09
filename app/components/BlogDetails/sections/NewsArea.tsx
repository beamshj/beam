"use client";

import Image from "next/image";
import SplitText from "@/components/SplitText";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { BlogType } from "../../blog/type";
import { useEffect, useMemo, useState } from "react";
import { getReadingTimeFromHTML } from "@/app/(user)/utils/getReadingTime";
import Link from "next/link";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    EmailShareButton,
    XIcon,
} from "react-share";
import {
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    EmailIcon,
} from "react-share";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

const NewsArea = ({
    data,
}: {
    data: BlogType["categories"][number]["blogs"][number];
}) => {
    const t = useApplyLang(data);
    const hasArabic = useIsPreferredLanguageArabic();

    /* ---------------- Client-only state ---------------- */
    const [sanitizedContent, setSanitizedContent] = useState("");
    const [shareUrl, setShareUrl] = useState("");
    const [isDesktop, setIsDesktop] = useState(false);
    const [showIcons, setShowIcons] = useState(false);

    /* ---------------- Animation variants (simplified) ---------------- */
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    /* ---------------- Reading time (memoized) ---------------- */
    const readingTime = useMemo(() => {
        return getReadingTimeFromHTML(t.content, hasArabic);
    }, [t.content, hasArabic]);

    /* ---------------- Share buttons config (memoized) ---------------- */
    const shareButtons = useMemo(
        () => [
            { Component: EmailShareButton, Icon: EmailIcon },
            { Component: FacebookShareButton, Icon: FacebookIcon },
            { Component: TwitterShareButton, Icon: XIcon },
            { Component: LinkedinShareButton, Icon: LinkedinIcon },
            { Component: WhatsappShareButton, Icon: WhatsappIcon },
        ],
        []
    );

    /* ---------------- FIX #1: Safe HTML sanitization in useEffect ---------------- */
    useEffect(() => {
        if (!t.content) return;

        // Create temporary DOM element for manipulation
        const temp = document.createElement("div");
        temp.innerHTML = t.content;

        // Open all links in new tab
        temp.querySelectorAll("a").forEach((link) => {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        });

        // Fix styling issues
        temp.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
            const bg = el.style.backgroundColor
                ?.replace(/\s+/g, "")
                .toLowerCase();
            const color = el.style.color?.replace(/\s+/g, "").toLowerCase();

            // Remove yellow highlights with black text
            if (
                (bg === "#ffff00" || bg === "rgb(255,255,0)") &&
                (color === "#000" ||
                    color === "black" ||
                    color === "rgb(0,0,0)")
            ) {
                el.style.backgroundColor = "#ffffff";
                el.style.color = "#626262";
            }

            // Ensure all styled elements have a color
            if (!el.style.color) {
                el.style.color = "#000000";
            }
        });

        setSanitizedContent(temp.innerHTML);
    }, [t.content]);

    /* ---------------- FIX #3 & #4: Client-only initialization ---------------- */
    useEffect(() => {
        // Set share URL
        setShareUrl(window.location.href);

        // Check viewport width
        const checkViewport = () => {
            setIsDesktop(window.innerWidth > 824);
        };

        checkViewport();

        // Optional: Update on resize
        window.addEventListener("resize", checkViewport);
        return () => window.removeEventListener("resize", checkViewport);
    }, []);

    /* ---------------- Render ---------------- */
    return (
        <section className="pb-8 md:pb-12 lg:pb-20 2xl:pb-[135px] pt-[135px] lg:pt-[198px] 2xl:pt-[193px]">
            <div className="container">
                <div className="md:px-3 lg:px-[66px]">
                    {/* Breadcrumbs - No animation for instant visibility */}
                    <ul className="flex items-center gap-[3px] text-colorpara text-sm font-light">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>›</li>
                        <li>
                            <Link href="/news-&-media/blog">News & Media</Link>
                        </li>
                        <li>›</li>
                        <li className="text-black">Blog</li>
                    </ul>

                    {/* Title - Reduced animation delay */}
                    <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12 mb-4 md:mb-6 xl:mb-8">
                        <SplitText
                            tag="h2"
                            text={t.title}
                            className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-tight text-black lettersp-4"
                            delay={50}
                            duration={0.4}
                            ease="power3.out"
                            splitType="words"
                            from={{ opacity: 0, y: 30 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="0px"
                            textAlign={hasArabic ? "right" : "left"}
                        />
                    </div>

                    {/* FIX #2: Reading time + Share - Proper HTML structure */}
                    <motion.div
                        variants={moveUp(0.15)}
                        initial="hidden"
                        animate="show"
                        viewport={{ amount: 0.1, once: true }}
                        className="w-full flex justify-end gap-10"
                    >
                        {/* Properly wrapped list item */}
                        <ul className="list-disc list-inside">
                            <li className="text-black text-sm font-light">
                                {readingTime}{" "}
                                {hasArabic ? "قراءة دقيقة" : "mins read"}
                            </li>
                        </ul>

                        {/* Desktop-only share buttons - no hydration mismatch */}
                        {isDesktop && (
                            <div className="relative">
                                <AnimatePresence>
                                    {showIcons && (
                                        <motion.div
                                            className="flex gap-3 md:mt-2 relative bottom-2 md:absolute mb-5 -right-1"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            {shareButtons.map(
                                                ({ Component, Icon }, index) => (
                                                    <motion.div
                                                        key={index}
                                                        variants={itemVariants}
                                                    >
                                                        <Component url={shareUrl}>
                                                            <Icon
                                                                size={32}
                                                                round
                                                                bgStyle={{
                                                                    fill: "none",
                                                                }}
                                                            />
                                                        </Component>
                                                    </motion.div>
                                                )
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Image
                                    src="/images/newsdetails/share.svg"
                                    alt="Share"
                                    width={19}
                                    height={22}
                                    className="cursor-pointer"
                                    onClick={() => setShowIcons((prev) => !prev)}
                                />
                            </div>
                        )}
                    </motion.div>

                    {/* Hero Image - Priority loading, faster animation */}
                    <motion.div
                        variants={moveUp(0.1)}
                        initial="hidden"
                        animate="show"
                        viewport={{ amount: 0.1, once: true }}
                        className="py-4 md:py-6 xl:py-8"
                    >
                        <Image
                            src={t.coverImage}
                            alt={t.coverImageAlt}
                            width={1360}
                            height={535}
                            priority
                            className="w-full h-full object-cover rounded-[12px] max-h-[535px]"
                        />
                    </motion.div>

                    {/* Blog content - Renders after sanitization */}
                    {sanitizedContent && (
                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    )}
                </div>

                <div className="pt-8 md:pt-12 lg:pt-20 2xl:pt-[135px]">
                    <hr />
                </div>
            </div>
        </section>
    );
};

export default NewsArea;