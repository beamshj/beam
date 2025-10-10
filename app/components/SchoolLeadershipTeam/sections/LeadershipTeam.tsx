"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

// IMPORTANT: Ensure these CSS files are accessible in your project
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// --- TypeScript Interfaces ---
interface TeamMember {
  id: number;
  name: string;
  role: string;
  subRole: string; // e.g., 'Principal, ASCS Mailha'
  image: string; // URL or path to the main image
  thumbnail: string; // URL or path to the thumbnail image
  experience: string;
  qualifications: string[];
}

// --- Dummy Data ---
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ataullah Parkar",
    role: "Principal",
    subRole: "ASCS Mailha",
    image:
      "https://images.unsplash.com/photo-1557862921-378377c8659d?w=800&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1557862921-378377c8659d?w=200&fit=crop",
    experience: "Over 3 decades of experience",
    qualifications: ["BA English", "Leadership Management Diploma"],
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Vice Principal",
    subRole: "Academic Affairs",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&fit=crop",
    experience: "15 years in educational leadership",
    qualifications: ["M.Ed. Curriculum Design", "TESOL Certification"],
  },
  {
    id: 3,
    name: "Yusuf Ahmed",
    role: "Operations Director",
    subRole: "Facilities & Logistics",
    image:
      "https://images.unsplash.com/photo-1622396185856-11f93f1ed197?w=800&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1622396185856-11f93f1ed197?w=200&fit=crop",
    experience: "Led 5 major school development projects",
    qualifications: ["MBA Operations", "Project Management Prof."],
  },
  {
    id: 4,
    name: "Lina Al-Farsi",
    role: "Head of Primary",
    subRole: "Early Years Foundation",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b0843204e1?w=800&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1552058544-f2b0843204e1?w=200&fit=crop",
    experience: "Pioneered inclusive education strategies",
    qualifications: ["PGCE Primary Ed.", "Special Needs Diploma"],
  },
];

const LeadershipSlider: React.FC = () => {
  // State for the current active member's data
  const [currentMember, setCurrentMember] = useState<TeamMember>(
    teamMembers[0]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for Swiper instances to enable control and synchronization
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // Updates state when the main slide changes
  const handleSlideChange = (swiper: SwiperType) => {
    // swiper.realIndex is used when loop=true to get the index in the original array
    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);
    setCurrentMember(teamMembers[realIndex]);
  };

  // Helper function to render the bulleted qualification list
  const renderQualifications = (qualifications: string[]) => (
    <ul className="space-y-2 mt-4 text-gray-700">
      {qualifications.map((qual, index) => (
        <li key={index} className="flex items-center text-sm">
          <span className="mr-3 text-lg text-black font-semibold">→</span>
          {qual}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="container mx-auto py-16 px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* === LEFT CONTENT AREA (Titles and Text) === */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl font-light leading-none tracking-tight">
              Schools’ <br />
              Leadership Team
            </h1>
            <p className="text-gray-600 max-w-md mt-6 text-sm">
              Our leadership team brings together a wealth of experience,
              vision, and passion. With a strong commitment to excellence and
              innovation, they guide our journey forward.
            </p>
          </div>

          {/* === THUMBNAILS SLIDER AREA (Bottom Left) === */}
          <div className="mt-12 w-full">
            <Swiper
              onSwiper={setThumbsSwiper} // Captures the thumb Swiper instance
              spaceBetween={16}
              slidesPerView={3}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              className="mySwiperThumbs"
              style={{ padding: 0 }}
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={member.id} className="cursor-pointer">
                  <div
                    // Grayscale/Border effect based on active slide index
                    className={`aspect-[4/3] w-full border-[3px] border-solid transition-all duration-300 ${
                      activeIndex === index
                        ? "grayscale-0 opacity-100 border-teal-500"
                        : "grayscale opacity-80 border-transparent hover:opacity-100 hover:grayscale-0"
                    }`}
                    // Manual control to sync the main slider when a thumbnail is clicked
                    onClick={() => swiperRef.current?.swiper.slideToLoop(index)}
                  >
                    <img
                      src={member.thumbnail}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ====================================================== */}
        {/* === RIGHT CONTENT AREA (Image, Name, Stats, Button) === */}
        {/* ====================================================== */}
        <div className="relative pt-2">
          {/* Slide Counter */}
          <span className="absolute top-0 right-0 text-xl font-light text-gray-500">
            {`${(activeIndex + 1)
              .toString()
              .padStart(2, "0")}/${teamMembers.length
              .toString()
              .padStart(2, "0")}`}
          </span>

          {/* Main Swiper Container */}
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = { swiper })}
            onSlideChange={handleSlideChange}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            modules={[Navigation, Thumbs]}
            // Links the main slider to the thumbnail slider
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="mySwiper"
          >
            {/* The map below ensures all content changes with the slide */}
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                {/* 1. Main Image */}
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Subtle teal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-600/10 to-transparent"></div>
                </div>

                {/* 2. Member Details (Name, Role, Experience, Qualifications) */}
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    {/* NAME */}
                    <h2 className="text-2xl font-semibold text-black">
                      {member.name}
                    </h2>
                    {/* ROLE / SUB-ROLE */}
                    <p className="text-sm text-gray-500">
                      {member.role}, {member.subRole}
                    </p>

                    <div className="pt-4">
                      {/* EXPERIENCE / First Qualification STAT */}
                      <p className="flex items-center text-sm font-medium text-gray-700">
                        <span className="mr-3 text-lg text-black font-semibold">
                          →
                        </span>
                        {member.experience}
                      </p>
                      {/* QUALIFICATIONS LIST (The remaining STATS) */}
                      {renderQualifications(member.qualifications.slice(1))}
                    </div>
                  </div>

                  {/* Navigation Arrow */}
                  <button
                    aria-label="Next Team Member"
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition duration-150"
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                  >
                    {/* Simple SVG Arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LeadershipSlider;
