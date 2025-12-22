// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";
// interface Props {
//   standard?: boolean;
// }

// const Breadcrumb = ({ standard = false }: Props) => {
//   const pathname = usePathname();

//   const pathParts = pathname.split("/").filter((part) => part);

//   const buildHref = (index: number) =>
//     "/" + pathParts.slice(0, index + 1).join("/");

//   const truncateLabel = (label: string) =>
//     label.length > 8 ? label.slice(0, 8) + "…" : label;

//   return (
//     <ul className="flex items-center gap-2 text-sm font-light capitalize text-[#D2D2D2]">
//       <motion.li
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//         className="flex items-center gap-2 text-15 leading-[1.2] font-light group"
//       >
//         <Link href="/" className="hover:underline">
//           Home
//         </Link>
//         {pathParts.length > 0 && (
//           <span className="group-last:hidden">
//             <Image
//               src="/images/about-us/arrow-right.svg"
//               alt="arrow-right"
//               width={15}
//               height={14}
//             />
//           </span>
//         )}
//       </motion.li>

//       {pathParts.map((part, index) => {
//         const isLast = index === pathParts.length - 1;
//         const fullLabel = decodeURIComponent(part.replace(/-/g, " "));
//         const truncatedLabel = truncateLabel(fullLabel);
//         const href = buildHref(index);

//         return (
//           <motion.li
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="flex items-center gap-2 text-15 leading-[1.2] font-light group"
//           >
//             {!isLast ? (
//               <Link href={href} className="hover:underline">
//                 {/* Show truncated on mobile, full on larger screens */}
//                 <span className="block sm:hidden">{truncatedLabel}</span>
//                 <span className="hidden sm:block">{fullLabel}</span>
//               </Link>
//             ) : (
//               <span>
//                 <span className="block sm:hidden">{truncatedLabel}</span>
//                 <span className="hidden sm:block">{fullLabel}</span>
//               </span>
//             )}

//             {!isLast && (
//               <span className="group-last:hidden">
//                 <Image
//                   src="/assets/about-us/arrow-right.svg"
//                   alt="arrow-right"
//                   width={15}
//                   height={14}
//                 />
//               </span>
//             )}
//           </motion.li>
//         );
//       })}
//     </ul>
//   );
// };

// export default Breadcrumb;

// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const Breadcrump = () => {
//   const pathname = usePathname();
//   const pathParts = pathname.split("/").filter((part) => part);

//   const buildHref = (index: number) =>
//     "/" + pathParts.slice(0, index + 1).join("/");

//   const truncateLabel = (label: string) =>
//     label.length > 8 ? label.slice(0, 8) + "…" : label;

//   return (
//     <ul className="flex items-center gap-[4px] text-sm font-light capitalize text-[#D2D2D2]">
//       <motion.li
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//         className="flex items-center gap-[4px] text-15 leading-[1.2] font-light group"
//       >
//         <Link href="/" className="hover:underline">
//           Home
//         </Link>
//         {pathParts.length > 0 && (
//           <span>
//             <Image
//               src="/images/about-us/arrow-right.svg"
//               alt="arrow-right"
//               width={18}
//               height={18}
//             />
//           </span>
//         )}
//       </motion.li>

//       {pathParts.map((part, index) => {
//         const isLast = index === pathParts.length - 1;
//         const fullLabel = decodeURIComponent(part.replace(/-/g, " "));
//         const truncatedLabel = truncateLabel(fullLabel);
//         const href = buildHref(index);

//         return (
//           <motion.li
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="flex items-center gap-2 text-15 leading-[1.2] font-light group"
//           >
//             {!isLast ? (
//               <Link href={href} className="hover:underline">
//                 <span className="block sm:hidden">{truncatedLabel}</span>
//                 <span className="hidden sm:block">{fullLabel}</span>
//               </Link>
//             ) : (
//               <span>
//                 <span className="block sm:hidden">{truncatedLabel}</span>
//                 <span className="hidden sm:block">{fullLabel}</span>
//               </span>
//             )}

//             {!isLast && (
//               <span>
//                 <Image
//                   src="/images/about-us/arrow-right.svg"
//                   alt="arrow-right"
//                   width={18}
//                   height={18}
//                 />
//               </span>
//             )}
//           </motion.li>
//         );
//       })}
//     </ul>
//   );
// };

// export default Breadcrump;

// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

// const Breadcrumb = () => {
//     const isArabic = useIsPreferredLanguageArabic();
//     const pathname = usePathname();
//     const pathParts = pathname.split("/").filter(Boolean);

//     const buildHref = (index: number) => "/" + pathParts.slice(0, index + 1).join("/");

//     const truncateLabel = (label: string) => (label.length > 8 ? label.slice(0, 8) + "…" : label);

//     // 🧩 Helper to prettify the label
//     const formatLabel = (label: string) => {
//         // Replace hyphens with spaces and capitalize
//         let formatted = decodeURIComponent(label.replace(/-/g, " "));
//         formatted = formatted.replace(/\b(\w)/g, (c) => c.toUpperCase());

//         // If label ends with "s Message" → convert to "'s Message"
//         formatted = formatted.replace(/(\w+)s Message$/i, (_, word) => `${word}'s Message`);

//         return formatted;
//     };

//     return (
//         <ul className="flex items-center gap-[4px] text-sm font-light capitalize text-[#D2D2D2]">
//             {/* Home link */}
//             <motion.li
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="flex items-center gap-[4px] text-15 leading-[1.2] font-light group"
//             >
//                 <Link href="/" className="hover:underline">
//                     Home
//                 </Link>
//                 {pathParts.length > 0 && (
//                     <span>
//                         <Image
//                             src="/images/about-us/arrow-right.svg"
//                             alt="arrow-right"
//                             width={18}
//                             height={18}
//                             className={`${isArabic ? "rotate-180" : ""}`}
//                         />
//                     </span>
//                 )}
//             </motion.li>

//             {/* Dynamic parts */}
//             {pathParts.map((part, index) => {
//                 const isLast = index === pathParts.length - 1;
//                 const fullLabel = formatLabel(part);
//                 const truncatedLabel = truncateLabel(fullLabel);
//                 let href = buildHref(index);
//                 if (href === "/about-us") {
//                     href = "/about-us/our-story";
//                 }
//                 if (href === "/news-&-media") {
//                     href = "/news-&-media/blog";
//                 }

//                 return (
//                     <motion.li
//                         key={index}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.4, duration: 0.6 }}
//                         className="flex items-center gap-2 text-15 leading-[1.2] font-light group"
//                     >
//                         {!isLast ? (
//                             <Link href={href} className="hover:underline">
//                                 <span className="block sm:hidden">{truncatedLabel}</span>
//                                 <span className="hidden sm:block">{fullLabel}</span>
//                             </Link>
//                         ) : (
//                             <span>
//                                 <span className="block sm:hidden">{truncatedLabel}</span>
//                                 <span className="hidden sm:block">{fullLabel}</span>
//                             </span>
//                         )}

//                         {!isLast && (
//                             <span>
//                                 <Image
//                                     src="/images/about-us/arrow-right.svg"
//                                     alt="arrow-right"
//                                     width={18}
//                                     height={18}
//                                     className={`${isArabic ? "rotate-180" : ""}`}
//                                 />
//                             </span>
//                         )}
//                     </motion.li>
//                 );
//             })}
//         </ul>
//     );
// };

// export default Breadcrumb;

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";
import { mainMenuItems, filterMenuItems } from "@/app/components/Layout/menuItems";

type MenuItem = {
    name: string;
    name_ar?: string;
    href?: string;
    submenu?: MenuItem[];
};

type SpecialLabels = Record<string, { en: string; ar: string }>;

const Breadcrumb: React.FC = () => {
    const isArabic = useIsPreferredLanguageArabic();
    let pathname = usePathname().replace(/\/$/, "");

    pathname = pathname.replace(/^\/ar/, "");

    const segments = pathname.split("/").filter(Boolean);

    // ⭐ Parent menu segments that should never be links
    const NON_CLICKABLE_PARENTS = ["about-us", "beam-schools", "news-and-media"];

    const specialLabels: SpecialLabels = {
        "about-us": { en: "About Beam", ar: "تعرف على بيم" },
        "news-and-media": { en: "News & Media", ar: "الأخبار والمواد الإعلامية" },
    };

    const normalizeSegment = (segment: string) => segment.toLowerCase().replace(/ /g, "-").replace(/&/g, "and");

    const normalizeHref = (href: string) => href.toLowerCase().replace(/ /g, "-").replace(/&/g, "and").replace(/\/$/, "");

    const flattenMenuItems = (items: MenuItem[]) => {
        const flat: Record<string, { en: string; ar: string }> = {};
        items.forEach((item) => {
            if (item.href && item.href !== "#") {
                flat[normalizeHref(item.href)] = {
                    en: item.name,
                    ar: item.name_ar || item.name,
                };
            }
            item.submenu?.forEach((sub) => {
                if (sub.href && sub.href !== "#") {
                    flat[normalizeHref(sub.href)] = {
                        en: sub.name,
                        ar: sub.name_ar || sub.name,
                    };
                }
            });
        });
        return flat;
    };

    const pathMap = flattenMenuItems([...mainMenuItems, ...filterMenuItems]);

    const truncateLabel = (label: string) => (label.length > 12 ? label.slice(0, 12) + "…" : label);

    let accumulatedPath = "";

    return (
        <ul className="flex items-center gap-2 text-sm font-light text-[#D2D2D2]">
            {/* Home */}
            <li className="flex items-center gap-1">
                <Link href="/" className="hover:underline">
                    {isArabic ? "الرئيسية" : "Home"}
                </Link>

                {segments.length > 0 && (
                    <Image
                        src="/images/about-us/arrow-right.svg"
                        alt="arrow"
                        width={18}
                        height={18}
                        className={isArabic ? "rotate-180" : ""}
                    />
                )}
            </li>

            {segments.map((segment, idx) => {
                const normalized = normalizeSegment(segment);
                const key = normalized;

                const matched = Object.entries(pathMap).find(([href]) => href.endsWith(normalized));

                const label =
                    specialLabels[key]?.[isArabic ? "ar" : "en"] || matched?.[1]?.[isArabic ? "ar" : "en"] || segment;

                accumulatedPath += "/" + normalized;

                const isLast = idx === segments.length - 1;
                const isNonClickableParent = NON_CLICKABLE_PARENTS.includes(normalized);

                return (
                    <li
                        key={idx}
                        className={`flex items-center gap-1 ${isArabic ? "flex-row-reverse" : "flex-row"}`} // ← FIX: direction controlled here
                    >
                        {/* ARROW for Arabic (arrow BEFORE text) */}
                        {!isLast && isArabic && (
                            <Image
                                src="/images/about-us/arrow-right.svg"
                                alt="arrow"
                                width={18}
                                height={18}
                                className="rotate-180"
                            />
                        )}

                        {/* LABEL OR LINK */}
                        {!isLast ? (
                            isNonClickableParent ? (
                                <span className="cursor-default">
                                    <span className="block sm:hidden">{truncateLabel(label)}</span>
                                    <span className="hidden sm:block">{label}</span>
                                </span>
                            ) : (
                                <Link href={accumulatedPath} className="hover:underline">
                                    <span className="block sm:hidden">{truncateLabel(label)}</span>
                                    <span className="hidden sm:block">{label}</span>
                                </Link>
                            )
                        ) : (
                            <span>
                                <span className="block sm:hidden">{truncateLabel(label)}</span>
                                <span className="hidden sm:block">{label}</span>
                            </span>
                        )}

                        {/* ARROW for English (arrow AFTER text) */}
                        {!isLast && !isArabic && (
                            <Image src="/images/about-us/arrow-right.svg" alt="arrow" width={18} height={18} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default Breadcrumb;
