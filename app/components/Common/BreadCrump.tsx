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

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Breadcrump = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);

  const buildHref = (index: number) =>
    "/" + pathParts.slice(0, index + 1).join("/");

  const truncateLabel = (label: string) =>
    label.length > 8 ? label.slice(0, 8) + "…" : label;

  return (
    <ul className="flex items-center gap-[4px] text-sm font-light capitalize text-[#D2D2D2]">
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-[4px] text-15 leading-[1.2] font-light group"
      >
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {pathParts.length > 0 && (
          <span>
            <Image
              src="/images/about-us/arrow-right.svg"
              
              alt="arrow-right"
              width={18}
              height={18}
            />
          </span>
        )}
      </motion.li>

      {pathParts.map((part, index) => {
        const isLast = index === pathParts.length - 1;
        const fullLabel = decodeURIComponent(part.replace(/-/g, " "));
        const truncatedLabel = truncateLabel(fullLabel);
        const href = buildHref(index);

        return (
          <motion.li
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-2 text-15 leading-[1.2] font-light group"
          >
            {!isLast ? (
              <Link href={href} className="hover:underline">
                <span className="block sm:hidden">{truncatedLabel}</span>
                <span className="hidden sm:block">{fullLabel}</span>
              </Link>
            ) : (
              <span>
                <span className="block sm:hidden">{truncatedLabel}</span>
                <span className="hidden sm:block">{fullLabel}</span>
              </span>
            )}

            {!isLast && (
              <span>
                <Image
                  src="/images/about-us/arrow-right.svg"
                  alt="arrow-right"
                  width={18}
                  height={18}
                />
              </span>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default Breadcrump;
