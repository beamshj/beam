import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, galleryList } from "./data";
import Gallery from "./sections/GalleryList";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <Gallery data={galleryList} />
    </>
  );
};

export default Index;
