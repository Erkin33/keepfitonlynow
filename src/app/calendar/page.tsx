"use client"
import React from "react";
import { Calendar } from "@heroui/calendar";
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function App() {
  let [date, setDate] = React.useState(today(getLocalTimeZone()));
  let {locale} = useLocale();
  let isInvalid = isWeekend(date, locale);

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
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Войти
        </Link>
      </div>
    );

  else return (
    <div className="w-full ">
      <div className="w-[300px] h-full  mx-auto my-auto">
      <Calendar
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
      className="cursor-pointer"
    />
    </div>
    </div>
    
  );
}

