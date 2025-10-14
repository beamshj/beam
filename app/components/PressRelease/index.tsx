import { BannerData, RecentNewsData } from "./data";
import InnerBanner from "../Common/InnerBanner";
import RecentNews from "./sections/RecentNews";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <RecentNews RecentNewsData={RecentNewsData} />
    </>
  );
};

export default Index;
