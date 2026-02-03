"use client";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./sections/ContactUs"), {
  ssr: false,
  loading: () => <div className="container py-10 lg:py-15 xl:py-[135px]">Loading...</div>,
});

const RegisterInterest = dynamic(() => import("./sections/RegisterInterest"), {
  ssr: false,
  loading: () => <div className="container py-10 lg:py-15 xl:py-[135px]">Loading...</div>,
});

const OurSchools = dynamic(() => import("./sections/OurSchools"), {
  ssr: false,
  loading: () => <div className="container py-10 lg:py-15 xl:py-[135px]">Loading...</div>,
});

import { useEffect, useRef } from "react";
import InnerBanner from "@/app/components/Common/InnerBanner";
import { BeamSchoolType } from "../BeamSchools/type";
import { ContactPage } from "./type";
import { useSearchParams } from "next/navigation";

interface IndexProps {
  contactData: ContactPage;
  schooldata: BeamSchoolType;
}

const Index = ({ contactData, schooldata }: IndexProps) => {
  const searchParams = useSearchParams();
  const registerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchParams.get("scroll") === "register") {
      const scrollToRegister = () => {
        if (!registerRef.current) return;
        const yOffset = -100;
        const y =
          registerRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      };

      // ✅ Wait for the component to announce it's ready
      window.addEventListener("register-interest-ready", scrollToRegister);

      // ✅ Safety fallback (just in case event doesn't fire)
      const fallback = setTimeout(scrollToRegister, 2000);

      return () => {
        window.removeEventListener("register-interest-ready", scrollToRegister);
        clearTimeout(fallback);
      };
    }
  }, [searchParams]);

  return (
    <>
      <InnerBanner
        BannerData={{
          BannerTitle: contactData.pageTitle,
          BannerImg: contactData.banner,
        }}
        data={contactData}
      />
      <ContactForm data={contactData.firstSection} />
      <OurSchools data={schooldata} contactData = {contactData} />
      <RegisterInterest ref={registerRef} />
    </>
  );
};

export default Index;
