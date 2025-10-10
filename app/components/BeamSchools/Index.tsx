import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, schoolData } from "./data";
import SchoolCards from "./sections/SchoolCards";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <SchoolCards schoolData={schoolData} />
    </>
  );
};

export default Index;
