import InnerBanner from "../Common/InnerBanner";
import {
  BannerData, 
  focusData, 
  commentsData,
  visionData
  
} from "./data";   
import Comments from "./sections/Comments"; 
import GuidedVision from "./sections/GuidedVision";
import SuccessStories from "./sections/SuccessStories"; 

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} /> 
      <Comments commentsData={commentsData} /> 
      <SuccessStories focusData={focusData} />   
      <GuidedVision visionData={visionData} />
    </>
  );
};

export default Index;
