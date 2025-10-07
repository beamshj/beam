import InnerBanner from "../Common/InnerBanner";
import {
  BannerData, 
  focusData,
  offerData,
  criteriaData
} from "./data"; 
import FutureFocus from "./sections/FutureFocus"; 
import WeOffer from "./sections/WeOffer";
import SelectionCriteria from "./sections/SelectionCriteria";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} /> 
      <FutureFocus focusData={focusData} /> 
      <WeOffer offerData={offerData} /> 
      <SelectionCriteria criteriaData={criteriaData} /> 
    </>
  );
};

export default Index;
