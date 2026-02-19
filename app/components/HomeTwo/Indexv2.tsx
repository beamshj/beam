import HeroSectionV2 from "./sections/HeroSectionV2";
import HeroSectionV3 from "./sections/HeroSectionV3";
import HeroSectionV4 from "./sections/HeroSectionV4";
import HeroSectionV5 from "./sections/HeroSectionV5";
import HeroSectionV6 from "./sections/HeroSectionV6";
import HeroSectionV7 from "./sections/HeroSectionV7";
import HeroSectionV8 from "./sections/HeroSectionV8";

import { HomeProps } from "./type";

const Indexv2 = ({data}: {data: HomeProps}) => {
  return (
    <>
      {/* <HeroSectionV6 data={data.bannerSection}/> */}
      {/* <HeroSectionV2 data={data.bannerSection}/> */}
      {/* <HeroSectionV3 data={data.bannerSection}/> */}
      {/* <HeroSectionV4 data={data.bannerSection}/> */}
      {/* <HeroSectionV5 data={data.bannerSection}/> */}
      {/* <HeroSectionV7 data={data.bannerSection}/> */}
      <HeroSectionV8 data={data.bannerSection}/>
    </>
  );
};

export default Indexv2;
