import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, founderMessageData } from "./data";
import FounderMessage from "./sections/FounderMessage";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <FounderMessage data={founderMessageData} />
    </>
  );
};

export default Index;
