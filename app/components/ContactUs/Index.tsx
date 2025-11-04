"use client";

import { useEffect } from "react";
import InnerBanner from "@/app/components/Common/InnerBanner";
import ContactForm from "./sections/ContactUs";
import RegisterInterest from "./sections/RegisterInterest";
import OurSchools from "./sections/OurSchools";
import { BeamSchoolType } from "../BeamSchools/type";
import { ContactPage } from "./type";
import { useSearchParams } from "next/navigation";

interface IndexProps {
  contactData: ContactPage;
  schooldata: BeamSchoolType;
}

const Index = ({ contactData, schooldata }: IndexProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("scroll") === "register") {
      const handleLoad = () => {
        const el = document.getElementById("registerInterest");
        if (el) {
          const yOffset = -80;
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };

      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(handleLoad, 500);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("load", handleLoad);
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
        bannerAlt={contactData.bannerAlt}
      />
      <ContactForm data={contactData.firstSection} />
      <OurSchools
        data={schooldata}
        title={contactData.secondSection.title}
        description={contactData.secondSection.description}
      />
      <RegisterInterest />
    </>
  );
};

export default Index;