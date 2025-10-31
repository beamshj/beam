"use client";

import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion, Variants } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { BlogType } from "../../blog/type";
import { useEffect, useMemo } from "react";
import { getReadingTimeFromHTML } from "@/app/(user)/utils/getReadingTime";
import { shareBlog } from "@/app/(user)/utils/linkShare";
import Link from "next/link";

const NewsArea = ({
  data,
}: {
  data: BlogType["categories"][number]["blogs"][number];
}) => {
  // Define variants with proper typing
  const contentTags: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    const links = document.querySelectorAll(".blog-content a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [data.content]);

  useEffect(() => {
    const boldElements = document.querySelectorAll(
      ".blog-content p strong span, .blog-content span p"
    );

    boldElements.forEach((el) => {
      // If the element has an inline color, keep it
      const color = (el as HTMLElement).style.color;
      if (!color) {
        // If no color is defined, set it to black
        (el as HTMLElement).style.color = "#000000";
      }
    });
  }, [data.content]);

  // used to remove yellow highlighted parts
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      '[style*="background-color"][style*="color"]'
    );

    elements.forEach((el) => {
      const bg = el.style.backgroundColor?.replace(/\s+/g, "").toLowerCase();
      const color = el.style.color?.replace(/\s+/g, "").toLowerCase();

      if (
        (bg === "#ffff00" || bg === "rgb(255,255,0)") &&
        (color === "#000" || color === "black" || color === "rgb(0,0,0)")
      ) {
        el.style.backgroundColor = "#ffffff";
        el.style.color = "#626262";
      }
    });
  }, []);

  const readingTime = useMemo(() => {
    return getReadingTimeFromHTML(data.content);
  }, [data.content]);

  return (
    <section className="pb-8 md:pb-12 lg:pb-20 2xl:pb-[135px] pt-[135px] lg:pt-[198px] 2xl:pt-[193px]">
      <div className="container">
        <div className="md:px-3 lg:px-[66px]">
          <div>
            <ul className="flex items-center gap-[3px] text-colorpara text-sm font-light">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <path
                    d="M5.56836 10.8141L9.64336 7.27455C10.1246 6.85653 10.1246 6.17251 9.64336 5.75449L5.56836 2.21492"
                    stroke="#626262"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
              <li>
                <Link href="/news-&-media/blog">News & Media</Link>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <path
                    d="M5.56836 10.8141L9.64336 7.27455C10.1246 6.85653 10.1246 6.17251 9.64336 5.75449L5.56836 2.21492"
                    stroke="#626262"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
              <li className="text-black">Blog</li>
            </ul>
          </div>
          <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12 mb-4 md:mb-6 xl:mb-8 2xl:mb-8">
            <SplitText
              tag="h2"
              text={data.title}
              className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-tight text-black lettersp-4"
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
          </div>
          {/* <div className="flex justify-between pl-5 items-center"> */}
          {/* <div>
              <ul className="list-disc lg:flex gap-10  text-colorpara text-sm font-light">
                <li>
                  Published in&nbsp;Blog&nbsp;on&nbsp;
                  {moment(data?.date).format("LL")}
                </li>
                <li>{readingTime} mins read</li>
                <li>{data?.category}</li>
              </ul>
            </div> */}
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1, once: true }}
            className="w-full flex justify-end gap-10"
          >
            <li className="text-black text-sm font-light list-disc">
              {readingTime} mins read
            </li>
            <Image
              src="/images/newsdetails/share.svg"
              alt=""
              width={19}
              height={22}
              className="cursor-pointer"
              onClick={() =>
                shareBlog({ title: data.title, url: window.location.href })
              }
            />
          </motion.div>
          {/* </div> */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1, once: false }}
            className="py-4 md:py-6 xl:py-8 rounded-[12px]"
          >
            <Image
              src={data.coverImage}
              alt={data.coverImageAlt}
              width={1360}
              height={535}
              className="w-full h-full object-cover rounded-[12px] max-h-[535px]"
            />
          </motion.div>
          <motion.div
            variants={contentContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1, once: false }}
          >
            <motion.div
              variants={contentTags}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </motion.div>
        </div>
        <div className="pt-8 md:pt-12 lg:pt-20 2xl:pt-[135px]">
          <hr />
        </div>
      </div>
    </section>
  );
};

export default NewsArea;
