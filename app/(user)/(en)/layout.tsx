import type { Metadata } from "next";
import { DM_Sans, Almarai } from "next/font/google";
import "../../globals.css";
import "../../components/Common/custom-css.css";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("@/app/components/Layout/NavBar"), { ssr: true });
const Footer = dynamic(() => import("@/app/components/Layout/Footer"), { ssr: true });

import type { Viewport } from "next";
import ScrollToTop from "@/app/components/Common/ScrollToTop";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

const almarai = Almarai({
  variable: "--font-arabic",
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
  display: "swap",
  preload: true
});


export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: "BEAM | Lighting The Way",
  description: "",
};


// export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${almarai.variable} antialiased`}>
        <NavBar />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
