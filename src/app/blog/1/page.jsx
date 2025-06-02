"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function Blog_First() {
  const { data: session, status } = useSession();

  return (
    <div className="max-w-[1250px] mx-auto px-4 py-16 bg-gradient-to-b from-[#1c1c1c] to-[#0c0c0c] text-white rounded-lg shadow-2xl">
      <div className="flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent drop-shadow-md">
            Сет Роллинс, Пол Хейман и Брон Брейкер появятся на Raw
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            Назначен женский матч и многое другое
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[85%] mx-auto overflow-hidden rounded-xl border-4 border-[#d7d7d7] shadow-xl"
        >
          <img
            src="/BLOG/WWE/RAW.webp"
            alt="Raw"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-[85%] mx-auto text-[17px] leading-8 text-gray-100"
        >
          <p>
            Адам Пирс в соцсетях сделал несколько анонсов к грядущему эфиру Raw...
          </p>

          <div className="mt-12">
            <h3 className="text-[26px] font-bold mb-6 text-pink-400">
              Читайте также на PWNews:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  link: "https://pwnews.net/news/2025-05-10-32728",
                  img: "/BLOG/WWE/WWE!.webp",
                  text: "Какие телевизионные рейтинги собрал Collision...",
                },
                {
                  link: "https://pwnews.net/news/2025-05-11-32734",
                  img: "/BLOG/WWE/WWE2.webp",
                  text: "Фанат на SmackDown бросил бутылку в Джона Сину...",
                },
                {
                  link: "https://pwnews.net/news/2025-05-11-32730",
                  img: "/BLOG/WWE/WWE3.webp",
                  text: "Пять событий, которые должны случиться на ...",
                },
                {
                  link: "https://pwnews.net/news/2025-05-11-32733",
                  img: "/BLOG/WWE/WWE4.webp",
                  text: "Результаты WWE Backlash 2025",
                },
              ].map(({ link, img, text }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 bg-[#1a1a1a] p-3 rounded-lg hover:bg-[#272727] transition-all duration-300"
                >
                  <Link href={link} target="_blank">
                    <img
                      src={img}
                      alt="news"
                      className="rounded-lg shadow-md object-cover h-[140px] w-full"
                    />
                    <p className="mt-2 text-sm text-center text-gray-300 hover:text-white transition duration-200">
                      {text}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
