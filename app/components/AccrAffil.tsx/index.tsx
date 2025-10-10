import InnerBanner from "../Common/InnerBanner";
import Main from "./sections/Main";
import { accrData } from "./data";
import DataTab from "./sections/DataTab";
const AccrAffil = () => {
  return ( 
   <>
   <InnerBanner BannerData={accrData} />
   <Main/>
   <DataTab/>
   </>
   );
}
 
export default AccrAffil;