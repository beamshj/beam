"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { gsap } from "gsap";
import { HomeProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

const HeroSection = ({ data }: { data: HomeProps["bannerSection"] }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showCurtains, setShowCurtains] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = data.items.length;
  const slideOverlayRefs = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const isArabic = useIsPreferredLanguageArabic();
  const t = useApplyLang(data);

  // Cache screen size on mount and resize - prevents repeated width checks
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleRegisterClick = useCallback(() => {
    window.location.href = "/contact-us?scroll=register";
  }, []);

  const directions = useMemo(() => [
    {
      from: { y: '-100%', x: 0 },
      to: { y: '0%', x: 0 },
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 80% 100%, 80% 92%, 60% 92%, 60% 100%, 40% 100%, 40% 92%, 20% 92%, 20% 100%, 0 100%)',
      movement: { y: -20, x: 0 }
    },
    {
      from: { y: 0, x: '100%' },
      to: { y: 0, x: '0%' },
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 80%, 8% 80%, 8% 60%, 0 60%, 0 40%, 8% 40%, 8% 20%, 0 20%)',
      movement: { y: 0, x: 20 }
    },
    {
      from: { y: '100%', x: 0 },
      to: { y: '0%', x: 0 },
      clipPath: 'polygon(0 0, 20% 0, 20% 8%, 40% 8%, 40% 0, 60% 0, 60% 8%, 80% 8%, 80% 0, 100% 0, 100% 100%, 0 100%)',
      movement: { y: 20, x: 0 }
    },
    {
      from: { y: 0, x: '-100%' },
      to: { y: 0, x: '0%' },
      clipPath: 'polygon(0 0, 100% 0, 100% 20%, 92% 20%, 92% 40%, 100% 40%, 100% 60%, 92% 60%, 92% 80%, 100% 80%, 100% 100%, 0 100%)',
      movement: { y: 0, x: -20 }
    },
  ], []);

  // Optimized animation function - batches DOM reads/writes
  const animateSlideIn = useCallback((index: number) => {
    if (index === 0 && isInitialLoad) {
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

      return;
    }

    const overlayElement = slideOverlayRefs.current[index];
    const imgElement = imageRefs.current[index];

    if (!overlayElement || !imgElement) return;

    const img = imgElement.querySelector("img");
    if (!img) return;

    // Kill all tweens first (batch operation)
    const tweenTargets = [overlayElement, imgElement, img, ...slideOverlayRefs.current.filter(Boolean)];
    gsap.killTweensOf(tweenTargets);

    const direction = directions[index % directions.length];

    // Batch all GSAP sets together to minimize reflows
    gsap.set(overlayElement, {
      ...direction.from,
      clipPath: direction.clipPath,
      willChange: 'transform',
      opacity: 1,
      force3D: true // Force GPU acceleration
    });

    gsap.set(img, {
      scale: isMobile ? 1 : 1.05,
      opacity: 1,
      x: 0,
      y: 0,
      force3D: true
    });

    // Create timeline with all animations
    const tl = gsap.timeline();

    tl.to(overlayElement, {
      ...direction.to,
      duration: 1.2,
      ease: "power3.inOut",
      force3D: true
    })
      .to(overlayElement, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.3,
        ease: "power2.inOut"
      }, "-=0.2")
      .to(overlayElement, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Batch cleanup animations using requestAnimationFrame
          requestAnimationFrame(() => {
            imageRefs.current.forEach((imgRef, idx) => {
              if (imgRef && idx !== index) {
                const prevImg = imgRef.querySelector("img");
                if (prevImg) {
                  gsap.to(prevImg, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: true,
                    force3D: true
                  });
                }
              }
            });
          });
        }
      }, "-=0.2");

    // Ken Burns effect only on desktop
    if (!isMobile) {
      gsap.to(img, {
        ...direction.movement,
        duration: 7,
        ease: "sine.inOut",
        delay: 0,
        force3D: true
      });
    }
  }, [directions, isInitialLoad, isMobile]);

  const animateContentIn = useCallback(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    // Batch DOM queries
    const elements = {
      title: contentElement.querySelector(".hero-title"),
      button: contentElement.querySelector(".hero-button"),
      divider: contentElement.querySelector(".hero-divider")
    };

    const { title, button, divider } = elements;

    // Kill all tweens at once
    gsap.killTweensOf([title, button, divider]);

    const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });

    if (title) {
      tl.fromTo(
        title,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2 },
        0
      );
    }

    if (divider) {
      tl.fromTo(
        divider,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: isArabic ? "right center" : "left center",
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.3
      );
    }

    if (button) {
      tl.fromTo(
        button,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.4
      );
    }
  }, [isArabic]);

  // Curtain reveal animation
  useEffect(() => {
    if (!isInitialLoad) return;

    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;

    if (leftCurtain && rightCurtain) {
      const tl = gsap.timeline({
        onComplete: () => {
          setShowCurtains(false);
        }
      });

      setShowContent(true);

      tl.to(leftCurtain, {
        x: '-100%',
        duration: 1.2,
        ease: "power2.out",
        force3D: true
      }, 0)
        .to(rightCurtain, {
          x: '100%',
          duration: 1.2,
          ease: "power2.out",
          force3D: true
        }, 0);

      const firstImg = imageRefs.current[0]?.querySelector("img");
      if (firstImg) {
        gsap.set(firstImg, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          force3D: true
        });
      }

      // Use requestAnimationFrame to defer content animation
      setTimeout(() => {
        requestAnimationFrame(() => {
          animateContentIn();
        });
      }, 300);

      setIsInitialLoad(false);
    }
  }, [isInitialLoad, animateContentIn]);

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    const realIndex = swiper.realIndex;
    setCurrentSlide(realIndex + 1);

    // Defer animation to next frame to batch with other updates
    requestAnimationFrame(() => {
      animateSlideIn(realIndex);
    });
  }, [animateSlideIn]);

  const activeSlide = useMemo(() =>
    t.items[currentSlide - 1] || t.items[0],
    [t.items, currentSlide]
  );

  return (
    <section className="lg:h-screen h-[65dvh] md:h-[85dvh] relative overflow-hidden max-w-[1920px] mx-auto">
      {/* Curtain Overlays */}
      {showCurtains && (
        <>
          <div
            ref={leftCurtainRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#0a1e28] z-[60]"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
            }}
          />
          <div
            ref={rightCurtainRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#0a1e28] z-[60]"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
            }}
          />
        </>
      )}

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: false,
        }}
        speed={800}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {t.items.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-screen relative overflow-hidden">
              {/* Background image */}
              <figure className="h-full w-full absolute inset-0 overflow-hidden">
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
                    fetchPriority={index === 0 ? "high" : "auto"}
                    quality={80}
                    placeholder={index === 0 ? "empty" : "blur"}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                    sizes="100vw"
                  />
                </div>
              </figure>

              {/* Slide overlay */}
              <div
                ref={(el: HTMLDivElement | null) => {
                  if (el) {
                    slideOverlayRefs.current[index] = el;
                  }
                }}
                className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
                style={{
                  willChange: 'transform, clip-path, opacity',
                  backfaceVisibility: 'hidden',
                  opacity: 0,
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                <div className="h-full w-full absolute inset-0">
                  <Image
                    className="h-full w-full object-cover object-center overlay-image"
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1920}
                    height={1280}
                    loading="lazy"
                    quality={85}
                    sizes="100vw"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: 'scale(1.05) translate3d(0, 0, 0)'
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)]"></div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)]"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Static Content */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none z-[70]">
        <div className="container h-full">
          <div className="h-full relative w-full overflow-hidden">
            <div
              ref={contentRef}
              className="absolute bottom-5 lg:bottom-[30px] xl:bottom-[50px] grid grid-cols-1 xl:grid-cols-7 items-end gap-2 pointer-events-auto"
              style={{
                clipPath: showContent
                  ? "inset(0 0 0 0)"
                  : "inset(0 0 100% 0)",
                transform: showContent ? "translateY(0)" : "translateY(20px)",
                transition: "clip-path 0.6s ease-out, transform 0.6s ease-out"
              }}
            >
              {/* Left text */}
              <div className="xl:mb-[65px] col-span-1 md:col-span-5">
                <h2 className={`hero-title text-[1.8rem] md:text-2xl 2xl:text-4xl text-white leading-[1.2] xl:leading-[1.1] font-custom font-light lettersp-4-hero mb-0 ${isArabic ? "max-w-[90%]" : "max-w-none"}`}>
                  <span className="text-primary">
                    {activeSlide.highlightText}
                  </span>{" "}
                  {activeSlide.title}
                </h2>
              </div>

              {/* Button */}
              <div
                onClick={handleRegisterClick}
                className="hero-button md:mb-[35px] lg:mb-[85px] xl:mb-[120px] flex justify-end flex-col xl:items-end col-span-1 md:col-span-2"
              >
                <div>
                  <div className={`mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full ${isArabic ? "hover:translate-x-2" : "hover:-translate-x-2"} hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]`}>
                    <button
                      type="button"
                      className="cursor-pointer pl-4 pr-2 md:px-4 py-[10px] md:py-3 bg-primary rounded-full flex items-center gap-2 transition-all duration-300"
                      aria-label={isArabic ? "سجل اهتمامك" : "Register Interest"}
                    >
                      {isArabic && <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
                          <path d="M8.74639 1.76178L1.12891 9.36247" stroke="#42BADC" strokeMiterlimit="10" />
                          <path d="M1.12891 1.76178H8.74639V9.21251" stroke="#42BADC" strokeMiterlimit="10" />
                        </svg>
                      </div>}
                      <p className="group-hover:text-white text-xs font-light text-white uppercase transition-colors duration-300">
                        {isArabic ? "سجل اهتمامك" : "Register Interest"}
                      </p>
                      {!isArabic && <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
                          <path d="M8.74639 1.76178L1.12891 9.36247" stroke="#42BADC" strokeMiterlimit="10" />
                          <path d="M1.12891 1.76178H8.74639V9.21251" stroke="#42BADC" strokeMiterlimit="10" />
                        </svg>
                      </div>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider line */}
              <div className={`hero-divider absolute ${isArabic ? "right-[40%]" : "left-[40%]"} bottom-[83px] w-[80%] hidden xl:block`}>
                <div className={`h-[1px] w-full ${isArabic ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white via-white/30 to-transparent`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Indicator */}
      <div className="absolute bottom-[10%] md:bottom-[37%] w-full z-[80] pointer-events-none">
        <div className="container flex justify-end">
          <span className="text-[15px] text-white whitespace-nowrap font-light relative -right-3 md:right-2 z-10 flex flex-col items-center">
            <div className="flex flex-col rotate-180">
              {t.items.map((_, index) => (
                <span
                  key={index}
                  className={`font-medium w-[1px] h-[10px] mt-2 transition-all duration-300 ${index === currentSlide - 1 ? "bg-primary" : "bg-white"}`}
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