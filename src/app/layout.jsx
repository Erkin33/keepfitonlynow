"use client";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>{/* Оборачиваем всё приложение */}
          <Header />
          <main className="flex-grow w-full mx-auto">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
