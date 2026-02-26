import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../../globals.css";
import NavBar from "@/app/components/Layout/NavBar";
import Footer from "@/app/components/Layout/Footer";
import { getFooter } from "@/lib/getFooter";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BEAM | Lighting The Way",
  description: "",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await getFooter();
  return (
    <html lang="ar" dir="rtl">
      <body className={`${dmSans.variable}  antialiased`}>
        <NavBar />
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
