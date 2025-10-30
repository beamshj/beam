import InnerBanner from "../Common/InnerBanner";
import Main from "../AccrAffil/sections/Main";
import { accrData } from "./data";
import DataTab from "../AccrAffil/sections/DataTab";
import { AccreditationProps } from "./type";

const AccrAffil = ({ data }: { data: AccreditationProps }) => {
  console.log(data);
  return (
    <>
      <InnerBanner
        BannerData={accrData}
        pageTitle={data.pageTitle}
        banner={data.banner}
        bannerAlt={data.bannerAlt}
      />
      <Main data={data.firstSection} />
      <DataTab
        awards={data.categories.flatMap((category) => category.accreditations)}
        //  categories={data.categories.map((category) => category.name)}
      />
    </>
  );
};

export default AccrAffil;
