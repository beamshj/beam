"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fadeUp } from "@/public/assets/FramerAnimation/animation";
import SplitText from "@/components/SplitText";
import GalleryModal from "@/app/components/Gallery/sections/GalleryModal";
import { GalleryProps } from "@/app/components/Gallery/type";
import { BlogType } from "@/app/components/blog/type";
import { BlogResponse } from "@/app/components/NewsDetails/type";
import type { Swiper as SwiperType } from "swiper";
import { useRouter } from "next/navigation";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { useApplyLang } from "@/lib/applyLang";

const MediaHub = ({
    blogdata,
    newsdata,
    gallerydata,
}: {
    blogdata: BlogType;
    newsdata: BlogResponse;
    gallerydata: GalleryProps;
}) => {
    const [selectedItem, setSelectedItem] = useState<{
        img: string;
        date: string;
        title: string;
        category: string;
        images: string[];
        description: string;
    } | null>(null);

    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isArabic = useIsPreferredLanguageArabic();
    const tBlogData = useApplyLang(blogdata);
    const tNewsData = useApplyLang(newsdata);
    const tGalleryData = useApplyLang(gallerydata);

    const router = useRouter();

    // ✅ FIXED: Memoize blog items to prevent recreation on every render
    const blogItems = useMemo(
        () =>
            tBlogData?.categories?.flatMap((category) =>
                category.blogs?.map((blog) => ({
                    img: blog.coverImage,
                    date: blog.date
                        ? new Date(blog.date)
                              .toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                              })
                              .replace(/\//g, "-")
                        : "",
                    title: blog.title,
                    category: isArabic ? "مدونة" : "Blog",

                    images: [],
                    description: "",
                    slug: blog.slug,
                }))
            ) || [],
        [tBlogData]
    );

    // ✅ FIXED: Memoize news items to prevent recreation on every render
    const newsItems = useMemo(
        () =>
            tNewsData?.categories?.flatMap((category) =>
                category.news?.map((news) => ({
                    img: news.coverImage,
                    date: news.date
                        ? new Date(news.date)
                              .toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                              })
                              .replace(/\//g, "-")
                        : "",
                    title: news.title,
                    category: isArabic ? "أخبار" : "News",

                    images: [],
                    description: "",
                    slug: news.slug,
                }))
            ) || [],
        [tNewsData]
    );

    // ✅ FIXED: Memoize gallery items to prevent recreation on every render
    const galleryItems = useMemo(
        () =>
            tGalleryData?.gallery?.flatMap((section) =>
                section.categories?.flatMap((cat) =>
                    cat.images?.map((image) => ({
                        img: image,
                        date: "",
                        title: cat.title || section.title || "Gallery",
                        category: isArabic ? "معرض" : "Gallery",

                        images: cat.images,
                        description: cat.description,
                        slug: "",
                    }))
                )
            ) || [],
        [tGalleryData]
    );

    // ✅ FIXED: Memoize combined items so shuffle only happens once
    const combinedItems = useMemo(() => {
        const getRandomItems = (
            arr: {
                img: string;
                date: string;
                title: string;
                category: string;
                images: string[];
                description: string;
                slug: string;
            }[],
            n: number
        ) => {
            // Create a copy before sorting to avoid mutating original array
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, n);
        };

        const randomBlogs = getRandomItems(blogItems, 3);
        const randomNews = getRandomItems(newsItems, 3);
        const randomGallery = getRandomItems(galleryItems, 3);

        // Shuffle the combined array once
        return [...randomBlogs, ...randomNews, ...randomGallery].sort(() => 0.5 - Math.random());
    }, [blogItems, newsItems, galleryItems]);

    // ✅ FIXED: Memoize mediaHubData to prevent new object creation
    const mediaHubData = useMemo(
        () => ({
            heading: "Media Hub",
            mediaHub: combinedItems,
        }),
        [combinedItems]
    );

    useEffect(() => {
        if (swiperInstance) {
            if (selectedItem) {
                swiperInstance.autoplay.stop();
            } else {
                swiperInstance.autoplay.start();
            }
        }
    }, [selectedItem, swiperInstance]);

    // Initialize vanilla-tilt on card elements
    // useEffect(() => {
    //   // Dynamically import vanilla-tilt
    //   import("vanilla-tilt").then((VanillaTilt) => {
    //     tiltRefs.current.forEach((el) => {
    //       if (el) {
    //         VanillaTilt.default.init(el, {
    //           max: 15,
    //           speed: 400,
    //           glare: true,
    //           "max-glare": 0.3,
    //           scale: 1.05,
    //         });
    //       }
    //     });
    //   });

    //   // Cleanup on unmount
    //   return () => {
    //     tiltRefs.current.forEach((el) => {
    //       if (el && "vanillaTilt" in el) {
    //         const tiltEl = el as HTMLDivElement & {
    //           vanillaTilt: { destroy: () => void };
    //         };
    //         tiltEl.vanillaTilt?.destroy();
    //       }
    //     });
    //   };
    // }, [mediaHubData.mediaHub]);

    // Flip animation variant
    const flipVariant = {
        hidden: {
            rotateY: -90,
            opacity: 0,
            scale: 0.8,
        },
        visible: (i: number) => ({
            rotateY: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            },
        }),
    } as const;

    return (
        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-[1920px] mx-auto overflow-hidden"
        >
            <div>
                <div className="container border-t border-bdrcolor"></div>
                <div className="pt-7 pb-12 md:pt-10 md:pb-10 xl:pt-[83px] 2xl:pb-[150px] overflow-hidden">
                    <div className="container">
                        <div className="mb-5 md:mb-8 xl:mb-[52px]">
                            <h2 className="text-xl md:text-2xl 2xl:text-3xl font-light leading-tight text-black lettersp-4">
                                <SplitText
                                    text={mediaHubData.heading}
                                    tag="span"
                                    delay={100}
                                    duration={0.6}
                                    ease="power3.out"
                                    splitType="words"
                                    from={{ opacity: 0, y: 40 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    rootMargin="-100px"
                                    textAlign="left"
                                />
                            </h2>
                        </div>
                    </div>

                    <div className="container" style={{ perspective: "2000px" }}>
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            onSwiper={(swiper) => setSwiperInstance(swiper)}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            centeredSlides={false}
                            className="!overflow-visible alumni-swiper"
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={true}
                            speed={800}
                            autoplay={{
                                delay: 3000,
                                waitForTransition: true,
                            }}
                            pagination={{
                                clickable: true,
                                el: ".custom-pagination",
                                renderBullet: (index, className) => {
                                    return `<span class="${className}"></span>`;
                                },
                            }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2.15,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 3.15,
                                    spaceBetween: 10,
                                },
                            }}
                        >
                            {mediaHubData.mediaHub.map((value, index) => {
                                const isActiveOnMobile = index === activeIndex;

                                return (
                                    <SwiperSlide key={index}>
                                        <motion.div
                                            ref={(el) => {
                                                tiltRefs.current[index] = el;
                                            }}
                                            custom={index}
                                            variants={flipVariant}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: false, amount: 0.3 }}
                                            style={{
                                                transformStyle: "preserve-3d",
                                                backgroundImage: `url(${value.img})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                            className={`h-[350px] lg:h-[450px] xl:h-[557px] rounded-[15px] group slidegpmn cursor-pointer relative ${
                                                index === activeIndex ? "active-slide" : ""
                                            }`}
                                            onClick={() => {
                                                if (value.category === "Gallery") {
                                                    setSelectedItem({
                                                        ...value,
                                                        images: value.images ?? [],
                                                        description: value.description ?? "",
                                                    });
                                                } else if (value.category === "Blog") {
                                                    router.push(`/news-&-media/blog/blog-details/${value.slug}`);
                                                } else if (value.category === "News") {
                                                    router.push(`/news-&-media/press-release/${value.slug}`);
                                                }
                                            }}
                                        >
                                            <div className="h-full rounded-[15px] transition-all duration-300 hdriv">
                                                <div className="p-10">
                                                    {value.date ? (
                                                        <p
                                                            className={`text-white text-sm font-light transform transition-all duration-500 delay-100
                                ${
                                    isActiveOnMobile
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                                }`}
                                                        >
                                                            {value.date}
                                                        </p>
                                                    ) : null}

                                                    <p
                                                        className={`text-white line-clamp-2 xl:line-clamp-3 text-lg lg:text-xl font-light leading-[1.2] mt-6 transform transition-all duration-500 delay-300
                              ${
                                  isActiveOnMobile
                                      ? "opacity-100 translate-x-0"
                                      : "opacity-0 -translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0"
                              }`}
                                                    >
                                                        {value.title}
                                                    </p>

                                                    <div
                                                        className={`transition-all duration-300 ${
                                                            isArabic ? "-rotate-90" : ""
                                                        } delay-200 top-5 right-5 p-2 mt-6 xl:mt-15 transform rounded-full w-[40px] h-[40px] lg:w-[75px] lg:h-[75px] flex items-center justify-center border border-white
                              ${
                                  isActiveOnMobile
                                      ? "opacity-100 -translate-y-2 delay-300"
                                      : "opacity-0 lg:group-hover:opacity-100 lg:group-hover:-translate-y-2 lg:group-hover:delay-300"
                              }`}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="15"
                                                            height="15"
                                                            viewBox="0 0 15 15"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M13.3696 1.60156L0.419922 14.5227"
                                                                stroke="#000000"
                                                                className="transition-all duration-300 filter strokclass"
                                                                strokeMiterlimit="10"
                                                            />
                                                            <path
                                                                d="M0.417969 1.14551H13.3677V13.8117"
                                                                stroke="#000000"
                                                                className="transition-all duration-300 filter strokclass"
                                                                strokeMiterlimit="10"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`transition-all duration-300 px-3 py-1 border border-white rounded-full text-white absolute bottom-5 ${
                                                        isArabic ? "right-5" : "left-5"
                                                    }
                            ${
                                isActiveOnMobile
                                    ? "translate-x-2 delay-300"
                                    : "lg:group-hover:translate-x-2 lg:group-hover:delay-300"
                            }`}
                                                >
                                                    <p>{value.category}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>

                <div className="container border-t border-bdrcolor"></div>
            </div>

            {selectedItem && (
                <GalleryModal
                    item={{
                        title: selectedItem.title,
                        gallery: selectedItem.images,
                        description: selectedItem.description,
                    }}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </motion.section>
    );
};

export default MediaHub;
