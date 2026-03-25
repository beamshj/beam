// "use client";

// import { useState, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { LeadershipData } from "../type";
// import { useApplyLang } from "@/lib/applyLang";
// import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type Member = { _id: string; name: string; designation: string; image: string; description: string };
// type Mode   = "mobile" | "tablet" | "desktop";
// type Layout = { activeW: number; activeH: number; thumbW: number; thumbH: number; thumbCount: number; gap: number; mode: Mode };

// // ─── Layout resolver ──────────────────────────────────────────────────────────

// function resolveLayout(vw: number): Layout {
//   if (vw >= 1615) return { activeW: 459, activeH: 653, thumbW: 255, thumbH: 255, thumbCount: 3, gap: 40, mode: "desktop" };
//   if (vw >= 1536) return { activeW: 370, activeH: 480, thumbW: 220, thumbH: 220, thumbCount: 2, gap: 40, mode: "desktop" };
//   if (vw >= 1280) return { activeW: 370, activeH: 490, thumbW: 220, thumbH: 220, thumbCount: 2, gap: 28, mode: "desktop" };
//   if (vw >= 1024) return { activeW: 280, activeH: 300, thumbW: 160, thumbH: 160, thumbCount: 2, gap: 20, mode: "desktop" };
//   if (vw >= 540)  return { activeW: Math.round(vw * 0.45), activeH: Math.round(vw * 0.55), thumbW: 0, thumbH: 0, thumbCount: 0, gap: 0, mode: "tablet" };
//   return { activeW: vw - 32, activeH: Math.round((vw - 32) * 1.1), thumbW: 0, thumbH: 0, thumbCount: 0, gap: 0, mode: "mobile" };
// }

// // ─── Hooks ────────────────────────────────────────────────────────────────────

// function useWindowWidth() {
//   const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
//   useEffect(() => {
//     const h = () => setW(window.innerWidth);
//     window.addEventListener("resize", h);
//     return () => window.removeEventListener("resize", h);
//   }, []);
//   return w;
// }

// function useContainerEdge() {
//   const [edge, setEdge] = useState(0);
//   useLayoutEffect(() => {
//     const update = () => {
//       const el = document.querySelector(".container") as HTMLElement | null;
//       if (el) setEdge(window.innerWidth - el.getBoundingClientRect().right);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//   return edge;
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function SectionTitle({ text, className }: { text: string; className?: string }) {
//   return (
//     <motion.h1
//       initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }}
//       className={`font-light text-black lettersp-4 ${className}`}
//     >
//       {text}
//     </motion.h1>
//   );
// }

// function NextBtn({ onClick, size, isArabic }: { onClick: () => void; size: "sm" | "lg"; isArabic: boolean }) {
//   return (
//     <button
//       onClick={onClick} aria-label="Next"
//       className={`rounded-full border border-black flex items-center justify-center transition-transform duration-300
//         ${isArabic ? "hover:-translate-x-1" : "hover:translate-x-1"}
//         ${size === "lg" ? "w-[50px] h-[50px] 2xl:w-[75px] 2xl:h-[75px]" : "w-9 h-9"}`}
//     >
//       <img
//         src="/images/arrow-primary.svg" alt=""
//         className={`${size === "lg" ? "w-5 h-5" : "w-3 h-3"} ${isArabic ? "-rotate-135" : "rotate-45"}`}
//       />
//     </button>
//   );
// }

// function Photo({ member, width, height }: { member: Member; width: number; height: number }) {
//   return (
//     <div className="relative flex-shrink-0 rounded-2xl overflow-hidden" style={{ width, height }}>
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={member._id} className="absolute inset-0"
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <Image src={member.image} alt={member.name} fill loading="lazy" className="object-cover object-top" />
//           <div className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none"
//             style={{ background: "linear-gradient(to bottom, transparent, #42BADC)" }} />
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }

// function ContentPanel({
//   active, total, activeIdx, layout, isArabic, onNext,
// }: {
//   active: Member; total: number; activeIdx: number; layout: Layout; isArabic: boolean; onNext: () => void;
// }) {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Counter + next btn (mobile/tablet) — pinned at TOP */}
//       <div className="flex items-center justify-between mb-4">
//         <p className="text-sm font-light text-black">
//           <span className="text-[#666666]">{String(total).padStart(2, "0")}/</span>
//           {String(activeIdx + 1).padStart(2, "0")}
//         </p>
//         {layout.mode !== "desktop" && <NextBtn onClick={onNext} size="sm" isArabic={isArabic} />}
//       </div>

//       {/* Member info — pushed to BOTTOM via mt-auto */}
//       <div className="mt-auto relative overflow-hidden">
//         <AnimatePresence mode="wait" initial={false}>
//           <motion.div
//             key={active._id}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0 }}
//             transition={{ duration: 0.25, ease: "easeInOut" }}
//           >
//             <h3 className="text-xl font-light text-black leading-snug">{active.name}</h3>
//             <p className="text-sm text-[#666666] font-light mt-4 3xl:mt-[30px]">{active.designation}</p>
//             <div
//               className="mt-5 md:mt-8 space-y-1 font-light text-sm text-black school-leadership-bullets"
//               dangerouslySetInnerHTML={{ __html: active.description }}
//             />
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Next btn (desktop only) — after member info, at bottom */}
//       {layout.mode === "desktop" && (
//         <div className="mt-8">
//           <NextBtn onClick={onNext} size="lg" isArabic={isArabic} />
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────

// export default function LeadershipCarousel({ data }: { data: LeadershipData }) {
//   const t        = useApplyLang(data);
//   const isArabic = useIsPreferredLanguageArabic();
//   const members: Member[] = t.secondSection.items; // ← secondSection
//   const total = members.length;

//   const [activeIdx, setActiveIdx] = useState(0);
//   const [mounted, setMounted]     = useState(false);

//   const vw     = useWindowWidth();
//   const edge   = useContainerEdge();
//   const layout = useMemo(() => resolveLayout(vw), [vw]);
//   const active = members[activeIdx];

//   useEffect(() => setMounted(true), []);
//   const goNext = useCallback(() => setActiveIdx((p) => (p + 1) % total), [total]);

//   const desktopCards = useMemo(() => {
//     if (layout.mode !== "desktop") return [];
//     return Array.from({ length: layout.thumbCount + 1 }, (_, i) => {
//       const isActive = i === 0;
//       const w    = isActive ? layout.activeW : layout.thumbW;
//       const h    = isActive ? layout.activeH : layout.thumbH;
//       const left = isArabic
//         ? isActive ? 0 : layout.activeW + layout.gap + (i - 1) * (layout.thumbW + layout.gap)
//         : isActive ? layout.thumbCount * (layout.thumbW + layout.gap) : (layout.thumbCount - i) * (layout.thumbW + layout.gap);
//       return { member: members[(activeIdx + i) % total], isActive, w, h, left, zIndex: isActive ? 20 : 10 + layout.thumbCount - i };
//     });
//   }, [activeIdx, total, layout, isArabic, members]);

//   if (!mounted) {
//     return <div className="container py-10"><div className="h-[460px] w-full animate-pulse rounded-2xl bg-gray-100" /></div>;
//   }

//   const sharedProps = { active, total, activeIdx, layout, isArabic, onNext: goNext };

//   // ── Mobile ────────────────────────────────────────────────────────────────

//   if (layout.mode === "mobile") return (
//     <section className="overflow-hidden py-10">
//       <div className="container">
//         <SectionTitle text={t.secondSection.title} className="text-lg mb-5" /> {/* ← secondSection */}
//         <Photo member={active} width={layout.activeW} height={layout.activeH} />
//         <div className="mt-5"><ContentPanel {...sharedProps} /></div>
//       </div>
//     </section>
//   );

//   // ── Tablet ────────────────────────────────────────────────────────────────

//   if (layout.mode === "tablet") return (
//     <section className="overflow-hidden py-10">
//       <div className="container">
//         <SectionTitle text={t.secondSection.title} className="text-xl mb-6" /> {/* ← secondSection */}
//         <div className={`flex gap-6 items-stretch ${isArabic ? "flex-row-reverse" : "flex-row"}`}>
//           <Photo member={active} width={layout.activeW} height={layout.activeH} />
//           <div className="flex-1" style={{ minHeight: layout.activeH }}>
//             <ContentPanel {...sharedProps} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );

//   // ── Desktop ───────────────────────────────────────────────────────────────

//   const slidesW = layout.activeW + layout.thumbCount * (layout.thumbW + layout.gap);
//   const bleed   = vw < 1024 ? 15 : edge;

//   return (
//     <section className="overflow-hidden py-10 xl:py-20 2xl:py-[135px]">
//       <div className="container ios:hidden mb-5 lg:mb-9 2xl:mb-14">
//         <SectionTitle text={t.secondSection.title} className="text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111]" /> {/* ← secondSection */}
//       </div>

//       <div className="flex flex-row items-stretch gap-9 lg:gap-14"
//         style={isArabic ? { paddingLeft: bleed } : { paddingRight: bleed }}
//       >
//         {/* Carousel */}
//         <div className="relative flex-shrink-0" style={{ width: slidesW, minHeight: layout.activeH }}>
//           <div className="hidden ios:block absolute top-0 z-30 max-w-[47%] pointer-events-none"
//             style={isArabic ? { right: edge } : { left: edge }}
//           >
//             <SectionTitle text={t.secondSection.title} className="text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111]" /> {/* ← secondSection */}
//           </div>

//           {desktopCards.map(({ member, isActive, w, h, left, zIndex }) => (
//             <motion.div
//               key={member._id}
//               className="absolute bottom-0 rounded-2xl overflow-hidden cursor-pointer select-none"
//               animate={{ left, width: w, height: h, zIndex }}
//               transition={{ duration: 1.1, ease: [0.12, 1, 0.2, 1] }}
//               onClick={() => setActiveIdx(members.findIndex((m) => m._id === member._id))}
//             >
//               <Image src={member.image} alt={member.name} fill loading="lazy" sizes="460px"
//                 className={`object-cover object-top transition-[filter] duration-500 ${isActive ? "saturate-100" : "saturate-0"}`}
//               />
//               {isActive && (
//                 <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
//                   style={{ background: "linear-gradient(to bottom, transparent, #42BADC)" }} />
//               )}
//               {!isActive && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
//             </motion.div>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="w-[300px] lg:w-[320px] flex-shrink-0">
//           <ContentPanel {...sharedProps} />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LeadershipData } from "../type";
import { useApplyLang } from "@/lib/applyLang";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

// ─── Types ────────────────────────────────────────────────────────────────────

type Member = { _id: string; name: string; designation: string; image: string; description: string };
type Mode   = "mobile" | "tablet" | "desktop";
type Layout = { activeW: number; activeH: number; thumbW: number; thumbH: number; thumbCount: number; gap: number; mode: Mode };

// ─── Layout resolver ──────────────────────────────────────────────────────────

function resolveLayout(vw: number): Layout {
  if (vw >= 2560) return { activeW: 459, activeH: 653, thumbW: 255, thumbH: 255, thumbCount: 5, gap: 40, mode: "desktop" };
  if (vw >= 2048) return { activeW: 459, activeH: 653, thumbW: 255, thumbH: 255, thumbCount: 4, gap: 40, mode: "desktop" };
  if (vw >= 1812) return { activeW: 459, activeH: 653, thumbW: 255, thumbH: 255, thumbCount: 3, gap: 40, mode: "desktop" };
  if (vw >= 1615) return { activeW: 439, activeH: 633, thumbW: 235, thumbH: 235, thumbCount: 3, gap: 25, mode: "desktop" };
  if (vw >= 1536) return { activeW: 370, activeH: 480, thumbW: 220, thumbH: 220, thumbCount: 2, gap: 40, mode: "desktop" };
  if (vw >= 1280) return { activeW: 380, activeH: 520, thumbW: 230, thumbH: 230, thumbCount: 2, gap: 32, mode: "desktop" };
  if (vw >= 1024) return { activeW: 280, activeH: 300, thumbW: 160, thumbH: 160, thumbCount: 2, gap: 20, mode: "desktop" };
  if (vw >= 540)  return { activeW: Math.round(vw * 0.45), activeH: Math.round(vw * 0.55), thumbW: 0, thumbH: 0, thumbCount: 0, gap: 0, mode: "tablet" };
  return { activeW: vw - 32, activeH: Math.round((vw - 32) * 1.1), thumbW: 0, thumbH: 0, thumbCount: 0, gap: 0, mode: "mobile" };
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useContainerEdge() {
  const [edge, setEdge] = useState(0);
  useLayoutEffect(() => {
    const update = () => {
      const el = document.querySelector(".container") as HTMLElement | null;
      if (el) setEdge(window.innerWidth - el.getBoundingClientRect().right);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return edge;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }}
      className={`font-light text-black lettersp-4 ${className}`}
    >
      {text}
    </motion.h1>
  );
}

function NextBtn({ onClick, size, isArabic }: { onClick: () => void; size: "sm" | "lg"; isArabic: boolean }) {
  return (
    <button
      onClick={onClick} aria-label="Next"
      className={`rounded-full border border-black flex items-center justify-center transition-transform duration-300
        ${isArabic ? "hover:-translate-x-1" : "hover:translate-x-1"}
        ${size === "lg" ? "w-[50px] h-[50px] 2xl:w-[75px] 2xl:h-[75px]" : "w-9 h-9"}`}
    >
      <img
        src="/images/arrow-primary.svg" alt=""
        className={`${size === "lg" ? "w-5 h-5" : "w-3 h-3"} ${isArabic ? "-rotate-135" : "rotate-45"}`}
      />
    </button>
  );
}

function Photo({ member, width, height }: { member: Member; width: number; height: number }) {
  return (
    <div className="relative flex-shrink-0 rounded-2xl overflow-hidden" style={{ width, height }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={member._id} className="absolute inset-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image src={member.image} alt={member.name} fill loading="lazy" className="object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #42BADC)" }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const sanitizeHtml = (html: string) => html.replace(/&nbsp;/g, " ");

function ContentPanel({
  active, total, activeIdx, layout, isArabic, onNext,
}: {
  active: Member; total: number; activeIdx: number; layout: Layout; isArabic: boolean; onNext: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-light text-black">
          <span className="text-[#666666]">{String(total).padStart(2, "0")}/</span>
          {String(activeIdx + 1).padStart(2, "0")}
        </p>
        {layout.mode !== "desktop" && <NextBtn onClick={onNext} size="sm" isArabic={isArabic} />}
      </div>
      <div className="mt-auto relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <h3 className="text-[26px] md:text-xl font-light text-black leading-snug">{active.name}</h3>
            <p className="text-sm text-[#666666] font-light mt-4 3xl:mt-[30px]">{active.designation}</p>
            <div
              className="mt-5 md:mt-8 space-y-1 font-light text-sm text-black school-leadership-bullets"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(active.description) }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {layout.mode === "desktop" && (
        <div className="mt-8">
          <NextBtn onClick={onNext} size="lg" isArabic={isArabic} />
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BeamTeam({ data }: { data: LeadershipData }) {
  const t        = useApplyLang(data);
  const isArabic = useIsPreferredLanguageArabic();
  const members: Member[] = t.secondSection.items;
  const total = members.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted]     = useState(false);

  const vw     = useWindowWidth();
  const edge   = useContainerEdge();
  const layout = useMemo(() => resolveLayout(vw), [vw]);
  const active = members[activeIdx];

  useEffect(() => setMounted(true), []);
  const goNext = useCallback(() => setActiveIdx((p) => (p + 1) % total), [total]);

  const desktopCards = useMemo(() => {
    if (layout.mode !== "desktop") return [];
    return Array.from({ length: layout.thumbCount + 1 }, (_, i) => {
      const isActive = i === 0;
      const w    = isActive ? layout.activeW : layout.thumbW;
      const h    = isActive ? layout.activeH : layout.thumbH;
      const left = isArabic
        ? isActive ? 0 : layout.activeW + layout.gap + (i - 1) * (layout.thumbW + layout.gap)
        : isActive ? layout.thumbCount * (layout.thumbW + layout.gap) : (layout.thumbCount - i) * (layout.thumbW + layout.gap);
      return { member: members[(activeIdx + i) % total], isActive, w, h, left, zIndex: isActive ? 20 : 10 + layout.thumbCount - i };
    });
  }, [activeIdx, total, layout, isArabic, members]);

  if (!mounted) {
    return <div className="container py-10"><div className="h-[460px] w-full animate-pulse rounded-2xl bg-gray-100" /></div>;
  }

  const sharedProps = { active, total, activeIdx, layout, isArabic, onNext: goNext };

  // ── Mobile ────────────────────────────────────────────────────────────────

  if (layout.mode === "mobile") return (
    <section className="overflow-hidden pb-10">
      <div className="container">
        <SectionTitle text={t.secondSection.title} className="text-lg mb-5" />
        <Photo member={active} width={layout.activeW} height={layout.activeH} />
        <div className="mt-5 min-h-[270px]"><ContentPanel {...sharedProps} /></div>
      </div>
    </section>
  );

  // ── Tablet ────────────────────────────────────────────────────────────────

  if (layout.mode === "tablet") return (
    <section className="overflow-hidden py-10">
      <div className="container">
        <SectionTitle text={t.secondSection.title} className="text-xl mb-6" />
        <div className={`flex gap-6 items-stretch ${isArabic ? "flex-row-reverse" : "flex-row"}`}>
          <Photo member={active} width={layout.activeW} height={layout.activeH} />
          <div className="flex-1" style={{ minHeight: layout.activeH }}>
            <ContentPanel {...sharedProps} />
          </div>
        </div>
      </div>
    </section>
  );

  // ── Desktop ───────────────────────────────────────────────────────────────

  const slidesW = layout.activeW + layout.thumbCount * (layout.thumbW + layout.gap);

  // ── Desktop < 1920px : original layout ───────────────────────────────────
  if (vw < 1921) {
    const bleed = vw < 1024 ? 15 : edge;
    return (
      <section className="overflow-hidden py-10 xl:py-20 2xl:py-[135px]">
        <div className="container ios:hidden mb-5 lg:mb-16 2xl:mb-24">
          <SectionTitle text={t.secondSection.title} className="text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111]" />
        </div>
        <div className="flex flex-row items-stretch gap-9 lg:gap-14"
          style={isArabic ? { paddingLeft: bleed } : { paddingRight: bleed }}
        >
          {/* Carousel */}
          <div className="relative flex-shrink-0" style={{ width: slidesW, minHeight: layout.activeH }}>
            <div className="hidden ios:block absolute top-0 z-30 max-w-[54%] pointer-events-none"
              style={isArabic ? { right: edge } : { left: edge }}
            >
              <SectionTitle text={t.secondSection.title} className="text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111]" />
            </div>
            {desktopCards.map(({ member, isActive, w, h, left, zIndex }) => (
              <motion.div
                key={member._id}
                className="absolute bottom-0 rounded-2xl overflow-hidden cursor-pointer select-none"
                animate={{ left, width: w, height: h, zIndex }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIdx(members.findIndex((m) => m._id === member._id))}
              >
                <Image src={member.image} alt={member.name} fill loading="lazy" sizes="460px"
                  className={`object-cover object-top transition-[filter] duration-500 ${isActive ? "saturate-100" : "saturate-0"}`}
                />
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, #42BADC)" }} />
                )}
                {!isActive && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
              </motion.div>
            ))}
          </div>
          {/* Content */}
          <div className="w-[300px] lg:w-[320px] flex-shrink-0">
            <ContentPanel {...sharedProps} />
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop ≥ 1920px : col-8/col-4 grid, images absolutely positioned ────
  return (
    <section className="overflow-hidden py-10 xl:py-20 2xl:py-[135px]">
      <div className="container">
        <div
          className={`grid grid-cols-13 gap-9 lg:gap-14 ${isArabic ? "direction-rtl" : ""}`}
          style={{ minHeight: layout.activeH }}
        >
          {/* col-8: title at bottom, images absolute */}
          <div
            className="col-span-10 relative flex flex-col justify-end"
            style={{ minHeight: layout.activeH }}
          >
            <div
              className="absolute bottom-0"
              style={{
                width: slidesW,
                height: layout.activeH,
                ...(isArabic ? { left: 0, right: "auto" } : { right: 0, left: "auto" }),
              }}
            >
              {desktopCards.map(({ member, isActive, w, h, left, zIndex }) => (
                <motion.div
                  key={member._id}
                  className="absolute bottom-0 rounded-2xl overflow-hidden cursor-pointer select-none"
                  animate={{ left, width: w, height: h, zIndex }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveIdx(members.findIndex((m) => m._id === member._id))}
                >
                  <Image
                    src={member.image} alt={member.name} fill loading="lazy" sizes="460px"
                    className={`object-cover object-top transition-[filter] duration-500 ${
                      isActive ? "saturate-100" : "saturate-0"
                    }`}
                  />
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, transparent, #42BADC)" }}
                    />
                  )}
                  {!isActive && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
                </motion.div>
              ))}
            </div>
            {/* Title pinned to bottom of col-8 */}
            <div className="absolute top-0 z-10 max-w-[55%]">
              <SectionTitle
                text={t.secondSection.title}
                className="text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111]"
              />
            </div>
          </div>

          {/* col-4: content panel */}
          <div className="col-span-3 flex flex-col">
            <ContentPanel {...sharedProps} />
          </div>
        </div>
      </div>
    </section>
  );
}