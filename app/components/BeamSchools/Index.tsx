import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, schoolData } from "./data";
import SchoolCards from "./sections/SchoolCards";

const Index = ({data,categoryData,locationData}: {data: any,categoryData: any,locationData: any}) => {
  console.log(data);
  console.log(categoryData);
  console.log(locationData);
  return (
    <>
      <InnerBanner BannerData={BannerData} banner={data.banner} bannerAlt={data.bannerAlt} pageTitle={data.pageTitle}/>
      <SchoolCards schoolData={schoolData} data={data} categoryData={categoryData} locationData={locationData}/>
    </>
  );
};

export default Index;
