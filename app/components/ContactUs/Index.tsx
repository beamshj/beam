// "use client";

// import { useEffect } from "react";
// import InnerBanner from "@/app/components/Common/InnerBanner";
// import ContactForm from "./sections/ContactUs";
// import RegisterInterest from "./sections/RegisterInterest";
// import OurSchools from "./sections/OurSchools";
// import { BeamSchoolType } from "../BeamSchools/type";
// import { ContactPage } from "./type";
// import { useSearchParams } from "next/navigation";

// interface IndexProps {
//   contactData: ContactPage;
//   schooldata: BeamSchoolType;
// }

// const Index = ({ contactData, schooldata }: IndexProps) => {
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (searchParams.get("scroll") === "register") {
//       const scrollToSection = () => {
//         const el = document.getElementById("registerInterest");
//         if (el) {
//           const yOffset = -80;
//           const y =
//             el.getBoundingClientRect().top + window.pageYOffset + yOffset;
//           window.scrollTo({ top: y, behavior: "smooth" });
//           return true;
//         }
//         return false;
//       };

//       // Keep checking until the element exists and layout is stable
//       let attempts = 0;
//       const checkAndScroll = () => {
//         const done = scrollToSection();
//         if (!done && attempts < 20) {
//           attempts++;
//           requestAnimationFrame(checkAndScroll);
//         }
//       };

//       // Wait a short delay to allow hydration/layout to finish
//       setTimeout(() => {
//         requestAnimationFrame(checkAndScroll);
//       }, 300);
//     }
//   }, [searchParams]);

//   return (
//     <>
//       <InnerBanner
//         BannerData={{
//           BannerTitle: contactData.pageTitle,
//           BannerImg: contactData.banner,
//         }}
//         bannerAlt={contactData.bannerAlt}
//       />
//       <ContactForm data={contactData.firstSection} />
//       <OurSchools
//         data={schooldata}
//         title={contactData.secondSection.title}
//         description={contactData.secondSection.description}
//       />
//       <RegisterInterest />
//     </>
//   );
// };

// export default Index;

"use client";

import { useEffect, useRef } from "react";
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
  const registerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchParams.get("scroll") === "register" && registerRef.current) {
      const yOffset = 0;
      const y =
        registerRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      // Wait until hydration/layout settles
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 300);
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
      <RegisterInterest ref={registerRef} />
    </>
  );
};

export default Index;
