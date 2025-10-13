import InnerBanner from "../Common/InnerBanner";
import { BannerData, sliderData } from "./data";
import LeadershipTeam from "./sections/LeadershipTeam";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <LeadershipTeam data={sliderData} />
    </>
  );
};

export default Index;
