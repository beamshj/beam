import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import Gallery from "./sections/GalleryList";
import { GalleryProps } from "./type";

const Index = ({data}: {data: GalleryProps}) => {
  console.log(data);
  return (
    <>
      <InnerBanner BannerData={BannerData} data={data}/>
      <Gallery data={data}/>
    </>
  );
};

export default Index;
