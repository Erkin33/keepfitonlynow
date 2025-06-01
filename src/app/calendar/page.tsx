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
  //

  else return (
    <div className="w-full ">
      <div className="w-[300px] h-full  mx-auto my-auto">
      <Calendar
      aria-label="Date (Invalid on weekends)"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
      isInvalid={isInvalid}
      value={date}
      onChange={setDate}
      className="dark:text-[black] text-[black] cursor-pointer"
    />
    </div>
    </div>
    
  );
}

