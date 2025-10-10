import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, proudMomentsData, achievementsData } from "./data";
import ProudMoments from "./sections/ProudMoments";
import Achievements from "./sections/Achievements";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <ProudMoments data={proudMomentsData} />
      <Achievements data={achievementsData} />
    </>
  );
};

export default Index;
