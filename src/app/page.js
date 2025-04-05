"use client";
import { useState } from "react";

export default function HomePage() {
  // Состояние number определяет текущий выбранный номер
  const [number, setNumber] = useState(1);

  let info = "";
  let specialInfo = "";
  let MainInfo = "";
  let imageUrl = ""; // Путь к фоновому изображению
  let PeopleUrl = ""; // Путь к изображению людей
  let textColor = "#000000";
  let rightInfo = '';
  let buttonInfo = '';
  // Функция обновляет переменные в зависимости от выбранного номера
  function Content() {
    switch (number) {
      case 1: {
        info = "Basefit";
        specialInfo = "Новый";
        MainInfo = "базовый сбалансированный курс";
        imageUrl = "/Main/f1.webp";
        PeopleUrl = "/Main/first1.webp";
        textColor = '#000000';
        rightInfo ='Для тех, кому важен результат. Поможет улучшить форму, повысить выносливость и закрепить прогресс.';
        buttonInfo = 'Узнать подробнее';
        break;
      }
      case 2: {
        info = "Забота. Движение. Сила. CARE";
        specialInfo = "";
        MainInfo = "";
        imageUrl = "/Main/f2.webp";
        textColor = '#000000';
        PeopleUrl = "/Main/second2.webp";
        rightInfo ='Доверьтесь своему телу — и позвольте ему стать сильнее, грациознее, свободнее. Сделайте этот шаг к себе с любовью.';
        buttonInfo = 'Записаться на курс';
        break;
      }
      case 3: {
        info = "SuperHuman";
        specialInfo = "";
        MainInfo = "";
        imageUrl = "/Main/f3.webp";
        textColor = '#ffffff';
        PeopleUrl = "/Main/third3.webp";
        rightInfo ='Онлайн-фитнес курс с интенсивной нагрузкой. Каждый день новые тренировки для похудения и рельефа, советы по питанию и ментальному состоянию.';
        buttonInfo = 'Узнать подробнее';
        break;
      }
      case 4: {
        info = "Не знаете, что выбрать?";
        specialInfo = "";
        MainInfo = "";
        imageUrl = "/Main/f4.webp";
        textColor = '#000000';
        PeopleUrl = "/Main/fourth4.webp";
        rightInfo ='Пройдите короткий тест, чтобы подобрать подходящую программу тренировок и питания.';
        buttonInfo = 'Пройти тест';
        break;
      }
      case 5: {
        info = "Все наши курсы";
        specialInfo = "";
        MainInfo = "";
        imageUrl = "/Main/f5.webp";
        textColor = '#000000';
        PeopleUrl = "/Main/fivth5.webp";
        rightInfo ='Можно пройти из любой точки мира — нужны только кроссовки и доступ к интернету. Время и место тренировок вы выбираете сами.';
        buttonInfo = 'Узнать больше';
        break;
      }
      case 6: {
        info = "Возьмите от курсов максимум!";
        specialInfo = "";
        MainInfo = "";
        imageUrl = "/Main/f6.webp";
        textColor = '#000000';
        PeopleUrl = "/Main/sixth6.webp";
        rightInfo ='Комплексные курсы #sekta можно пройти при поддержке куратора. Общение в персональном чате, поддержка в трудную минуту и помощь в работе с питанием и тренировками.';
        buttonInfo = 'Выбрать курс с куратором';
        break;
      }
      case 7: {
        info = "HAVE a METAL × #SEKTA";
        specialInfo = "";
        MainInfo = "";
        imageUrl = "/Main/f7.webp";
        textColor = '#000000';
        PeopleUrl = "/Main/seventh7.webp";
        rightInfo ='Кольца и браслеты напомнят о важных целях, календарь поможет спланировать яркий год, а гирлянда украсит любимое место для тренировок.';
        buttonInfo = 'Смотреть коллекцию';
        break;
      }
      default: {
        info = "Basefit";
        specialInfo = "Новый";
        MainInfo = "базовый сбалансированный курс";
        imageUrl = "/Main/f1.webp";
        textColor = '#000000';
        PeopleUrl = "";
        break;
      }
    }
  }
  // Обновляем переменные согласно текущему значению number
  Content();

  return (
    // Добавляем key={number} чтобы при каждом изменении number элемент размонтировался и анимация запускалась заново
    <div
      key={number}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className="text-center w-full flex bg-cover justify-center items-center h-[683px] animate-[fadeMove_1s_ease-in-out]"
    >
      <div className="container min-[720px]:w-[80%] max-[768px]:flex-col h-full mx-auto flex flex-row items-center justify-between p-4 bg-cover">
        {/* Левая колонка с текстовым контентом и кнопками */}
        <div className="max-[1024px]:hidden w-[250px] max-[1400px]:w-[200px] flex flex-col items-center justify-center h-[90%]">
          <div className="max-w-[420px] w-full h-[50%]">
            <h2 style={{color: `${textColor}`}} className="max-[1100px]:text-[29px] w-full max-[1400px]:text-[40px] font-[600] text-[44px] leading-[58px] text-left">
              {info}
            </h2>
            <p className="text-start w-full font-[600] text-[14px]">
              <span className="bg-[#dd8553]">{specialInfo}</span> {MainInfo}
            </p>
          </div>
          {/* Кнопки переключения */}
          <div className="w-full flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <button
                key={index}
                onClick={() => setNumber(index)}
                className={`w-[24px] max-[1400px]:w-[18px] max-[1400px]:h-[18px] h-[24px] border border-black rounded-full ${
                  number === index ? "bg-black" : "bg-white"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Центральная колонка с изображением людей */}
        <div
          className="w-[75%] max-[768px]:mx-[auto] max-[768px]:w-full max-[850px]:h-[50%] max-[1100px]:h-[57%] max-[1300px]:w-[70%] max-[1200px]:h-[60%] max-[1300px]:h-[70%] h-[90%] bg-cover max-[1400px]:w-[900px] max-[1400px]:h-[80%] min-[1500px]:!w-[993px] min-[1500px]:h-[605px]"
          style={{
            backgroundImage: `url(${PeopleUrl})`,
          }}
        ></div>

        {/* Правая колонка с повтором текстового контента */}
        <div className="w-[380px] max-[1300px]:w-[250px] h-[50%] flex flex-col justify-center max-[850px]:space-around items-center">
          <div className="w-full max-[1024px]:h-[60%] h-[40%] flex flex-col justify-around items-start">
            <p style={{color: `${textColor}`}} className="max-[1300px]:text-[12px] text-start w-full font-[600] text-[14px]">
              {rightInfo}              
            </p>
            <button style={{color: `${textColor}`, borderColor: `${textColor}`}} className="max-[1300px]:text-[12px] min-w-[216px] border-[1px] border-[#181818] min-h-[50px] mt-[40px] max-[1024px]:mb-[40px]">
                {buttonInfo}
            </button>
          </div>
          {/* Кнопки переключения */}
          <div className="w-full min-[1024px]:hidden flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <button
                key={index}
                onClick={() => setNumber(index)}
                className={`w-[24px] max-[1400px]:w-[18px] max-[1400px]:h-[18px] h-[24px] border border-black rounded-full ${
                  number === index ? "bg-black" : "bg-white"
                }`}
              ></button>
            ))}
          </div>
          {/* <p className="">{number}/7</p> */}
        </div>
        
      </div>
    </div>
  );
}
