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

// ─── Entry Animation — "BEAM Formation" ──────────────────────────────────────
//
//  Inspired by the team name "BEAM" and their cyan primary color (#42BADC).
//
//  The animation plays as if a powerful projector beam is being "fired"
//  across the hero — but told in three narrative acts:
//
//  Act 1 — SOURCE CHARGE (0s – 0.4s):
//    A bright cyan orb "powers up" at the left edge center, growing from
//    nothing to a pulsing ball of light. Electrical arc filaments crackle
//    outward from it like a Tesla coil charging. The dark backdrop holds.
//
//  Act 2 — BEAM FIRED (0.4s – 0.85s):
//    The orb fires a horizontal beam — a razor-thin laser line that shoots
//    right across the full width in ~0.15s. As it travels, it leaves a
//    glowing cyan trail with a soft volumetric halo above/below. Secondary
//    particle sparks scatter from the beam path (upward drift, fade out).
//    A lens-flare "impact" flash fires at the right edge on contact.
//
//  Act 3 — ILLUMINATE & REVEAL (0.85s – 1.3s):
//    The beam expands vertically from the center line — like a projector
//    iris opening — flooding the section with a wide cyan-to-transparent
//    gradient. The dark backdrop fades beneath it. The flood peaks then
//    contracts back to the beam line, which itself thins and vanishes.
//    Hero image is fully revealed. Content animates in.
//
const animateEntry = (container: HTMLElement) => {
  const W = container.offsetWidth;
  const H = container.offsetHeight;
  const CY = H / 2;

  const PRIMARY    = "#42BADC";
  const PRIMARY_RGB = "66,186,220";

  const root = document.createElement("div");
  root.style.cssText = `
    position:absolute; inset:0; z-index:99999;
    pointer-events:none; overflow:hidden;
  `;
  container.appendChild(root);

  // ── Dark backdrop ─────────────────────────────────────────────────────────
  const backdrop = document.createElement("div");
  backdrop.style.cssText = `
    position:absolute; inset:0;
    background:#010c12;
  `;
  root.appendChild(backdrop);

  // ── ACT 1: Source orb — powers up at left center ─────────────────────────
  const ORB_X = W * 0.04;

  const orbGlow = document.createElement("div");
  orbGlow.style.cssText = `
    position:absolute;
    left:${ORB_X}px; top:${CY}px;
    transform:translate(-50%,-50%) scale(0);
    width:120px; height:120px;
    border-radius:50%;
    background:radial-gradient(circle,
      rgba(255,255,255,0.9) 0%,
      rgba(${PRIMARY_RGB},0.7) 35%,
      rgba(${PRIMARY_RGB},0.15) 70%,
      transparent 100%
    );
    filter:blur(12px);
    opacity:0;
    will-change:transform,opacity;
  `;
  root.appendChild(orbGlow);

  const orbCore = document.createElement("div");
  orbCore.style.cssText = `
    position:absolute;
    left:${ORB_X}px; top:${CY}px;
    transform:translate(-50%,-50%) scale(0);
    width:14px; height:14px;
    border-radius:50%;
    background:rgba(255,255,255,1);
    box-shadow:
      0 0 8px 4px rgba(255,255,255,0.9),
      0 0 20px 8px rgba(${PRIMARY_RGB},1),
      0 0 40px 16px rgba(${PRIMARY_RGB},0.5);
    opacity:0;
    will-change:transform,opacity;
  `;
  root.appendChild(orbCore);

  // Orb powers up
  gsap.to(orbGlow, { scale: 1, opacity: 1, duration: 0.28, delay: 0.0, ease: "power3.out" });
  gsap.to(orbCore, { scale: 1, opacity: 1, duration: 0.18, delay: 0.05, ease: "back.out(2)" });

  // Orb pulses while charging
  gsap.to(orbCore, {
    scale: 1.35, opacity: 0.85,
    duration: 0.12, delay: 0.24,
    ease: "power2.inOut",
    yoyo: true, repeat: 1,
  });

  // ── ACT 1: Arc filaments — crackle from orb ───────────────────────────────
  const ARC_COUNT = 6;
  for (let i = 0; i < ARC_COUNT; i++) {
    const angle  = (Math.random() * 360);
    const length = 18 + Math.random() * 32;
    const arc    = document.createElement("div");
    arc.style.cssText = `
      position:absolute;
      left:${ORB_X}px; top:${CY}px;
      transform-origin:0 50%;
      transform:translate(0,-50%) rotate(${angle}deg) scaleX(0);
      width:${length}px; height:1.5px;
      background:linear-gradient(to right,
        rgba(255,255,255,0.9),
        rgba(${PRIMARY_RGB},0.6),
        transparent
      );
      filter:blur(0.5px);
      opacity:0;
    `;
    root.appendChild(arc);

    const arcDelay = 0.1 + Math.random() * 0.15;
    gsap.to(arc, { scaleX: 1, opacity: 0.9, duration: 0.08, delay: arcDelay, ease: "power4.out" });
    gsap.to(arc, { opacity: 0, scaleX: 0.6, duration: 0.12, delay: arcDelay + 0.1, ease: "power2.in" });
  }

  // ── ACT 2: The BEAM fires — razor laser across full width ─────────────────
  const BEAM_DELAY = 0.42;

  // Volumetric halo (soft vertical blur around beam)
  const halo = document.createElement("div");
  halo.style.cssText = `
    position:absolute;
    left:${ORB_X}px; top:${CY}px;
    transform:translateY(-50%) scaleX(0);
    transform-origin:left center;
    width:${W - ORB_X}px; height:60px;
    background:linear-gradient(180deg,
      transparent 0%,
      rgba(${PRIMARY_RGB},0.18) 25%,
      rgba(${PRIMARY_RGB},0.32) 50%,
      rgba(${PRIMARY_RGB},0.18) 75%,
      transparent 100%
    );
    filter:blur(10px);
    opacity:0;
    will-change:transform,opacity;
  `;
  root.appendChild(halo);

  // Main beam laser line
  const beam = document.createElement("div");
  beam.style.cssText = `
    position:absolute;
    left:${ORB_X}px; top:${CY}px;
    transform:translateY(-50%) scaleX(0);
    transform-origin:left center;
    width:${W - ORB_X}px; height:2px;
    background:linear-gradient(to right,
      rgba(255,255,255,1) 0%,
      rgba(255,255,255,0.95) 5%,
      rgba(${PRIMARY_RGB},0.9) 40%,
      rgba(${PRIMARY_RGB},0.6) 80%,
      rgba(${PRIMARY_RGB},0.3) 100%
    );
    box-shadow:
      0 0 4px 1px rgba(255,255,255,0.8),
      0 0 12px 3px rgba(${PRIMARY_RGB},0.9),
      0 0 30px 6px rgba(${PRIMARY_RGB},0.4);
    opacity:0;
    will-change:transform,opacity;
  `;
  root.appendChild(beam);

  // Bright leading edge "head" of the beam
  const beamHead = document.createElement("div");
  beamHead.style.cssText = `
    position:absolute;
    left:${ORB_X}px; top:${CY}px;
    transform:translate(-50%,-50%);
    width:18px; height:18px;
    border-radius:50%;
    background:rgba(255,255,255,1);
    box-shadow:
      0 0 10px 5px rgba(255,255,255,0.9),
      0 0 24px 10px rgba(${PRIMARY_RGB},1),
      0 0 50px 20px rgba(${PRIMARY_RGB},0.5);
    opacity:0;
    will-change:transform,opacity;
  `;
  root.appendChild(beamHead);

  // Fire beam — scaleX from 0 → 1 fast
  gsap.to(halo, { scaleX: 1, opacity: 1, duration: 0.18, delay: BEAM_DELAY, ease: "power4.out" });
  gsap.to(beam, { scaleX: 1, opacity: 1, duration: 0.16, delay: BEAM_DELAY, ease: "power4.out" });

  // Head travels across: left → right
  gsap.to(beamHead, { opacity: 1, duration: 0.05, delay: BEAM_DELAY });
  gsap.to(beamHead, {
    left: W - 10,
    duration: 0.16,
    delay: BEAM_DELAY,
    ease: "power3.in",
    onComplete: () => {
      // Impact flash at right edge
      const impact = document.createElement("div");
      impact.style.cssText = `
        position:absolute;
        right:0; top:${CY}px;
        transform:translate(50%,-50%) scale(0);
        width:100px; height:100px;
        border-radius:50%;
        background:radial-gradient(circle,
          rgba(255,255,255,0.95) 0%,
          rgba(${PRIMARY_RGB},0.7) 40%,
          transparent 70%
        );
        filter:blur(6px);
        opacity:0;
      `;
      root.appendChild(impact);
      gsap.to(impact, { scale: 1, opacity: 1, duration: 0.1, ease: "power4.out" });
      gsap.to(impact, { scale: 2.5, opacity: 0, duration: 0.35, delay: 0.08, ease: "power2.out" });
    },
  });
  gsap.to(beamHead, { opacity: 0, duration: 0.1, delay: BEAM_DELAY + 0.16 });

  // ── ACT 2: Particle sparks scatter upward from beam path ──────────────────
  const SPARK_COUNT = 18;
  for (let i = 0; i < SPARK_COUNT; i++) {
    const spark  = document.createElement("div");
    const spawnX = ORB_X + (W - ORB_X) * (i / SPARK_COUNT);
    const spawnY = CY + (Math.random() - 0.5) * 4;
    const drift  = (Math.random() - 0.5) * 60;
    const rise   = -(20 + Math.random() * 55);
    const size   = 1.5 + Math.random() * 2.5;

    spark.style.cssText = `
      position:absolute;
      left:${spawnX}px; top:${spawnY}px;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:rgba(${PRIMARY_RGB},1);
      box-shadow:0 0 ${size * 3}px ${size}px rgba(${PRIMARY_RGB},0.6);
      opacity:0;
      will-change:transform,opacity;
    `;
    root.appendChild(spark);

    const sparkDelay = BEAM_DELAY + (i / SPARK_COUNT) * 0.16 + Math.random() * 0.04;
    gsap.to(spark, {
      opacity: 0.85,
      y: rise,
      x: drift,
      duration: 0.45 + Math.random() * 0.25,
      delay: sparkDelay,
      ease: "power2.out",
    });
    gsap.to(spark, {
      opacity: 0,
      duration: 0.2,
      delay: sparkDelay + 0.3 + Math.random() * 0.15,
      ease: "power1.in",
    });
  }

  // ── ACT 3: Iris opens — beam expands vertically flooding the section ───────
  const FLOOD_DELAY = BEAM_DELAY + 0.22;

  // Flood layers — bands expanding vertically from beam center
  const floodBands = [
    { h: 8,   blur: 2,  opacity: 0.9,  dur: 0.22 },
    { h: 40,  blur: 8,  opacity: 0.65, dur: 0.28 },
    { h: 120, blur: 20, opacity: 0.42, dur: 0.32 },
    { h: H,   blur: 40, opacity: 0.22, dur: 0.36 },
  ];

  const floodEls: HTMLElement[] = [];
  floodBands.forEach(({ h, blur, opacity, dur }, idx) => {
    const fl = document.createElement("div");
    fl.style.cssText = `
      position:absolute;
      left:0; top:${CY}px;
      transform:translateY(-50%) scaleY(0);
      transform-origin:center center;
      width:100%; height:${h}px;
      background:linear-gradient(180deg,
        transparent 0%,
        rgba(${PRIMARY_RGB},${opacity * 0.6}) 20%,
        rgba(${PRIMARY_RGB},${opacity}) 50%,
        rgba(${PRIMARY_RGB},${opacity * 0.6}) 80%,
        transparent 100%
      );
      filter:blur(${blur}px);
      opacity:0;
      will-change:transform,opacity;
    `;
    root.appendChild(fl);
    floodEls.push(fl);

    gsap.to(fl, {
      scaleY: 1,
      opacity: 1,
      duration: dur,
      delay: FLOOD_DELAY + idx * 0.03,
      ease: "power2.out",
    });
  });

  // Backdrop fades as flood opens
  gsap.to(backdrop, { opacity: 0, duration: 0.4, delay: FLOOD_DELAY + 0.1, ease: "power2.in" });

  // ── Collapse: iris contracts back, beam and orb fade ─────────────────────
  const COLLAPSE_START = FLOOD_DELAY + 0.38;

  [...floodEls].reverse().forEach((fl, i) => {
    gsap.to(fl, {
      scaleY: 0,
      opacity: 0,
      duration: 0.3,
      delay: COLLAPSE_START + i * 0.03,
      ease: "power3.in",
    });
  });

  gsap.to([beam, halo], { opacity: 0, duration: 0.25, delay: COLLAPSE_START, ease: "power2.in" });
  gsap.to([orbCore, orbGlow], { opacity: 0, scale: 0, duration: 0.2, delay: COLLAPSE_START + 0.05, ease: "power2.in" });

  // Final ghost beam — thin echo fades last
  const ghostBeam = document.createElement("div");
  ghostBeam.style.cssText = `
    position:absolute;
    left:0; top:${CY}px;
    transform:translateY(-50%);
    width:100%; height:1px;
    background:linear-gradient(to right,
      transparent 0%,
      rgba(${PRIMARY_RGB},0.6) 15%,
      rgba(255,255,255,0.7) 50%,
      rgba(${PRIMARY_RGB},0.6) 85%,
      transparent 100%
    );
    filter:blur(0.5px);
    box-shadow:0 0 4px 1px rgba(${PRIMARY_RGB},0.5);
    opacity:0;
  `;
  root.appendChild(ghostBeam);

  gsap.to(ghostBeam, { opacity: 0.8, duration: 0.12, delay: COLLAPSE_START, ease: "power4.out" });
  gsap.to(ghostBeam, { opacity: 0, duration: 0.45, delay: COLLAPSE_START + 0.2, ease: "power1.in" });

  // ── Cleanup & hand off ────────────────────────────────────────────────────
  gsap.to(root, {
    opacity: 0,
    duration: 0.08,
    delay: COLLAPSE_START + 0.55,
    onComplete: () => {
      root.remove();
      animateContentIn();
    },
  });
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