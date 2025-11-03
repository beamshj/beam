import React from "react";
import HeroSection from "./sections/HeroSection";
import VideoSection from "./sections/VideoSection";
import OurSchools from "./sections/OurSchools";
import AcademicCultural from "./sections/AcademicCultural";
import MessageSection from "./sections/MessageSection";

import DiverseGrowing from "./sections/DiverseGrowing";
import Alumni from "./sections/Alumni";
import MediaHub from "./sections/MediaHub";
import JoinBeam from "./sections/JoinBeam";

import LogoSlider from "./sections/LogoSlider";
import { HomeProps } from "./type";
import { BeamSchoolType, CategoryType, LocationType } from "../BeamSchools/type";
import { BlogType } from "../blog/type";
import { BlogResponse } from "../NewsDetails/type";
import { GalleryProps } from "../Gallery/type";

const Index = ({data, schooldata, categorydata, locationdata, blogdata, newsdata, gallerydata}: {data: HomeProps, schooldata: BeamSchoolType, categorydata: CategoryType[], locationdata: LocationType[], blogdata: BlogType, newsdata: BlogResponse, gallerydata: GalleryProps}) => {
  return (
    <>
      <HeroSection data={data.bannerSection}/>
      <OurSchools schoolData={schooldata} categorydata={categorydata} locationdata={locationdata}/>
      <AcademicCultural data={data.thirdSection}/>
      <VideoSection data={data.fourthSection}/>
      <DiverseGrowing data={data.fifthSection}/>
      <MessageSection data={data.sixthSection}/>
      <Alumni data={data.seventhSection}/>
      <MediaHub blogdata={blogdata} newsdata={newsdata} gallerydata={gallerydata}/>
      <LogoSlider data={data.ninethSection}/>
      <JoinBeam data={data.tenthSection}/>
    </>
  );
};

export default Index;
