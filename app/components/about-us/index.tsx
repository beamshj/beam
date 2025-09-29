import InnerBanner from "../common/InnerBanner";
import { BannerData, ourStory, visionMissionItems } from "./data";
import OurStorySection from "./sections/OurStory";
import VisionMissionSection from "./sections/VisionMission";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <OurStorySection data={ourStory} />
      <VisionMissionSection visionMissionItems={visionMissionItems} />
    </>
  );
};

export default Index;
