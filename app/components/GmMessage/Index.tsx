import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import GmMessage from "./sections/GmMessage";
import { GmMessageProps } from "./type";

const Index = ({data}: {data: GmMessageProps}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} pageTitle={data.pageTitle} banner={data.banner} bannerAlt={data.bannerAlt}/>
      <GmMessage data={data.firstSection} />
    </>
  );
};

export default Index;
