import InnerBanner from "../Common/InnerBanner";
import RecentNews from "./sections/RecentNews";
import { BlogResponse } from "./type";

const Index = ({ data }: { data: BlogResponse }) => {
  console.log(data, "newsss");
  return (
    <>
      <InnerBanner
        data={data}
      />
      <RecentNews categories={data.categories} />
    </>
  );
};

export default Index;
