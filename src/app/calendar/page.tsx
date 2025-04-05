"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  // Обертка для setDate, чтобы соответствовать типу onChange
  const handleDateChange = (value, event) => {
    // Если value — массив (при выборе диапазона), возьмем первый элемент
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Календарь тренировок</h1>
      <Calendar onChange={handleDateChange} value={date} />
      <p className="mt-4">Выбрана дата: {date.toDateString()}</p>
    </div>
  );
}
