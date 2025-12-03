import InnerBanner from "../Common/InnerBanner";
import { BannerData } from "./data";
import LeadershipTeam from "./sections/LeadershipTeam";
import { LeadershipData } from "./type";
import BeamTeam from "./sections/BeamTeam";

const Index = ({ data }: { data: LeadershipData }) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} data={data} />
      <BeamTeam data={data} />
      <LeadershipTeam data={data} />
    </>
  );
};

export default Index;
