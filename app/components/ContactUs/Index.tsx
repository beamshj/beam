import InnerBanner from "@/app/components/Common/InnerBanner";
import ContactForm from "./sections/ContactUs";
import RegisterInterest from "./sections/RegisterInterest";
import OurSchools from "./sections/OurSchools";
import { BeamSchoolType } from "../BeamSchools/type";
import { ContactPage } from "./type";

interface IndexProps {
  contactData: ContactPage;
  schooldata: BeamSchoolType;
}

const Index = ({ contactData, schooldata }: IndexProps) => {
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
