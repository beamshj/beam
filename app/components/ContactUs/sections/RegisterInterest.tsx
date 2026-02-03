"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  forwardRef,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { schoolData } from "../data";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

// --------------------
// Lazy components
// --------------------

const SplitText = dynamic(() => import("@/components/SplitText"));

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

// --------------------
// Motion variants
// --------------------

const MOTION_VARIANTS = {
  moveUp: (delay: number): Variants => ({
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }),
};

// --------------------
// Schema
// --------------------

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  findUs: z.string().min(1),
  selectSchool: z.string().min(1),
  selectGrade: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

interface RegisterInterestProps {
  className?: string;
}

// --------------------
// Component
// --------------------

const RegisterInterest = forwardRef<HTMLDivElement, RegisterInterestProps>(
  ({ className = "" }, ref) => {

    const isArabic = useIsPreferredLanguageArabic();
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState("");

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onBlur",
    });

    const translations = useMemo(() => ({
      title: isArabic ? "سجل اهتمام" : "Register Your Interest",
      subtitle: isArabic ? "ابدأ خطوتك الأولى معنا" : "Take the first step",
      description: isArabic
        ? "سجل اهتمام في مدارس الإبداع العلمي ليتم الاتصال بك من قبل فريق التسجيل لدينا."
        : "Register your interest at BEAM’s Creative Science Schools to be contacted by our Registrations team.",
      fullName: isArabic ? "الاسم الكامل" : "Enter Your Full Name",
      email: isArabic ? "عنوان البريد الالكتروني" : "Enter Your Email ID",
      phone: isArabic ? "الهاتف المتحرك" : "Enter Your Phone Number",
      findUs: isArabic ? "من أين وجدتنا؟" : "Where did you find us?",
      selectSchool: isArabic ? "اختر المدرسة" : "Select School",
      selectGrade: isArabic ? "اختر الصف" : "Select Grade",
      submit: isArabic ? "إرسال الاستفسار" : "SEND ENQUIRY",
      captchaError: isArabic
        ? "يرجى التحقق من نفسك للمتابعة"
        : "Please verify yourself to continue",
    }), [isArabic]);

    const gradeOptions = useMemo(() => {
      const school = schoolData.find(s => s.name === selectedSchool);
      return school?.grades || [];
    }, [selectedSchool]);

    const onSubmit = useCallback(async (data: FormData) => {

      if (isSubmitting) return;

      if (!captchaToken) {
        setCaptchaError(translations.captchaError);
        return;
      }

      try {
        setIsSubmitting(true);
        setCaptchaError("");

        const response = await fetch("/api/admin/interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, captcha: captchaToken }),
        });

        const res = await response.json();

        alert(res.message);

        if (res.success) {
          reset();
          setSelectedSchool("");
          setCaptchaToken(null);
        }

      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setIsSubmitting(false);
      }

    }, [captchaToken, isSubmitting, reset, translations.captchaError]);

    useEffect(() => {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("register-interest-ready"));
      }, 300);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        ref={ref}
        id="registerInterest"
        className={`pb-0 lg:pb-20 xl:pb-[135px] ${className}`}
      >

        <div
          className="relative w-full max-w-[1920px] py-12 2xl:h-[736px] bg-cover bg-center flex justify-center items-center"
          style={{ backgroundImage: "url('/images/contact-us/interest.jpg')" }}
        >

          <div className="absolute inset-0 bg-black/78" />

          <div className="relative z-10 container flex flex-col lg:flex-row gap-[117px]">

            {/* LEFT */}

            <div className="lg:w-[36%]">

              <SplitText
                tag="h1"
                text={translations.title}
                delay={100}
                className="lg:text-2xl xl:text-3xl 2xl:text-4xl text-white font-light"
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                textAlign={isArabic ? "right" : "left"}
              />

              <p className="text-white text-xl mt-4">
                {translations.subtitle}
              </p>

              <p className="text-white text-sm mt-6">
                {translations.description}
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:w-[68%] lg:space-y-12 mt-10 xl:mt-0"
            >

              <div className="flex flex-col lg:flex-row lg:gap-[54px]">

                <motion.div variants={MOTION_VARIANTS.moveUp(0.2)} initial="hidden" whileInView="show">
                  <input
                    placeholder={translations.fullName}
                    {...register("fullName")}
                    className="w-full border-b border-white py-[23px] bg-transparent text-white"
                  />
                  <p className="text-red-500 text-xs">{errors.fullName?.message}</p>
                </motion.div>

                <motion.div variants={MOTION_VARIANTS.moveUp(0.4)} initial="hidden" whileInView="show">
                  <input
                    type="email"
                    placeholder={translations.email}
                    {...register("email")}
                    className="w-full border-b border-white py-[23px] bg-transparent text-white"
                  />
                  <p className="text-red-500 text-xs">{errors.email?.message}</p>
                </motion.div>

              </div>

              <div className="flex flex-col lg:flex-row lg:gap-[54px]">

                <motion.div variants={MOTION_VARIANTS.moveUp(0.6)} initial="hidden" whileInView="show">
                  <input
                    placeholder={translations.phone}
                    {...register("phone")}
                    className="w-full border-b border-white py-[23px] bg-transparent text-white"
                  />
                  <p className="text-red-500 text-xs">{errors.phone?.message}</p>
                </motion.div>

                <motion.div variants={MOTION_VARIANTS.moveUp(0.8)} initial="hidden" whileInView="show">
                  <select
                    {...register("findUs")}
                    className="w-full border-b border-white py-[23px] bg-transparent text-white"
                  >
                    <option value="">{translations.findUs}</option>
                    <option value="instagram">Instagram</option>
                    <option value="website">Website</option>
                    <option value="friends">Friends</option>
                  </select>
                  <p className="text-red-500 text-xs">{errors.findUs?.message}</p>
                </motion.div>
              </div>

              <div className="flex flex-col lg:flex-row lg:gap-[55px]">

                <motion.div variants={MOTION_VARIANTS.moveUp(1)} initial="hidden" whileInView="show">
                  <select
                    {...register("selectSchool")}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="w-full border-b border-white py-[23px] bg-transparent text-white"
                  >
                    <option value="">{translations.selectSchool}</option>
                    {schoolData.map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-xs">{errors.selectSchool?.message}</p>
                </motion.div>

                <motion.div variants={MOTION_VARIANTS.moveUp(1.2)} initial="hidden" whileInView="show">
                  <select
                    {...register("selectGrade")}
                    className="w-full border-b border-white py-[23px] bg-transparent text-white"
                  >
                    <option value="">{translations.selectGrade}</option>
                    {gradeOptions.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <p className="text-red-500 text-xs">{errors.selectGrade?.message}</p>
                </motion.div>

              </div>

              {/* CAPTCHA */}

              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={(token) => setCaptchaToken(token)}
                className="mt-5"
              />

              {captchaError && (
                <p className="text-red-500 text-xs mt-1">{captchaError}</p>
              )}

              {/* BUTTON */}

              <motion.div
                variants={MOTION_VARIANTS.moveUp(1.4)}
                initial="hidden"
                whileInView="show"
                className="relative inline-block mt-[40px]"
              >
                <Image
                  src="/images/contact-us/btn-border.svg"
                  alt="Button border"
                  fill
                  className="absolute top-0 left-0 object-contain"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative flex items-center gap-3 px-5 py-3 text-white disabled:opacity-50"
                >
                  {translations.submit}
                  <span className="w-[27px] h-[27px] bg-primary rounded-full flex items-center justify-center">
                    <Image src="/images/arrow-black.svg" width={8} height={8} alt="" />
                  </span>
                </button>
              </motion.div>

            </form>

          </div>
        </div>
      </div>
    );
  }
);

RegisterInterest.displayName = "RegisterInterest";
export default memo(RegisterInterest);
