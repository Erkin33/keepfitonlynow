"use client";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Rubik } from 'next/font/google'
 
const geist = Rubik({
  subsets: ['latin'],
})
export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geist.className}`}>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>{/* Оборачиваем всё приложение */}
          <Header />
          <main className="flex-grow w-full mx-auto h-full" id="main">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
