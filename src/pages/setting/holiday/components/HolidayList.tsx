import React from 'react';
import ActionMenu from './ActionMenu';
import { HolidayInfo } from '..';
import { allowedEmployeeType } from './AddEditHolidaySheet';

export type HolidayType =
  | 'National Holiday'
  | 'Cultural/Religious Holiday'
  | 'Optional/Restricted Holiday'
  | 'Company-Specific Holiday';

interface HolidayListProps {
  holidays: Record<string, HolidayInfo[]>;
  onEdit: (holiday: HolidayInfo) => void;
  onDelete: (holiday: HolidayInfo) => void;
}

const holidayColors: Record<HolidayType, string> = {
  'National Holiday': '#4CAF50',
  'Cultural/Religious Holiday': '#2196F3',
  'Optional/Restricted Holiday': '#FFEB3B',
  'Company-Specific Holiday': '#FF9800',
};

const formatDate = (date?: Date | string) => {
  if (!date) return { day: '--', weekday: '--' };

  // Convert to Date object if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Check for invalid date
  if (isNaN(dateObj.getTime())) return { day: '--', weekday: '--' };

  return {
    day: dateObj.toLocaleDateString('en-GB', { day: '2-digit' }),
    weekday: dateObj.toLocaleDateString('en-GB', { weekday: 'short' }),
  };
};

export const HolidayList: React.FC<HolidayListProps> = ({ holidays, onEdit, onDelete }) => {
  return (
    <div className="p-4">
      {holidays &&
        Object.entries(holidays).map(([month, holidayArray]) => (
          <div key={month} className="mb-8">
            <h3 className="text-lg font-semibold text-[#444291] mb-4">{month}</h3>
            {holidayArray &&
              holidayArray.length > 0 &&
              holidayArray.map((holiday, index) => {
                const { day, weekday } = formatDate(holiday.date ?? undefined);
                const color = holidayColors[holiday.type];

                return (
                  <div
                    key={holiday.id || index}
                    className="flex items-start justify-between bg-white border border-[#E7E7E7] rounded-md mb-6"
                  >
                    <div
                      style={{ borderLeft: `6px solid ${color}` }}
                      className=" flex rounded-l-md h-full"
                    >
                      <div className="min-w-[100px] px-6 py-3">
                        <div className="text-[#787878] text-center font-semibold text-2xl">
                          <div>{day}</div>
                          <div className="text-2xl">{weekday}</div>
                        </div>
                      </div>
                      <div
                        style={{ borderLeft: `1px solid ${color}` }}
                        className={`border-l pl-[27px] flex items-center my-1`}
                      >
                        <div className="flex items-left flex-col gap-1">
                          <span className="text-xs text-gray-500">Full Day</span>
                          <span className="font-semibold text-sm">{holiday.name}</span>
                          <span className="text-xs text-gray-400">
                            Applied to:
                            <span className='mx-1'>
                              {Array.isArray(holiday.allowedEmployeeType) &&
                              holiday.allowedEmployeeType.length > 0
                                ? holiday.allowedEmployeeType
                                    .map(
                                      typeValue =>
                                        allowedEmployeeType.find(
                                          opt => opt.value === typeValue
                                        )?.label || typeValue
                                    )
                                    .join(', ')
                                : 'All'}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <ActionMenu onEdit={() => onEdit(holiday)} onDelete={() => onDelete(holiday)} />
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
};
