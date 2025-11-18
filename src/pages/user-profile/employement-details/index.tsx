import { DownloadIcon } from 'lucide-react';
import ContractDetails from './components/ContractDetails';
import EmploymentOverview from './components/EmploymentOverview';
import { contractData, employementDetailColumns, EmployementDetailsColumn } from './mockData';
import {
  MenuButton,
  MenuButtonItem,
  Pen,
  Table,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';

const EmployementDetails = () => {
  const renderActionMenu = (employementDetail: EmployementDetailsColumn) => {
    const menuItem: MenuButtonItem[] = [
      {
        icon: <Pen />,
        label: 'View Document',
      },
      {
        icon: <DownloadIcon />,
        label: 'Export',
        onClick: () => console.log('employementDetail', employementDetail),
      },
    ];
    return <MenuButton items={menuItem} position="left" menuWidth="160px" />;
  };
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full gap-10">
        <div className="w-2/3 h-full">
          <EmploymentOverview />
        </div>
        <div className="w-1/3 h-full">
          <ContractDetails />
        </div>
      </div>
      <div className="p-6 flex flex-col w-full items-start size-full shadow-sm border border-gray-v2 rounded-md">
        <div className="text-primary font-Poppins text-[18px] font-semibold mb-4">
          Employment History Details{' '}
        </div>

        <Table
          keyExtractor={row => row.id}
          data={contractData}
          columns={employementDetailColumns}
          actionMenu={renderActionMenu}
          pagination={{
            itemsPerPage,
            initialPage: currentPage,
            onPageChange: setCurrentPage,
            totalItems: contractData.length,
          }}
        />
      </div>
    </div>
  );
};

export default EmployementDetails;
