// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "../../../globals.css";
// import NavBar from "@/app/components/Layout/NavBar";
// import Footer from "@/app/components/Layout/Footer";

// const dmSans = DM_Sans({
//   variable: "--font-dm-sans",
//   subsets: ["latin"],
// });



// export const metadata: Metadata = {
//   title: "BEAM | Lighting The Way",
//   description: "",
// };

// export const dynamic = "force-dynamic";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="ar" dir="rtl">
//       <body className={`${dmSans.variable}  antialiased`}>
//         <NavBar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import { DM_Sans, Almarai } from "next/font/google";
import "../../../globals.css";
import NavBar from "@/app/components/Layout/NavBar";
import Footer from "@/app/components/Layout/Footer";

// English font
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

// Arabic font
const almarai = Almarai({
  variable: "--font-arabic",
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "BEAM | Lighting The Way",
  description: "",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${dmSans.variable} ${almarai.variable} antialiased`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
