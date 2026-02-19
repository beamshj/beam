




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

// ─── Content Reveal ───────────────────────────────────────────────────────────
const animateContentIn = () => {
  const targets = [".hero-title", ".hero-button", ".hero-divider"];

  targets.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) gsap.killTweensOf(el);
  });

  gsap.fromTo(
    targets,
    { opacity: 0, y: 22, filter: "blur(6px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.2,
    }
  );
};

// ─── Entry Animation — "BEAM" ─────────────────────────────────────────────────
//
//  Inspired by the school name "Beam" and using primary cyan #42BADC.
//
//  Phase 1 — Dark screen. A razor-thin horizontal beam line ignites from
//            the left edge and shoots across the full width at high speed,
//            leaving a glowing cyan trail. Like a projector lamp warming up.
//
//  Phase 2 — At the right edge the beam "hits" and detonates: a radial
//            burst of light (radial-gradient bloom) expands from that point,
//            flooding the section with cyan-white light.
//
//  Phase 3 — The bloom contracts upward and the image beneath is revealed
//            via a vertical clip-path wipe from top to bottom, as if the
//            light is scanning the scene. Scan lines briefly overlay.
//
//  Phase 4 — A wide secondary beam sweeps back left-to-right across the
//            fully visible image as a final gleam, then fades.
//
const animateEntry = (container: HTMLElement) => {
  const W = container.offsetWidth;
  const H = container.offsetHeight;

  const PRIMARY = "#42BADC";
  const PRIMARY_RGB = "66,186,220";

  const root = document.createElement("div");
  root.style.cssText = `
    position:absolute; inset:0; z-index:99999;
    pointer-events:none; overflow:hidden;
  `;
  container.appendChild(root);

  // ── Dark backdrop ──────────────────────────────────────────────────────────
  const backdrop = document.createElement("div");
  backdrop.style.cssText = `
    position:absolute; inset:0;
    background:#020a10;
  `;
  root.appendChild(backdrop);

  // ── Phase 1: Beam line ────────────────────────────────────────────────────
  // The razor beam itself — a very thin horizontal line
  const beam = document.createElement("div");
  beam.style.cssText = `
    position:absolute;
    top:50%; left:-120px;
    transform:translateY(-50%);
    width:120px; height:3px;
    background: linear-gradient(to right,
      transparent 0%,
      rgba(${PRIMARY_RGB},0.4) 20%,
      rgba(${PRIMARY_RGB},1) 60%,
      rgba(255,255,255,1) 80%,
      rgba(255,255,255,1) 100%
    );
    filter:blur(0.5px);
    box-shadow: 0 0 8px 2px rgba(${PRIMARY_RGB},0.9),
                0 0 20px 4px rgba(${PRIMARY_RGB},0.4);
    will-change:transform;
  `;
  root.appendChild(beam);

  // Beam glow halo — wider, softer, travels with beam
  const beamHalo = document.createElement("div");
  beamHalo.style.cssText = `
    position:absolute;
    top:50%; left:-200px;
    transform:translateY(-50%);
    width:200px; height:60px;
    background: linear-gradient(to right,
      transparent 0%,
      rgba(${PRIMARY_RGB},0.06) 40%,
      rgba(${PRIMARY_RGB},0.18) 80%,
      rgba(${PRIMARY_RGB},0.25) 100%
    );
    filter:blur(12px);
    will-change:transform;
  `;
  root.appendChild(beamHalo);

  // Beam trail — the lingering afterglow left behind
  const trail = document.createElement("div");
  trail.style.cssText = `
    position:absolute;
    top:50%; left:0;
    transform:translateY(-50%);
    width:0px; height:2px;
    background: linear-gradient(to right,
      transparent 0%,
      rgba(${PRIMARY_RGB},0.15) 40%,
      rgba(${PRIMARY_RGB},0.5) 100%
    );
    filter:blur(1px);
    opacity:0;
    transform-origin:left center;
  `;
  root.appendChild(trail);

  // ── Phase 2: Detonation bloom at right edge ────────────────────────────────
  const detonation = document.createElement("div");
  detonation.style.cssText = `
    position:absolute;
    top:50%; right:0;
    transform:translate(50%, -50%) scale(0);
    width:4px; height:4px;
    border-radius:50%;
    background: radial-gradient(circle,
      rgba(255,255,255,1)      0%,
      rgba(${PRIMARY_RGB},0.9) 25%,
      rgba(${PRIMARY_RGB},0.4) 55%,
      transparent              80%
    );
    opacity:0;
    will-change:transform,opacity;
  `;
  root.appendChild(detonation);

  // Wide flood — the full-section wash of cyan after detonation
  const flood = document.createElement("div");
  flood.style.cssText = `
    position:absolute; inset:0;
    background: radial-gradient(ellipse at 100% 50%,
      rgba(${PRIMARY_RGB},0.55) 0%,
      rgba(${PRIMARY_RGB},0.18) 35%,
      rgba(${PRIMARY_RGB},0.04) 65%,
      transparent 100%
    );
    opacity:0;
    will-change:opacity;
  `;
  root.appendChild(flood);

  // ── Phase 3: Vertical reveal mask ─────────────────────────────────────────
  // A black panel that wipes upward exposing the hero image (scan effect)
  const mask = document.createElement("div");
  mask.style.cssText = `
    position:absolute; inset:0;
    background:#020a10;
    clip-path:inset(0 0 0 0);
    will-change:clip-path;
  `;
  root.appendChild(mask);

  // Scan line on the leading edge of the mask wipe
  const scanEdge = document.createElement("div");
  scanEdge.style.cssText = `
    position:absolute;
    top:0; left:0; right:0;
    height:3px;
    background: linear-gradient(to right,
      transparent 0%,
      rgba(${PRIMARY_RGB},0.6) 15%,
      rgba(255,255,255,0.95) 50%,
      rgba(${PRIMARY_RGB},0.6) 85%,
      transparent 100%
    );
    filter:blur(1.5px);
    opacity:0;
    box-shadow:0 0 12px 3px rgba(${PRIMARY_RGB},0.6);
  `;
  root.appendChild(scanEdge);

  // Subtle scan lines overlay during wipe
  const scanLines = document.createElement("div");
  scanLines.style.cssText = `
    position:absolute; inset:0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 4px,
      rgba(${PRIMARY_RGB},0.04) 4px,
      rgba(${PRIMARY_RGB},0.04) 5px
    );
    opacity:0;
    mix-blend-mode:screen;
    pointer-events:none;
  `;
  root.appendChild(scanLines);

  // ── Timeline ──────────────────────────────────────────────────────────────
  const tl = gsap.timeline({
    onComplete: () => {
      root.remove();
      animateContentIn();
    },
  });

  // P1 — Beam shoots across (left → right)
  tl.to([beam, beamHalo], {
    x: W + 150,
    duration: 0.52,
    ease: "power3.in",
  }, 0.05);

  // Trail grows behind beam as it travels
  tl.to(trail, {
    width: W,
    opacity: 1,
    duration: 0.52,
    ease: "power3.in",
  }, 0.05);

  // Trail fades out after beam passes
  tl.to(trail, {
    opacity: 0,
    duration: 0.4,
    ease: "power2.in",
  }, 0.55);

  // P2 — Detonation at right edge
  tl.to(detonation, {
    opacity: 1,
    scale: 600,
    duration: 0.38,
    ease: "power4.out",
  }, 0.52);
  tl.to(detonation, {
    opacity: 0,
    duration: 0.28,
    ease: "power1.in",
  }, 0.78);

  // Flood wash
  tl.to(flood, { opacity: 1, duration: 0.22, ease: "power3.out" }, 0.52);
  tl.to(flood, { opacity: 0, duration: 0.45, ease: "power2.in" }, 0.78);

  // P3 — Black mask wipes upward (inset bottom shrinks from 100% → 0%)
  // backdrop fades first
  tl.to(backdrop, { opacity: 0, duration: 0.1 }, 0.7);

  // Scan edge appears at top of mask
  tl.to(scanEdge, { opacity: 1, duration: 0.08 }, 0.72);

  // Mask wipes up — clip-path inset bottom goes from full height to 0
  tl.to(mask, {
    clipPath: `inset(0 0 ${H}px 0)`,
    duration: 0.52,
    ease: "power2.inOut",
  }, 0.72);

  // Scan edge travels down with mask bottom edge
  tl.to(scanEdge, {
    top: `${H}px`,
    duration: 0.52,
    ease: "power2.inOut",
  }, 0.72);

  tl.to(scanEdge, { opacity: 0, duration: 0.15 }, 1.18);

  // Scan lines flash on during wipe
  tl.to(scanLines, { opacity: 1, duration: 0.08 }, 0.76);
  tl.to(scanLines, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.98);


};

// ─── Cinematic Curtain Reveal ─────────────────────────────────────────────────
const animateCinematicCurtain = (
  prevImage: string,
  nextImage: string,
  direction: 1 | -1,
  onDone: () => void,
  container: HTMLElement
) => {
  const W = container.offsetWidth;
  const H = container.offsetHeight;

  const SLICE_COUNT    = 15;
  const sliceH         = H / SLICE_COUNT;
  const BASE_DUR       = 0.88;
  const MAX_EXTRA_DELAY = 0.38;
  const startX         = direction === 1 ? W + 120 : -(W + 120);

  const gradient = `linear-gradient(180deg,rgba(0,0,0,0) 21.7%,rgba(0,0,0,0.6) 63.57%,rgba(0,0,0,0.8) 100%)`;

  const root = document.createElement("div");
  root.style.cssText = `
    position:absolute; inset:0; z-index:999999;
    pointer-events:none; overflow:hidden;
  `;
  container.appendChild(root);

  const prevLayer = document.createElement("div");
  prevLayer.style.cssText = `position:absolute; inset:0;`;
  const prevImg = document.createElement("img");
  prevImg.src = prevImage;
  prevImg.style.cssText = `
    width:100%; height:100%; object-fit:cover;
    will-change:transform, filter;
  `;
  const prevGrad = document.createElement("div");
  prevGrad.style.cssText = `position:absolute; inset:0; background:${gradient};`;
  prevLayer.appendChild(prevImg);
  prevLayer.appendChild(prevGrad);
  root.appendChild(prevLayer);

  const tl = gsap.timeline({
    onComplete: () => { root.remove(); onDone(); animateContentIn(); },
  });

  tl.to(prevImg, {
    scale: 1.045,
    duration: MAX_EXTRA_DELAY + BASE_DUR * 0.9,
    ease: "power2.inOut",
  }, 0);

  for (let i = 0; i < SLICE_COUNT; i++) {
    const t_n  = i / (SLICE_COUNT - 1);
    const delay = MAX_EXTRA_DELAY * (1 - Math.sin(Math.PI * t_n));

    const slice = document.createElement("div");
    slice.style.cssText = `
      position:absolute;
      left:0; top:${i * sliceH}px;
      width:100%; height:${sliceH + 1}px;
      overflow:hidden;
      transform-origin:center center;
      will-change:transform;
    `;

    const img = document.createElement("img");
    img.src = nextImage;
    img.style.cssText = `
      position:absolute;
      left:0; top:${-i * sliceH}px;
      width:100%; height:${H}px;
      object-fit:cover;
      will-change:transform;
    `;

    const imgGrad = document.createElement("div");
    imgGrad.style.cssText = `
      position:absolute;
      left:0; top:${-i * sliceH}px;
      width:100%; height:${H}px;
      background:${gradient};
      pointer-events:none;
    `;

    const shimmer = document.createElement("div");
    shimmer.style.cssText = `
      position:absolute; inset:0;
      background:rgba(255,255,255,0.14);
      opacity:0; pointer-events:none;
    `;

    slice.appendChild(img);
    slice.appendChild(imgGrad);
    slice.appendChild(shimmer);
    root.appendChild(slice);

    gsap.set(slice, { x: startX, scaleY: 0.93 });
    gsap.set(img,   { x: -startX });

    tl.to(slice, {
      x: 0,
      scaleY: 1,
      duration: BASE_DUR,
      ease: "expo.out",
    }, delay);

    tl.to(img, {
      x: 0,
      duration: BASE_DUR,
      ease: "expo.out",
    }, delay);
  }

  const totalRevealDur = MAX_EXTRA_DELAY + BASE_DUR;

  const streak = document.createElement("div");
  streak.style.cssText = `
    position:absolute;
    top:-15%;
    left:${direction === 1 ? "-100px" : `${W}px`};
    width:80px; height:130%;
    background:linear-gradient(
      to right,
      transparent 0%,
      rgba(255,255,255,0.0)  10%,
      rgba(255,255,255,0.52) 48%,
      rgba(255,255,255,0.72) 50%,
      rgba(255,255,255,0.52) 52%,
      rgba(255,255,255,0.0)  90%,
      transparent 100%
    );
    filter:blur(16px);
    mix-blend-mode:screen;
    transform:skewX(-10deg);
    pointer-events:none;
  `;
  root.appendChild(streak);

  tl.to(streak, {
    x: direction === 1 ? W + 130 : -(W + 130),
    duration: totalRevealDur * 0.8,
    ease: "power1.inOut",
  }, 0.06);

  tl.to(root, {
    opacity: 0,
    duration: 0.22,
    ease: "power1.in",
  }, totalRevealDur - 0.22);
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
        y: 22,
      });

      animateCinematicCurtain(
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