import InnerBanner from "../Common/InnerBanner";
import { StudentsData  } from "./data"; 
import Main from "./sections/Main";
import { StudentsAchievementsProps } from "./type";


const Index = ({data}: {data: StudentsAchievementsProps}) => {
  return (
    <>
      <InnerBanner BannerData={StudentsData.BannerData} data={data}/> 
      <Main data={data.firstSection}/>
    </>
  );
};

export default Index;
