import InnerBanner from "../common/InnerBanner";
import { BannerData, ourStory, visionMissionItems, valuesData } from "./data";
import OurStorySection from "./sections/OurStory";
import VisionMissionSection from "./sections/VisionMission";
import ValuesGrid from "./sections/OurValues";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <OurStorySection data={ourStory} />
      <VisionMissionSection visionMissionItems={visionMissionItems} />
      <ValuesGrid values={valuesData} />
    </>
  );
};

export default Index;
