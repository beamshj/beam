import dynamic from "next/dynamic";
import React from "react";
const HeroSection = dynamic(() => import("./sections/HeroSection"), { ssr: true });
const VideoSection = dynamic(() => import("./sections/VideoSection"), { ssr: true });
const OurSchools = dynamic(() => import("./sections/OurSchools"), { ssr: true });
const AcademicCultural = dynamic(() => import("./sections/AcademicCultural"), { ssr: true });
const MessageSection = dynamic(() => import("./sections/MessageSection"), { ssr: true });

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
      <OurSchools data={data.secondSection} schoolData={schooldata} categorydata={categorydata} locationdata={locationdata}/>
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
