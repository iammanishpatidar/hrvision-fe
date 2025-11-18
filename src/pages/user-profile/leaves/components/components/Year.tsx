import React from 'react';

interface YearProps {
  selectedYear: number;
  onYearChange: (newYear: number) => void;
}

const Year: React.FC<YearProps> = ({ selectedYear, onYearChange }) => {
  const currentYear = new Date().getFullYear();

  const years = [
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
    currentYear + 4,
    currentYear + 5,
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex justify-between items-center">
        <select
          value={selectedYear}
          onChange={e => onYearChange(Number(e.target.value))}
          className="text-sm p-1 rounded-md"
        >
          {years.map(yearOption => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Year;
