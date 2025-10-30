import InnerBanner from "@/app/components/Common/InnerBanner";
import OurStorySection from "./sections/OurStory";
import VisionMissionSection from "./sections/VisionMission";
import ValuesGrid from "./sections/OurValues";
import InclusionSection from "./sections/Inclusion";
import HealthSafety from "./sections/HealthandSafety";
import MoreToExplore from "./sections/MoreToExplore";
import Milestones from "./sections/Milestones";
import { AboutProps } from "./type";

const Index = ({ data }: { data: AboutProps }) => {
  return (
    <>
      <InnerBanner banner={data.banner} bannerAlt={data.bannerAlt} pageTitle={data.pageTitle}/>
      <OurStorySection data={data.firstSection} />
      <VisionMissionSection data={data.secondSection}/>
      <ValuesGrid data={data.thirdSection}/>
      <Milestones data={data.historySection}/>
      <InclusionSection data={data.fifthSection} />
      <HealthSafety data={data.sixthSection} />
      <MoreToExplore data={data.seventhSection}/>
    </>
  );
};

export default Index;
