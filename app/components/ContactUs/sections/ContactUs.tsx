"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { FirstSection } from "../type";
import { Listbox } from "@headlessui/react";

const options = [
  { value: "", label: "Purpose of enquiry" },
  { value: "admission", label: "Admission" },
  { value: "career", label: "Career" },
  { value: "general", label: "General" },
];

const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Enter valid number"),
  purpose: z.preprocess(
        (val) => typeof val === "string" ? val : "",
        z.string({ required_error: "Purpose is required" }).min(1, "Purpose is required")
      ),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm: React.FC<{ data: FirstSection }> = ({ data }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
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
    <section className="container py-10 lg:py-15 xl:py-[135px]">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 xl:gap-20 2xl:gap-[103px]">
        {/* Left section */}
        <div className="lg:w-[34%]">
          <SplitText
            tag="h1"
            text="Get In Touch"
            className="text-lg lg:text-xl xl:text-3xl 2xl:text-4xl text-black font-light leading-[1.111] lettersp-4"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-10px"
            textAlign="left"
          />
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-colorpara font-light text-sm leading-[1.52] mt-[13px]"
          >
            {data.description}
          </motion.p>
          <div className="mt-[13px] text-sm leading-[1.52] font-light">
            <motion.h2
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-primary text-md lg:text-lg xl:text-xl leading-[1.2] font-light"
            >
              {data.subTitle}
            </motion.h2>
            <motion.p
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-colorpara mt-[17px] font-light whitespace-pre-line"
            >
              {data.address}
            </motion.p>
            <div className="space-y-[17px] mt-[17px]">
              {/* First row */}
              <motion.div
                className="flex items-center gap-[20px]"
                variants={moveUp(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Image
                  src="/images/contact-us/icons/phone.svg"
                  alt="Location"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <motion.p
                  variants={moveUp(0.5)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="font-light text-sm leading-[1.52] text-primary"
                >
                  {data.phone}
                </motion.p>
              </motion.div>

              {/* Second row */}
              <motion.div
                className="flex items-center gap-[20px]"
                variants={moveUp(0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Image
                  src="/images/contact-us/icons/email.svg"
                  alt="Mail"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <motion.a
                  variants={moveUp(0.6)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  href="mailto:enquiries@beam.co.ae"
                  className="text-primary font-light text-sm leading-[1.52]"
                >
                  {data.email}
                </motion.a>
              </motion.div>
            </div>
          </div>
          <motion.div
            variants={moveUp(0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-[17px] w-full max-h-[287px] 2xl:max-w-[453px] rounded-[12px] overflow-hidden"
          >
            <div className="relative w-full pt-[63.35%]">
              <iframe
                src={data.map}
                className="absolute inset-0 w-full h-full rounded-[12px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Right form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-[68%] lg:space-y-12"
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
                placeholder="Enter Your First Name"
                {...register("firstName")}
                className="w-full border-b text-colorpara border-colorpara py-2 xl:py-[23px] focus:outline-none placeholder:text-colorpara text-sm font-light"
              />
              <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                {errors.firstName?.message || ""}
              </p>
            </motion.div>

            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <input
                type="text"
                placeholder="Enter Second Name"
                {...register("lastName")}
                className="w-full border-b text-colorpara border-colorpara py-2 xl:py-[23px] focus:outline-none placeholder:text-colorpara text-sm font-light"
              />
              <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                {errors.lastName?.message || ""}
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-[54px]">
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <input
                type="email"
                placeholder="Enter Your Email ID"
                {...register("email")}
                className="w-full border-b text-colorpara border-colorpara py-2 xl:py-[23px] focus:outline-none placeholder:text-colorpara text-sm font-light"
              />
              <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                {errors.email?.message || ""}
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
                type="text"
                placeholder="Enter Your Phone Number"
                {...register("phone")}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, ""); // remove non-digits
                }}
                className="w-full border-b text-colorpara border-colorpara py-2 xl:py-[23px] focus:outline-none placeholder:text-colorpara text-sm font-light"
              />
              <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                {errors.phone?.message || ""}
              </p>
            </motion.div>
          </div>
          <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full"
          >
            <Controller
              control={control}
              name="purpose"
              render={({ field }) => (
                <Listbox
                  value={
                    options.find((o) => o.value === field.value) || options[0]
                  }
                  onChange={(val) => field.onChange(val.value)}
                >
                  {({ open }) => (
                    <div className="relative w-full">
                      <Listbox.Button className="w-full border-b text-colorpara cursor-pointer border-colorpara py-2 xl:py-[23px] focus:outline-none placeholder:text-colorpara text-sm font-light text-left">
                        {options.find((o) => o.value === field.value)?.label ||
                          "Purpose of enquiry"}
                      </Listbox.Button>

                      {/* Custom arrow icon */}
                      <span
                        className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                          }`}
                      >
                        <Image
                          src="/images/arrow-down.svg"
                          width={24}
                          height={24}
                          alt="dropdown arrow"
                        />
                      </span>

                      <Listbox.Options className="absolute mt-1 w-full bg-white rounded-[12px] shadow-lg overflow-hidden border z-50">
                        {options.map((option) => (
                          <Listbox.Option
                            key={option.value}
                            value={option}
                            className={({ active }) =>
                              `cursor-pointer select-none py-2 px-4 font-light ${active
                                ? "bg-[#42BADC] text-white"
                                : "text-colorpara"
                              }`
                            }
                          >
                            {option.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              )}
            />

            {errors.purpose && (
              <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                {errors.purpose.message}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={moveUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <textarea
              rows={4}
              placeholder="Tell us more"
              {...register("message")}
              className="w-full border-b text-colorpara border-colorpara py-8 xl:py-[23px] focus:outline-none resize-none placeholder:text-colorpara text-sm font-light"
            />
            {errors.message && (
              <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                {errors.message.message}
              </p>
            )}
          </motion.div>
          <motion.div
            variants={moveUp(0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative inline-block rounded-[50px] p-[1px] bg-gradient-to-r from-[#42BADC] to-[#12586C] mt-5 2xl:mt-0"
          >
            <button
              type="submit"
              className="group cursor-pointer flex items-center justify-center gap-[10px] px-[20px] py-[11px] w-full h-full text-black bg-white rounded-[50px] text-xs font-light overflow-hidden"
            >
              SEND MESSAGE
              {/* Arrow circle */}
              <span className="flex items-center justify-center w-[27px] h-[27px] bg-primary rounded-full transition-transform duration-300 group-hover:translate-x-2">
                <Image
                  src="/images/arrow-black.svg"
                  alt="Arrow"
                  width={8}
                  height={8}
                  className="object-contain transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
