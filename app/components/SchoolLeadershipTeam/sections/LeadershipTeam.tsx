"use client"

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    portfolio: [
      "Over 3 decades of experience",
      "BA English",
      "Leadership Management Diploma"
    ]
  },
  {
    id: 2,
    name: "Michael Thompson",
    designation: "Vice Principal, ASCS Abu Dhabi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    portfolio: [
      "15 years in educational leadership",
      "MSc Educational Management",
      "Curriculum Development Specialist"
    ]
  },
  {
    id: 3,
    name: "Fatima Al-Said",
    designation: "Head of Academics, ASCS Sharjah",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
    portfolio: [
      "20 years teaching experience",
      "PhD in Education",
      "International Baccalaureate Coordinator"
    ]
  },
  {
    id: 4,
    name: "Ataullah Parker",
    designation: "Principal, ASCS Matha",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=700&fit=crop",
    portfolio: [
      "Over 3 decades of experience",
      "BA English",
      "Leadership Management Diploma"
    ]
  }
];

export default function LeadershipTeam() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const activeMember = teamMembers[activeIndex];

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] py-20 px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-[64px] font-light leading-tight mb-6">
            Schools'<br />Leadership Team
          </h1>
          <p className="text-gray-600 text-base max-w-[500px] leading-relaxed">
            Our leadership team brings together a wealth of experience, vision, and passion. With a strong commitment to excellence and innovation, they guide our journey forward — empowering teams, shaping strategy, and driving meaningful impact every step of the way.
          </p>
        </div>

        {/* Swiper Section */}
        <div className="flex items-start gap-12">
          {/* Swiper Container */}
          <div className="flex-1">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={3}
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              className="leadership-swiper"
              initialSlide={3}
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={member.id}>
                  {({ isActive }) => (
                    <div className={`transition-all duration-500 ${
                      isActive ? 'w-[459px] h-[693px]' : 'w-[255px] h-[255px]'
                    }`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-lg grayscale"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Active Slide Info */}
          <div className="w-[320px] flex flex-col justify-between" style={{ height: '693px' }}>
            {/* Counter */}
            <div className="text-right">
              <span className="text-sm text-gray-400">
                {String(activeIndex + 1).padStart(2, '0')}/
                <span className="text-gray-800">{String(teamMembers.length).padStart(2, '0')}</span>
              </span>
            </div>

            {/* Member Info */}
            <div className="space-y-6">
              <h2 className="text-4xl font-light">{activeMember.name}</h2>
              <p className="text-sm text-gray-600">{activeMember.designation}</p>
              
              {/* Portfolio */}
              <div className="space-y-3 pt-4">
                {activeMember.portfolio.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-gray-400 text-lg mt-1">+</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Navigation Button */}
              <button
                onClick={() => swiperInstance?.slideNext()}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors mt-8"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .leadership-swiper {
          overflow: visible !important;
        }
        
        .leadership-swiper .swiper-wrapper {
          align-items: center;
        }
        
        .leadership-swiper .swiper-slide {
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}