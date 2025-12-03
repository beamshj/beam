import InnerBanner from "@/app/components/Common/InnerBanner";
import { BannerData } from "./data";
import SchoolCards from "./sections/SchoolCards";
import { BeamSchoolType, CategoryType, LocationType } from "./type";

const Index = ({
  data,
  categorydata,
  locationdata,
}: {
  data: BeamSchoolType;
  categorydata: CategoryType[];
  locationdata: LocationType[];
}) => {
  return (
    <>
      <InnerBanner BannerData={BannerData} data={data} />
      <SchoolCards
        data={data}
        categorydata={categorydata}
        locationdata={locationdata}
      />
    </>
  );
};

export default Index;
