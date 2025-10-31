import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import Gallery from "./sections/GalleryList";
import { GalleryProps } from "./type";

const Index = ({data}: {data: GalleryProps}) => {
  console.log(data);
  return (
    <>
      <InnerBanner BannerData={BannerData} banner={data.banner} bannerAlt={data.bannerAlt} pageTitle={data.pageTitle}/>
      <Gallery data={data}/>
    </>
  );
};

export default Index;
