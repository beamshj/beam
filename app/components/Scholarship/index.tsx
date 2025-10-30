import InnerBanner from "../Common/InnerBanner";
import {
  BannerData, 
} from "./data"; 
import FutureFocus from "./sections/FutureFocus"; 
import WeOffer from "./sections/WeOffer";
import SelectionCriteria from "./sections/SelectionCriteria";
import OurLegacy from "./sections/OurLegacy";
import { ScholarshipProps } from "./type";

const Index = ({data}: {data: ScholarshipProps}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} pageTitle={data.pageTitle} banner={data.banner} bannerAlt={data.bannerAlt}/> 
      <FutureFocus data={data.firstSection}/> 
      <WeOffer data={data.secondSection}/> 
      <SelectionCriteria data={data.thirdSection}/> 
      <OurLegacy data={data.fourthSection}/> 
    </>
  );
};

export default Index;
