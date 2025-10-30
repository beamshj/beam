import InnerBanner from "../Common/InnerBanner";
import {
  BannerData, 
} from "./data"; 
import FosteringStrong from "./sections/FosteringStrong";  
import BeyondAcademics from "./sections/BeyondAcademics"; 
import { SchoolUniquenessProps } from "./type";

const Index = ({data}: {data: SchoolUniquenessProps}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} banner={data.banner} bannerAlt={data.bannerAlt} pageTitle={data.pageTitle} /> 
      <FosteringStrong data={data.firstSection}/>  
      <BeyondAcademics data={data.secondSection}/>  
    </>
  );
};

export default Index;
