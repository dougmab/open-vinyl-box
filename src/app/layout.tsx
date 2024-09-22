import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import HeaderTop from "@/components/HeaderTop";
import HeaderMain from "@/components/HeaderMain";
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/Footer";
import {AuthProvider} from "@/contexts/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Open Vinyl Box",
  description: "A Modern eCommerce Platform for Vinyl Records.",
  keywords: ["vinyl", "records", "music", "ecommerce", "platform"],
  authors: [{name: "Douglas Brum"}],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-[36px] lg:pb-0` /* padding for MobileNavbar */}
      >
      <HeaderTop/>
      <HeaderMain/>
      <MobileNavbar/>
      {children}
      <Footer/>
      </body>
      </html>
    </AuthProvider>
  );
}
