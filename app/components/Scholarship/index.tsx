import InnerBanner from "../common/InnerBanner";
import {
  BannerData, 
  focusData,
  offerData  
} from "./data"; 
import FutureFocus from "./sections/FutureFocus"; 
import WeOffer from "./sections/WeOffer";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} /> 
      <FutureFocus focusData={focusData} /> 
      <WeOffer offerData={offerData} /> 
    </>
  );
};

export default Index;
