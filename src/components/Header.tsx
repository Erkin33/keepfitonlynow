"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Rubik } from "next/font/google";
import AudioPlayer from "./Audio";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Rub = Rubik({ subsets: ["latin"], weight: "500" });

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email?.charAt(0).toUpperCase() || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (href) =>
    `relative transition-all duration-300 px-2 py-1 rounded hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white ${
      pathname === href
        ? "text-pink-400 border-b-2 border-pink-400"
        : "text-white"
    }`;

  return (
    <header className={` top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? "bg-gradient-to-r from-pink-500 to-purple-600"
        : "bg-black/90 shadow-[0_8px_30px_rgba(255,0,255,0.3)] backdrop-blur-xl"
    }`}>
      <div className="h-[3px] bg-gradient-to-r from-pink-500 to-purple-600 w-0  top-0 left-0 z-[60] animate-progress" />

      <div className="container mx-auto max-w-[1180px] flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className={`text-3xl sm:text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wider drop-shadow-xl ${Rub.className}`}
        >
          KeepfitOnly
        </Link>

        <nav className="hidden md:flex space-x-8 items-center text-white font-semibold">
          <Link href="/workouts" className={navLinkClass("/workouts")}>Тренировки</Link>
          <Link href="/calendar" className={navLinkClass("/calendar")}>Календарь</Link>
          <Link href="/blog" className={navLinkClass("/blog")}>Блог</Link>
          <div className="animate-pulse-slow">
            <AudioPlayer />
          </div>
        </nav>

        <div className="hidden md:flex space-x-4">
          <a href="https://t.me/keepfitonly" className="hover:scale-125 transition-transform duration-300 text-[#00acee] text-2xl animate-icon-flicker"><FaTelegramPlane /></a>
          <a href="https://www.instagram.com/keepfit_with_us/" className="hover:scale-125 transition-transform duration-300 text-pink-500 text-2xl animate-icon-flicker"><FaInstagram /></a>
          <a href="https://www.youtube.com/@keepfitonly-with-us" className="hover:scale-125 transition-transform duration-300 text-red-500 text-2xl animate-icon-flicker"><FaYoutube /></a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {session && (
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold shadow-md">
              {userInitial}
            </div>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="focus:outline-none text-white transform hover:rotate-180 transition-transform duration-500"
          >
            <svg className="w-8 h-8 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 animate-fadeIn backdrop-blur-xl">
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-[#111] to-black opacity-90 border-4 border-pink-500 animate-border-flicker"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-black/90 shadow-[0_8px_30px_rgba(255,0,255,0.3)] backdrop-blur-xl backdrop-blur-xl text-white rounded-xl mx-4 mt-20 p-8 animate-slideDown shadow-2xl border border-white/10">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <svg className="w-6 h-6 hover:text-pink-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6 mt-4 items-center">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold hover:text-pink-400 transition">Главная</Link>
              <Link href="/workouts" onClick={() => setIsOpen(false)} className="text-2xl font-bold hover:text-purple-400 transition">Тренировки</Link>
              <Link href="/calendar" onClick={() => setIsOpen(false)} className="text-2xl font-bold hover:text-indigo-400 transition">Календарь</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="text-2xl font-bold hover:text-blue-400 transition">Блог</Link>
              <AudioPlayer />
            </nav>
            <div className="flex justify-center gap-6 mt-6">
              <a href="https://t.me/keepfitonly"><FaTelegramPlane className="text-3xl hover:text-[#00acee] transition animate-icon-flicker" /></a>
              <a href="https://www.instagram.com/keepfit_with_us/"><FaInstagram className="text-3xl hover:text-pink-400 transition animate-icon-flicker" /></a>
              <a href="https://www.youtube.com/@keepfitonly-with-us"><FaYoutube className="text-3xl hover:text-red-500 transition animate-icon-flicker" /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
