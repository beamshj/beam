import InnerBanner from "../Common/InnerBanner";
import { BannerData } from "./data";
import LeadershipTeam from "./sections/LeadershipTeam";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <LeadershipTeam />
    </>
  );
};

export default Index;
