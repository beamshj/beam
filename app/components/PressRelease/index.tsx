import InnerBanner from "../Common/InnerBanner";
import RecentNews from "./sections/RecentNews";
import { BlogResponse } from "./type";

const Index = ({ data }: { data: BlogResponse }) => {
  console.log(data, "newsss");
  return (
    <>
      <InnerBanner
        banner={data.banner}
        bannerAlt={data.bannerAlt}
        pageTitle={data.pageTitle}
      />
      <RecentNews categories={data.categories} />
    </>
  );
};

export default Index;
