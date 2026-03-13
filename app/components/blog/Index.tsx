import { Suspense } from "react";
import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import LatestBlogs from "./sections/LatestBlog";
import BlogList from "./sections/BlogList";
import { BlogType } from "./type";

const Index = ({ data }: { data: BlogType }) => {
  const blogs = data.categories.flatMap((category) => category.blogs);

  return (
    <>
      <InnerBanner BannerData={BannerData} data={data} />
      <LatestBlogs data={blogs} />
      <Suspense fallback={<div className="pb-10 xl:pb-20 2xl:pb-[135px]" />}>
        <BlogList data={blogs} />
      </Suspense>
    </>
  );
};

export default Index;