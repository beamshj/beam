// "use client";

// import { useState, useEffect } from "react";
// import { FaFacebookF } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaLinkedinIn } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa6";
// import { FaYoutube } from "react-icons/fa";
// import { motion } from "framer-motion";
// import {
//   parentStagger,
//   fadeUponeone,
// } from "@/public/assets/FramerAnimation/animation";
// import { useRef } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
// import LangLink from "@/lib/LangLink";

// const formSchema = z.object({
//   name: z.string().min(1, "Required"),
//   email: z.string().email("Invalid email"),
//   phone: z.string().min(5, "Enter valid number"),
//   message: z.string().min(1, "Message is required"),
// });

// type FormData = z.infer<typeof formSchema>;

// const Footer = () => {
//   const recaptchaRef = useRef<any>(null);
//   const [error, setError] = useState("");
//   const [showCaptcha, setShowCaptcha] = useState(false);
//   const [ReCAPTCHAComponent, setReCAPTCHAComponent] = useState<any>(null);
//   const isArabic = useIsPreferredLanguageArabic();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(formSchema),
//   });

//   // ✅ Load ReCAPTCHA dynamically when needed
//   useEffect(() => {
//     if (showCaptcha && !ReCAPTCHAComponent) {
//       import("react-google-recaptcha").then((mod) => {
//         setReCAPTCHAComponent(() => mod.default);
//       });
//     }
//   }, [showCaptcha, ReCAPTCHAComponent]);

//   const onSubmit = async (data: FormData) => {
//     try {
//       const captchaValue = recaptchaRef?.current?.getValue();
//       if (!captchaValue) {
//         setError("Please verify yourself to continue");
//         return;
//       }
//       setError("");
//       const response = await fetch("/api/admin/contact/footer", {
//         method: "POST",
//         body: JSON.stringify(data),
//       });
//       const res = await response.json();
//       if (res.success) {
//         alert(res.message);
//         reset();
//       } else {
//         alert(res.message);
//       }
//     } catch (error) {
//       console.log("Error sending message", error);
//       alert("Sorry, something went wrong. Please try again later.");
//     } finally {
//       recaptchaRef.current?.reset();
//     }
//   };

//   return (
//     <footer className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
//       {/* Background 2-column grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full absolute top-0 left-0 z-0">
//         <div className="bg-black"></div>
//         <div className="bg-black md:bg-[#1A1A1A]"></div>
//       </div>

//       {/* Content container on top */}
//       <div className="relative z-10 container py-12 xl:py-25 2xl:pt-[134px] 2xl:pb-[89px]">
//         <div className="grid grid-cols-1 lg:grid-cols-2 text-white ">
//           {/* Left Column */}
//           <div className="flex flex-col pr-10 md:pr-15 xl:pr-25 2xl:pr-[147px]">
//             <div>
//               <motion.div
//                 variants={parentStagger}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, amount: 0.3 }}
//                 className="flex flex-col gap-5 md:gap-10 2xl:gap-[43px]"
//               >
//                 <div>
//                   <div className="">
//                     <motion.h2
//                       className="text-md md:text-xl xl:text-2xl 2xl:text-4xl font-light lettersp-2 border-b border-litgray pb-2 xl:pb-[47px] mb-4 xl:mb-[47px]"
//                       variants={fadeUponeone}
//                     >
//                       {isArabic ? "انضم إلينا" : "Work with us"}
//                     </motion.h2>
//                     <motion.p
//                       className="text-md  font-light break-words lettersp-2"
//                       variants={fadeUponeone}
//                     >
//                       {isArabic ? "8002326 بيم" : "800 BEAM (2326)"}
//                     </motion.p>
//                     <motion.p
//                       className="text-md font-light break-words lettersp-1 text-primary"
//                       variants={fadeUponeone}
//                     >
//                       enquiries@beam.co.ae
//                     </motion.p>
//                   </div>
//                   <motion.div
//                     variants={fadeUponeone}
//                     className="mt-5 2xl:mt-10 pt-1"
//                   >
//                     <p className="text-md font-light lettersp-1">
//                       {isArabic ? "برج سيتي جيت" : "The CityGate Tower"}
//                       <br />
//                       {isArabic
//                         ? "ص.ب 88، الشارقة، الإمارات العربية المتحدة"
//                         : "P.O.Box 88, Sharjah, UAE"}
//                     </p>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <motion.div
//             className={`flex flex-col  ${
//               isArabic
//                 ? "lg:pr-[45px] xl:pr-[75px] 2xl:pr-[144px]"
//                 : "lg:pl-[45px] xl:pl-[75px] 2xl:pl-[147px]"
//             } gap-2 md:gap-14 2xl:gap-[73px] pt-8 pb-0 xl:pt-0 md:pb-0 md:mt-0`}
//             variants={parentStagger}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.3 }}
//             onViewportEnter={() => setShowCaptcha(true)}
//           >
//             <div>
//               <div className="flex flex-wrap justify-between items-center gap-y-3 xl:border-b border-litgray pb-10 xl:pb-[47px] mb-4 xl:mb-[47px] pt-4 md:pt-6 xl:pt-8 2xl:pt-12">
//                 <h3 className="text-lg ">
//                   {isArabic ? "روابط سريعة" : "Quick Links"}
//                 </h3>
//                 <div className="flex gap-[7px] ">
//                   <LangLink
//                     target="_blank"
//                     href="https://www.facebook.com/beamedusocial/"
//                   >
//                     <motion.div
//                       variants={fadeUponeone}
//                       className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
//                     >
//                       <FaFacebookF className="text-sm" />
//                     </motion.div>
//                   </LangLink>
//                   <LangLink target="_blank" href="https://x.com/beamedusocial">
//                     <motion.div
//                       variants={fadeUponeone}
//                       className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
//                     >
//                       <FaXTwitter className="text-sm" />
//                     </motion.div>
//                   </LangLink>
//                   <LangLink
//                     target="_blank"
//                     href="https://www.linkedin.com/company/bukhatireducation/"
//                   >
//                     <motion.div
//                       variants={fadeUponeone}
//                       className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
//                     >
//                       <FaLinkedinIn className="text-sm" />
//                     </motion.div>
//                   </LangLink>
//                   <LangLink
//                     target="_blank"
//                     href="https://www.instagram.com/beamedusocial/"
//                   >
//                     <motion.div
//                       variants={fadeUponeone}
//                       className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
//                     >
//                       <FaInstagram className="text-sm" />
//                     </motion.div>
//                   </LangLink>
//                   <LangLink
//                     target="_blank"
//                     href="https://www.youtube.com/c/BukhatirEducation"
//                   >
//                     <motion.div
//                       variants={fadeUponeone}
//                       className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center  hover:bg-primary cursor-pointer"
//                     >
//                       <FaYoutube className="text-sm" />
//                     </motion.div>
//                   </LangLink>
//                 </div>
//               </div>
//               <motion.div
//                 variants={parentStagger}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, amount: 0.3 }}
//                 className="grid grid-cols-1 gap-4 lg:gap-10 lg:grid-cols-2 text-sm text-white"
//               >
//                 <motion.div
//                   className="flex flex-col gap-3 text-sm font-light"
//                   variants={fadeUponeone}
//                 >
//                   <LangLink
//                     href="/about-us/our-story"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic ? "نبذة عنا" : "About Us"}
//                     </span>
//                   </LangLink>
//                   <LangLink
//                     href="/beam-schools"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic ? "مدارسنا" : "Our Schools"}
//                     </span>
//                   </LangLink>
//                   <LangLink
//                     href="/about-us/professional-learning-program"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic
//                         ? "برنامج التطوير المهني"
//                         : "Professional Learning Program"}
//                     </span>
//                   </LangLink>
//                   <LangLink
//                     href="/beam-schools/school-scholarship-programs"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic
//                         ? "برنامج المنح الدراسية"
//                         : "School Scholarship Programs"}
//                     </span>
//                   </LangLink>
//                 </motion.div>

//                 <motion.div
//                   className="flex flex-col gap-3 text-sm font-light"
//                   variants={fadeUponeone}
//                 >
//                   <LangLink
//                     href="/beam-schools/school-uniqueness"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic ? "تميز مداسنا" : "Schools’ Uniqueness"}
//                     </span>
//                   </LangLink>
//                   <LangLink
//                     href="/beam-schools/accrediation-and-affiliation"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic
//                         ? "الشراكات و الاعتمادات"
//                         : "Accreditation & Affiliation"}
//                     </span>
//                   </LangLink>
//                   <LangLink
//                     href="/contact-us?scroll=register"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic ? "سجل اهتمام" : "Register Your Interest"}
//                     </span>
//                   </LangLink>
//                   <LangLink
//                     href="/news-&-media/blog"
//                     className="group relative overflow-hidden hover:text-primary"
//                   >
//                     <span
//                       className={`block transition-transform duration-300 group-hover:${isArabic ? "-translate-x-1" : "translate-x-1"}`}
//                     >
//                       {isArabic ? "مدونات" : "Blogs"}
//                     </span>
//                   </LangLink>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <div className="bg-[#101010] relative py-4">
//         <div className="container">
//           <motion.div variants={fadeUponeone}>
//             <p className="text-[#626262] relative">
//               {isArabic
//                 ? "مؤسسة بوخاطر لإدارة وتطوير التعليم بيم، هي إحدى شركات مجموعة بوخاطر. © جميع الحقوق محفوظة."
//                 : "BEAM is a subsidiary of Bukhatir Group. © All Rights Reserved."}
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import { motion } from "framer-motion";
import {
  parentStagger,
  fadeUponeone,
} from "@/public/assets/FramerAnimation/animation";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import LangLink from "@/lib/LangLink";
import { FooterData } from "./type";
import { useApplyLang } from "@/lib/applyLang";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = ({ footerData }: { footerData: FooterData }) => {
  const isArabic = useIsPreferredLanguageArabic();
  const tData = useApplyLang(footerData);

  const links = tData?.quickLinksSection?.quickLinks || [];

  const middleIndex = Math.ceil(links.length / 2);

  const firstColumn = links.slice(0, middleIndex);
  const secondColumn = links.slice(middleIndex);

  return (
    <footer className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
      {/* Background 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full absolute top-0 left-0 z-0">
        <div className="bg-black"></div>
        <div className="bg-black md:bg-[#1A1A1A] pt-0 sm:pt-25 lg:pt-0"></div>
      </div>

      {/* Content container on top */}
      <div className="relative z-10 container py-12 xl:py-25 2xl:pt-[134px] 2xl:pb-[89px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white ">
          {/* Left Column */}
          <div
            className={`flex flex-col ${isArabic ? "pl-10 md:pl-15 xl:pl-25 2xl:pl-[147px]" : "pr-10 md:pr-15 xl:pr-25 2xl:pr-[147px]"}`}
          >
            <div>
              <motion.div
                variants={parentStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col gap-5 md:gap-10 2xl:gap-[43px]"
              >
                <div>
                  <div className="">
                    <motion.h2
                      className="text-md md:text-xl xl:text-2xl 2xl:text-4xl font-light lettersp-2 border-b border-litgray pb-2 xl:pb-[47px] mb-4 xl:mb-[47px] "
                      variants={fadeUponeone}
                    >
                      {tData?.footerTitle}
                    </motion.h2>
                    <motion.p
                      className="text-md  font-light break-words lettersp-2"
                      variants={fadeUponeone}
                    >
                      {tData?.addressSection?.lineOne}
                    </motion.p>
                    <motion.p
                      className="text-md font-light break-words lettersp-1 text-primary"
                      variants={fadeUponeone}
                    >
                      {tData?.addressSection?.email}
                    </motion.p>
                  </div>
                  <motion.div
                    variants={fadeUponeone}
                    className="mt-5 2xl:mt-10 pt-1"
                  >
                    <p className="text-md font-light lettersp-1">
                      {tData?.addressSection?.lineThree}
                      <br />
                      {tData?.addressSection?.lineFour}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <motion.div
            className={`flex flex-col  ${
              isArabic
                ? "lg:pr-[45px] xl:pr-[75px] 2xl:pr-[144px]"
                : "lg:pl-[45px] xl:pl-[75px] 2xl:pl-[147px]"
            } gap-2 md:gap-14 2xl:gap-[73px] pt-8 pb-0 xl:pt-0 md:pb-0 md:mt-0`}
            variants={parentStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-[185px_auto] xl:grid-cols-2 gap-4 sm:gap-6 xl:gap-10 items-center xl:border-b border-litgray pb-10 xl:pb-[47px] mb-4 xl:mb-[47px] xl:pt-8 2xl:pt-12">
                <h3 className="text-lg">{tData?.quickLinksSection?.title}</h3>
                <div className="flex gap-[7px] lg:gap-[4px] xl:gap-[7px]">
                  <LangLink
                    target="_blank"
                    href="https://www.facebook.com/beamedusocial/"
                  >
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer"
                    >
                      <FaFacebookF className="text-sm" />
                    </motion.div>
                  </LangLink>
                  <LangLink target="_blank" href="https://x.com/beamedusocial">
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer"
                    >
                      <FaXTwitter className="text-sm" />
                    </motion.div>
                  </LangLink>
                  <LangLink
                    target="_blank"
                    href="https://www.linkedin.com/company/bukhatireducation/"
                  >
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer"
                    >
                      <FaLinkedinIn className="text-sm" />
                    </motion.div>
                  </LangLink>
                  <LangLink
                    target="_blank"
                    href="https://www.instagram.com/beamedusocial/"
                  >
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer"
                    >
                      <FaInstagram className="text-sm" />
                    </motion.div>
                  </LangLink>
                  <LangLink
                    target="_blank"
                    href="https://www.youtube.com/c/BukhatirEducation"
                  >
                    <motion.div
                      variants={fadeUponeone}
                      className="rounded-full w-[46px] h-[46px] border border-white/35 hover:border-transparent flex items-center justify-center hover:bg-primary cursor-pointer"
                    >
                      <FaYoutube className="text-sm" />
                    </motion.div>
                  </LangLink>
                </div>
              </div>
              <motion.div
                variants={parentStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 gap-4 sm:gap-6 xl:gap-10 sm:grid-cols-[185px_auto] xl:grid-cols-2 text-sm text-white"
              >
                {/* First Column */}
                <motion.div
                  className="flex flex-col gap-3 text-sm font-light"
                  variants={fadeUponeone}
                >
                  {firstColumn.map((item, index) => (
                    <LangLink
                      key={index}
                      href={item.link || "#"}
                      className="group relative overflow-hidden hover:text-primary"
                    >
                      <span
                        className={`block transition-transform duration-300 ${
                          isArabic
                            ? "group-hover:-translate-x-1"
                            : "group-hover:translate-x-1"
                        }`}
                      >
                        {item.name}
                      </span>
                    </LangLink>
                  ))}
                </motion.div>

                {/* Second Column */}
                <motion.div
                  className="flex flex-col gap-3 text-sm font-light"
                  variants={fadeUponeone}
                >
                  {secondColumn.map((item, index) => (
                    <LangLink
                      key={index}
                      href={item.link || "#"}
                      className="group relative overflow-hidden hover:text-primary"
                    >
                      <span
                        className={`block transition-transform duration-300 ${
                          isArabic
                            ? "group-hover:-translate-x-1"
                            : "group-hover:translate-x-1"
                        }`}
                      >
                        {item.name}
                      </span>
                    </LangLink>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-[#101010] relative py-4">
        <div className="container">
          <motion.div variants={fadeUponeone}>
            <p className="text-[#626262] relative">
              {isArabic
                ? "مؤسسة بوخاطر لإدارة وتطوير التعليم بيم، هي إحدى شركات مجموعة بوخاطر. © جميع الحقوق محفوظة."
                : "BEAM is a subsidiary of Bukhatir Group. © All Rights Reserved."}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
