import type { Metadata } from "next";
import "../../../app/globals.css";

export const metadata: Metadata = {
  title: "Beam | Backend Console",
  description: "Beam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden overflow-y-hidden`}>{children}</body>
    </html>
  );
}