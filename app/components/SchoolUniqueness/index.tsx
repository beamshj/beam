import InnerBanner from "../Common/InnerBanner";
import {
  BannerData, 
  fsData, 
  academicsData 
} from "./data"; 
import FosteringStrong from "./sections/FosteringStrong";  
import BeyondAcademics from "./sections/BeyondAcademics"; 

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} /> 
      <FosteringStrong fsData={fsData} />  
      <BeyondAcademics academicsData={academicsData} />  
    </>
  );
};

export default Index;
