"use client";

import React, { useEffect, useState } from "react";
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
import { moveLeft } from "../../motionVarients";

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

  // ✅ track active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  const blogItems =
    blogdata?.categories?.flatMap((category) =>
      category.blogs?.map((blog) => ({
        img: blog.coverImage,
        date: new Date(blog.date || "")
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
          .replace(/\//g, "-"),
        title: blog.title,
        category: "Blog",
        images: [],
        description: "",
        slug: blog.slug,
      }))
    ) || [];

  const newsItems =
    newsdata?.categories?.flatMap((category) =>
      category.news?.map((news) => ({
        img: news.coverImage,
        date: new Date(news.date)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
          .replace(/\//g, "-"),
        title: news.title,
        category: "News",
        images: [],
        description: "",
        slug: news.slug,
      }))
    ) || [];

  const galleryItems =
    gallerydata?.gallery?.flatMap((section) =>
      section.categories?.flatMap((cat) =>
        cat.images?.map((image) => ({
          img: image,
          date: "",
          title: cat.title || section.title || "Gallery",
          category: "Gallery",
          images: cat.images,
          description: cat.description,
          slug: "",
        }))
      )
    ) || [];

  //  Helper: Shuffle and pick N random items
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
  ) => arr.sort(() => 0.5 - Math.random()).slice(0, n);

  const randomBlogs = getRandomItems(blogItems, 3);
  const randomNews = getRandomItems(newsItems, 3);
  const randomGallery = getRandomItems(galleryItems, 3);

  const combinedItems = [...randomBlogs, ...randomNews, ...randomGallery].sort(
    () => 0.5 - Math.random()
  );

  const mediaHubData = {
    heading: "Media Hub",
    mediaHub: combinedItems,
  };

  useEffect(() => {
    if (swiperInstance) {
      if (selectedItem) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    }
  }, [selectedItem, swiperInstance]);

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

          <div className="container">
            <Swiper
              modules={[Autoplay, Pagination]}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // ✅ track visible slide
              centeredSlides={true}
              className="!overflow-visible alumni-swiper"
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              speed={800}
              autoplay={{
                delay: 3000,
                // disableOnInteraction: true,
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
                  slidesPerView: 2,
                  slidesOffsetBefore: 30,
                  slidesOffsetAfter: 30,
                },
                1024: { slidesPerView: 3 },
              }}
            >
              {mediaHubData.mediaHub.map((value, index) => {
                // ✅ detect if this slide should appear "active" on mobile
                const isActiveOnMobile = index === activeIndex;

                return (
                  <SwiperSlide key={index}>
                    <motion.div
                      variants={moveLeft(0.2*index)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className={`h-[350px] lg:h-[450px] xl:h-[557px] rounded-[15px] group slidegpmn cursor-pointer relative ${
                        index == activeIndex ? "active-slide" : ""
                      }`}
                      style={{
                        backgroundImage: `url(${value.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() => {
                        if (value.category === "Gallery") {
                          setSelectedItem({
                            ...value,
                            images: value.images ?? [],
                            description: value.description ?? "",
                          });
                        } else if (value.category === "Blog") {
                          router.push(
                            `/news-&-media/blog/blog-details/${value.slug}`
                          );
                        } else if (value.category === "News") {
                          router.push(
                            `/news-&-media/press-release/${value.slug}`
                          );
                        }
                      }}
                    >
                      <div className="h-full rounded-[15px] transition-all duration-300 hdriv">
                        <div className="p-10">
                          {/* ✅ date */}
                          {value.date ? (
                            <p className={`text-white text-sm font-light transform transition-all duration-500 delay-100
                                ${
                                  isActiveOnMobile
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                                }`}
                            >
                              {value.date}
                            </p>
                          ) : null}

                          {/* ✅ title */}
                          <p className={`text-white line-clamp-2 xl:line-clamp-3 text-lg lg:text-xl font-light leading-[1.2] mt-6 transform transition-all duration-500 delay-300
                              ${
                                isActiveOnMobile
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0"
                              }`}
                          >
                            {value.title}
                          </p>

                          {/* ✅ arrow icon */}
                          <div
                            className={`transition-all duration-300 delay-200 top-5 right-5 p-2 mt-6 xl:mt-15 transform rounded-full w-[40px] h-[40px] lg:w-[75px] lg:h-[75px] flex items-center justify-center border border-white
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

                        {/* ✅ category badge */}
                        <div
                          className={`transition-all duration-300 px-3 py-1 border border-white rounded-full text-white absolute bottom-5 left-5
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
