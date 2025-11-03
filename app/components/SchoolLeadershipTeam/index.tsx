import InnerBanner from "../Common/InnerBanner";
import { BannerData } from "./data";
import LeadershipTeam from "./sections/LeadershipTeam";
import { LeadershipData } from "./type";

const Index = ({ data }: { data: LeadershipData }) => {
  return (
    <>
      <InnerBanner
        BannerData={BannerData}
        banner={data.banner}
        bannerAlt={data.bannerAlt}
        pageTitle={data.pageTitle}
      />
      <LeadershipTeam sliderData={data.firstSection.items} data={data} />
    </>
  );
};

export default Index;
