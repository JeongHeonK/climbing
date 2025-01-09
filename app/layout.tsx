import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import ContextProvider from "./context/ContextProvider";
import Authentication from "./components/Authentication/Authentication";
import Header from "./(home)/components/Header";

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
  const session = (await cookies()).get("session");
  const isLogin = session !== undefined;

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider initialUserState={isLogin}>
          <Authentication />
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
