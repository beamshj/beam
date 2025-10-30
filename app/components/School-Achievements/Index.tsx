import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import ProudMoments from "./sections/ProudMoments";
import Achievements from "./sections/Achievements";
import { SchoolAchievementsProps } from "./type";

const Index = ({data}: {data: SchoolAchievementsProps}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} banner={data.banner} bannerAlt={data.bannerAlt} pageTitle={data.pageTitle}/>
      <ProudMoments data={data.firstSection} />
      <Achievements data={data.secondSection} />
    </>
  );
};

export default Index;
