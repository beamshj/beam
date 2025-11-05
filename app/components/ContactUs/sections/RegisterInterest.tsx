"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";
import { motion } from "framer-motion";
import { schoolData } from "../data";

const formSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Enter valid number"),
  findUs: z.string().min(1, "Please select an option"),
  selectSchool: z.string().min(1, "Please select an option"),
  selectGrade: z.string().min(1, "Please select an option"),
});

type FormData = z.infer<typeof formSchema>;

const RegisterInterest = () => {

  const [selectedSchool, setSelectedSchool] = React.useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/admin/interest", {
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
    <div className="pb-0 lg:pb-20 xl:pb-[135px]" id="registerInterest">
      <div
        className="relative w-full max-w-[1920px] h-auto py-12 2xl:py-0 2xl:h-[736px] bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: "url('/images/contact-us/interest.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/78"></div>
        <div className="relative z-10 container flex flex-col lg:flex-row gap-0 lg:gap-[117px]">
          {/* Left section */}
          <div className="lg:w-[36%]">
            <SplitText
              tag="h1"
              text="Register Your Interest"
              delay={100}
              className="lg:text-2xl xl:text-3xl 2xl:text-4xl text-white font-light leading-[1.111] lettersp-4"
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-10px"
              textAlign="left"
            />
            <p className="text-white text-xl leading-[1.2] font-light mt-4 xl:mt-[27px]">
              Take the first step
            </p>
            <div className="mt-4 xl:mt-[27px] text-sm leading-[1.52] font-light">
              <p className="text-white">
                Register your interest at BEAM’s Creative Science Schools to be
                contacted by our Registrations team.
              </p>
            </div>
          </div>
          {/* Right form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-[68%] lg:space-y-12 mt-10 xl:mt-0"
          >
            <div className="flex flex-col lg:flex-row lg:gap-[54px]">
              <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  {...register("fullName")}
                  className="w-full border-b border-white py-[23px] focus:outline-none placeholder:text-white text-sm font-light text-white"
                />
                <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                  {errors.fullName?.message || ""}
                </p>
              </motion.div>
              <motion.div
                variants={moveUp(0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <input
                  type="email"
                  placeholder="Enter Your Email ID"
                  {...register("email")}
                  className="w-full border-b border-white py-[23px] focus:outline-none placeholder:text-white text-sm font-light text-white"
                />
                <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                  {errors.email?.message || ""}
                </p>
              </motion.div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-[54px]">
              <motion.div
                variants={moveUp(0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full lg:w-1/2 relative"
              >
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  {...register("phone")}
                  className="w-full border-b border-white py-[23px] focus:outline-none placeholder:text-white text-sm font-light text-white"
                />
                <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                  {errors.phone?.message || ""}
                </p>
              </motion.div>
              <motion.div
                variants={moveUp(0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full lg:w-1/2 relative"
              >
                <select
                  {...register("findUs")}
                  className="w-full border-b border-white py-[23px] pr-10 focus:outline-none text-white text-sm font-light appearance-none"
                >
                  <option value="" className="bg-black">Where did you find us ?</option>
                  <option value="instagram" className="bg-black ">Instagram</option>
                  <option value="website" className="bg-black ">Website</option>
                  <option value="friends" className="bg-black ">Friends</option>
                </select>
                {/* Custom arrow icon */}
                <span className="absolute top-1/3 right-0 -translate-y-1/2 pointer-events-none">
                  <Image
                    src="/images/arrow-down.svg"
                    width={24}
                    height={24}
                    alt="dropdown arrow"
                    className="filter invert brightness-0 saturate-0 contrast-[2000%]"
                  />
                </span>

                {errors.findUs && (
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.findUs.message}
                  </p>
                )}
              </motion.div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-[55px]">
              <motion.div
                variants={moveUp(1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full lg:w-1/2 relative"
              >
                <select
                  {...register("selectSchool")}
                  className="w-full border-b border-white py-[23px] pr-10 focus:outline-none text-white text-sm font-light appearance-none"
                onChange={(e) => setSelectedSchool(e.target.value)}
                >
                  <option value="" className="bg-black">Select School</option>
                  {schoolData.map((school) => (
                    <option key={school.name} value={school.name} className="bg-black" >{school.name}</option>
                  ))}
                  {/* <option value="" className="bg-black">Select School</option>
                  <option value="admission" className="bg-black">Admission</option>
                  <option value="career" className="bg-black">Career</option>
                  <option value="general" className="bg-black">General</option> */}
                </select>
                {/* Custom arrow icon */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image
                    src="/images/arrow-down.svg"
                    width={24}
                    height={24}
                    alt="dropdown arrow"
                    className="filter invert brightness-0 saturate-0 contrast-[2000%]"
                  />
                </span>

                {errors.selectSchool && (
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.selectSchool.message}
                  </p>
                )}
              </motion.div>
              <motion.div
                variants={moveUp(1.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-full lg:w-1/2"
              >
                <select
                  {...register("selectGrade")}
                  className="w-full border-b border-white py-[23px] pr-10 focus:outline-none text-white text-sm font-light appearance-none"
                
                >
                  <option value="" className="bg-black">Select Grade</option>
                  {schoolData.find((school) => school.name === selectedSchool)?.grades.map((grade) => (
                    <option key={grade} value={grade} className="bg-black">{grade}</option>
                  ))}
                </select>
                {/* Custom arrow icon */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image
                    src="/images/arrow-down.svg"
                    width={24}
                    height={24}
                    alt="dropdown arrow"
                    className="filter invert brightness-0 saturate-0 contrast-[2000%]"
                  />
                </span>

                {errors.selectGrade && (
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.selectGrade.message}
                  </p>
                )}
              </motion.div>
            </div>
            <motion.div
              variants={moveUp(1.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative inline-block mt-[40px] lg:mt-0"
            >
              {/* SVG border */}
              <Image
                src="/images/contact-us/btn-border.svg"
                alt="Button border"
                fill
                className="absolute top-0 left-0 w-full h-full object-contain"
              />

              {/* Button */}
              <button
                type="submit"
                className="relative group flex items-center uppercase justify-center gap-[10px] px-[20px] py-[11px] w-full h-full text-white bg-transparent rounded-[50px] text-xs font-light overflow-hidden"
              >
                SEND ENQUIRY
                <span className="flex items-center justify-center w-[27px] h-[27px] bg-primary rounded-full transition-transform duration-300 group-hover:translate-x-2">
                  <Image
                    src="/images/arrow-black.svg"
                    alt="Arrow"
                    width={8}
                    height={8}
                    className="object-contain filter invert"
                  />
                </span>
              </button>
            </motion.div>
          </form>
        </div>
      </div>
      <motion.div
        variants={moveUp(1.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="h-[1px] bg-[#D3D3D3] w-full container mt-12 md:mt-20 xl:mt-[135px]"
      />
    </div>
  );
};

export default RegisterInterest;
