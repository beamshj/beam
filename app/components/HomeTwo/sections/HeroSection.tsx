"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";
import "../../../swiper-minimal.css";
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
  const totalSlides = data.items.length;
  const slideOverlayRefs = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const isArabic = useIsPreferredLanguageArabic();
  const t = useApplyLang(data);

  // RAF throttle to prevent layout thrashing
  const rafIdRef = useRef<number | null>(null);

  // Memoize register click handler
  const handleRegisterClick = useCallback(() => {
    window.location.href = "/contact-us?scroll=register";
  }, []);

  // Memoize animation directions to prevent recreation
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

  // Optimized slide animation with reflow prevention
  const animateSlideIn = useCallback((index: number) => {
    // Skip animation for first slide on initial load
    if (index === 0 && isInitialLoad) {
      const img = imageRefs.current[0]?.querySelector("img");
      const overlay = slideOverlayRefs.current[0];

      if (img) {
        gsap.killTweensOf(img);
        // Use transform instead of direct style manipulation
        gsap.set(img, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          force3D: true, // Force GPU acceleration
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

    // Batch DOM reads before writes to prevent layout thrashing
    const direction = directions[index % directions.length];

    // Kill existing tweens in batch
    slideOverlayRefs.current.forEach((overlay) => {
      if (overlay) gsap.killTweensOf(overlay);
    });

    gsap.killTweensOf([overlayElement, imgElement, img]);

    // Create timeline with optimized settings
    const tl = gsap.timeline({
      defaults: {
        force3D: true, // Force GPU acceleration for all animations
        ease: "none"
      }
    });

    // Set initial states using transforms (no reflow)
    gsap.set(overlayElement, {
      ...direction.from,
      clipPath: direction.clipPath,
      willChange: 'transform, clip-path, opacity',
      opacity: 1,
      force3D: true,
    });

    gsap.set(img, {
      scale: 1.05,
      opacity: 1,
      x: 0,
      y: 0,
      force3D: true,
    });

    // Animate with GPU-accelerated transforms
    tl.to(overlayElement, {
      ...direction.to,
      duration: 1.2,
      ease: "power3.inOut",
      force3D: true,
    })
      .to(overlayElement, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.3,
        ease: "power2.inOut",
      }, "-=0.2")
      .to(overlayElement, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Batch reset previous images using RAF
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
          }

          rafIdRef.current = requestAnimationFrame(() => {
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
                    force3D: true,
                  });
                }
              }
            });
          });
        }
      }, "-=0.2");

    // Parallax movement with GPU acceleration
    gsap.to(img, {
      ...direction.movement,
      duration: 7,
      ease: "sine.inOut",
      delay: 0,
      force3D: true,
    });
  }, [directions, isInitialLoad]);

  // Optimized content animation with batched DOM updates
  const animateContentIn = useCallback(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    // Batch query all elements at once
    const title = contentElement.querySelector(".hero-title");
    const button = contentElement.querySelector(".hero-button");
    const divider = contentElement.querySelector(".hero-divider");

    if (!title || !button || !divider) return;

    gsap.killTweensOf([title, button, divider]);

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        force3D: true, // GPU acceleration
      }
    });

    // Animate all at once to minimize reflow
    tl.fromTo(
      title,
      {
        y: 60,
        opacity: 0,
        force3D: true,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      },
      0
    );

    tl.fromTo(
      divider,
      {
        scaleX: 0,
        opacity: 0,
        transformOrigin: isArabic ? "right center" : "left center",
        force3D: true,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0.3
    );

    tl.fromTo(
      button,
      {
        x: 40,
        opacity: 0,
        force3D: true,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      },
      0.4
    );
  }, [isArabic]);

  // Curtain reveal animation on initial load
  useEffect(() => {
    if (!isInitialLoad) return;

    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;

    if (leftCurtain && rightCurtain) {
      const tl = gsap.timeline({
        defaults: {
          force3D: true, // GPU acceleration
        },
        onComplete: () => {
          setShowCurtains(false);
          // Clean up willChange after animation
          gsap.set([leftCurtain, rightCurtain], { willChange: 'auto' });
        }
      });

      setShowContent(true);

      // Animate both curtains simultaneously (no reflow)
      tl.to(leftCurtain, {
        x: '-100%',
        duration: 1.2,
        ease: "power2.out",
      }, 0)
        .to(rightCurtain, {
          x: '100%',
          duration: 1.2,
          ease: "power2.out",
        }, 0);

      // Set first slide image without animation
      const firstImg = imageRefs.current[0]?.querySelector("img");
      if (firstImg) {
        gsap.set(firstImg, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          force3D: true,
        });
      }

      // Delay content animation to prevent simultaneous reflows
      setTimeout(() => {
        animateContentIn();
      }, 300);

      setIsInitialLoad(false);
    }
  }, [isInitialLoad, animateContentIn]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Memoize slide change handler
  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    const realIndex = swiper.realIndex;
    setCurrentSlide(realIndex + 1);

    // Use RAF to defer animation and prevent blocking
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      animateSlideIn(realIndex);
    });
  }, [animateSlideIn]);

  // Memoize active slide
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
              transform: 'translate3d(0, 0, 0)', // Force GPU layer
            }}
          />
          <div
            ref={rightCurtainRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#0a1e28] z-[60]"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)', // Force GPU layer
            }}
          />
        </>
      )}

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={1000}
        slidesPerView={1}
        loop
        observer={true} // Prevent layout thrashing
        observeParents={true}
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
                  className="h-full w-full relative"
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)', // Force GPU layer
                    backfaceVisibility: 'hidden', // Prevent flickering
                  }}
                >
                  {/* <Image
                    className="h-full w-full object-cover object-center"
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1920}
                    height={1280}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                    sizes="100vw"
                    style={{
                      transform: 'translate3d(0, 0, 0)', // Force GPU
                    }}
                  /> */}
              
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1920}
                    height={1280}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"} // ✅ ADD THIS
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={index === 0 ? 90 : 75} // ✅ CHANGE THIS
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                    style={{
                      transform: 'translate3d(0, 0, 0)',
                    }}
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
                  willChange: 'clip-path, opacity, transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)', // Force GPU layer
                  opacity: 0,
                }}
              >
                <div className="h-full w-full absolute inset-0">
                  {/* <Image
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
                      transform: 'scale(1.05) translate3d(0, 0, 0)', // GPU acceleration
                    }}
                  /> */}
                  <Image
                    className="h-full w-full object-cover object-center overlay-image"
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1920}
                    height={1280}
                    fetchPriority={index === 0 ? "high" : "auto"} // ✅ ADD THIS
                    loading={index === 0 ? "eager" : "lazy"} // ✅ CHANGE THIS
                    quality={index === 0 ? 90 : 75} // ✅ ADD THIS
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px" // ✅ ADD THIS
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: 'scale(1.05) translate3d(0, 0, 0)',
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
                opacity: showContent ? 1 : 0,
                willChange: showContent ? 'auto' : 'opacity',
                transform: 'translate3d(0, 0, 0)', // Force GPU layer
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