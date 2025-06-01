"use client"

import Link from "next/link"
import { useSession } from "next-auth/react";
export default function Blog_First() {
    const { data: session, status } = useSession();
    
      //
    return (
        <div className="max-w-[1250px] mx-auto bg-[#120c0c] px-4 py-10">
            <div className="flex flex-col gap-6">
                <div className="border-t border-gray-700 w-full"></div>

                <h1 className="dark:text-[black] text-center text-white text-2xl md:text-3xl font-semibold">
                    Сет Роллинс, Пол Хейман и Брон Брейкер появятся на Raw; Назначен женский матч и другое
                </h1>

                <div className="w-full max-w-[80%] mx-auto rounded-md overflow-hidden border-[5px] border-[#d7d7d7]">
                    <img src="/BLOG/WWE/RAW.webp" alt="Raw" className="w-full h-auto object-cover" />
                </div>

                <div className="w-full max-w-[80%] mx-auto text-white text-[17px] leading-[2em]">
                    <p className="dark:text-[black]">
                        Адам Пирс в соцсетях сделал несколько анонсов к грядущему эфиру Raw. Сет Роллинс, Пол Хейман и Брон Брейкер появятся на шоу, Бекки Линч объяснит причины предательства Лайры Валькирии, Пэт Макафи прокомментирует нападение Гюнтера, а Риа Рипли сразится с Роксанн Перес. Адам Прис добавил, что он пропустит Raw в Канзас-Сити, а Ник Алдис подменит его. • Сет Роллинс, Пол Хейман и Брон Брейкер появятся на Raw • Бекки Линч объяснит причины предательства Лайры Валькирии • Пэт Макафи прокомментирует нападение Гюнтера • Риа Рипли пр. Роксанн Перес
                    </p>

                    <div className="mt-10">
                        <h3 className="dark:text-[black] text-[26px] font-semibold mb-6">
                            Читайте также на PWNews:
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col items-center text-white text-sm">
                                <Link href={'https://pwnews.net/news/2025-05-10-32728'}>
                                    <img src="/BLOG/WWE/WWE!.webp" alt="news" className="rounded-lg hover:brightness-110 transition" />
                                    <p className="dark:text-[black] mt-2 text-center">Какие телевизионные рейтинги собрал Collision в непривычный ...</p>
                                </Link>
                            </div>

                            <div className="flex flex-col items-center text-white text-sm">
                                <Link href={'https://pwnews.net/news/2025-05-11-32734'}>
                                    <img src="/BLOG/WWE/WWE2.webp" alt="news" className="rounded-lg hover:brightness-110 transition" />
                                    <p className="dark:text-[black] mt-2 text-center">Фанат на SmackDown бросил бутылку в Джона Сину; Заметки по б...</p>
                                </Link>
                            </div>

                            <div className="flex flex-col items-center text-white text-sm">
                                <Link href={'https://pwnews.net/news/2025-05-11-32730'}>
                                    <img src="/BLOG/WWE/WWE3.webp" alt="news" className="rounded-lg hover:brightness-110 transition" />
                                    <p className="dark:text-[black] mt-2 text-center">Пять событий, которые по мнению фанатов должны случиться на ...</p>
                                </Link>
                            </div>

                            <div className="flex flex-col items-center text-white text-sm">
                                <Link href={'https://pwnews.net/news/2025-05-11-32733'}>
                                    <img src="/BLOG/WWE/WWE4.webp" alt="news" className="rounded-lg hover:brightness-110 transition" />
                                    <p className="dark:text-[black] mt-2 text-center">Результаты WWE Backlash 2025</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
