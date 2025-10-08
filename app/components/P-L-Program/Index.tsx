import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData, plProgramData } from "./data";
import PLProgram from "./sections/PLProgram";

const Index = () => {
  return (
    <>
      <InnerBanner BannerData={BannerData} />
      <PLProgram data={plProgramData} />
    </>
  );
};

export default Index;
