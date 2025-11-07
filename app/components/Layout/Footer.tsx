"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  parentStagger,
  fadeUponeone,
} from "@/public/assets/FramerAnimation/animation";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Enter valid number"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

const Footer = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });


  const onSubmit = async (data: FormData) => {
    try {
      const captchaValue = recaptchaRef?.current?.getValue()
      if (!captchaValue) {
        setError("Please verify yourself to continue")
        return;
      }
      setError("")
      const response = await fetch("/api/admin/contact/enquiry", {
        method: "POST",
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.success) {
        alert(res.message)
        reset()
      } else {
        alert(res.message)
      }
    } catch (error) {
      console.log("Error sending message", error)
      alert("Sorry, something went wrong. Please try again later.")
    }
  };

  return (
    <footer className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
      {/* Background 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full absolute top-0 left-0 z-0">
        <div className="bg-black"></div>
        <div className="bg-black md:bg-[#1A1A1A]"></div>
      </div>

      {/* Content container on top */}
      <div className="relative z-10 container py-12 xl:py-25 2xl:pt-[139px] 2xl:pb-[89px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white">
          {/* Left Column */}
          <div className="flex flex-col gap-5 xl:gap-25 2xl:gap-[167px]">
            <div>
              <motion.div
                variants={parentStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col gap-5 md:gap-10"
              >
                <div>
                  <div className="flex flex-col md:gap-3">
                    <motion.h2
                      className="text-md 2xl:text-2xl font-light lettersp-2"
                      variants={fadeUponeone}
                    >
                      800 BEAM (2326)
                    </motion.h2>
                    <motion.p
                      className="text-md 2xl:text-2xl font-light break-words lettersp-2"
                      variants={fadeUponeone}
                    >
                      enquiries@beam.co.ae
                    </motion.p>
                  </div>
                  <motion.div
                    variants={fadeUponeone}
                    className="mt-5 2xl:mt-10 pt-1"
                  >
                    <p className="text-md 2xl:text-lg font-light lettersp-2">
                      The CityGate Tower
                      <br />
                      P.O.Box 88, Sharjah, UAE
                    </p>
                  </motion.div>
                </div>
                <div className="flex gap-[7px]">
                  <Link target="_blank" href="https://www.facebook.com/beamedusocial/">
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
                    >
                      <FaFacebookF className="text-sm" />
                    </motion.div>
                  </Link>
                  <Link target="_blank" href="https://x.com/beamedusocial">
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
                    >
                      <FaXTwitter className="text-sm" />
                    </motion.div>
                  </Link>
                  <Link target="_blank" href="https://www.linkedin.com/company/bukhatireducation/">
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
                    >
                      <FaLinkedinIn className="text-sm" />
                    </motion.div>
                  </Link>
                  <Link target="_blank" href="https://www.instagram.com/accounts/login/?next=%2Fbeamedusocial%2F&source=omni_redirect">
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
                    >
                      <FaInstagram className="text-sm" />
                    </motion.div>
                  </Link>
                  <Link target="_blank" href="https://www.youtube.com/c/BukhatirEducation">
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
                    >
                      <FaYoutube className="text-sm" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                variants={parentStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 text-sm text-white"
              >
                <motion.div
                  className="flex flex-col gap-3 text-sm font-light"
                  variants={fadeUponeone}
                >
                  <Link
                    href="/about-us/our-story"
                    className="group relative overflow-hidden hover:text-primary"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      About Us
                    </span>
                  </Link>
                  <Link
                    href="/beam-schools"
                    className="group relative overflow-hidden hover:text-primary"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      Our Schools
                    </span>
                  </Link>
                  {/* <Link
                    href="/"
                    className="group relative overflow-hidden hover:text-primary"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      Curriculum Overview
                    </span>
                  </Link>
                  <Link
                    href="/"
                    className="group relative overflow-hidden hover:text-primary"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      Application Process
                    </span>
                  </Link> */}
                  <Link href="/contact-us?scroll=register"
                    className="group relative overflow-hidden hover:text-primary max-md:mb-3"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      Register Your Interest
                    </span>
                  </Link>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-3 text-sm font-light"
                  variants={fadeUponeone}
                >
                  <Link
                    href="/news-&-media/blog"
                    className="group relative overflow-hidden hover:text-primary"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      Blogs
                    </span>
                  </Link>
                  <Link
                    href="/news-&-media/media-gallery"
                    className="group relative overflow-hidden hover:text-primary"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      Media Gallery
                    </span>
                  </Link>
                  <Link
                    href="/news-&-media/press-release"
                    className="group relative overflow-hidden hover:text-primary"
                  >
                    <span className="block transition-transform duration-300 group-hover:translate-x-1">
                      Press Release
                    </span>
                  </Link>
                  
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Right Column (Empty or for future use) */}
          <motion.div
            className="flex flex-col md:pl-[45px] xl:pl-[75px] 2xl:pl-[144px] gap-2 md:gap-14 2xl:gap-[73px] pt-8 pb-0 xl:pt-0 md:pb-0 md:mt-0"
            variants={parentStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUponeone}>
              <h2 className="text-xl xl:text-2xl 2xl:text-4xl font-light lettersp-4"> Register Interest </h2>
            </motion.div>
            <div className="text-sm font-light leading-[1.52] pt-5 xl:pt-15">
              <form action="" className="flex flex-col gap-10 xl:gap-[43px]" onSubmit={handleSubmit(onSubmit)}>
                <motion.div className="flex flex-col" variants={fadeUponeone}>
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="border-b border-[#666666] focus:outline-none"
                  />
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.name?.message || ""}
                  </p>
                </motion.div>
                <motion.div className="flex flex-col" variants={fadeUponeone}>
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="border-b border-[#666666] focus:outline-none"
                  />
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.email?.message || ""}
                  </p>
                </motion.div>
                <motion.div className="flex flex-col" variants={fadeUponeone}>
                  <label htmlFor="">Phone</label>
                  <input
                    type="text"
                    {...register("phone")}
                    className="border-b border-[#666666] focus:outline-none"
                  />
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.phone?.message || ""}
                  </p>
                </motion.div>
                <motion.div className="flex flex-col" variants={fadeUponeone}>
                  <label htmlFor="">Message</label>
                  <textarea
                    id=""
                    {...register("message")}
                    className="border-b border-[#666666] focus:outline-none h-[85px] 2xl:h-[115px]"
                  ></textarea>
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.message?.message || ""}
                  </p>
                </motion.div>

                <div>
                  <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} ref={recaptchaRef} className='mt-5' />

                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                  <motion.div
                    variants={fadeUponeone}
                    className="w-fit mt-5 md:mt-7  2xl:mt-6 p-[1px] group transition-all duration-300 border-[1px] border-primary rounded-full hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]"
                  >
                    <button type="submit" className="cursor-pointer px-2 md:px-5 py-2 md:py-3 bg-transparent rounded-full flex items-center gap-2 transition-all duration-300">
                      <p className="text-xs font-light text-white uppercase transition-colors duration-300">
                        Submit
                      </p>
                      <div className="p-2 flex items-center justify-center bg-primary w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                        <Image
                          src="/assets/arrow.svg"
                          alt="arrow"
                          width={7}
                          height={7}
                        />
                      </div>
                    </button>
                  </motion.div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-[#101010] relative py-4">
        <div className="container">
          <motion.div variants={fadeUponeone}>
            <p className="text-[#626262] relative">
              BEAM is a subsidiary of Bukhatir Group. © All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
