"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { gsap } from "gsap";
import { HomeProps } from "../type";

const HeroSection = ({ data }: { data: HomeProps["bannerSection"] }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showCurtains, setShowCurtains] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  // const hasAnimatedFirstSlide = useRef(false);
  const totalSlides = data.items.length;
  const slideOverlayRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  const handleRegisterClick = () => {
    window.location.href = "/contact-us?scroll=register";
  };

  // Animate slide coming in by having its own image push in with notched edge
  const animateSlideIn = (index: number) => {
    // Skip animation for first slide on initial load
    if (index === 0 && isInitialLoad) {
      // Only kill tweens on the first slide image, not curtains
      const img = imageRefs.current[0]?.querySelector("img");
      const overlay = slideOverlayRefs.current[0];

      if (img) {
        gsap.killTweensOf(img);
        gsap.set(img, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0
        });
      }

      if (overlay) {
        gsap.killTweensOf(overlay);
      }

      return; // Stop animation function here
    }

    const overlayElement = slideOverlayRefs.current[index];
    const imgElement = imageRefs.current[index];

    if (!overlayElement || !imgElement) return;

    const img = imgElement.querySelector("img");
    if (!img) return;

    // Kill all animations
    slideOverlayRefs.current.forEach((overlay) => {
      if (overlay) gsap.killTweensOf(overlay);
    });
    gsap.killTweensOf([overlayElement, imgElement, img]);

    // Different reveal directions with notches on the LEADING edge
    // Using translate instead of scale to avoid distortion
    const directions = [
      {
        from: { y: '-100%', x: 0 },
        to: { y: '0%', x: 0 },
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 80% 100%, 80% 92%, 60% 92%, 60% 100%, 40% 100%, 40% 92%, 20% 92%, 20% 100%, 0 100%)',
        movement: { y: -20, x: 0 }
      }, // Top to bottom - notches at BOTTOM
      {
        from: { y: 0, x: '100%' },
        to: { y: 0, x: '0%' },
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 80%, 8% 80%, 8% 60%, 0 60%, 0 40%, 8% 40%, 8% 20%, 0 20%)',
        movement: { y: 0, x: 20 }
      }, // Right to left - notches at LEFT
      {
        from: { y: '100%', x: 0 },
        to: { y: '0%', x: 0 },
        clipPath: 'polygon(0 0, 20% 0, 20% 8%, 40% 8%, 40% 0, 60% 0, 60% 8%, 80% 8%, 80% 0, 100% 0, 100% 100%, 0 100%)',
        movement: { y: 20, x: 0 }
      }, // Bottom to top - notches at TOP
      {
        from: { y: 0, x: '-100%' },
        to: { y: 0, x: '0%' },
        clipPath: 'polygon(0 0, 100% 0, 100% 20%, 92% 20%, 92% 40%, 100% 40%, 100% 60%, 92% 60%, 92% 80%, 100% 80%, 100% 100%, 0 100%)',
        movement: { y: 0, x: -20 }
      }, // Left to right - notches at RIGHT
    ];

    const direction = directions[index % directions.length];
    const tl = gsap.timeline();

    // Overlay starts off-screen with notched edge
    gsap.set(overlayElement, {
      ...direction.from,
      clipPath: direction.clipPath,
      willChange: 'transform',
      opacity: 1
    });

    gsap.set(img, {
      scale: 1.05,
      opacity: 1,
      x: 0,
      y: 0
    });

    // Animate overlay sliding in, then smoothly transition clip-path and fade
    tl.to(overlayElement, {
      ...direction.to,
      duration: 1.2,
      ease: "power3.inOut"
    })
      .to(overlayElement, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Smooth to rectangle
        duration: 0.25,
        ease: "power2.inOut"
      }, "-=0.1")
      .to(overlayElement, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.15");

    // Subtle parallax movement - starts AFTER overlay fades out
    tl.to(img, {
      ...direction.movement,
      duration: 7,
      ease: "power1.inOut"
    }, "+=0");
  };

  // Smooth content reveal
  const animateContentIn = (index: number) => {
    const contentElement = contentRefs.current[index];
    if (!contentElement) return;

    const title = contentElement.querySelector(".hero-title");
    const button = contentElement.querySelector(".hero-button");
    const divider = contentElement.querySelector(".hero-divider");

    gsap.killTweensOf([title, button, divider]);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      title,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out"
      },
      0
    );

    tl.fromTo(
      divider,
      { scaleX: 0, opacity: 0, transformOrigin: "left" },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" },
      0.3
    );

    tl.fromTo(
      button,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.4
    );
  };

  // Curtain reveal animation on initial load
  useEffect(() => {
    if (!isInitialLoad) return;

    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;

    if (leftCurtain && rightCurtain) {
      // Start animation immediately without delay
      const tl = gsap.timeline({
        onComplete: () => {
          setShowCurtains(false);
        }
      });

      // Faster curtain animation
      tl.to(leftCurtain, {
        x: '-100%',
        duration: 1.2,
        ease: "power2.out"
      }, 0)
        .to(rightCurtain, {
          x: '100%',
          duration: 1.2,
          ease: "power2.out"
        }, 0);

      // First slide image - NO ANIMATION, just set it visible and static
      const firstImg = imageRefs.current[0]?.querySelector("img");
      if (firstImg) {
        gsap.set(firstImg, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0
        });
        // NO parallax movement on first load
      }

      // Show content almost immediately (300ms)
      setTimeout(() => {
        animateContentIn(0);
      }, 300);

      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  return (
    <section className="lg:h-screen h-[65dvh] md:h-[85dvh] relative overflow-hidden max-w-[1920px] mx-auto">
      {/* Curtain Overlays - Start visible, animate immediately */}
      {showCurtains && (
        <>
          <div
            ref={leftCurtainRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#0a1e28] z-10"
            style={{
              willChange: 'transform',
              transform: 'translateX(0%)'
            }}
          />
          <div
            ref={rightCurtainRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#0a1e28] z-10"
            style={{
              willChange: 'transform',
              transform: 'translateX(0%)'
            }}
          />
        </>
      )}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        speed={1000}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          setCurrentSlide(realIndex + 1);
          animateSlideIn(realIndex);
          animateContentIn(realIndex);
        }}
        className="w-full h-full"
      >
        {data.items.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-screen relative overflow-hidden text-white">
              {/* Background image */}
              <figure className="h-full w-full absolute -z-50 overflow-hidden">
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (el) {
                      imageRefs.current[index] = el;
                    }
                  }}
                  className="h-full w-full relative will-change-transform"
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                  }}
                >
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1920}
                    height={1280}
                    priority={index === 0}
                  />
                </div>
              </figure>

              {/* Slide overlay with same image that animates in with notched edge */}
              <div
                ref={(el: HTMLDivElement | null) => {
                  if (el) {
                    slideOverlayRefs.current[index] = el;
                  }
                }}
                className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
                style={{
                  willChange: 'clip-path, opacity',
                  backfaceVisibility: 'hidden',
                  opacity: index === 0 ? 0 : 0
                }}
              >
                <div className="h-full w-full absolute inset-0">
                  <Image
                    className="h-full w-full object-cover object-center overlay-image"
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1920}
                    height={1280}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: 'scale(1.05)'
                    }}
                  />
                  {/* Match the gradient overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)]"></div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)] -z-40"></div>

              {/* Content */}
              <div className="absolute w-full h-full">
                <div className="container h-full">
                  <div className="h-full relative w-full overflow-hidden">
                    <div
                      ref={(el: HTMLDivElement | null) => {
                        if (el) {
                          contentRefs.current[index] = el;
                        }
                      }}
                      className="absolute bottom-5 lg:bottom-[30px] xl:bottom-[50px] grid grid-cols-1 xl:grid-cols-7 items-end gap-2"
                    >
                      {/* Left text */}
                      <div className="xl:mb-[65px] col-span-1 md:col-span-5">
                        <h2 className="hero-title text-[1.8rem] md:text-2xl 2xl:text-4xl text-white leading-[1.2] xl:leading-[1.1] font-custom font-light lettersp-4-hero mb-0 max-w-none">
                          <span className="text-primary">
                            {slide.highlightText}{" "}
                          </span>
                          {slide.title}
                        </h2>
                      </div>

                      {/* Button */}
                      <div
                        onClick={handleRegisterClick}
                        className="hero-button md:mb-[35px] lg:mb-[85px] xl:mb-[120px] flex justify-end flex-col xl:items-end col-span-1 md:col-span-2"
                      >
                        <div>
                          <div className="mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full hover:-translate-x-2 hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]">
                            <a
                              href="#"
                              className="cursor-pointer pl-4 pr-2 md:px-4 py-[10px] md:py-3 bg-primary rounded-full flex items-center gap-2 transition-all duration-300"
                            >
                              <p className="group-hover:text-white text-xs font-light text-white uppercase transition-colors duration-300">
                                Register Interest
                              </p>
                              <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="11"
                                  viewBox="0 0 10 11"
                                  fill="none"
                                >
                                  <path
                                    d="M8.74639 1.76178L1.12891 9.36247"
                                    stroke="#42BADC"
                                    strokeMiterlimit="10"
                                  />
                                  <path
                                    d="M1.12891 1.76178H8.74639V9.21251"
                                    stroke="#42BADC"
                                    strokeMiterlimit="10"
                                  />
                                </svg>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Divider line */}
                      <div className="hero-divider absolute left-[40%] bottom-[83px] w-[80%] hidden xl:block">
                        <div className="h-[1px] w-full bg-gradient-to-r from-white via-white/30 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Indicator */}
      <div className="absolute bottom-[10%] md:bottom-[37%] w-full z-[60]">
        <div className="container flex justify-end">
          <span className="text-[15px] text-white whitespace-nowrap font-light relative -right-3 md:right-2 z-10 flex flex-col items-center">
            <div className="flex flex-col rotate-180">
              {data.items.map((_, index) => (
                <span
                  key={index}
                  className={`font-medium w-[1px] h-[10px] mt-2 transition-all duration-300 ${index === currentSlide - 1 ? "bg-primary" : "bg-white"
                    }`}
                ></span>
              ))}
            </div>
            <span className="mt-4 -rotate-90 font-light text-[15px]">{`0${totalSlides}`}</span>
            <span className="font-medium w-[1px] h-[8px] bg-white mt-1"></span>
            <span className="font-[700] text-[15px] -rotate-90 mt-1">
              {`0${currentSlide}`}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;