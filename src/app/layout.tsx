import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Bebas_Neue } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["100","200","300","400","500","600","700","800","900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "OneShot",
  description: "Your Talent Deserves a Stage",
  icons : "/logos/logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${poppins.variable} ${bebasNeue.variable}`}>
        {children}
      </body>
    </html>
  );
}
