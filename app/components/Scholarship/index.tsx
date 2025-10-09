import InnerBanner from "../Common/InnerBanner";
import {
  BannerData, 
  focusData,
  offerData,
  criteriaData,
  legacyData
} from "./data"; 
import FutureFocus from "./sections/FutureFocus"; 
import WeOffer from "./sections/WeOffer";
import SelectionCriteria from "./sections/SelectionCriteria";
import OurLegacy from "./sections/OurLegacy";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} /> 
      <FutureFocus focusData={focusData} /> 
      <WeOffer offerData={offerData} /> 
      <SelectionCriteria criteriaData={criteriaData} /> 
      <OurLegacy criteriaData={legacyData} /> 
    </>
  );
};

export default Index;
