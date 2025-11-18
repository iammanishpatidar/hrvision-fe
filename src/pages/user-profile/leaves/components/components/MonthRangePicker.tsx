import React, { useState, useRef, useEffect } from 'react';
import Year from './Year';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarIcon } from '@fibonacci-innovative-solutions/hrms-design-library';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface MonthRangePickerProps {
  onMonthRangeChange: (start: number | null, end: number | null) => void;
}

const MonthRangePicker: React.FC<MonthRangePickerProps> = ({ onMonthRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startMonthIndex, setStartMonthIndex] = useState<number | null>(null);
  const [endMonthIndex, setEndMonthIndex] = useState<number | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal
  const buttonRef = useRef<HTMLButtonElement>(null); // Reference to the button that opens the modal

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the modal if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener
  }, []);

  const handleMonthClick = (index: number) => {
    if (startMonthIndex === null || (startMonthIndex !== null && endMonthIndex !== null)) {
      setStartMonthIndex(index);
      setEndMonthIndex(null);
    } else if (index < startMonthIndex) {
      setStartMonthIndex(index);
    } else {
      setEndMonthIndex(index);
    }
    onMonthRangeChange(startMonthIndex, endMonthIndex);
  };

  const togglePicker = () => {
    setIsOpen(prev => !prev);
  };

  const getButtonText = () => {
    if (startMonthIndex !== null && endMonthIndex !== null) {
      return `${months[startMonthIndex]}–${months[endMonthIndex]}, ${year}`;
    }
    return `Start–End, ${year}`;
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  return (
    <div className="relative inline-block right-0">
      <button
        ref={buttonRef} // Assign ref to the button
        onClick={togglePicker}
        className="flex items-center gap-2 border border-[#CBCBCB] rounded-md px-2 py-[11px] text-[#636363] text-xs font-semibold"
      >
        {getButtonText()}
        <CalendarIcon width="20" height="20" />
      </button>

      {isOpen && (
        <div
          ref={modalRef} // Assign ref to the modal container
          className="absolute z-10 mt-2 bg-white border border-[#CBCBCB] rounded-lg shadow-lg p-4 w-72 right-0"
        >
          <div className="flex justify-between items-center mb-4 pb-4">
            <Year selectedYear={year} onYearChange={handleYearChange} />
            <div>
              <button
                onClick={() => setYear(prev => prev - 1)}
                className="text-gray-500 hover:text-black"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => setYear(prev => prev + 1)}
                className="text-gray-500 hover:text-black"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => {
              const isSelected =
                startMonthIndex !== null &&
                endMonthIndex !== null &&
                index >= startMonthIndex &&
                index <= endMonthIndex;

              const isStart = index === startMonthIndex;
              const isEnd = index === endMonthIndex;

              return (
                <button
                  key={month}
                  onClick={() => handleMonthClick(index)}
                  className={`rounded-full px-2 py-1 text-sm ${
                    isSelected ? 'bg-[#8BCDDE] text-white' : 'hover:bg-gray-100 hover:text-black'
                  } ${isStart || isEnd ? 'bg-[#8BCDDE] text-white' : ''}`}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthRangePicker;
