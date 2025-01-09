import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PopupProvider from "./context/PopupContext";
import Authentication from "./components/Authentication/Authentication";
import Header from "./(home)/components/Header";
import { SpaceDiv } from "./components/common/SpaceDiv";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Climbing",
  description: "join Climbing group & have fun",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PopupProvider>
          <Authentication />
          <Header />
          <SpaceDiv vertical={24} />
          {children}
        </PopupProvider>
      </body>
    </html>
  );
}
