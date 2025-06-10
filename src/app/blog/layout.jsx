"use client";
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Rubik } from 'next/font/google'
import BlogPage from "../blog/page";
import WorkoutsPage from "../workouts/page";
const geist = Rubik({
  subsets: ['latin'],
})
export default function RootLayout({ children }) {
  return (
        <SessionProvider>{/* Оборачиваем всё приложение */}
          <main className="flex-grow w-full mx-auto h-full" id="main">{children}</main>
          <div className="mt-15">
            <h2 className="dark:text-[black] text-center text-[35px] font-bold">
            Посетите невероятные тренировки!
          </h2>
            <WorkoutsPage/>
          </div>
        </SessionProvider>
  );
}
