"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const formSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Enter valid number"),
  findUs: z.string().min(1, "Please select a purpose"),
  selectSchool: z.string().min(1, "Please select a purpose"),
  selectGrade: z.string().min(1, "Please select a purpose"),
});

type FormData = z.infer<typeof formSchema>;

const RegisterInterest: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="pb-12 md:pb-20 xl:pb-[135px]">
      <div
        className="relative w-full max-w-[1920px] h-auto py-12 2xl:py-0 2xl:h-[736px] bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: "url('/images/contact-us/interest.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/78"></div>
        <div className="relative z-10 container flex flex-col lg:flex-row gap-[30px] lg:gap-[117px]">
          {/* Left section */}
          <div className="lg:w-[36%]">
            <h1 className="text-3xl xl:text-4xl text-white font-light leading-[1.111] lettersp-4">
              Register Your Interest
            </h1>
            <p className="text-white text-xl leading-[1.2] mt-[27px]">
              Take the first step
            </p>
            <div className="mt-[27px] text-sm leading-[1.52] font-light">
              <p className="text-white">
                Register your interest at BEAM’s Creative Science Schools to be
                contacted by our Registrations team.
              </p>
            </div>
          </div>
          {/* Right form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-[68%] lg:space-y-[70px]"
          >
            <div className="flex flex-col lg:flex-row lg:gap-[54px]">
              <div className="w-full lg:w-1/2">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  {...register("fullName")}
                  className="w-full border-b border-white py-[23px] focus:outline-none placeholder:text-white text-sm"
                />
                <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                  {errors.fullName?.message || ""}
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <input
                  type="email"
                  placeholder="Enter Your Email ID"
                  {...register("email")}
                  className="w-full border-b border-white py-[23px] focus:outline-none placeholder:text-white text-sm"
                />
                <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                  {errors.email?.message || ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-[54px]">
              <div className="w-full lg:w-1/2">
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  {...register("phone")}
                  className="w-full border-b border-white py-[23px] focus:outline-none placeholder:text-white text-sm"
                />
                <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                  {errors.phone?.message || ""}
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <select
                  {...register("findUs")}
                  className="w-full border-b border-white py-[23px] pr-10 focus:outline-none text-white text-sm appearance-none"
                >
                  <option value="">Purpose of enquiry</option>
                  <option value="admission">Admission</option>
                  <option value="career">Career</option>
                  <option value="general">General</option>
                </select>
                {/* Custom arrow icon */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {/* Replace below with your own icon component or img */}
                  <Image
                    src="/images/arrow-down.svg"
                    width={16}
                    height={8}
                    alt="dropdown arrow"
                  />
                </span>
                {errors.findUs && (
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.findUs.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-[55px]">
              <div className="w-full lg:w-1/2">
                <select
                  {...register("selectSchool")}
                  className="w-full border-b border-white py-[23px] pr-10 focus:outline-none text-white text-sm appearance-none"
                >
                  <option value="">Purpose of enquiry</option>
                  <option value="admission">Admission</option>
                  <option value="career">Career</option>
                  <option value="general">General</option>
                </select>
                {/* Custom arrow icon */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {/* Replace below with your own icon component or img */}
                  <Image
                    src="/images/arrow-down.svg"
                    width={16}
                    height={8}
                    alt="dropdown arrow"
                  />
                </span>
                {errors.selectSchool && (
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.selectSchool.message}
                  </p>
                )}
              </div>
              <div className="w-full lg:w-1/2">
                <select
                  {...register("selectGrade")}
                  className="w-full border-b border-white py-[23px] pr-10 focus:outline-none text-white text-sm appearance-none"
                >
                  <option value="">Purpose of enquiry</option>
                  <option value="admission">Admission</option>
                  <option value="career">Career</option>
                  <option value="general">General</option>
                </select>
                {/* Custom arrow icon */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {/* Replace below with your own icon component or img */}
                  <Image
                    src="/images/arrow-down.svg"
                    width={16}
                    height={8}
                    alt="dropdown arrow"
                  />
                </span>
                {errors.selectGrade && (
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.selectGrade.message}
                  </p>
                )}
              </div>
            </div>
            <div className="relative inline-block mt-[40px] lg:mt-0">
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
            </div>
          </form>
        </div>
      </div>
      <div className="h-[1px] bg-[#D3D3D3] w-full container mt-12 md:mt-20 xl:mt-[135px]" />
    </div>
  );
};

export default RegisterInterest;
