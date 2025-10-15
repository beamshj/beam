"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import SplitText from "@/components/SplitText";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";

interface CampusStats {
  students: string;
  nationalities: string;
  teachers: string;
}

interface SchoolCard {
  id: string;
  name: string;
  logo: string;
  location: string;
  image: string;
  curriculum: string;
  stats: CampusStats;
}

interface SchoolCardsPageProps {
  title: string;
  description: string;
  campuses: SchoolCard[];
}

const SchoolCards = ({ schoolData }: { schoolData: SchoolCardsPageProps }) => {
  const { title, description, campuses } = schoolData;

  // Default selections
  const [selectedCurriculum, setSelectedCurriculum] =
    useState<string>("american");
  const [selectedLocation, setSelectedLocation] = useState<string>("Dubai");

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Extract unique locations (last word of location string)
  const locations = Array.from(
    new Set(
      campuses.map((campus) => {
        const parts = campus.location.split(",");
        return parts[parts.length - 1].trim();
      })
    )
  );

  // Filter by selected curriculum & location
  const filteredCampuses = campuses.filter((campus) => {
    const matchesCurriculum =
      campus.curriculum.toLowerCase() === selectedCurriculum.toLowerCase();

    const campusLocation = campus.location.split(",").pop()?.trim();
    const matchesLocation =
      campusLocation?.toLowerCase() === selectedLocation.toLowerCase();

    return matchesCurriculum && matchesLocation;
  });

  const handleCardClick = (id: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      if (activeCard === id) {
        setActiveCard(null);
      } else {
        setActiveCard(id);
      }
    }
  };

  return (
    <section className="py-10 xl:py-20 2xl:py-[135px]">
      <div className="container">
        {/* Title and Description */}
        <div className="mb-5 lg:mb-10 xl:mb-[50px]">
          <h1 className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.25] lg:leading-[1.111] font-light mb-2 xl:mb-[30px] 2xl:mb-[50px] text-black max-w-[91%] lettersp-2">
            <SplitText
              tag="span"
              text={title}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-10px"
              textAlign="left"
            />
          </h1>
          <span className="text-sm text-light leading-[1.52] text-colorpara xl:max-w-[89%]">
            <SplitText
              tag="span"
              text={description}
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="lines"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-10px"
              textAlign="left"
            />
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 lg:mb-10 xl:mb-[65px] pb-5 xl:pb-[30px] border-b border-bdrcolor">
          {/* Left Buttons */}
          <div className="flex gap-3">
            <motion.button
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setSelectedCurriculum("british")}
              className={`px-[20px] py-[11px] border rounded-[50px] text-xs font-light  uppercase  ${
                selectedCurriculum === "british"
                  ? "bg-[#C9F3FF] text-black border-[#12586C]"
                  : "bg-white text-[#666666] hover:bg-gray-200 border-bdrcolor"
              }`}
            >
              BRITISH CURRICULUM
            </motion.button>
            <motion.button
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setSelectedCurriculum("american")}
              className={`px-[20px] py-[11px] border rounded-[50px] text-xs font-light uppercase ${
                selectedCurriculum === "american"
                  ? "bg-[#C9F3FF] text-black border-[#12586C]"
                  : "bg-white text-[#666666] hover:bg-gray-200 border-bdrcolor"
              }`}
            >
              AMERICAN CURRICULUM
            </motion.button>
          </div>

          {/* Right Dropdown */}
          <div className="relative">
            <motion.button
              variants={moveUp(0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center px-[20px] py-[11px] border border-[#12586C] bg-[#C9F3FF] rounded-[50px] text-[#626262] text-xs font-light min-w-[180px] justify-between"
            >
              <span>{selectedLocation}</span>
              <ChevronDown
                className={`w-[28px] h-[28px] transition-transform font-light text-[#42BADC] ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-[12px] shadow-lg min-w-[180px] z-10 overflow-hidden transition-colors duration-300">
                {locations.map((location, idx) => (
                  <motion.button
                    variants={moveUp(idx * 0.05)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3.5 hover:bg-primary text-sm text-black hover:text-white font-light rounded-[12px] transition-colors duration-300"
                  >
                    {location}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Campus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[33px]">
          {filteredCampuses.map((campus, index) => (
            <motion.div
              variants={moveUp(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              key={campus.id}
              onMouseEnter={() => setHoveredCard(campus.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(campus.id)}
              className="relative rounded-[12px] overflow-hidden cursor-pointer w-full h-[300px] lg:h-[350px] xl:h-[480px] 2xl:h-[551px] 2xl:w-[485px] mx-auto group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${campus.image})` }}
              >
                <div className="absolute left-0 bottom-0 right-0 h-[50%] bg-gradient-to-t from-black to-black/0"></div>
              </div>

              {/* Location & arrow */}
              <div className="absolute top-[14px] left-[14px] right-[14px] xl:top-[32px] xl:left-[33px] xl:right-[33px] flex items-start justify-between">
                <div className="flex items-center gap-x-2 bg-[#E6F7FF] backdrop-blur-sm px-[25px] py-[11px] rounded-[50px]">
                  <Image
                    src="/images/contact-us/icons/location.svg"
                    alt="map-icon"
                    width={24}
                    height={24}
                  />
                  <span className="text-xs font-light text-black">
                    {campus.location}
                  </span>
                </div>
                {/* Arrow Icon */}
                <div className="bg-transparent group-hover:bg-primary border-white group-hover:border-primary border xl:w-[75px] xl:h-[75px] w-[50px] h-[50px] rounded-[50px] flex items-center justify-center transition-colors duration-300">
                  <Image
                    src="/images/arrow-right-up.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                    className="w-[18px] h-[18px] xl:w-[24px] xl:h-[24px]"
                  />
                </div>
              </div>

              {/* Stats Box */}
              <div
                className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
                  hoveredCard === campus.id
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
              >
                <div className="bg-[#DDF7FF] backdrop-blur-sm xl:m-[6px] m-[2px] rounded-[12px] xl:px-[19px] xl:py-[18px] px-2 py-2 space-y-[5px] xl:space-y-[13px]">
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #42BADC 0%, rgba(126, 90, 163, 0.1) 100%)",
                    }}
                    className="flex items-center justify-between px-[15px] py-[14px] rounded-[12px]"
                  >
                    <div className="flex items-center justify-center gap-[23px] flex-shrink-0">
                      <Image
                        src="/images/beam-schools/icons/1.svg"
                        alt="map-icon"
                        width={32}
                        height={32}
                        className="xl:h-[32px] w-auto h-6"
                      />
                      <div className="text-sm xl:text-md font-light text-black leading-[1.4]">
                        {campus.stats.students}
                      </div>
                    </div>
                    <div className="text-sm xl:text-md font-light text-colorpara leading-[1.52]">
                      Active Students
                    </div>
                  </div>

                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #42BADC 0%, rgba(126, 90, 163, 0.1) 100%)",
                    }}
                    className="flex items-center justify-between px-[15px] py-[14px] rounded-[12px]"
                  >
                    <div className="flex items-center justify-center gap-[23px] flex-shrink-0">
                      <Image
                        src="/images/beam-schools/icons/2.svg"
                        alt="map-icon"
                        width={32}
                        height={32}
                        className="xl:h-[32px] w-auto h-6"
                      />
                      <div className="xs:text-sm xl:text-md font-light text-black leading-[1.4]">
                        {campus.stats.nationalities}
                      </div>
                    </div>
                    <div className="xs:text-sm xl:text-md font-light text-colorpara leading-[1.52]">
                      Nationalities
                    </div>
                  </div>

                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #42BADC 0%, rgba(126, 90, 163, 0.1) 100%)",
                    }}
                    className="flex items-center justify-between px-[15px] py-[14px] rounded-[12px]"
                  >
                    <div className="flex items-center justify-center gap-[23px] flex-shrink-0">
                      <Image
                        src="/images/beam-schools/icons/3.svg"
                        alt="map-icon"
                        width={32}
                        height={32}
                        className="xl:h-[32px] w-auto h-6"
                      />
                      <div className="xs:text-sm xl:text-md font-light text-black leading-[1.4]">
                        {campus.stats.teachers}
                      </div>
                    </div>
                    <div className="xs:text-sm xl:text-md font-light text-colorpara">
                      Teachers
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Name & logo */}
              <div
                className={`absolute xl:bottom-[34px] xl:left-[38px] xl:right-[38px] bottom-[22px] left-[22px] right-[22px] transition-all duration-500 ease-in-out
  ${
    hoveredCard === campus.id || activeCard === campus.id
      ? "opacity-0 translate-y-5"
      : "opacity-100 translate-y-0"
  }`}
              >
                <Image
                  src={campus.logo}
                  alt={campus.name}
                  width={500}
                  height={500}
                  className="w-[104px] h-[56px] object-contain"
                />
                <h3 className="text-white text-md max-w-[80%] xl:max-w-[100%] md:text-lg xl:text-xl font-light leading-[1.2] mt-[11px]">
                  {campus.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolCards;
