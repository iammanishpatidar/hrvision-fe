import LeaveChart from './components/components/LeaveChart';
import LeaveSummary from './components/LeaveSummary';
import TimeOffBalance from './components/TimeBalance';
import {
  DeleteIcon,
  MenuButton,
  MenuButtonItem,
  Pen,
  SearchBar,
  Table,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { employeeData, leavetypeColumns } from './constants';
import { useState } from 'react';
import MonthRangePicker from './components/components/MonthRangePicker';
import LeaveRequestSheet from '@/components/common/sidesheets/LeaveRequestSheet';

const originalData = [
  { name: 'Casual ', value: 25, full: 30, fill: '#4D8B3E' },
  { name: 'Sick ', value: 20, full: 30, fill: '#3d7bff' },
  { name: 'Bereavement', value: 15, full: 30, fill: '#f5b842' },
  { name: 'Birthday ', value: 25, full: 50, fill: '#f2952e' },
  { name: 'Vacation ', value: 5, full: 30, fill: '#1AAB8B' },
];

const Leaves = () => {
  const [startMonthIndex, setStartMonthIndex] = useState<number | null>(null);
  const [endMonthIndex, setEndMonthIndex] = useState<number | null>(null);
  const [isLeaveRequestSheetOpen, setIsLeaveRequestSheetOpen] = useState<boolean>(false);
  const [isToView, setIsToView] = useState<boolean>(false);

  const handleClick = () => {
    setIsLeaveRequestSheetOpen(true);
  };

  const handleMonthRangeChange = (start: number | null, end: number | null) => {
    setStartMonthIndex(start);
    setEndMonthIndex(end);
  };
  const renderActionMenu = () => {
    const menuItem: MenuButtonItem[] = [
      {
        icon: <Pen />,
        label: 'View',
        onClick: () => {
          setIsToView(true);
          handleClick();
        },
      },
      {
        icon: <DeleteIcon className="w-[24px] h-[24px]" />,
        label: 'Revoke',
      },
    ];
    return <MenuButton items={menuItem} position="left" menuWidth="160px" />;
  };
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col items-center gap-6 ">
      <div className="p-6 flex w-full items-center size-full shadow-sm border border-gray-v2 rounded-md">
        <div className="w-1/3">
          <LeaveSummary handleClick={handleClick} />
        </div>
        <div className="w-2/3">
          <div className="flex justify-end">
            <MonthRangePicker onMonthRangeChange={handleMonthRangeChange} />
          </div>
          <LeaveChart
            startMonthIndex={startMonthIndex}
            endMonthIndex={endMonthIndex}
            originalData={originalData}
          />
        </div>
      </div>
      <div className="p-6 flex w-full items-center size-full shadow-sm border border-gray-v2 rounded-md">
        <TimeOffBalance />
      </div>

      <div className="p-6 flex flex-col w-full items-start size-full shadow-sm border border-gray-v2 rounded-md">
        <div className="text-[#444291] font-Poppins text-[18px] font-semibold mb-4">History </div>
        <div className="w-[400px] mb-2.5">
          <SearchBar />
        </div>
        <Table
          keyExtractor={row => row.id}
          data={employeeData}
          columns={leavetypeColumns}
          actionMenu={renderActionMenu}
          pagination={{
            itemsPerPage,
            initialPage: currentPage,
            onPageChange: setCurrentPage,
            totalItems: employeeData.length,
          }}
        />
      </div>
      <LeaveRequestSheet
        isLeaveRequestSheetOpen={isLeaveRequestSheetOpen}
        onClose={() => setIsLeaveRequestSheetOpen(false)}
        isToView={isToView}
      />
    </div>
  );
};

export default Leaves;
