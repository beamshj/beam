// "use client";

// import Link from "next/link";
// import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

// interface LangLinkProps {
//   href: string;
//   children: React.ReactNode;
//   className?: string;
// }

// export default function LangLink({ href, children, className }: LangLinkProps) {
//   const isArabic = useIsPreferredLanguageArabic();

//   // 1️⃣ If external URL → do NOT modify
//   if (href.startsWith("http")) {
//     return (
//       <Link href={href} className={className}>
//         {children}
//       </Link>
//     );
//   }

//   // 2️⃣ Normalize root path
//   let finalHref = href.startsWith("/") ? href : `/${href}`;

//   // 3️⃣ If ENGLISH mode → ensure link stays EN
//   if (!isArabic) {
//     // If link already has "/ar", strip it
//     if (finalHref.startsWith("/ar/")) finalHref = finalHref.replace("/ar", "");
//     return (
//       <Link href={finalHref} className={className}>
//         {children}
//       </Link>
//     );
//   }

//   // 4️⃣ If ARABIC mode → ensure link keeps "/ar"
//   if (isArabic) {
//     if (!finalHref.startsWith("/ar")) {
//       finalHref = "/ar" + finalHref;
//     }
//   }

//   return (
//     <Link href={finalHref} className={className}>
//       {children}
//     </Link>
//   );
// }


"use client";

import Link, { LinkProps } from "next/link";
import useIsPreferredLanguageArabic from "@/lib/getPreferredLanguage";

interface LangLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget; // <-- allow target like "_blank"
  rel?: string; // optional, usually needed with target="_blank"
}

export default function LangLink({
  href,
  children,
  className,
  target,
  rel,
  ...rest
}: LangLinkProps) {
  const isArabic = useIsPreferredLanguageArabic();

  // 1️⃣ If external URL → do NOT modify
  if (href.startsWith("http")) {
    return (
      <Link href={href} className={className} target={target} rel={rel} {...rest}>
        {children}
      </Link>
    );
  }

  // 2️⃣ Normalize root path
  let finalHref = href.startsWith("/") ? href : `/${href}`;

  // 3️⃣ If ENGLISH mode → ensure link stays EN
  if (!isArabic) {
    if (finalHref.startsWith("/ar/")) finalHref = finalHref.replace("/ar", "");
  }

  // 4️⃣ If ARABIC mode → ensure link keeps "/ar"
  if (isArabic) {
    if (!finalHref.startsWith("/ar")) {
      finalHref = "/ar" + finalHref;
    }
  }

  return (
    <Link href={finalHref} className={className} target={target} rel={rel} {...rest}>
      {children}
    </Link>
  );
}
