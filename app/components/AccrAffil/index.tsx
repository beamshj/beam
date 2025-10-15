import InnerBanner from "../Common/InnerBanner";
import Main from "../AccrAffil/sections/Main";
import { accrData } from "./data";
import DataTab from "../AccrAffil/sections/DataTab";
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