"use client"
import { Rubik } from "next/font/google"
import { useSession } from "next-auth/react"
import Link from "next/link"
import "./style.css"

const Rub = Rubik({
  subsets: ["latin"],
  weight: "500",
});
console.log(useSession)

export default function Blog_First() {

  const { data: session, status } = useSession();

  if (status === "loading") return <p>Загрузка...</p>;
  if (!session)
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="mb-4">
          Для просмотра тренировок необходимо войти в систему.
        </p>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Войти
        </Link>
      </div>
    );

  const blocks = [
    {
      id: 1,
      imgUrl: '',
    }
  ]

  return (
    <div className="max-w-[1250px] mx-auto my-[5em] px-4 md:px-8 lg:px-10 py-10">
      <div className="flex flex-col bg-[#dee0e3] rounded-[16px]">
        {/* Верхняя часть */}
        <div className="w-full rounded-t-[16px] bg-[#dee0e3] h-auto md:h-[150px] flex flex-col justify-around py-4 px-4">
          <div className="w-full md:w-[95%] mx-auto my-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-auto">
            <h2 className={`text-[26px] md:text-[34px] ${Rub.className} text-[#2F3437]`}>
              Читать
            </h2>
            <Link
              href={'#'}
              className={`text-[16px] md:text-[17px] rounded-[10px] hover:bg-[#00a879] hover:text-[#ffffff] duration-700 leading-[40px] py-[8px] px-[32px] border-[1.6px] border-[#00a879] ${Rub.className}`}
            >
              Написать блог
            </Link>
          </div>
        </div>

        {/* Контент */}
        <div className={`w-full px-4 sm:px-[5%] flex flex-col justify-between items-center bg-[#f3f4f5] rounded-[16px] py-6`}>
          <div className="w-full flex flex-wrap gap-2 mt-[15px] items-center text-sm text-[#747c81]">
            <Link href={'/'} className={`text-[14px] text-[#747c81]`}>Глвная /</Link>
            <Link href={'/blog'} className={`text-[14px] ${Rub.className} text-[#747c81]`}>Блоги /</Link>
            <Link href={'/blog/2'} className={`text-[14px] ${Rub.className} text-[#747c81]`}>Аниме</Link>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between mt-[25px] items-start md:items-center gap-4">
            <h2 className={`text-[24px] md:text-[34px] ${Rub.className} text-[#2F3437]`}>
              Лучшее за неделю
            </h2>

            <div className="flex flex-wrap gap-3 mt-2">
              {["Все", "Лучшее за неделю", "Победители косарей", "+5", "+100", "StopGame"].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-[14px] md:text-[16px] hover:bg-[#747c81] leading-[28px] flex justify-center items-center py-[6px] px-[21px] rounded-[8px] bg-[#ffffff] whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
