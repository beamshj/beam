import React from 'react'
import HeroSection from './sections/HeroSection'
import VideoSection from './sections/VideoSection'
import OurSchools from './sections/OurSchools'
import AcademicCultural from './sections/AcademicCultural'
import MessageSection from './sections/MessageSection'

import DiverseGrowing from './sections/DiverseGrowing'
import Alumni from './sections/Alumni'
import MediaHub from './sections/MediaHub'
import JoinBeam from './sections/JoinBeam'

import LogoSlider from './sections/LogoSlider'
const Index = () => {
  return (
    <>
    <HeroSection/>
    <OurSchools />
    <AcademicCultural />
    <VideoSection/>
    <DiverseGrowing />
    <MessageSection/>
    <Alumni />
    <MediaHub />
    <JoinBeam/>
    <LogoSlider />  
    </>
  )
}

export default Index