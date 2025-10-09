import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, OurSchoolsData } from "./data";
import ContactForm from "./sections/ContactUs";
import RegisterInterest from "./sections/RegisterInterest";
import OurSchools from "./sections/OurSchools";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <ContactForm />
      <OurSchools data={OurSchoolsData} />
      <RegisterInterest />
    </>
  );
};

export default Index;
