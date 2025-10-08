import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import ContactForm from "./sections/ContactUs";
import RegisterInterest from "./sections/RegisterInterest";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <ContactForm />
      <RegisterInterest />  
    </>
  );
};

export default Index;
