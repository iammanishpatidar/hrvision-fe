'use client';

import { useEffect, useState } from 'react';
import EventListSidesheet from './EventListSidesheet';
import { format, startOfMonth, getDaysInMonth, getDay, subMonths, addMonths } from 'date-fns';
import { Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { MoveLeft, MoveRight } from 'lucide-react';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Event = {
  type: 'Birthday' | 'On Leave' | 'Holiday';
  count: number;
};

type EventData = Record<string, Event[]>; // "YYYY-M-D" format keys

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [eventData, setEventData] = useState<EventData>({});
  const [isEventlistOpen, setIsEventlistOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based

  const firstDayOfMonth = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getDay(firstDayOfMonth); // 0 = Sunday

  const offset = startDay === 0 ? 6 : startDay - 1;
  const totalCells = 35; // 5 full rows

  const prevMonth = subMonths(currentDate, 1);
  // const nextMonth = addMonths(currentDate, 1);
  const prevMonthDays = getDaysInMonth(prevMonth);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Birthday':
        return 'bg-pink-100 text-pink-600';
      case 'On Leave':
        return 'bg-blue-100 text-blue-600';
      case 'Holiday':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleDateClick = (dateStr: string, isCurrent: boolean) => {
    if (!isCurrent) return;
    setSelectedDate(dateStr);
    setIsEventlistOpen(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(today);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      const mock: EventData = {
        [`${year}-${month + 1}-3`]: [
          { type: 'Birthday', count: 2 },
          { type: 'On Leave', count: 2 },
          { type: 'Holiday', count: 1 },
        ],
        [`${year}-${month + 1}-9`]: [
          { type: 'Birthday', count: 1 },
          { type: 'Holiday', count: 1 },
        ],
        [`${year}-${month + 1}-17`]: [
          { type: 'On Leave', count: 2 },
          { type: 'Holiday', count: 1 },
        ],
        [`${year}-${month + 1}-23`]: [{ type: 'Holiday', count: 1 }],
      };

      setEventData(mock);
    };

    fetchEventData();
  }, [month, year]);

  const getCellDate = (index: number) => {
    const dayIndex = index - offset;

    if (dayIndex < 0) {
      return {
        date: prevMonthDays + dayIndex + 1,
        isCurrent: false,
        fullDate: format(new Date(year, month - 1, prevMonthDays + dayIndex + 1), 'yyyy-M-d'),
      };
    } else if (dayIndex >= daysInMonth) {
      return {
        date: dayIndex - daysInMonth + 1,
        isCurrent: false,
        fullDate: format(new Date(year, month + 1, dayIndex - daysInMonth + 1), 'yyyy-M-d'),
      };
    } else {
      return {
        date: dayIndex + 1,
        isCurrent: true,
        fullDate: format(new Date(year, month, dayIndex + 1), 'yyyy-M-d'),
      };
    }
  };

  return (
    <div className="px-10 pb-10 bg-white rounded-xl shadow">
      <div className="">
        <Typography tag="h2" className="capitalize text-primary font-semibold">
          Calendar
        </Typography>
        <div className="text-lg flex justify-center items-center font-semibold text-primary gap-4">
          <button onClick={handlePrevMonth}>
            <MoveLeft className="w-5 h-5 cursor-pointer" />
          </button>
          {format(currentDate, 'MMMM, yyyy')}
          <button onClick={handleNextMonth}>
            <MoveRight className="w-5 h-5 cursor-pointer" />
          </button>
          <div onClick={handleTodayClick} className="text-primary cursor-pointer">
            Today
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-2">
        {weekdays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <EventListSidesheet
        isOpen={isEventlistOpen}
        setIsOpen={setIsEventlistOpen}
        selectedDate={selectedDate}
      />

      <div className="grid grid-cols-7 gap-[1px] text-xs">
        {Array.from({ length: totalCells }).map((_, index) => {
          const { date, isCurrent, fullDate } = getCellDate(index);
          const events = eventData[fullDate];

          const isToday = isCurrent && fullDate === format(new Date(), 'yyyy-M-d');

          return (
            // <div
            //   key={index}
            //   className={`p-2 h-[90px] w-full ${
            //     isCurrent ? 'text-black' : 'text-gray-300'
            //   } ${isToday ? 'border-2 border-blue-500' : 'border border-gray-200'}
            //   cursor-pointer bg-white`}
            //   onClick={() => handleDateClick(fullDate, isCurrent)}
            // >
            <div
              key={index}
              className={`p-2 h-[90px] w-full relative 
                ${isCurrent ? 'text-black' : 'text-gray-300'} 
                bg-white border border-gray-200 cursor-pointer`}
              onClick={() => handleDateClick(fullDate, isCurrent)}
            >
              <div className="absolute bottom-1 right-1">
                <span
                  className={`text-[14px] font-semibold px-[6px] py-[2px] rounded-full 
                    ${isToday ? 'bg-blue-300 text-white' : ''}`}
                >
                  {date}
                </span>
              </div>
              <div className="space-y-1 mt-1">
                {events &&
                  events.map((event, idx) => (
                    <div
                      key={idx}
                      className={`text-[10px] px-1 py-[1px] rounded-md w-fit ${getBadgeColor(
                        event.type
                      )}`}
                    >
                      {event.type} <span className="ml-1 font-bold">{event.count}</span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
