"use client"
import React, { useEffect } from "react";
import { Calendar } from "@heroui/calendar";
import { today, getLocalTimeZone, isWeekend, CalendarDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

export default function App() {
  const [date, setDate] = React.useState(today(getLocalTimeZone()));
  const { locale } = useLocale();
  const isInvalid = isWeekend(date, locale);

  // ✅ Сохраняем выбранную дату в localStorage при изменении
  useEffect(() => {
    if (!isInvalid) {
      const jsDate = new Date(date.year, date.month - 1, date.day);
      localStorage.setItem("selectedDate", jsDate.toISOString());
    }
  }, [date, isInvalid]);

  // ✅ Загружаем дату из localStorage при инициализации
  useEffect(() => {
    const saved = localStorage.getItem("selectedDate");
    if (saved) {
      const d = new Date(saved);
      setDate(new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate()));
    }
  }, []);

  return (
  <div className="min-h-screen bg-[#1e1e2f] flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-[#2c2c3e] rounded-2xl shadow-xl p-6 border border-[#00ffa3]/30 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#00ffa3] mb-4 text-center">Выберите дату</h2>

      <div className="w-full flex justify-center">
        <Calendar
          aria-label="Дата (недоступна в выходные)"
          errorMessage={isInvalid ? "Мы не работаем в выходные" : undefined}
          isInvalid={isInvalid}
          onChange={setDate}
          className="text-white bg-[#3a3a4f] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#00ffa3]"
        />
      </div>

      {isInvalid && (
        <p className="mt-3 text-sm text-red-400 text-center">Выбранные выходные недоступны</p>
      )}

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-300">Выбранная дата:</p>
        <p className="text-lg font-semibold text-[#00ffa3]">
          {new Date(date.year, date.month - 1, date.day).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>

        <button
          onClick={() => alert(`Дата подтверждена: ${date.day}.${date.month}.${date.year}`)}
          className="mt-4 bg-[#00ffa3] hover:bg-[#00cc85] text-black font-semibold py-2 px-6 rounded-lg transition"
        >
          Подтвердить дату
        </button>
      </div>
    </div>
  </div>
);
}
