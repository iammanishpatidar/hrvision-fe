import { useState } from 'react';
import { employeeData, EmployeeDocumentColumn, employeeDocumentColumns } from './constants';
import {
  BinIcon,
  Button,
  MenuButton,
  MenuButtonItem,
  Pen,
  Table,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import AddEmployeeDocumentSideSheet from './sideSheet';
import EditEmployeeDocumentSideSheet from './EditDocSidesheet';
import DescriptionSheet from './DescriptionSheet';
import { DownloadIcon } from 'lucide-react';

const EmployeeDocument = () => {
  const [isEmployeeDocumentOpen, setIsEmployeeDocumentOpen] = useState(false);
  const [isEditDocOpen, setIsEditDocOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EmployeeDocumentColumn>();
  const [selectedMenuRow, setSelectedMenuRow] = useState<EmployeeDocumentColumn>();

  const renderActionMenu = (row: EmployeeDocumentColumn) => {
    const menuItem: MenuButtonItem[] = [
      {
        icon: <Pen />,
        label: 'Edit',
        onClick: () => {
          setSelectedMenuRow(row);
          setIsEditDocOpen(true);
        },
      },
      {
        icon: <BinIcon />,
        label: 'Delete',
      },
      {
        icon: <DownloadIcon />,
        label: 'Download',
      },
    ];
    return <MenuButton items={menuItem} position="left" menuWidth="160px" />;
  };
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [showDescriptionSheet, setShowDescriptionSheet] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="mb-[24px]"
          onClick={() => setIsEmployeeDocumentOpen(true)}
          variant="primary"
        >
          Add Folder
        </Button>

        <AddEmployeeDocumentSideSheet
          isOpen={isEmployeeDocumentOpen}
          setIsOpen={setIsEmployeeDocumentOpen}
        />

        {
          <EditEmployeeDocumentSideSheet
            isOpen={isEditDocOpen}
            setIsOpen={setIsEditDocOpen}
            selectedRow={selectedMenuRow!}
          />
        }
        <DescriptionSheet
          showDescriptionSheet={showDescriptionSheet}
          onClose={() => setShowDescriptionSheet(false)}
          selectedRow={selectedRow}
        />
      </div>
      <Table
        keyExtractor={row => row.id!}
        data={employeeData}
        columns={employeeDocumentColumns}
        actionMenu={renderActionMenu}
        pagination={{
          itemsPerPage,
          initialPage: currentPage,
          onPageChange: setCurrentPage,
          totalItems: employeeData.length,
        }}
        onRowClick={row => {
          setSelectedRow(row);
          setShowDescriptionSheet(true);
        }}
      />
    </div>
  );
};

export default EmployeeDocument;
