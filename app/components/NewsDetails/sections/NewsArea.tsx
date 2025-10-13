"use client";

import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";

const NewsArea = () => {
  return (
    <section className="pb-8 md:pb-12 lg:pb-20 2xl:pb-[135px] pt-[135px] lg:pt-[198px] 2xl:pt-[193px]">
      <div className="container">
        <div className="md:px-3 lg:px-[66px]">
          <div>
            <ul className="flex items-center gap-[3px] text-colorpara text-sm font-light">
              <li>Home</li>
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
                <a href="#">News & Media</a>
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
              <li className="text-black">News</li>
            </ul>
          </div>
          <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12 mb-4 md:mb-6 xl:mb-8 2xl:mb-8">
            <SplitText
              tag="h2"
              text="Challenges Faced by Elementary School Students in 2022"
              className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-tight text-black lettersp-4 "
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
          <div className="flex justify-between pl-5 items-center">
            <div>
              <ul className="list-disc lg:flex gap-10  text-colorpara text-sm font-light">
                <li>Published in&nbsp;Blog&nbsp;on&nbsp;July 14, 2025</li>
                <li>10 mins read</li>
                <li>Curriculum</li>
              </ul>
            </div>
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
            >
              <Image
                src="/images/newsdetails/share.svg"
                alt=""
                width={19}
                height={22}
              />
            </motion.div>
          </div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1, once: true }}
            className="py-4 md:py-6 xl:py-8 2xl:py-12"
          >
            <Image
              src="/images/newsdetails/banner.jpg"
              alt=""
              width={1360}
              height={535}
              className="rounded-sm w-full object-cover"
            />
          </motion.div>
          <div>
            <motion.p
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="text-colorpara text-sm font-light"
            >
              Elementary students faced many challenges after COVID-19,
              especially with the sudden shift to online learning. Returning to
              physical classrooms in 2022 added to their struggles, changing the
              overall school culture. This blog explores the key challenges they
              faced post-pandemic.
            </motion.p>
            <motion.h3
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18]  pt-4 md:pt-6 2xl:pt-10 mb-4  xl:mb-5 2xl:mb-5"
            >
              Elementary School Education During COVID-19
            </motion.h3>
            <motion.p
              variants={moveUp(0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="text-colorpara text-sm font-light"
            >
              The pandemic disrupted education worldwide, replacing in-person
              learning with online classes. This shift weakened student-teacher
              interaction and made it hard for young students to build
              friendships. Elementary students especially struggled to focus
              during video lessons, and teachers found it difficult to address
              doubts effectively.
            </motion.p>
            <motion.h3
              variants={moveUp(0.8)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18]  pt-4 md:pt-6 2xl:pt-10 mb-4  xl:mb-5 2xl:mb-5"
            >
              Elementary School Education Post COVID-19
            </motion.h3>
            <motion.p
              variants={moveUp(1)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="text-colorpara text-sm font-light"
            >
              After nearly two years of school closures, returning to physical
              classrooms was tough for elementary students. Many struggled to
              adjust to routines, follow safety protocols, and adapt to hybrid
              learning. Poor virtual kindergarten education left gaps in basic
              skills like numbers and letters, making the transition even
              harder.
            </motion.p>
            <motion.h3
              variants={moveUp(1.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.1, once: true }}
              className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18]  pt-4 md:pt-6 2xl:pt-10 mb-4  xl:mb-5 2xl:mb-5"
            >
              Challenges Faced By Elementary Students in Classroom  
            </motion.h3>
            <div className=" mb-4 md:mb-6 xl:mb-7 ">
              <ul className="list-disc pl-5 pb-3">
                <motion.li
                  variants={moveUp(1.4)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.1, once: true }}
                  className="text-sm font-medium text-black"
                >
                  Emotional and Social Development
                </motion.li>
              </ul>
              <motion.p
                variants={moveUp(1.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.1, once: true }}
                className="text-colorpara text-sm font-light"
              >
                Due to the pandemic, children lacked social interaction and did
                more solo work during online classes. Returning to school in
                2022, many faced stress from lifestyle changes, loss, and
                disrupted learning. Teachers must focus on emotional and social
                support to help them readjust.
              </motion.p>
            </div>
            <div className=" mb-4 md:mb-6 xl:mb-7 ">
              <ul className="list-disc pl-5 pb-3">
                <motion.li
                  variants={moveUp(1.8)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.1, once: true }}
                  className="text-sm font-medium text-black"
                >
                  Dependence on Technology
                </motion.li>
              </ul>
              <motion.p
                variants={moveUp(2)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.1, once: true }}
                className="text-colorpara text-sm font-light"
              >
                With increased virtual learning, elementary students rely more
                on gadgets for schoolwork. While technology aids learning, it
                can isolate them from the real world. Parents and teachers
                should guide healthy tech use and encourage offline activities
                like &quot;analog weekends&quot; for balance.
              </motion.p>
            </div>
            <div>
              <ul className="list-disc pl-5 pb-3">
                <motion.li
                  variants={moveUp(2.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.1, once: true }}
                  className="text-sm font-medium text-black"
                >
                  Prioritize Mental Health And Well-Being
                </motion.li>
              </ul>
              <motion.p
                variants={moveUp(2.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.1, once: true }}
                className="text-colorpara text-sm font-light"
              >
                Virtual learning made young students tech-dependent. While
                helpful, it can lead to disconnection from real life. Parents
                and teachers should promote healthy tech habits and offline
                activities.
              </motion.p>
            </div>
          </div>

         
        </div>
        <div className="pt-8 md:pt-12 lg:pt-20 2xl:pt-[135px]">
            <hr />
          </div>
      </div>
    </section>
  );
};

export default NewsArea;
