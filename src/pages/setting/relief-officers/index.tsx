import {
  Button,
  PlusCircleIcon,
  Table,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { ReliefOfficersColumn } from './ReliefOfficersColumn';
import { useState } from 'react';
import { reliefOfficersData } from '../mockData';
import AddOfficerSheet from './AddOfficerSheet';

const ReliefOfficers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddOfficerSheet, setShowAddOfficerSheet] = useState<boolean>(false);
  const itemsPerPage = 10;
  return (
    <div className="space-y-6">
      <div className="flex w-full justify-end items-center">
        <Button
          variant="primary"
          iconPosition="right"
          icon={<PlusCircleIcon />}
          onClick={() => setShowAddOfficerSheet(!showAddOfficerSheet)}
        >
          Add Officer
        </Button>
      </div>
      <Typography tag="h4" className="text-gradient-primary font-semibold">
        Relief Officers
      </Typography>
      <Table
        data={reliefOfficersData}
        columns={ReliefOfficersColumn()}
        keyExtractor={row => row.id}
        pagination={{
          itemsPerPage,
          initialPage: currentPage,
          onPageChange: setCurrentPage,
          totalItems: reliefOfficersData.length,
        }}
        hoverEffect={true}
        bordered={true}
      />
      <AddOfficerSheet isOpen={showAddOfficerSheet} onClose={() => setShowAddOfficerSheet(false)} />
    </div>
  );
};

export default ReliefOfficers;
