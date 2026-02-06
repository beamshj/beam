"use client"

import InnerBanner from "../Common/InnerBanner";
import {
  BannerData
} from "./data"; 
import FutureFocus from "./sections/FutureFocus"; 
import WeOffer from "./sections/WeOffer";
import SelectionCriteria from "./sections/SelectionCriteria";
import OurLegacy from "./sections/OurLegacy";
import { ScholarshipProps } from "./type";
import ApplyBeam from "./sections/ApplyBeam";

const Index = ({data}: {data: ScholarshipProps}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} data={data}/> 
      <FutureFocus data={data.firstSection}/> 
      <WeOffer data={data.secondSection}/> 
      <SelectionCriteria data={data.thirdSection}/> 
      {/* <OurLegacy data={data.fourthSection}/>  */}
      <ApplyBeam data={data.fifthSection}/>
    </>
  );
};

export default Index;
