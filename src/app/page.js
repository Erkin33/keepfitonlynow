"use client";
import Plans from "../components/Plans";
import { useState } from "react";
import FloatingButton from "../components/Floating";
import Link from "next/link";

export default function HomePage() {
  const [number, setNumber] = useState(1);

  let info = "";
  let specialInfo = "";
  let MainInfo = "";
  let imageUrl = "";
  let PeopleUrl = "";
  let textColor = "#000000";
  let rightInfo = '';
  let buttonInfo = '';

  function Content() {
    switch (number) {
      case 1:
        info = "KeepFit";
        specialInfo = "Инновация";
        MainInfo = "Стартовый курс для достижения новых вершин";
        imageUrl = "/Main/f1.webp";
        PeopleUrl = "/Main/first1.webp";
        textColor = "#000000";
        rightInfo = "Программа, которая поднимет вашу форму на новый уровень. Персонализированный подход и проверенные методики.";
        buttonInfo = "Начать сейчас";
        break;
      case 2:
        info = "CARE";
        specialInfo = "Забота";
        MainInfo = "Программа заботы о теле и душе";
        imageUrl = "/Main/f2.webp";
        PeopleUrl = "/Main/second2.webp";
        textColor = "#000000";
        rightInfo = "Откройте для себя секреты гармонии и силы. Каждая тренировка – шаг к лучшей версии себя.";
        buttonInfo = "Присоединиться";
        break;
      case 3:
        info = "SuperHuman";
        specialInfo = "Эволюция";
        MainInfo = "Интенсивный курс для настоящих героев";
        imageUrl = "/Main/f3.webp";
        PeopleUrl = "/Main/third3.webp";
        textColor = "#ffffff";
        rightInfo = "Дневные тренировки, силовые нагрузки и советы от профи. Готовы стать суперчеловеком?";
        buttonInfo = "Преобразиться";
        break;
      case 4:
        info = "Не уверены?";
        specialInfo = "Экспертное решение";
        MainInfo = "Найдите свой идеальный курс";
        imageUrl = "/Main/f4.webp";
        PeopleUrl = "/Main/fivth5.webp";
        textColor = "#000000";
        rightInfo = "Пройдите наш интерактивный тест и получите рекомендации, которые изменят ваше представление о тренировках.";
        buttonInfo = "Пройти тест";
        break;
      case 5:
        info = "Все Курсы";
        specialInfo = "Коллекция";
        MainInfo = "Откройте для себя весь спектр возможностей";
        imageUrl = "/Main/f5.webp";
        PeopleUrl = "/Main/sixth6.webp";
        textColor = "#000000";
        rightInfo = "Погрузитесь в мир фитнеса с разнообразными программами. Выбирайте, экспериментируйте и достигайте большего.";
        buttonInfo = "Узнать больше";
        break;
      case 6:
        info = "Премиум Опыт";
        specialInfo = "Максимум возможностей";
        MainInfo = "Курсы с поддержкой персонального тренера";
        imageUrl = "/Main/f6.webp";
        PeopleUrl = "/Main/fourth4.webp";
        textColor = "#000000";
        rightInfo = "Получите индивидуальное сопровождение и максимальный эффект от тренировок. Ваш успех — наша миссия.";
        buttonInfo = "Записаться сейчас";
        break;
      case 7:
        info = "HAVE a METAL";
        specialInfo = "Эксклюзив";
        MainInfo = "Стильные аксессуары для спортсменов";
        imageUrl = "/Main/f7.webp";
        PeopleUrl = "/Main/seventh7.webp";
        textColor = "#000000";
        rightInfo = "Элегантные аксессуары, которые вдохновят на новые победы. Стиль и функциональность в каждом элементе.";
        buttonInfo = "Открыть коллекцию";
        break;
      default:
        info = "Basefit";
        specialInfo = "Новинка";
        MainInfo = "Оптимальный старт для вашего тела";
        imageUrl = "/Main/f1.webp";
        PeopleUrl = "";
        textColor = "#000000";
        break;
    }
  }

  Content();

  return (
    <div className="flex flex-col w-full">
      <div
        key={number}
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="text-center w-full flex bg-cover justify-center items-center h-[683px] animate-[fadeMove_1s_ease-in-out]"
      >
        <div className="container min-[720px]:w-[80%] max-[768px]:flex-col h-full mx-auto flex flex-row items-center justify-between p-4 bg-cover">
          <div className="max-[1024px]:hidden w-[250px] max-[1400px]:w-[200px] flex flex-col items-center justify-center h-[90%]">
            <div className="max-w-[420px] w-full h-[50%] flex flex-col justify-center">
              <h2 style={{ color: `${textColor}` }} className="dark:text-[black] max-[1100px]:text-[29px] w-full max-[1400px]:text-[40px] font-[600] text-[44px] leading-[58px] text-left">
                {info}
              </h2>
              <p style={{ color: `${textColor}` }} className="dark:text-[black] text-start w-full font-[600] text-[14px]">
                <span className="dark:text-[black] bg-[#dd8553]">{specialInfo}</span> {MainInfo}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <button
                  key={index}
                  onClick={() => setNumber(index)}
                  className={`dark:text-[black] w-[24px] max-[1400px]:w-[18px] max-[1400px]:h-[18px] h-[24px] border border-black rounded-full ${
                    number === index ? "bg-black" : "bg-white"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          <div
            className="w-[75%] max-[768px]:mx-[auto] max-[768px]:w-full max-[850px]:h-[50%] max-[1100px]:h-[57%] max-[1300px]:w-[70%] max-[1200px]:h-[60%] max-[1300px]:h-[70%] h-[90%] bg-cover max-[1400px]:w-[900px] max-[1400px]:h-[80%] min-[1500px]:!w-[993px] min-[1500px]:h-[605px]"
            style={{ backgroundImage: `url(${PeopleUrl})` }}
          ></div>

          <div className="w-[380px] max-[1300px]:w-[250px] h-[90%] flex flex-col justify-center max-[850px]:space-around items-center">
            <div className="w-full max-[1024px]:h-[60%] h-[40%] flex flex-col justify-around items-start">
              <p style={{ color: `${textColor}` }} className="dark:text-[black] max-[1300px]:text-[12px] text-start w-full font-[600] text-[14px]">
                {rightInfo}
              </p>
              <Link href={'/workouts'}>
                <button style={{ color: `${textColor}`, borderColor: `${textColor}` }} className="dark:text-[black] max-[1300px]:text-[12px] min-w-[216px] border-[1px] border-[#181818] min-h-[50px] mt-[40px] max-[1024px]:mb-[40px]">
                  {buttonInfo}
                </button>
              </Link>
            </div>
            <div className="w-full min-[1024px]:hidden flex justify-between items-center">
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <button
                  key={index}
                  onClick={() => setNumber(index)}
                  className={`dark:text-[black] w-[24px] max-[1400px]:w-[18px] max-[1400px]:h-[18px] h-[24px] border border-black rounded-full ${
                    number === index ? "bg-black" : "bg-white"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto md:h-[422px] flex mt-[90px] min-[768px]:mb-[90px]">
        <style jsx>{`
          @keyframes gradient-border {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        <div className="w-full max-w-[1180px] mx-auto px-4 py-16 flex flex-col gap-16">
          <h2 className="text-center text-4xl sm:text-5xl font-bold text-gray-900 dark:text-black tracking-tight">
            Наш подход
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Plans.map((plan) => (
              <div
                key={plan.id}
                className="relative group p-[3px] rounded-3xl bg-[length:200%_200%] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-[gradient-border_4s_ease_infinite] shadow-lg transition-transform duration-500 hover:scale-[1.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(270deg, #ec4899, #8b5cf6, #6366f1, #ec4899)",
                }}
              >
                <div className="bg-white dark:bg-gray-100 rounded-3xl p-6 h-full flex flex-col justify-between shadow-inner">
                  <div className="flex items-center gap-4">
                    <img
                      src={plan.img}
                      alt={plan.title}
                      className="w-16 h-16 object-contain drop-shadow-md"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                      {plan.title}
                    </h3>
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-gray-700 dark:text-black">
                    {plan.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
