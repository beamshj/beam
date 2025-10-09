import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, blogs } from "./data";
import LatestBlogs from "./sections/LatestBlog";
import BlogList from "./sections/BlogList";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <LatestBlogs data={blogs} />
      <BlogList data={blogs} />
    </>
  );
};

export default Index;
