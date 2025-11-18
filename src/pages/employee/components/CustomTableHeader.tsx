import clsx from 'clsx';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { TableHeaderProps } from '../types';

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  totalCount,
  totalCountLabel = 'Total',
  onSearch,
  searchPlaceholder = 'Search name or designation',
  className,
  rightContent,
  showSearch = true,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div
      className={clsx(
        'flex flex-col md:flex-row justify-between items-start md:items-center gap-3',
        className
      )}
    >
      <div className="flex items-center">
        {title && <div className="mr-4 font-medium text-gray-900">{title}</div>}
        {totalCount !== undefined && (
          <div className="text-sm text-gray-700">
            {totalCountLabel}:{' '}
            <span className="font-medium">
              {totalCount} {totalCount === 1 ? 'person' : 'persons'}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        {showSearch && (
          <div className="relative w-full md:w-auto min-w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        )}

        {rightContent && <div className="flex items-center ml-2">{rightContent}</div>}
      </div>
    </div>
  );
};

export default TableHeader;
