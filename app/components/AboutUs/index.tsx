import InnerBanner from "@/app/components/Common/InnerBanner";
import {
  BannerData,
  ourStory,
  visionMissionItems,
  items,
  valuesData,
  inclusionData,
  healthSafetyData,
  cards,
} from "./data";
import OurStorySection from "./sections/OurStory";
import VisionMissionSection from "./sections/VisionMission";
import ValuesGrid from "./sections/OurValues";
import InclusionSection from "./sections/Inclusion";
import HealthSafety from "./sections/HealthandSafety";
import MoreToExplore from "./sections/MoreToExplore";
import Milestones from "./sections/Milestones";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <OurStorySection data={ourStory} />
      <VisionMissionSection visionMissionItems={visionMissionItems} />
      <ValuesGrid values={valuesData} />
      <Milestones items={items} />
      <InclusionSection data={inclusionData} />
      <HealthSafety data={healthSafetyData} />
      <MoreToExplore data={cards} />
    </>
  );
};

export default Index;
