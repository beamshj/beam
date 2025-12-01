import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import LatestBlogs from "./sections/LatestBlog";
import BlogList from "./sections/BlogList";
import { BlogType } from "./type";

const Index = ({ data }: { data: BlogType }) => {
  return (
    <>
      <InnerBanner
        BannerData={BannerData}
        data={data}
      />
      <LatestBlogs
        data={data.categories.flatMap((category) => category.blogs)}
      />
      <BlogList
        data={data.categories.flatMap((category) => category.blogs)}
        // categories={data.categories}
      />
    </>
  );
};

export default Index;
