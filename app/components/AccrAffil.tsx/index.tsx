import InnerBanner from "../Common/InnerBanner";
import Main from "./sections/Main";
import { accrData } from "./data";

const AccrAffil = () => {
  return ( 
   <>
   <InnerBanner BannerData={accrData} />
   <Main/>
   </>
   );
}
 
export default AccrAffil;