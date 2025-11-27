import InnerBanner from "../Common/InnerBanner";
import { BannerData } from "./data";
import LeadershipTeam from "./sections/LeadershipTeam";
import { LeadershipData } from "./type";
import BeamTeam from "./sections/BeamTeam";

const Index = ({ data }: { data: LeadershipData }) => {
  return (
    <>
      <InnerBanner
        BannerData={BannerData}
        banner={data.banner}
        bannerAlt={data.bannerAlt}
        pageTitle={data.pageTitle}
      />
      <BeamTeam beamleadersData={data.firstSection.items} data={data}/>
      <LeadershipTeam sliderData={data.secondSection.items} data={data} />
    </>
  );
};

export default Index;
