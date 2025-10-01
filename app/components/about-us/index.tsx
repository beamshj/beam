import InnerBanner from "../common/InnerBanner";
import {
  BannerData,
  ourStory,
  visionMissionItems,
  valuesData,
  inclusionData,
} from "./data";
import OurStorySection from "./sections/OurStory";
import VisionMissionSection from "./sections/VisionMission";
import ValuesGrid from "./sections/OurValues";
import InclusionSection from "./sections/Inclusion";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <OurStorySection data={ourStory} />
      <VisionMissionSection visionMissionItems={visionMissionItems} />
      <ValuesGrid values={valuesData} />
      <InclusionSection data={inclusionData} />
    </>
  );
};

export default Index;
