import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "BEAM | Lighting The Way",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable}  antialiased`}
      >
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
