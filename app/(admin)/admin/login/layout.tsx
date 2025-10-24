export const metadata = {
    title: "Beam | Backend Console",
    description: "Beam",
  };
  
  import "../../../globals.css";
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }