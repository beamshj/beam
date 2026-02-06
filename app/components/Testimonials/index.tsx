import InnerBanner from "../Common/InnerBanner";
import {
  BannerData,   
} from "./data";   
import Comments from "./sections/Comments"; 
import GuidedVision from "./sections/GuidedVision";
// import SuccessStories from "./sections/SuccessStories"; 
import { TestimonialsProps } from "./type";

const Index = ({data}: {data: TestimonialsProps}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} data={data}/> 
      <Comments data={data.firstSection}/> 
      {/* <SuccessStories data={data.secondSection}/>    */}
      <GuidedVision data={data.thirdSection}/>
    </>
  );
};

export default Index;
