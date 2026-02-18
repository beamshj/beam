"use client";
import Image from "next/image";
import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { gsap } from "gsap";
import { HomeProps } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { useRouter } from "next/navigation";

// ─── Stagger Content In ───────────────────────────────────────────────────────
const animateContentIn = () => {
  const targets = [".hero-title", ".hero-button", ".hero-divider"];

  targets.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) gsap.killTweensOf(el);
  });

  gsap.fromTo(
    targets,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.23 }
  );
};

// ─── Entry Animation — "Fabric Tear" ─────────────────────────────────────────
//
//  The section appears black. Two halves (left/right) slide apart from the
//  center like a curtain being pulled open, revealing the hero behind.
//  As they separate, a blinding white seam blazes down the center.
//  The halves accelerate off-screen with expo ease leaving a vapor trail.
//  Content fades in once the view is clear.
//
const animateEntry = (container: HTMLElement) => {
  const W = container.offsetWidth;

  const root = document.createElement("div");
  root.style.cssText = `
    position:absolute; inset:0; z-index:99999;
    pointer-events:none; overflow:hidden;
  `;
  container.appendChild(root);

  // Left curtain half
  const left = document.createElement("div");
  left.style.cssText = `
    position:absolute;
    top:0; left:0;
    width:50%; height:100%;
    // background: linear-gradient(
    //   105deg,
    //   #030508 0%,
    //   #06101a 60%,
    //   #0a1f2e 100%
    // );
        background: linear-gradient(
      105deg,
      #42BADC 0%,
      #42BADC 60%,
      #42BADC 100%
    );
    will-change:transform;
  `;

  // Right curtain half
  const right = document.createElement("div");
  right.style.cssText = `
    position:absolute;
    top:0; right:0;
    width:50%; height:100%;
    background: linear-gradient(
      105deg,
      #42BADC 0%,
      #42BADC 60%,
      #42BADC 100%
    );
    will-change:transform;
  `;

  // Center seam glow
  const seam = document.createElement("div");
  seam.style.cssText = `
    position:absolute;
    top:0; left:50%;
    transform:translateX(-50%);
    width:6px; height:100%;
    background: linear-gradient(180deg,
      rgba(66,186,220,0) 0%,
      rgba(180,240,255,1) 20%,
      rgba(255,255,255,1) 50%,
      rgba(180,240,255,1) 80%,
      rgba(66,186,220,0) 100%
    );
    filter:blur(3px);
    opacity:0;
    will-change:opacity,transform;
    z-index:2;
  `;

  // Wide halo behind seam
  const halo = document.createElement("div");
  halo.style.cssText = `
    position:absolute;
    top:0; left:50%;
    transform:translateX(-50%);
    width:120px; height:100%;
    background: radial-gradient(ellipse at center,
      rgba(66,186,220,0.35) 0%,
      rgba(66,186,220,0.08) 50%,
      transparent 100%
    );
    filter:blur(18px);
    opacity:0;
    z-index:1;
  `;

  root.appendChild(left);
  root.appendChild(right);
  root.appendChild(halo);
  root.appendChild(seam);

  const tl = gsap.timeline({
    onComplete: () => {
      root.remove();
      animateContentIn();
    },
  });

  // Seam ignites first — crack of light appears
  tl.to(seam, { opacity: 1, scaleX: 1.8, duration: 0.18, ease: "power4.out" }, 0.05);
  tl.to(halo, { opacity: 1, duration: 0.22, ease: "power2.out" }, 0.05);

  // Halves rip apart
  tl.to(left,  { x: -(W * 0.52), duration: 0.72, ease: "expo.in" }, 0.18);
  tl.to(right, { x:   W * 0.52,  duration: 0.72, ease: "expo.in" }, 0.18);

  // Seam widens then vanishes as halves clear
  tl.to(seam, { opacity: 0, scaleX: 8, filter: "blur(12px)", duration: 0.35, ease: "power2.in" }, 0.52);
  tl.to(halo, { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.6);

  // Vapor trails — thin streaks that linger briefly
  for (let side = 0; side < 2; side++) {
    const trail = document.createElement("div");
    const isLeft = side === 0;
    trail.style.cssText = `
      position:absolute;
      top:0;
      ${isLeft ? "left:0" : "right:0"};
      width:40px; height:100%;
      background: linear-gradient(${isLeft ? "to right" : "to left"},
        rgba(66,186,220,0.18) 0%,
        transparent 100%
      );
      filter:blur(8px);
      opacity:0;
      z-index:3;
    `;
    root.appendChild(trail);
    tl.to(trail, { opacity: 1, duration: 0.1 }, 0.55);
    tl.to(trail, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.7);
  }

  tl.to(root, { opacity: 0, duration: 0.12 }, 0.88);
};

const animateBladeWipe = (
  prevImage: string,
  nextImage: string,
  direction: 1 | -1,
  onDone: () => void,
  container: HTMLElement
) => {
  const W = container.offsetWidth;
  const H = container.offsetHeight;

  // ── Config ────────────────────────────────────────────────────────────────
  const BLADE_COUNT    = 8;
  const bladeW         = W / BLADE_COUNT;
  const skewPx         = H * 0.18;
  const STAGGER        = 0.068;
  const BLADE_DUR      = 1.45;
  const offscreen      = direction === 1 ? W + 250 : -(W + 250);

  const bladeClip = (i: number, dx: number): string => {
    const x1 = i * bladeW - 1;
    const x2 = (i + 1) * bladeW + 1;
    return [
      `polygon(`,
      `${x1 - skewPx + dx}px 0%,`,
      `${x2 - skewPx + dx}px 0%,`,
      `${x2 + skewPx + dx}px 100%,`,
      `${x1 + skewPx + dx}px 100%)`,
    ].join(" ");
  };

  const root = document.createElement("div");
  root.style.cssText = `
    position: absolute; inset: 0; z-index: 999999;
    pointer-events: none; overflow: hidden;
  `;
  container.appendChild(root);

  const prevLayer = document.createElement("div");
  prevLayer.style.cssText = `position: absolute; inset: 0; overflow: hidden;`;
  const prevImg = document.createElement("img");
  prevImg.src = prevImage;
  prevImg.style.cssText = `
    width: 100%; height: 100%; object-fit: cover;
    transform-origin: center; will-change: transform, filter;
  `;
  prevLayer.appendChild(prevImg);
  root.appendChild(prevLayer);

  const gradientOverlay = document.createElement("div");
  gradientOverlay.style.cssText = `
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0)    21.7%,
      rgba(0,0,0,0.6)  63.57%,
      rgba(0,0,0,0.8)  100%
    );
    pointer-events: none;
    z-index: 9999;
  `;
  root.appendChild(gradientOverlay);

  const totalDuration = (BLADE_COUNT - 1) * STAGGER + BLADE_DUR;

  const tl = gsap.timeline({
    onComplete: () => {
      root.remove();
      onDone();
      animateContentIn();
    },
  });

  tl.to(prevImg, {
    scale: 1.2,
    duration: totalDuration * 0.85,
    ease: "power2.in",
  }, 0);

  for (let i = 0; i < BLADE_COUNT; i++) {
    const idx = direction === 1 ? i : BLADE_COUNT - 1 - i;

    const blade = document.createElement("div");
    blade.style.cssText = `
      position: absolute; inset: 0; overflow: hidden;
      clip-path: ${bladeClip(idx, offscreen)};
      will-change: clip-path;
    `;

    const img = document.createElement("img");
    img.src = nextImage;
    img.style.cssText = `
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover;
    `;

    const vignette = document.createElement("div");
    vignette.style.cssText = `
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.25);
      pointer-events: none;
    `;

    blade.appendChild(img);
    blade.appendChild(vignette);
    root.appendChild(blade);

    const delay = i * STAGGER;

    tl.to(blade, {
      clipPath: bladeClip(idx, 0),
      duration: BLADE_DUR,
      ease: "expo.inOut",
    }, delay);

    tl.to(vignette, {
      opacity: 0,
      duration: 0.35,
      ease: "power1.out",
    }, delay + BLADE_DUR * 0.6);
  }

  const streakAngleDeg = -Math.atan2(skewPx * 2, bladeW) * (180 / Math.PI) * 0.5;

  const streak = document.createElement("div");
  streak.style.cssText = `
    position: absolute;
    top: -10%; left: ${direction === 1 ? "90px" : `${W}px`};
    width: 90px; height: 120%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255,255,255,0.0) 10%,
      rgba(255,255,255,0.55) 45%,
      rgba(255,255,255,0.80) 50%,
      rgba(255,255,255,0.55) 55%,
      rgba(255,255,255,0.0) 90%,
      transparent 100%
    );
    filter: blur(14px);
    mix-blend-mode: screen;
    transform: skewX(${streakAngleDeg}deg);
    pointer-events: none;
  `;
  root.appendChild(streak);

  tl.to(streak, {
    x: direction === 1 ? W + 120 : -(W + 120),
    duration: totalDuration * 0.88,
    ease: "power2.inOut",
  }, 0.04);

  const flashOriginX = direction === 1 ? 0 : W;
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: absolute;
    top: 50%; left: ${flashOriginX}px;
    width: 1px; height: 1px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%);
    box-shadow: 0 0 120px 60px rgba(255,255,255,0.35);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    pointer-events: none;
  `;
  root.appendChild(glow);

  tl.to(glow, { opacity: 1, scale: 6, duration: 0.25, ease: "power4.out" }, 0);
  tl.to(glow, { opacity: 0, scale: 14, duration: 0.5, ease: "power2.in" }, 0.2);

  tl.to(root, {
    opacity: 0,
    duration: 0.2,
    ease: "power1.in",
  }, totalDuration - 0.2);
};

// ─── Component ────────────────────────────────────────────────────────────────
const HeroSection = ({ data }: { data: HomeProps["bannerSection"] }) => {
  const swiperRef    = useRef<SwiperClass | null>(null);
  const prevIndexRef = useRef<number>(0);
  const prevImageRef = useRef<string | null>(null);
  const directionRef = useRef<1 | -1>(1);
  const isAnimating  = useRef(false);
  const sectionRef   = useRef<HTMLElement | null>(null);
  const entryDoneRef = useRef(false);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile]         = useState(false);
  const totalSlides = data.items.length;

  const isArabic = useIsPreferredLanguageArabic();
  const t        = useApplyLang(data);
  const router   = useRouter();

  // ── Entry animation on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (entryDoneRef.current) return;
    entryDoneRef.current = true;
    const section = sectionRef.current;
    if (!section) return;
    const timer = setTimeout(() => animateEntry(section), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleRegisterClick = useCallback(() => {
    router.push("/contact-us?scroll=register");
  }, [router]);

  const activeSlide = useMemo(
    () => t.items[currentSlide - 1] || t.items[0],
    [t.items, currentSlide]
  );

  const handleBeforeTransition = useCallback(
    (swiper: SwiperClass) => {
      if (isAnimating.current) return;
      if (!sectionRef.current) return;

      const nextIndex = swiper.realIndex;
      const nextImage = t.items[nextIndex]?.image;
      const prevImage = prevImageRef.current;

      if (!nextImage || !prevImage) return;
      if (nextIndex === prevIndexRef.current) return;

      // Detect direction
      const total = t.items.length;
      let delta = nextIndex - prevIndexRef.current;
      if (Math.abs(delta) > total / 2) {
        delta = delta > 0 ? delta - total : delta + total;
      }
      directionRef.current = delta >= 0 ? 1 : -1;

      isAnimating.current = true;

      // Hide content immediately before transition starts
      gsap.set([".hero-title", ".hero-button", ".hero-divider"], {
        opacity: 0,
        y: 25,
      });

      animateBladeWipe(
        prevImage,
        nextImage,
        directionRef.current,
        () => {
          isAnimating.current  = false;
          prevIndexRef.current = nextIndex;
          prevImageRef.current = nextImage;
        },
        sectionRef.current
      );
    },
    [t.items]
  );

  return (
    <section
      ref={sectionRef}
      className="lg:h-screen h-[65dvh] md:h-[85dvh] relative overflow-hidden max-w-[1920px] mx-auto"
    >
      {/* Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={100}
        slidesPerView={1}
        allowTouchMove={false}
        loop
        observer={true}
        observeParents={true}
        onSwiper={(swiper) => {
          swiperRef.current    = swiper;
          prevIndexRef.current = swiper.realIndex;
          prevImageRef.current = t.items[swiper.realIndex]?.image ?? null;
        }}
        onBeforeTransitionStart={handleBeforeTransition}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1);
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          prevImageRef.current = t.items[swiper.realIndex]?.image ?? null;
        }}
        className="w-full h-full"
      >
        {t.items.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-screen relative overflow-hidden">
              <figure className="h-full w-full absolute inset-0 overflow-hidden">
                <div className="h-full w-full relative">
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={1920}
                    height={1280}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={index === 0 ? 90 : 75}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                  />
                </div>
              </figure>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)]"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Static Content */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none z-[70]">
        <div className="container h-full">
          <div className="h-full relative w-full overflow-hidden">
            <div className="absolute bottom-5 lg:bottom-[30px] xl:bottom-[50px] grid grid-cols-1 xl:grid-cols-7 items-end gap-2 pointer-events-auto">
              {/* Left text */}
              <div className="xl:mb-[65px] col-span-1 md:col-span-5">
                <h2 className={`hero-title text-[1.8rem] md:text-2xl 2xl:text-4xl text-white leading-[1.2] xl:leading-[1.1] font-custom font-light lettersp-4-hero mb-0 ${isArabic ? "max-w-[90%]" : "max-w-none"}`}>
                  <span className="text-primary">{activeSlide.highlightText}</span>{" "}
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
                      {isArabic && (
                        <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
                            <path d="M8.74639 1.76178L1.12891 9.36247" stroke="#42BADC" strokeMiterlimit="10" />
                            <path d="M1.12891 1.76178H8.74639V9.21251" stroke="#42BADC" strokeMiterlimit="10" />
                          </svg>
                        </div>
                      )}
                      <p className="group-hover:text-white text-xs font-light text-white uppercase transition-colors duration-300">
                        {isArabic ? "سجل اهتمامك" : "Register Interest"}
                      </p>
                      {!isArabic && (
                        <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
                            <path d="M8.74639 1.76178L1.12891 9.36247" stroke="#42BADC" strokeMiterlimit="10" />
                            <path d="M1.12891 1.76178H8.74639V9.21251" stroke="#42BADC" strokeMiterlimit="10" />
                          </svg>
                        </div>
                      )}
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
            <span className="font-[700] text-[15px] -rotate-90 mt-1">{`0${currentSlide}`}</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;