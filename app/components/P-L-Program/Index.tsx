import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import PLProgram from "./sections/PLProgram";
import { PLProgramProps } from "./type";

const Index = ({data}: {data: PLProgramProps}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} data={data}/>
      <PLProgram data={data.firstSection} />
    </>
  );
};

export default Index;
