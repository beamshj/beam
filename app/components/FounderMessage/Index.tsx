import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import FounderMessage from "./sections/FounderMessage";
import { FounderMessageProps } from "./type";

const Index = ({ data }: { data: FounderMessageProps }) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} pageTitle={data.pageTitle} banner={data.banner} bannerAlt={data.bannerAlt}/>
      <FounderMessage data={data.firstSection} />
    </>
  );
};

export default Index;
