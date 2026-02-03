import InnerBanner from "@/app/components/Common/InnerBanner";
import Main from "./Sections/Main";
import CountrySection from "./Sections/CountrySection";
import StudentTestimonials from "./Sections/StudentTestimonials";
import { mainSection, AlumniBannerData, countries, testimonialsSection } from "./data";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={AlumniBannerData} data={AlumniBannerData}/>
      <Main data={mainSection}/>
      <CountrySection data={countries}/>
      <StudentTestimonials data={testimonialsSection} />
    </>
  );
};

export default Index;
