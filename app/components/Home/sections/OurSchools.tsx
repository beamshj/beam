"use client";
import React, { useEffect } from "react";
import { schoolData } from "@/app/data/ourSchools";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
// Optional: Add modules if needed
import { Navigation, Pagination } from "swiper/modules";
import SplitText from "@/components/SplitText";
import {
  fadeUp,
  cardVariants,
} from "@/public/assets/FramerAnimation/animation";
import { moveUp } from "../../motionVarients";
import { StylesConfig } from "react-select";
import dynamic from "next/dynamic";
import type { Props as SelectProps } from "react-select";
import { GroupBase } from "react-select";

const Select = dynamic<SelectProps<OptionType, false, GroupBase<OptionType>>>(
  () => import("react-select"),
  { ssr: false }
);
type OptionType = { value: string; label: string };

const OurSchools = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint = 1024px
    };
    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedCurriculum, setSelectedCurriculum] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");

  // locations
  const locations = Array.from(
    new Set(
      schoolData.schools.map((campus) => {
        const parts = campus.location.split(",");
        return parts[parts.length - 1].trim();
      })
    )
  );

  // curiculums
  const curriculums = Array.from(
    new Set(schoolData.schools.map((school) => school.curriculum))
  );

  const filteredSchools = useMemo(() => {
    return schoolData.schools.filter((school) => {
      const curriculumMatch =
        selectedCurriculum === "all" ||
        school.curriculum.toLowerCase() === selectedCurriculum.toLowerCase();

      const locationMatch =
        !selectedLocation ||
        school.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return curriculumMatch && locationMatch;
    });
  }, [selectedCurriculum, selectedLocation]);

  // locations
  const locationOptions: OptionType[] = [
    { value: "", label: "Location" },
    ...locations.map((loc) => ({
      value: loc,
      label: loc,
    })),
  ];

  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "50px",
      borderColor: state.isFocused ? "#12586C" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #12586C" : "none",
      "&:hover": {
        borderColor: "#12586C",
      },
      letterSpacing: isSmallScreen ? "-0.1px" : "0px",
      fontSize: isSmallScreen ? "12px" : "18px",
      fontWeight: 300,
      padding: isSmallScreen ? "0px 4px" : "3px 12px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#42BADC" : "white",
      color: state.isFocused ? "white" : "black",
      fontWeight: 300,
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontWeight: 300,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: 300,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 1,
      width: "20px",
      height: "20px",
      color: "#42BADC",
      fontWeight: 300,
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "12px",
      overflow: "hidden",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
  };

  return (
    <section className="py-8 xl:pt-20 xl:pb-25 2xl:pt-[133px] 2xl:pb-[160px] ">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <div className="mb-5 xl:mb-7  2xl:mb-[53px]">
            <SplitText
              tag="h2"
              text={schoolData.heading}
              className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-[1.111111111111111] text-black lettersp-4"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
          </div>
          <div className="pb-5 md:pb-7 border-b border-bdrcolor">
            <div className="flex-col md:flex-row flex justify-start md:justify-between items-start md:items-center gap-4 md:gap-0">
              {/* ---------- Left Buttons ---------- */}
              <div className="flex gap-3 items-center">
                {/* "All" button first */}
                <motion.div
                  variants={moveUp(0.2)}
                  custom={1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  onClick={() => setSelectedCurriculum("all")}
                  className={`p-[1px] group rounded-full cursor-pointer ${
                    selectedCurriculum === "all"
                      ? "bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] "
                      : "bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)]"
                  }`}
                >
                  <div className="px-4 xl:px-5 py-2 md:py-2 xl:py-3 bg-white rounded-full">
                    <p
                      className={`smtext10 text-xs font-light uppercase ${
                        selectedCurriculum === "all"
                          ? "text-black"
                          : "text-foreground group-hover:text-black"
                      }`}
                    >
                      All
                    </p>
                  </div>
                </motion.div>

                {/* Dynamically render curriculum buttons */}
                {curriculums.map((curriculum, index) => (
                  <motion.div
                    key={curriculum}
                    variants={moveUp(0.3 + index * 0.1)}
                    custom={index}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    onClick={() => setSelectedCurriculum(curriculum)}
                    className={`p-[1px] group rounded-full cursor-pointer ${
                      selectedCurriculum === curriculum
                        ? "bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)]"
                        : "bg-bdrcolor hover:bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)]"
                    }`}
                  >
                    <div className="px-2 md:px-4 xl:px-5 py-2 md:py-2 xl:py-3 bg-white rounded-full">
                      <p
                        className={`smtext10 text-xs font-light uppercase ${
                          selectedCurriculum === curriculum
                            ? "text-black"
                            : "text-foreground group-hover:text-black"
                        }`}
                      >
                        {curriculum}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ---------- Right Dropdown ---------- */}
              <motion.div
                variants={moveUp(0.5)}
                custom={4}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="w-[160px] lg:w-[248px] 2xl:w-[348px] z-10"
              >
                <Select
                  value={
                    locationOptions.find(
                      (option) => option.value === selectedLocation
                    ) ?? locationOptions[0]
                  }
                  onChange={(option) =>
                    setSelectedLocation(option?.value ?? "")
                  }
                  options={locationOptions}
                  styles={customStyles}
                  placeholder="Location"
                />
              </motion.div>
            </div>
          </div>
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              // spaceBetween={20}
              slidesPerView={1}
              // navigation
              pagination={{
                clickable: true,
                el: ".cus-pagination",
                renderBullet: (index, className) => {
                  return `<span class="${className}"></span>`;
                },
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mt-5 md:mt-8 2xl:mt-15"
            >
              {filteredSchools.map((school, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    key={selectedCurriculum}
                    className="bg-[#F5F5F5] rounded-[15px] p-1 hover:bg-[#F0F0F0] transition-color group"
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="bg-[#F5F5F5] rounded-[15px] p-1 hover:bg-[#F0F0F0] transition-all duration-300 group">
                      <div className="rounded-xl overflow-hidden relative">
                        <Image
                          src={school.img}
                          alt={school.title}
                          width={500}
                          height={500}
                        />
                        <div className="absolute opacity-0 delay-200 group-hover:-translate-y-2 group-hover:opacity-100 transition-all duration-300 top-5 right-5 p-2 bg-white/30 backdrop-blur-md  rounded-full w-[75px] h-[75px] flex items-center justify-center border border-[#42BADC]">
                          <Image
                            src="/images/home/arrow-top.svg"
                            alt={school.title}
                            width={15}
                            height={15}
                          />
                        </div>
                        <div className="absolute bottom-2 left-2 p-2 bg-white rounded-md w-fit">
                          <Image
                            src={school.logo}
                            alt={school.title}
                            width={109}
                            height={45}
                          />
                        </div>
                      </div>
                      <div className="p-2 md:p-3 xl:p-6 2xl:p-10">
                        <div className="flex justify-between items-center pb-3 border-b border-bdrcolor pt-3 2xl:pt-0">
                          <p className="text-xs font-light text-foreground">
                            {school.curriculum}
                          </p>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/images/home/location.svg"
                              alt={school.title}
                              width={12}
                              height={16}
                            />
                            <p className="text-xs font-light text-foreground">
                              {school.location}
                            </p>
                          </div>
                        </div>

                        <div className="my-4 2xl:mt-6 2xl:mb-8">
                          <h3 className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] lettersp-1">
                            {school.title}
                          </h3>
                        </div>

                        <div>
                          {school.labels.map((label, index) => (
                            <div
                              key={index}
                              className={`relative group overflow-hidden flex justify-between items-center px-3 py-[2.5px] rounded-[10px] transition-all duration-500`}
                            >
                              <div
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                  index % 2 === 0
                                    ? "bg-[linear-gradient(90deg,#E2F5FF_0%,rgba(226,245,255,0)_100%)] group-hover:opacity-0"
                                    : "bg-[linear-gradient(90deg,#F5EBFF_0%,rgba(245,235,255,0)_100%)] group-hover:opacity-0"
                                }`}
                              ></div>

                              <div
                                className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                                  index % 2 === 0
                                    ? "group-hover:opacity-100 bg-[linear-gradient(90deg,#42BADC_0%,rgba(66,186,220,0)_100%)]"
                                    : "group-hover:opacity-100 bg-[linear-gradient(90deg,#7E5AA3_0%,rgba(126,90,163,0)_100%)]"
                                }`}
                              ></div>

                              <div className="relative z-10 flex justify-between items-center w-full">
                                <p className="xl:text-md font-light text-foreground leading-[1.8] transition-colors duration-500 group-hover:text-black">
                                  {label.count} +
                                </p>
                                <p className="text-sm font-light text-foreground leading-[1.8] transition-colors duration-500">
                                  {label.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="cus-pagination   flex justify-end gap-2"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OurSchools;
