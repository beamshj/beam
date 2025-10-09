import InnerBanner from "../Common/InnerBanner";
import {
  BannerData, 
  focusData, 
  criteriaData 
} from "./data"; 
import FutureFocus from "./sections/FutureFocus";  
import SelectionCriteria from "./sections/SelectionCriteria"; 

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} /> 
      <FutureFocus focusData={focusData} />  
      <SelectionCriteria criteriaData={criteriaData} />  
    </>
  );
};

export default Index;
