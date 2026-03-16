// "use client";
// import Image from "next/image";
// import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import { Swiper as SwiperClass } from "swiper";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import { gsap } from "gsap";
// import { HomeProps } from "../type";
// import { useApplyLang } from "@/lib/applyLang";
// import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
// import { useRouter } from "next/navigation";

// // ─── Preload all slide images on module level ─────────────────────────────────
// // Called once after mount — warms the browser cache so images are always ready
// // when a transition fires, eliminating the rare glitch caused by cache misses.
// const preloadImages = (urls: string[]) => {
//   urls.forEach((url) => {
//     if (!url) return;
//     const img = new window.Image();
//     img.src = url;
//   });
// };

// // ─── Content Reveal ───────────────────────────────────────────────────────────
// const animateContentIn = () => {
//   const targets = [".hero-title", ".hero-button", ".hero-divider", ".hero-pagination"];

//   targets.forEach((sel) => {
//     const el = document.querySelector(sel);
//     if (el) gsap.killTweensOf(el);
//   });

//   gsap.fromTo(
//     targets,
//     { opacity: 0, y: 30, filter: "blur(4px)" },
//     {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       duration: 0.9,
//       ease: "power3.out",
//       stagger: 0.3,
//     }
//   );
// };

// // ─── Entry Animation — left-to-right flash streak, content hidden until after ──
// const animateEntry = (container: HTMLElement) => {
//   const W = container.offsetWidth;

//   gsap.set([".hero-title", ".hero-button", ".hero-divider", ".hero-pagination"], { opacity: 0, y: 22 });

//   const root = document.createElement("div");
//   root.style.cssText = `
//     position:absolute; inset:0; z-index:99999;
//     pointer-events:none; overflow:hidden;
//   `;
//   container.appendChild(root);

//   const streak = document.createElement("div");
//   streak.style.cssText = `
//     position:absolute;
//     top:-15%;
//     left:-100px;
//     width:80px; height:130%;
//     background:linear-gradient(
//       to right,
//       transparent 0%,
//       rgba(255,255,255,0.0)  10%,
//       rgba(255,255,255,0.52) 48%,
//       rgba(255,255,255,0.72) 50%,
//       rgba(255,255,255,0.52) 52%,
//       rgba(255,255,255,0.0)  90%,
//       transparent 100%
//     );
//     filter:blur(16px);
//     mix-blend-mode:screen;
//     transform:skewX(-10deg);
//     pointer-events:none;
//   `;
//   root.appendChild(streak);

//   const tl = gsap.timeline({
//     onComplete: () => {
//       root.remove();
//       animateContentIn();
//     },
//   });

//   tl.to(streak, {
//     x: W + 130,
//     duration: 0.7,
//     ease: "power1.inOut",
//   }, 0);
// };

// // ─── Fluid Splash Dissolve ────────────────────────────────────────────────────
// //
// //  Canvas-based transition. gsap.ticker drives the draw loop (tab-safe).
// //  Swiper slides are hidden via opacity:0 on the swiper wrapper during the
// //  transition so no raw slide ever flashes through. Canvas is the single
// //  source of truth for what's visible on screen during the transition.
// //
// const animateCinematicCurtain = (
//   prevImage: string,
//   nextImage: string,
//   direction: 1 | -1,
//   onDone: () => void,
//   container: HTMLElement
// ) => {
//   const W   = container.offsetWidth;
//   const H   = container.offsetHeight;
//   const DPR = Math.min(window.devicePixelRatio || 1, 2);

//   const GRADIENT_STOPS = [
//     { stop: 0,     alpha: 0   },
//     { stop: 0.217, alpha: 0   },
//     { stop: 0.636, alpha: 0.6 },
//     { stop: 1,     alpha: 0.8 },
//   ];

//   const OX      = direction === 1 ? W * 0.05 : W * 0.95;
//   const OY      = H * 0.5;
//   const MAX_R   = Math.sqrt(Math.max(OX, W - OX) ** 2 + Math.max(OY, H - OY) ** 2) * 1.05;
//   const FEATHER = MAX_R * 0.28;

//   // ── Safety fallback: ensure swiper is hidden (already set in handleBeforeTransition) ──
//   const swiperWrapper = container.querySelector(".swiper") as HTMLElement | null;
//   if (swiperWrapper && swiperWrapper.style.opacity !== "0") {
//     swiperWrapper.style.opacity = "0";
//   }

//   // ── Main canvas — sits above swiper, below content ────────────────────────
//   const canvas = document.createElement("canvas");
//   canvas.width  = W * DPR;
//   canvas.height = H * DPR;
//   canvas.style.cssText = `
//     position:absolute; inset:0;
//     width:${W}px; height:${H}px;
//     z-index:60; pointer-events:none;
//   `;
//   container.appendChild(canvas);
//   const ctx = canvas.getContext("2d")!;
//   ctx.scale(DPR, DPR);

//   // ── Offscreen canvas — created once, reused every frame ───────────────────
//   const offscreen = document.createElement("canvas");
//   offscreen.width  = W * DPR;
//   offscreen.height = H * DPR;
//   const oc = offscreen.getContext("2d")!;
//   oc.scale(DPR, DPR);

//   // ── Images — use pre-cached refs ───────────────────────────────────────────
//   const imgPrev = new window.Image();
//   const imgNext = new window.Image();
//   imgPrev.src   = prevImage;
//   imgNext.src   = nextImage;

//   // ── GSAP proxy state ───────────────────────────────────────────────────────
//   const state = { radius: 0, prevOpacity: 1, prevDrift: 0 };

//   let done = false;

//   // ── Helpers ────────────────────────────────────────────────────────────────
//   const applyGradient = (c: CanvasRenderingContext2D, w: number, h: number) => {
//     const g = c.createLinearGradient(0, 0, 0, h);
//     GRADIENT_STOPS.forEach(({ stop, alpha }) =>
//       g.addColorStop(stop, `rgba(0,0,0,${alpha})`)
//     );
//     c.globalAlpha = 1;
//     c.fillStyle   = g;
//     c.fillRect(0, 0, w, h);
//   };

//   const coverDraw = (
//     c: CanvasRenderingContext2D,
//     img: HTMLImageElement,
//     w: number, h: number,
//     dx = 0, alpha = 1
//   ) => {
//     if (!img.naturalWidth) return;
//     const s  = Math.max(w / img.naturalWidth, h / img.naturalHeight);
//     const iw = img.naturalWidth  * s;
//     const ih = img.naturalHeight * s;
//     c.globalAlpha = alpha;
//     c.drawImage(img, (w - iw) / 2 + dx, (h - ih) / 2, iw, ih);
//   };

//   // ── Draw — gsap.ticker, runs even when tab is hidden ──────────────────────
//   const draw = () => {
//     if (done) return;
//     ctx.clearRect(0, 0, W, H);

//     // Layer 1: outgoing image
//     ctx.save();
//     ctx.globalCompositeOperation = "source-over";
//     coverDraw(ctx, imgPrev, W, H, state.prevDrift, state.prevOpacity);
//     applyGradient(ctx, W, H);
//     ctx.restore();

//     // Layer 2: incoming image through feathered radial mask
//     if (state.radius > 0) {
//       oc.globalCompositeOperation = "source-over";
//       oc.globalAlpha = 1;
//       oc.clearRect(0, 0, W, H);
//       coverDraw(oc, imgNext, W, H, 0, 1);
//       applyGradient(oc, W, H);

//       oc.globalCompositeOperation = "destination-in";
//       const inner = Math.max(0, state.radius - FEATHER);
//       const mask  = oc.createRadialGradient(OX, OY, inner, OX, OY, state.radius);
//       mask.addColorStop(0, "rgba(0,0,0,1)");
//       mask.addColorStop(1, "rgba(0,0,0,0)");
//       oc.fillStyle = mask;
//       oc.fillRect(0, 0, W, H);

//       ctx.save();
//       ctx.globalCompositeOperation = "source-over";
//       ctx.globalAlpha = 1;
//       ctx.drawImage(offscreen, 0, 0, W, H);
//       ctx.restore();
//     }
//   };

//   gsap.ticker.add(draw);

//   // ── Cleanup — restore swiper, fade canvas, call onDone ────────────────────
//   const cleanup = () => {
//     gsap.ticker.remove(draw);
//     // Restore swiper visibility before canvas fades so the handoff is seamless
//     if (swiperWrapper) swiperWrapper.style.opacity = "1";
//     gsap.to(canvas, {
//       opacity: 0,
//       duration: 0.1,
//       ease: "none",
//       onComplete: () => {
//         done = true;
//         canvas.remove();
//         onDone();
//       },
//     });
//   };

//   // ── Timeline ──────────────────────────────────────────────────────────────
//   function runTimeline() {
//     const tl = gsap.timeline({ onComplete: cleanup });

//     tl.to(state, {
//       radius: MAX_R * 1.2,
//       duration: 1.1,
//       ease: "power2.inOut",
//     }, 0);

//     tl.to(state, {
//       prevDrift:   direction * W * 0.03,
//       prevOpacity: 0,
//       duration: 0.75,
//       ease: "power1.inOut",
//     }, 0.15);
//   }

//   // ── Start once both images decoded ─────────────────────────────────────────
//   let loaded = 0;
//   const onLoad = () => {
//     loaded++;
//     if (loaded === 2) runTimeline();
//   };
//   if (imgPrev.complete) onLoad(); else imgPrev.onload = onLoad;
//   if (imgNext.complete) onLoad(); else imgNext.onload = onLoad;

//   // Safety: guarantee cleanup if images never load within 3s
//   setTimeout(() => { if (!done) cleanup(); }, 3000);
// };

// // ─── Component ────────────────────────────────────────────────────────────────
// const HeroSection = ({ data }: { data: HomeProps["bannerSection"] }) => {
//   const swiperRef    = useRef<SwiperClass | null>(null);
//   const prevIndexRef = useRef<number>(0);
//   const prevImageRef = useRef<string | null>(null);
//   const directionRef = useRef<1 | -1>(1);
//   const isAnimating  = useRef(false);
//   const sectionRef   = useRef<HTMLElement | null>(null);
//   const entryDoneRef = useRef(false);

//   const [currentSlide, setCurrentSlide] = useState(1);
//   const [isMobile, setIsMobile]         = useState(false);
//   const totalSlides = data.items.length;

//   const isArabic = useIsPreferredLanguageArabic();
//   const t        = useApplyLang(data);
//   const router   = useRouter();

//   // ── Preload all slide images on mount ─────────────────────────────────────
//   useEffect(() => {
//     preloadImages(t.items.map((item) => item.image));
//   }, [t.items]);

//   // ── Entry animation on mount ──────────────────────────────────────────────
//   useEffect(() => {
//     if (entryDoneRef.current) return;
//     entryDoneRef.current = true;
//     const section = sectionRef.current;
//     if (!section) return;
//     const timer = setTimeout(() => animateEntry(section), 120);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const handleRegisterClick = useCallback(() => {
//     router.push("/contact-us?scroll=register");
//   }, [router]);

//   const activeSlide = useMemo(
//     () => t.items[currentSlide - 1] || t.items[0],
//     [t.items, currentSlide]
//   );

//   const handleBeforeTransition = useCallback(
//     (swiper: SwiperClass) => {
//       if (isAnimating.current) return;
//       if (!sectionRef.current) return;

//       const nextIndex = swiper.realIndex;
//       const nextImage = t.items[nextIndex]?.image;
//       const prevImage = prevImageRef.current;

//       if (!nextImage || !prevImage) return;
//       if (nextIndex === prevIndexRef.current) return;

//       const total = t.items.length;
//       let delta = nextIndex - prevIndexRef.current;
//       if (Math.abs(delta) > total / 2) {
//         delta = delta > 0 ? delta - total : delta + total;
//       }
//       directionRef.current = delta >= 0 ? 1 : -1;

//       isAnimating.current = true;

//       // ── FIX: Hide swiper IMMEDIATELY here, synchronously, before any async work ──
//       const swiperEl = sectionRef.current.querySelector(".swiper") as HTMLElement | null;
//       if (swiperEl) swiperEl.style.opacity = "0";

//       animateCinematicCurtain(
//         prevImage,
//         nextImage,
//         directionRef.current,
//         () => {
//           isAnimating.current  = false;
//           prevIndexRef.current = nextIndex;
//           prevImageRef.current = nextImage;
//         },
//         sectionRef.current
//       );
//     },
//     [t.items]
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="lg:h-screen h-[65dvh] md:h-[85dvh] relative overflow-hidden  "
//     >
//       {/* Swiper */}
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         autoplay={{ delay: 6000, disableOnInteraction: false }}
//         speed={0}
//         slidesPerView={1}
//         allowTouchMove={false}
//         loop
//         observer={true}
//         observeParents={true}
//         onSwiper={(swiper) => {
//           swiperRef.current    = swiper;
//           prevIndexRef.current = swiper.realIndex;
//           prevImageRef.current = t.items[swiper.realIndex]?.image ?? null;
//         }}
//         onBeforeTransitionStart={handleBeforeTransition}
//         onSlideChange={(swiper) => {
//           setCurrentSlide(swiper.realIndex + 1);
//         }}
//         onSlideChangeTransitionEnd={(swiper) => {
//           prevImageRef.current = t.items[swiper.realIndex]?.image ?? null;
//         }}
//         className="w-full h-full"
//       >
//         {t.items.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="h-full w-screen relative overflow-hidden">
//               <figure className="h-full w-full absolute inset-0 overflow-hidden">
//                 <div className="h-full w-full relative">
//                   <Image
//                     className="h-full w-full !object-cover !object-center"
//                     src={slide.image}
//                     alt={slide.imageAlt}
//                     width={1920}
//                     height={1280}
//                     priority={index === 0}
//                     fetchPriority={index === 0 ? "high" : "auto"}
//                     loading={index === 0 ? "eager" : "lazy"}
//                     quality={index === 0 ? 90 : 75}
//                     placeholder="blur"
//                     blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
//                   />
//                 </div>
//               </figure>
//               <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_21.7%,_rgba(0,0,0,0.6)_63.57%,_rgba(0,0,0,0.8)_100%)]"></div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Static Content */}
//       <div className="absolute w-full h-full top-0 left-0 pointer-events-none z-[70]">
//         <div className="container h-full">
//           <div className="h-full relative w-full overflow-hidden">
//             <div className="absolute bottom-5 lg:bottom-[30px] xl:bottom-[50px] grid grid-cols-1 xl:grid-cols-7 items-end gap-2 pointer-events-auto">
//               {/* Left text */}
//               <div className="xl:mb-[65px] col-span-1 md:col-span-5">
//                 <h2 className={`hero-title text-[1.8rem] md:text-2xl 2xl:text-4xl text-white leading-[1.2] xl:leading-[1.1] font-custom font-light lettersp-4-hero mb-0 ${isArabic ? "max-w-[90%]" : "max-w-none"}`}>
//                   <span className="text-primary">{activeSlide.highlightText}</span>{" "}
//                   {activeSlide.title}
//                 </h2>
//               </div>

//               {/* Button */}
//               <div
//                 onClick={handleRegisterClick}
//                 className="hero-button md:mb-[35px] lg:mb-[85px] xl:mb-[120px] flex justify-end flex-col xl:items-end col-span-1 md:col-span-2"
//               >
//                 <div>
//                   <div className={`mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full ${isArabic ? "hover:translate-x-2" : "hover:-translate-x-2"} hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]`}>
//                     <button
//                       type="button"
//                       className="cursor-pointer pl-4 pr-2 md:px-4 py-[10px] md:py-3 bg-primary rounded-full flex items-center gap-2 transition-all duration-300"
//                       aria-label={isArabic ? "سجل اهتمامك" : "Register Interest"}
//                     >
//                       {isArabic && (
//                         <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
//                           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
//                             <path d="M8.74639 1.76178L1.12891 9.36247" stroke="#42BADC" strokeMiterlimit="10" />
//                             <path d="M1.12891 1.76178H8.74639V9.21251" stroke="#42BADC" strokeMiterlimit="10" />
//                           </svg>
//                         </div>
//                       )}
//                       <p className="group-hover:text-white text-xs font-light text-white uppercase transition-colors duration-300">
//                         {isArabic ? "سجل اهتمامك" : "Register Interest"}
//                       </p>
//                       {!isArabic && (
//                         <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
//                           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
//                             <path d="M8.74639 1.76178L1.12891 9.36247" stroke="#42BADC" strokeMiterlimit="10" />
//                             <path d="M1.12891 1.76178H8.74639V9.21251" stroke="#42BADC" strokeMiterlimit="10" />
//                           </svg>
//                         </div>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Divider line */}
//               <div className={`hero-divider absolute ${isArabic ? "right-[40%]" : "left-[40%]"} bottom-[83px] w-[80%] hidden xl:block`}>
//                 <div className={`h-[1px] w-full ${isArabic ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white via-white/30 to-transparent`}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pagination Indicator */}
//       <div className="hero-pagination absolute bottom-[10%] md:bottom-[37%] w-full z-[80] pointer-events-none">
//         <div className="container flex justify-end">
//           <span className="text-[15px] text-white whitespace-nowrap font-light relative -right-3 md:right-2 z-10 flex flex-col items-center">
//             <div className="flex flex-col rotate-180">
//               {t.items.map((_, index) => (
//                 <span
//                   key={index}
//                   className={`font-medium w-[1px] h-[10px] mt-2 transition-all duration-300 ${index === currentSlide - 1 ? "bg-primary" : "bg-white"}`}
//                 ></span>
//               ))}
//             </div>
//             <span className="mt-4 -rotate-90 font-light text-[15px]">{`0${totalSlides}`}</span>
//             <span className="font-medium w-[1px] h-[8px] bg-white mt-1"></span>
//             <span className="font-[700] text-[15px] -rotate-90 mt-1">{`0${currentSlide}`}</span>
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

"use client";
import Image from "next/image";
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
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

// ─── Preload all slide images on module level ─────────────────────────────────
const preloadImages = (urls: string[]) => {
  urls.forEach((url) => {
    if (!url) return;
    const img = new window.Image();
    img.src = url;
  });
};

// ─── Content Reveal ───────────────────────────────────────────────────────────
const animateContentIn = () => {
  const targets = [
    ".hero-title",
    ".hero-button",
    ".hero-divider",
    ".hero-pagination",
  ];
  targets.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) gsap.killTweensOf(el);
  });
  gsap.fromTo(
    targets,
    { opacity: 0, y: 30, filter: "blur(4px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.3,
    },
  );
};

// ─── Entry Animation ──────────────────────────────────────────────────────────
const animateEntry = (container: HTMLElement) => {
  const W = container.offsetWidth;
  gsap.set(
    [".hero-title", ".hero-button", ".hero-divider", ".hero-pagination"],
    { opacity: 0, y: 22 },
  );

  const root = document.createElement("div");
  root.style.cssText = `position:absolute; inset:0; z-index:99999; pointer-events:none; overflow:hidden;`;
  container.appendChild(root);

  const streak = document.createElement("div");
  streak.style.cssText = `
    position:absolute; top:-15%; left:-100px; width:80px; height:130%;
    background:linear-gradient(to right, transparent 0%, rgba(255,255,255,0.0) 10%, rgba(255,255,255,0.52) 48%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0.52) 52%, rgba(255,255,255,0.0) 90%, transparent 100%);
    filter:blur(16px); mix-blend-mode:screen; transform:skewX(-10deg); pointer-events:none;
  `;
  root.appendChild(streak);

  const tl = gsap.timeline({
    onComplete: () => {
      root.remove();
      animateContentIn();
    },
  });
  tl.to(streak, { x: W + 130, duration: 0.7, ease: "power1.inOut" }, 0);
};

// ─── Fluid Splash Dissolve ────────────────────────────────────────────────────
const animateCinematicCurtain = (
  prevImage: string,
  nextImage: string,
  direction: 1 | -1,
  onDone: () => void,
  container: HTMLElement,
) => {
  const W = container.offsetWidth;
  const H = container.offsetHeight;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const GRADIENT_STOPS = [
    { stop: 0, alpha: 0 },
    { stop: 0.217, alpha: 0 },
    { stop: 0.636, alpha: 0.6 },
    { stop: 1, alpha: 0.8 },
  ];

  const OX = direction === 1 ? W * 0.05 : W * 0.95;
  const OY = H * 0.5;
  const MAX_R =
    Math.sqrt(Math.max(OX, W - OX) ** 2 + Math.max(OY, H - OY) ** 2) * 1.05;
  const FEATHER = MAX_R * 0.28;

  const swiperWrapper = container.querySelector(
    ".swiper",
  ) as HTMLElement | null;
  if (swiperWrapper && swiperWrapper.style.opacity !== "0")
    swiperWrapper.style.opacity = "0";

  const canvas = document.createElement("canvas");
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  canvas.style.cssText = `position:absolute; inset:0; width:${W}px; height:${H}px; z-index:60; pointer-events:none;`;
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);

  const offscreen = document.createElement("canvas");
  offscreen.width = W * DPR;
  offscreen.height = H * DPR;
  const oc = offscreen.getContext("2d")!;
  oc.scale(DPR, DPR);

  const imgPrev = new window.Image();
  const imgNext = new window.Image();
  imgPrev.src = prevImage;
  imgNext.src = nextImage;

  const state = { radius: 0, prevOpacity: 1, prevDrift: 0 };
  let done = false;

  const applyGradient = (c: CanvasRenderingContext2D, w: number, h: number) => {
    const g = c.createLinearGradient(0, 0, 0, h);
    GRADIENT_STOPS.forEach(({ stop, alpha }) =>
      g.addColorStop(stop, `rgba(0,0,0,${alpha})`),
    );
    c.globalAlpha = 1;
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  };

  const coverDraw = (
    c: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
    dx = 0,
    alpha = 1,
  ) => {
    if (!img.naturalWidth) return;
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const iw = img.naturalWidth * s;
    const ih = img.naturalHeight * s;
    c.globalAlpha = alpha;
    c.drawImage(img, (w - iw) / 2 + dx, (h - ih) / 2, iw, ih);
  };

  const draw = () => {
    if (done) return;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    coverDraw(ctx, imgPrev, W, H, state.prevDrift, state.prevOpacity);
    applyGradient(ctx, W, H);
    ctx.restore();

    if (state.radius > 0) {
      oc.globalCompositeOperation = "source-over";
      oc.globalAlpha = 1;
      oc.clearRect(0, 0, W, H);
      coverDraw(oc, imgNext, W, H, 0, 1);
      applyGradient(oc, W, H);
      oc.globalCompositeOperation = "destination-in";
      const inner = Math.max(0, state.radius - FEATHER);
      const mask = oc.createRadialGradient(OX, OY, inner, OX, OY, state.radius);
      mask.addColorStop(0, "rgba(0,0,0,1)");
      mask.addColorStop(1, "rgba(0,0,0,0)");
      oc.fillStyle = mask;
      oc.fillRect(0, 0, W, H);
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.drawImage(offscreen, 0, 0, W, H);
      ctx.restore();
    }
  };

  gsap.ticker.add(draw);

  const cleanup = () => {
    gsap.ticker.remove(draw);
    if (swiperWrapper) swiperWrapper.style.opacity = "1";
    gsap.to(canvas, {
      opacity: 0,
      duration: 0.1,
      ease: "none",
      onComplete: () => {
        done = true;
        canvas.remove();
        onDone();
      },
    });
  };

  function runTimeline() {
    const tl = gsap.timeline({ onComplete: cleanup });
    tl.to(
      state,
      { radius: MAX_R * 1.2, duration: 1.1, ease: "power2.inOut" },
      0,
    );
    tl.to(
      state,
      {
        prevDrift: direction * W * 0.03,
        prevOpacity: 0,
        duration: 0.75,
        ease: "power1.inOut",
      },
      0.15,
    );
  }

  let loaded = 0;
  const onLoad = () => {
    loaded++;
    if (loaded === 2) runTimeline();
  };
  if (imgPrev.complete) onLoad();
  else imgPrev.onload = onLoad;
  if (imgNext.complete) onLoad();
  else imgNext.onload = onLoad;
  setTimeout(() => {
    if (!done) cleanup();
  }, 3000);
};

// ─── Component ────────────────────────────────────────────────────────────────
const HeroSection = ({ data }: { data: HomeProps["bannerSection"] }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const prevIndexRef = useRef<number>(0);
  const prevImageRef = useRef<string | null>(null);
  const directionRef = useRef<1 | -1>(1);
  const isAnimating = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const entryDoneRef = useRef(false);

  // ── Swipe tracking ────────────────────────────────────────────────────────
  const pointerStartX = useRef<number>(0);
  const pointerStartY = useRef<number>(0);
  const pointerDown = useRef(false);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = data.items.length;

  const isArabic = useIsPreferredLanguageArabic();
  const t = useApplyLang(data);
  const router = useRouter();

  useEffect(() => {
    preloadImages(t.items.map((item) => item.image));
  }, [t.items]);

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
    [t.items, currentSlide],
  );

  // ── Unified transition — identical path for both autoplay and swipe ───────
  const handleBeforeTransition = useCallback(
    (swiper: SwiperClass) => {
      if (isAnimating.current) return;
      if (!sectionRef.current) return;

      const nextIndex = swiper.realIndex;
      const nextImage = t.items[nextIndex]?.image;
      const prevImage = prevImageRef.current;

      if (!nextImage || !prevImage) return;
      if (nextIndex === prevIndexRef.current) return;

      const total = t.items.length;
      let delta = nextIndex - prevIndexRef.current;
      if (Math.abs(delta) > total / 2)
        delta = delta > 0 ? delta - total : delta + total;
      directionRef.current = delta >= 0 ? 1 : -1;

      isAnimating.current = true;

      // Hide swiper immediately
      const swiperEl = sectionRef.current.querySelector(
        ".swiper",
      ) as HTMLElement | null;
      if (swiperEl) swiperEl.style.opacity = "0";

      animateCinematicCurtain(
        prevImage,
        nextImage,
        directionRef.current,
        () => {
          isAnimating.current = false;
          prevIndexRef.current = nextIndex;
          prevImageRef.current = nextImage;
          setCurrentSlide(nextIndex + 1);
        },
        sectionRef.current,
      );
    },
    [t.items],
  );

  // ── Raw pointer swipe — just call slideNext/slidePrev like autoplay does ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onDown = (e: PointerEvent) => {
      if (isAnimating.current) return;
      pointerStartX.current = e.clientX;
      pointerStartY.current = e.clientY;
      pointerDown.current = true;
    };

    const onUp = (e: PointerEvent) => {
      if (!pointerDown.current) return;
      pointerDown.current = false;
      if (isAnimating.current) return;

      const dx = e.clientX - pointerStartX.current;
      const dy = e.clientY - pointerStartY.current;

      if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;

      const swiper = swiperRef.current;
      if (!swiper) return;

      // ── Exactly mirrors autoplay: let Swiper advance its own index and
      // fire onBeforeTransitionStart naturally — same code path, zero drift.
      if (dx < 0) {
        swiper.slideNext(0); // swipe left → next
      } else {
        swiper.slidePrev(0); // swipe right → prev
      }
    };

    const onLeave = () => {
      pointerDown.current = false;
    };

    section.addEventListener("pointerdown", onDown, { passive: true });
    section.addEventListener("pointerup", onUp);
    section.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointerup", onUp);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="lg:h-screen h-[65dvh] md:h-[85dvh] relative overflow-hidden  "
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={0}
        slidesPerView={1}
        allowTouchMove={false}
        loop
        observer={true}
        observeParents={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
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
                    className="h-full w-full !object-cover !object-center"
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
              <div className="xl:mb-[65px] col-span-1 md:col-span-5">
                <h2
                  className={`hero-title text-[1.8rem] md:text-2xl 2xl:text-4xl text-white leading-[1.2] xl:leading-[1.1] font-custom font-light lettersp-4-hero mb-0 ${isArabic ? "max-w-[90%]" : "max-w-none"}`}
                >
                  <span className="text-primary">
                    {activeSlide.highlightText}
                  </span>{" "}
                  {activeSlide.title}
                </h2>
              </div>

              <div
                onClick={handleRegisterClick}
                className="hero-button md:mb-[35px] lg:mb-[85px] xl:mb-[120px] flex justify-end flex-col xl:items-end col-span-1 md:col-span-2"
              >
                <div>
                  <div
                    className={`mt-5 w-fit md:mt-10 p-[1px] group transition-all duration-300 bg-[linear-gradient(90deg,_#42BADC_0%,_#12586C_100%)] rounded-full ${isArabic ? "hover:translate-x-2" : "hover:-translate-x-2"} hover:shadow-[0_0_15px_rgba(66,186,220,0.5)]`}
                  >
                    <button
                      type="button"
                      className="cursor-pointer pl-4 pr-2 md:px-4 py-[10px] md:py-3 bg-primary rounded-full flex items-center gap-2 transition-all duration-300"
                      aria-label={
                        isArabic ? "سجل اهتمامك" : "Register Interest"
                      }
                    >
                      {isArabic && (
                        <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            aria-hidden="true"
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
                      )}
                      <p className="group-hover:text-white text-xs font-light text-white uppercase transition-colors duration-300">
                        {isArabic ? "سجل اهتمامك" : "Register Interest"}
                      </p>
                      {!isArabic && (
                        <div className="p-2 flex items-center justify-center bg-white w-fit rounded-full transition-transform duration-300 group-hover:rotate-45">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            aria-hidden="true"
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
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`hero-divider absolute ${isArabic ? "right-[40%]" : "left-[40%]"} bottom-[83px] w-[80%] hidden xl:block`}
              >
                <div
                  className={`h-[1px] w-full ${isArabic ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white via-white/30 to-transparent`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Indicator */}
      <div className="hero-pagination absolute bottom-[10%] md:bottom-[37%] w-full z-[80] pointer-events-none">
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
