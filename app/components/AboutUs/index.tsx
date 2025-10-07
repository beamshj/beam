import InnerBanner from "@/app/components/Common/InnerBanner";
import {
  BannerData,
  ourStory,
  visionMissionItems,
  valuesData,
  inclusionData,
  healthSafetyData,
} from "./data";
import OurStorySection from "./sections/OurStory";
import VisionMissionSection from "./sections/VisionMission";
import ValuesGrid from "./sections/OurValues";
import InclusionSection from "./sections/Inclusion";
import HealthSafety from "./sections/HealthandSafety";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <OurStorySection data={ourStory} />
      <VisionMissionSection visionMissionItems={visionMissionItems} />
      <ValuesGrid values={valuesData} />
      <InclusionSection data={inclusionData} />
      <HealthSafety data={healthSafetyData} />
    </>
  );
};

export default Index;
