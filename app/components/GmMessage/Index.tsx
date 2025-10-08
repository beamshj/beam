import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, gmMessageData } from "./data";
import GmMessage from "./sections/GmMessage";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <GmMessage data={gmMessageData} />
    </>
  );
};

export default Index;
