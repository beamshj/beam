import InnerBanner from "../Common/InnerBanner";
import { StudentsData  } from "./data"; 
import Main from "./sections/Main";


const Index = () => {
  return (
    <>
      <InnerBanner BannerData={StudentsData.BannerData} data={StudentsData.data}/> 
      <Main data={StudentsData.MainData}/>
    </>
  );
};

export default Index;
