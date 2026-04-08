import InnerBanner from "../Common/InnerBanner";
import Main from "../AccrAffil/sections/Main";
import { accrData } from "./data";
import DataTab from "../AccrAffil/sections/DataTab";
import { AccreditationProps } from "./type";
import Affliation from "./sections/Affliation";
import LogoGridSection from "./sections/LogoGridSection";

const AccrAffil = ({ data }: { data: AccreditationProps }) => {
  return (
    <>
      <InnerBanner
        BannerData={accrData}
        data={data}
      />

      <Main data={data.firstSection} />
      <LogoGridSection data={data.logoSection.items} />
      <Affliation data={data.secondSection} />
      <DataTab
        awards={data.categories.flatMap((category) => category.accreditations)}
        //  categories={data.categories.map((category) => category.name)}
      />
    </>
  );
};

export default AccrAffil;
