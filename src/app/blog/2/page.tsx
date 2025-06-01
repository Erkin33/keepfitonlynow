"use client"
import { Rubik } from "next/font/google"
import { useSession } from "next-auth/react"
import Link from "next/link"
import "./style.css"

const Rub = Rubik({
  subsets: ["latin"],
  weight: "500",
});

export default function Blog_First() {

  const aniInfo = [
    {
       img: '/Anime/First.webp',
       color:'#7747ff',
       hero: 'https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/external-cup-award-vitaliy-gorbachev-blue-vitaly-gorbachev-9.png',
       number: 41,
       name:'Блог',
       account:'/BLOG/Anime/Avatar/Avatar1.jpg',
       accountName:'ScorpionX321',
       title:'Голая грудь как старт карьеры — мангаки, которые начали с материалов для...',
       date:'13 мая',
       comments:'16', 
    },
    {
       img: '/Anime/Second.jpg',
       hero: '',
       number: 24,
       name:'Блог',
       account:'/BLOG/Anime/Avatar/Avatar1.jpg',
       accountName:'ScorpionX321',
       title:'Смерть, камера, баги — поговорим про малоизвестные манги.',
       date:'12 мая',
       comments:'12', 
    },
    {
       img: '/Anime/Third.jpg',
       hero: '',
       number: 4,
       name:'Блог',
       account:'/BLOG/Anime/Avatar/Avatar3.png',
       accountName:'GvozD',
       title:'Потеря человечности: Claymore и игры о внутренних чудовищах',
       date:'3 мая',
       comments:'0', 
    },
    {
       img: '/Anime/Fourth.jpg',
       hero: '',
       number: 52,
       name:'Блог',
       account:'/BLOG/Anime/Avatar/Avatar4.webp',
       accountName:'JasonTheBlend',
       title:'Обзор китайской Persona 5: The Phantom X',
       date:'10 апреля',
       comments:'17', 
    },
    {
       img: '/Anime/Fivth.jpg',
       hero: '',
       number: 10,
       name:'Gamedev',
       account:'/BLOG/Anime/Avatar/Avatar5.jpg',
       accountName:'Alkinoy',
       title:'Романтические истории уже никому не нужны, да?',
       date:'6 апреля',
       comments:'41', 
    },
    {
       img: '/Anime/Sixth.jpg',
       hero: '',
       number: 14,
       name:'Блог',
       account:'/BLOG/Anime/Avatar/Avatar6.jpg',
       accountName:'StanleyClimbfal',
       title:'История героя: Little Nemo. Часть вторая',
       date:'21 марта',
       comments:'1', 
    },
  ];

  const { data: session, status } = useSession();

  return (
    <div className="max-w-[1450px] mx-auto my-[2em] px-2 md:px-8 lg:px-10 py-6">
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
            <Link href={'/'} className={`text-[14px] text-[#747c81]`}>Главная /</Link>
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
                  className="text-[14px] md:text-[16px] hover:bg-[#747c81] duration-700 hover:text-[#ffffff] leading-[28px] flex justify-center items-center py-[6px] px-[21px] rounded-[8px] bg-[#ffffff] whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Карточки */}
          <div className="w-full flex justify-center gap-4 flex-wrap mt-[3em]">
            {aniInfo.map((animes, index) => (
              <div
                key={index}
                className="w-full sm:w-[48%] lg:w-[386.66px] overflow-hidden bg-[#fff] h-[409.75px] flex flex-col rounded-[8px] my-[2%]"
              >
                {/* Картинка */}
                <div style={{
                  backgroundImage: `url(${animes.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} className={`hover:scale-[1.1] cursor-pointer duration-[0.7s] w-full h-[225.34px] rounded-t-[8px] flex items-start`}>
                  <div className="w-[95%] mx-auto h-[32px] mt-[2%] rounded-[4px] flex justify-between items-center">
                    <div className="w-[38px] h-[32px] rounded-[4px] flex justify-center items-center" style={{ backgroundColor: `${animes.color}` }}>
                      <div className="w-[80%] h-[80%]" style={{ backgroundImage: `url(${animes.hero})`, backgroundSize: 'cover' }} />
                    </div>
                    <div className="w-[49.41px] h-[32px] rounded-[4px] flex justify-center items-center bg-[#00a879]">
                      <p className="text-[18px] text-[#fff] font-[500]">
                        +{animes.number}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Инфо */}
                <div className="w-[90%] h-[42.8px] flex justify-between px-[12px] py-[8px] mx-auto">
                  <div className="flex items-center gap-2">
                    <img width="25" height="18" src="https://img.icons8.com/pastel-glyph/128/document--v1.png" alt="document" />
                    <p>{animes.name}</p>
                  </div>
                  <img className="cursor-pointer" width="22" height="22" src="https://img.icons8.com/windows/32/bookmark-ribbon--v1.png" alt="bookmark" />
                </div>

                <div className="border-b-[1px] border-[#e4e8eb]" />

                <div className="w-[90%] h-auto flex flex-col justify-between px-[12px] py-[8px] mx-auto">
                  <div className="flex items-center gap-2">
                    <img width="25" height="18" className="rounded-[50%]" src={animes.account} alt="avatar" />
                    <p>{animes.accountName}</p>
                  </div>

                  <div className="mt-[5px]">
                    <h3 className="text-[#41474a] text-[16px] font-[500]">{animes.title}</h3>
                  </div>
                </div>

                <div className="w-[90%] mt-[20px] h-[30px] flex flex-row items-center justify-between px-[12px] mx-auto">
                  <p>{animes.date}</p>
                  <div className="w-[30%] flex justify-between items-center">
                    <img width="25" height="25" src="https://img.icons8.com/ios/50/error--v1.png" alt="error" />
                    <div className="w-[60%] hover:text-[red] cursor-pointer flex justify-around">
                      <img width="25" height="20" src="https://img.icons8.com/ios/50/speech-bubble-with-dots--v1.png" alt="comments" />
                      <p>{animes.comments}</p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
