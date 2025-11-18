'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type OptionType = {
  label: string;
  value: string;
};

type MultiSelectDropdownProps = {
  options: OptionType[];
  placeholder?: string;
  onChange?: (selected: OptionType[]) => void;
};

const MultiSelectDropdown = ({
  options,
  placeholder = 'Select Type',
  onChange,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: OptionType) => {
    const exists = selected.some(item => item.value === option.value);
    const newSelected = exists
      ? selected.filter(item => item.value !== option.value)
      : [...selected, option];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="relative w-32" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="border border-[#CBCBCB] rounded-md px-3 py-2 flex items-center justify-between cursor-pointer bg-white"
      >
        <span className="text-sm text-gray-600">
          {selected.length > 0 ? `${selected.length} selected` : placeholder}
        </span>
        <ChevronDown size={16} className="text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute mt-2 z-10 w-48 rounded-md bg-white shadow-lg ">
          <div className="p-3 text-xs font-medium text-gray-500">Available options</div>
          <ul className="max-h-60 overflow-y-auto">
            {options.map(option => {
              const isChecked = selected.some(item => item.value === option.value);
              return (
                <li
                  key={option.value}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                    isChecked ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-black'
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isChecked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
