import { ActiveButtonGroup, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';

export interface Holiday {
  date: string;
  type: 'FIXED' | 'OPTIONAL';
}

type LeaveType = 'full' | 'half';

interface LeaveLogEntryProps {
  date: Date;
  type: LeaveType;
  idx: number;
  holiday?: Holiday;
  isWeekend: boolean;
  onChange: (newType: LeaveType, idx: number) => void;
}

const LeaveLogEntry: React.FC<LeaveLogEntryProps> = ({
  date,
  type,
  idx,
  holiday,
  isWeekend,
  onChange,
}) => {
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const label =
    holiday?.type === 'FIXED' || isWeekend
      ? 'Day off'
      : holiday?.type === 'OPTIONAL'
        ? type === 'full'
          ? 'Holiday'
          : 'Leave'
        : type === 'full'
          ? 'Full Day'
          : 'Half Day';

  return (
    <div className="py-3 px-5 flex items-center justify-between border border-gray-v9 rounded-[14px]">
      <div>
        <Typography tag="t4">{formattedDate}</Typography>
        <Typography tag="t5" className="text-primary capitalize">
          {label}
        </Typography>
      </div>

      {holiday?.type === 'FIXED' || isWeekend ? (
        <Typography tag="t5" className="text-md font-semibold text-light-blue">
          Day off
        </Typography>
      ) : (
        <ActiveButtonGroup
          activeValue={type === 'half' ? 'half-day' : 'full-day'}
          activeColor="#8acbdd"
          options={
            holiday?.type === 'OPTIONAL'
              ? [
                  { label: 'Holiday', value: 'full-day', id: '1' },
                  { label: 'Leave', value: 'half-day', id: '2' },
                ]
              : [
                  { label: 'Full Day', value: 'full-day', id: '3' },
                  { label: 'Half Day', value: 'half-day', id: '4' },
                ]
          }
          onChange={value => onChange(value === 'half-day' ? 'half' : 'full', idx)}
        />
      )}
    </div>
  );
};

export default LeaveLogEntry;
