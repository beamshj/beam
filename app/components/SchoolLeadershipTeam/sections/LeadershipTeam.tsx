"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  portfolio: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Principal, ASCS Dubai",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    portfolio: [
      "Over 3 decades of experience",
      "BA English",
      "Leadership Management Diploma",
    ],
  },
  {
    id: 2,
    name: "Michael Thompson",
    designation: "Vice Principal, ASCS Abu Dhabi",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    portfolio: [
      "15 years in educational leadership",
      "MSc Educational Management",
      "Curriculum Development Specialist",
    ],
  },
  {
    id: 3,
    name: "Fatima Al-Said",
    designation: "Head of Academics, ASCS Sharjah",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
    portfolio: [
      "20 years teaching experience",
      "PhD in Education",
      "International Baccalaureate Coordinator",
    ],
  },
  {
    id: 4,
    name: "Ataullah Parker",
    designation: "Principal, ASCS Matha",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=700&fit=crop",
    portfolio: [
      "Over 3 decades of experience",
      "BA English",
      "Leadership Management Diploma",
    ],
  },
];

export default function LeadershipTeam() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const activeMember = teamMembers[activeIndex];

  return (
    <div className="">
      <div>
        {/* Swiper Section */}
        <div className="flex">
          {/* Left side: Text + Swiper */}
          <div className="flex flex-col">
            {/* Swiper below text */}
            <div className="relative">
              <Swiper
                dir="rtl"
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={4}
                onSwiper={setSwiperInstance}
                onSlideChange={handleSlideChange}
                className="ld-leadership-swiper"
                watchSlidesProgress={true}
                allowTouchMove={true}
                slideToClickedSlide={true}
              >
                {[...teamMembers].reverse().map((member, index) => (
                  <SwiperSlide key={member.id} className="ld-swiper-slide">
                    {({ isActive }) => (
                      <div
                        className={`ld-slide-content ${
                          isActive ? "ld-active" : "ld-inactive"
                        }`}
                        onClick={() => swiperInstance?.slideTo(index)}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-[12px] grayscale"
                        />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right side: Active Slide Info */}
          <div className="w-[280px] flex flex-col justify-between h-[693px] flex-shrink-0">
            {/* Counter */}
            <div className="text-right">
              <span className="text-sm">
                <span className="text-gray-400">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800">
                  {String(teamMembers.length).padStart(2, "0")}
                </span>
              </span>
            </div>

            {/* Member Info */}
            <div className="space-y-6">
              <h2 className="text-[40px] font-light leading-tight">
                {activeMember.name}
              </h2>
              <p className="text-sm text-gray-600">
                {activeMember.designation}
              </p>

              {/* Portfolio */}
              <div className="space-y-3 pt-4">
                {activeMember.portfolio.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-gray-400 text-base">+</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Navigation Button */}
              <button
                onClick={() => swiperInstance?.slidePrev()}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors mt-8"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ld-leadership-swiper {
          width: 100%;
          height: 693px;
          overflow: visible !important;
          direction: rtl;
        }

        .ld-leadership-swiper .swiper-wrapper {
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .ld-swiper-slide {
          width: auto !important;
          height: auto !important;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .ld-slide-content {
          transition: all 0.5s ease;
          border-radius: 0.5rem;
          overflow: hidden;
          cursor: pointer;
        }

        .ld-slide-content.ld-active {
          width: 459px;
          height: 693px;
        }

        .ld-slide-content.ld-inactive {
          width: 255px;
          height: 255px;
        }
      `}</style>
    </div>
  );
}
