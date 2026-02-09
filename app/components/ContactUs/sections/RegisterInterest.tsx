"use client";
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { moveUp } from "../../motionVarients";
import { motion } from "framer-motion";
import { schoolData } from "../data";
import ReCAPTCHA from "react-google-recaptcha";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import "../../Common/react-select-custom.css";

const formSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Enter valid number"),
  findUs: z.string().min(1, "Please select an option"),
  selectSchool: z.string().min(1, "Please select an option"),
  selectGrade: z.string().min(1, "Please select an option"),
  enrollmentYear: z.string().min(1, "Please select an option"),
});

type FormData = z.infer<typeof formSchema>;

interface RegisterInterestProps {
  className?: string;
}


// Custom dropdown indicator
const DropdownIndicator = () => {
  return (
    <div className="pointer-events-none">
      <img src="/images/arrow-down.svg" width={24} height={24} alt="dropdown arrow" className="filter invert brightness-0 saturate-0 contrast-[2000%]" />
    </div>
  );
};
const RegisterInterest = forwardRef<HTMLDivElement, RegisterInterestProps>(
  ({ className }, ref) => {
    const [loadCaptcha, setLoadCaptcha] = useState(false);
    const captchaRef = useRef<HTMLDivElement>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    useEffect(() => {
      const captchaObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoadCaptcha(true);
            captchaObserver.disconnect();
          }
        },
        { rootMargin: "100px" }
      );

      if (captchaRef.current) captchaObserver.observe(captchaRef.current);

      return () => captchaObserver.disconnect();
    }, []);

    const [selectedSchool, setSelectedSchool] = React.useState("");
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      control, 
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
    });

    const [error, setError] = useState("");
    const isArabic = useIsPreferredLanguageArabic()

    const onSubmit = async (data: FormData) => {
      try {
        const captchaValue = recaptchaRef?.current?.getValue();
        if (!captchaValue) {
          setError("Please verify yourself to continue");
          return;
        }
        setError("");
        const response = await fetch("/api/admin/interest", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.success) {
          alert(res.message);
          reset();
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.log("Error sending message", error);
        alert("Sorry, something went wrong. Please try again later.");
      } finally {
        recaptchaRef.current?.reset();
      }
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("register-interest-ready"));
      }, 300);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className={`pb-0 lg:pb-20 xl:pb-[135px] ${className ?? ""}`} ref={ref} id="registerInterest" >
        <div className="relative w-full max-w-[1920px] h-auto py-12 2xl:py-[100px] bg-cover bg-center flex justify-center items-center"
          style={{ backgroundImage: "url('/images/contact-us/interest.jpg')", }}
        >
          <div className="absolute inset-0 bg-black/78"></div>
          <div className="relative z-10 container flex flex-col lg:flex-row gap-0 lg:gap-[117px]">
            {/* Left section */}
            <div className="lg:w-[36%]">
              <SplitText
                tag="h1"
                text={isArabic ? "سجل اهتمام" : "Register Your Interest"}
                delay={100}
                className="lg:text-2xl xl:text-3xl 2xl:text-4xl text-white font-light leading-[1.111] lettersp-4"
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-10px"
                textAlign={isArabic ? "right" : "left"}
              />
              <p className="text-white text-xl leading-[1.2] font-light mt-4 xl:mt-[27px]">
                
                {isArabic ? "ابدأ خطوتك الأولى معنا" : "Take the first step"}
              </p>
              <div className="mt-4 xl:mt-[27px] text-sm leading-[1.52] font-light">
                <p className="text-white">
                  {isArabic ? "سجل اهتمام في مدارس الإبداع العلمي ليتم الاتصال بك من قبل فريق التسجيل لدينا." : "Register your interest at BEAM’s Creative Science Schools to be contacted by our Registrations team."}
                </p>
              </div>
            </div>
            {/* Right form */}
            <form
              onSubmit={handleSubmit(onSubmit)} onFocus={() => setLoadCaptcha(true)}
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
                    placeholder={isArabic ? "الاسم الكامل" :"Enter Your Full Name"}
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
                    placeholder={isArabic ? "عنوان البريد الالكتروني" : "Enter Your Email ID"}
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
                    placeholder={isArabic ? "الهاتف المتحرك" : "Enter Your Phone Number"}
                    {...register("phone")}
                    className="w-full border-b border-white py-[23px] focus:outline-none placeholder:text-white text-sm font-light text-white"
                  />
                  <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                    {errors.phone?.message || ""}
                  </p>
                </motion.div>
                <motion.div variants={moveUp(0.8)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="w-full lg:w-1/2 relative" >
                  <Controller
                    name="findUs"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: 'Admission', label: isArabic ? 'القبول' : 'Admission' },
                          { value: 'career', label: isArabic ? 'المسار المهني' : 'Career' },
                          { value: 'general', label: isArabic ? 'عام' : 'General' },
                        ]}
                        className="custom-select"
                        classNamePrefix="custom-select"
                        placeholder={isArabic ? "غرض الاستفسار" : "Purpose of inquiry"}
                        components={{ DropdownIndicator }}
                        isSearchable={false}
                        onChange={(option) => field.onChange(option?.value || "")}
                        value={[
                          { value: 'Admission', label: isArabic ? 'القبول' : 'Admission' },
                          { value: 'career', label: isArabic ? 'المسار المهني' : 'Career' },
                          { value: 'general', label: isArabic ? 'عام' : 'General' },
                        ].find(opt => opt.value === field.value) || null}
                      />
                    )}
                  />

                  {errors.findUs && (
                    <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                      {errors.findUs.message}
                    </p>
                  )}
                </motion.div>
                
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-[54px]">
                {/* How did you hear about us? */}
                <motion.div
                  variants={moveUp(0.8)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="w-full lg:w-1/2 relative"
                >
                  <Controller
                    name="findUs"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: 'instagram', label: isArabic ? 'إنستغرام' : 'Instagram' },
                          { value: 'facebook', label: isArabic ? 'فيسبوك' : 'Facebook' },
                          { value: 'website', label: isArabic ? 'الموقع الإلكتروني' : 'Website' },
                          { value: 'friends', label: isArabic ? 'الأصدقا' : 'Friends' },
                        ]}
                        className="custom-select"
                        classNamePrefix="custom-select"
                        placeholder={isArabic ? "من أين وجدتنا؟" : "How did you hear about us?"}
                        components={{ DropdownIndicator }}
                        isSearchable={false}
                        onChange={(option) => field.onChange(option?.value || "")}
                        value={[
                          { value: 'instagram', label: isArabic ? 'إنستغرام' : 'Instagram' },
                          { value: 'website', label: isArabic ? 'الموقع الإلكتروني' : 'Website' },
                          { value: 'friends', label: isArabic ? 'الأصدقا' : 'Friends' },
                        ].find(opt => opt.value === field.value) || null}
                      />
                    )}
                  />

                  {errors.findUs && (
                    <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                      {errors.findUs.message}
                    </p>
                  )}
                </motion.div>
                {/* Select School */}
                <motion.div
                  variants={moveUp(1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="w-full lg:w-1/2 relative"
                >
                  <Controller
                    name="selectSchool"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={schoolData.map((school) => ({
                          value: school.name,
                          label: isArabic ? school.name_ar : school.name,
                        }))}
                        className="custom-select"
                        classNamePrefix="custom-select"
                        placeholder={isArabic ? "اختر المدرسة" : "Select School"}
                        components={{ DropdownIndicator }}
                        isSearchable={false}
                        onChange={(option) => {
                          field.onChange(option?.value || "");
                          setSelectedSchool(option?.value || "");
                        }}
                        value={schoolData.map((school) => ({
                          value: school.name,
                          label: isArabic ? school.name_ar : school.name,
                        })).find(opt => opt.value === field.value) || null}
                      />
                    )}
                  />

                  {errors.selectSchool && (
                    <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                      {errors.selectSchool.message}
                    </p>
                  )}
                </motion.div>
                </div>
              <div className="flex flex-col lg:flex-row lg:gap-[55px]">
               
                <motion.div
                  variants={moveUp(1.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative w-full lg:w-1/2"
                >
                  <Controller
                    name="selectGrade"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={
                          schoolData
                            .find((school) => school.name === selectedSchool)
                            ?.grades.map((grade) => ({
                              value: grade,
                              label: grade,
                            })) || []
                        }
                        className="custom-select"
                        classNamePrefix="custom-select"
                        placeholder={isArabic ? "اختر الصف" : "Select Grade"}
                        components={{ DropdownIndicator }}
                        isSearchable={false}
                        isDisabled={!selectedSchool}
                        onChange={(option) => field.onChange(option?.value || "")}
                        value={
                          schoolData
                            .find((school) => school.name === selectedSchool)
                            ?.grades.map((grade) => ({
                              value: grade,
                              label: grade,
                            }))
                            .find(opt => opt.value === field.value) || null
                        }
                      />
                    )}
                  />

                  {errors.selectGrade && (
                    <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                      {errors.selectGrade.message}
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
                  <Controller
                    name="enrollmentYear"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: '2025/2026', label: '2025/2026' },
                          { value: '2026/2027', label: '2026/2027' },
                        ]}
                        className="custom-select"
                        classNamePrefix="custom-select"
                        placeholder={isArabic ? "سنة التسجيل" : "Enrollment Year"}
                        components={{ DropdownIndicator }}
                        isSearchable={false}
                        onChange={(option) => field.onChange(option?.value || "")}
                        value={[
                          { value: '2025/2026', label: '2025/2026' },
                          { value: '2026/2027', label: '2026/2027' },
                        ].find(opt => opt.value === field.value) || null}
                      />
                    )}
                  />

                  {errors.enrollmentYear && (
                    <p className="text-red-500 text-xs font-light pt-1 min-h-[20px]">
                      {errors.enrollmentYear.message}
                    </p>
                  )}
                </motion.div>

              </div>

              <div ref={captchaRef} className=''>
                {loadCaptcha && (
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  ref={recaptchaRef}
                  className="mt-5 mb-10"
                />
                )}
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                <motion.div
                  variants={moveUp(1.4)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative inline-block mt-[40px] lg:mt-2"
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
                    {isArabic ? "إرسال الاستفسار" : "SEND ENQUIRY"}
                    <span className={`flex items-center justify-center w-[27px] h-[27px] bg-primary rounded-full transition-transform duration-300 ${isArabic ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}>
                      <Image
                        src="/images/arrow-black.svg"
                        alt="Arrow"
                        width={8}
                        height={8}
                        className={`object-contain filter invert ${isArabic && "-rotate-90"}`}
                      />
                    </span>
                  </button>
                </motion.div>
              </div>
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
  }
);

RegisterInterest.displayName = "RegisterInterest";
export default RegisterInterest;
