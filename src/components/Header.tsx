"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {Rubik} from "next/font/google"


const Rub = Rubik({
subsets: ["latin"],
weight: "500",
});

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  // Выводим инициалы пользователя, если он авторизован
  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email?.charAt(0).toUpperCase() || "";

  return (
    <header className="bg-[#181818] text-white relative z-30">
      <div className="container mx-auto max-w-[1180px] flex items-center justify-between p-4 h-[60px]">
        <Link href="/" className={`text-xl md:text-[34px] font-serif font-bold ${Rub.className}`}>
          KeepFitOnly
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/workouts" className="hover:underline duration-[0.7s]">
            Тренировки
          </Link>
          <Link href="/calendar" className="hover:underline duration-[0.7s]">
            Календарь
          </Link>
          <Link href="/blog" className="hover:underline duration-[0.7s]">
            Блог
          </Link>
          {/* {session ? (
            <Link href="/profile" className="flex  hover:underline duration-[0.7s]">
              Личный кабинет
              <img
                className="ml-2"
                width="28"
                height="28"
                src="https://img.icons8.com/parakeet-line/48/user.png"
                alt="user"
              />
            </Link>
          ) : (
            <>
              <Link href="/login" className="hover:underline duration-[0.7s]">
                Войти
              </Link>
              <Link href="/register" className="hover:underline duration-[0.7s]">
                Регистрация
              </Link>
            </>
          )} */}
        </nav>
        <div className="flex items-center gap-4">
          {/* Иконки соцсетей для десктопа */}
          <div className="hidden md:flex space-x-4">
            <a href="https://t.me/keepfitonly">
              <img
                width="35"
                height="35"
                src="https://img.icons8.com/color/48/telegram-app--v1.png"
                alt="telegram"
              />
            </a>
            <a href="https://www.instagram.com/keepfit_with_us/">
            <img width="35" height="35" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new"/>
            </a>
            <a href="https://www.youtube.com/@keepfitonly-with-us">
            <img width="35" height="35" src="https://img.icons8.com/fluency/48/youtube-play.png" alt="youtube-play"/>
            </a>
          </div>
          {/* Мобильное меню: инициалы + кнопка-бургер */}
          <div className="md:hidden flex items-center">
            {session && (
              <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                {userInitial}
              </div>
            )}
            <button onClick={() => setIsOpen(true)} className="focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню - полноэкранный оверлей */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Затемнение фона */}
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={() => setIsOpen(false)}
          ></div>
          {/* Меню с плавной анимацией */}
          <div className="relative bg-white rounded-lg mx-4 mt-20 p-8 animate-slideDown">
            {/* Кнопка закрытия */}
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="text-black focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-6 mt-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-800">
                Главная
              </Link>
              <Link href="/workouts" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-800">
                Тренировки
              </Link>
              <Link href="/calendar" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-800">
                Календарь
              </Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-800">
                Блог
              </Link>
              {/* {session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-semibold text-gray-800 flex flex-row items-center"
                  >
                    Личный кабинет
                    <img
                      className="ml-2"
                      width="30"
                      height="30"
                      src="https://img.icons8.com/puffy-filled/32/user.png"
                      alt="user"
                    />
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="text-2xl font-semibold text-gray-800 hover:underline"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-800">
                    Войти
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-800">
                    Регистрация
                  </Link>
                </>
              )} */}
            </nav>
            <div className="flex w-full my-auto justify-around mt-4">
            <a href="https://t.me/keepfitonly">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/color/48/telegram-app--v1.png"
                alt="telegram"
              />
            </a>
            <a href="https://www.instagram.com/keepfit_with_us/">
            <img width="50" height="50" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new"/>
            </a>
            <a href="https://www.youtube.com/@keepfitonly-with-us">
            <img width="50" height="50" src="https://img.icons8.com/fluency/48/youtube-play.png" alt="youtube-play"/>
            </a>
          </div>
          </div>
          
        </div>
      )}
    </header>
  );
}
