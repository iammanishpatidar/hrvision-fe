import { Table, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import DescriptionSheet from '../components/DescriptionSheet';
import { useQuery } from '@tanstack/react-query';
import useAdminStore from '@/store/admin-store';
import { BusinessLeave } from '../requests/LeaveRequestColumn';
import { LeaveHistoryColumn } from './LeaveHistoryColumn';
import { ApplyLeavesService } from '@/apis/services/ApplyLeavesService';

const LeaveHistory = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDescriptionSheet, setShowDescriptionSheet] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<BusinessLeave | null>(null);
  const { onboardingDetails } = useAdminStore();
  const businessId = onboardingDetails?.businessData?.id ?? '';

  const {
    data: leaveRequestsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['leaveRequests', businessId, currentPage, itemsPerPage],
    queryFn: () =>
      ApplyLeavesService.getLeaveRequests(
        businessId,
        (currentPage - 1) * itemsPerPage,
        itemsPerPage
      ),
    enabled: true,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allLeaves = (leaveRequestsData?.data.leaves || []).filter((leave: BusinessLeave) => {
    if (leave.status !== 'PENDING') return true;
    if (!leave.date) return true;
    const leaveDate = new Date(leave.date);
    leaveDate.setHours(0, 0, 0, 0);
    return leaveDate < today;
  });

  return (
    <div className="flex flex-col gap-6">
      <Typography tag="h4" className="text-gradient-primary font-semibold">
        Leave History
      </Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error loading leave requests</div>
      ) : (
        <Table
          data={allLeaves}
          columns={LeaveHistoryColumn()}
          keyExtractor={row => row.id}
          pagination={{
            itemsPerPage,
            initialPage: currentPage,
            onPageChange: setCurrentPage,
            totalItems: allLeaves.length,
          }}
          hoverEffect={true}
          bordered={true}
          // actionMenu={renderActionMenu}
          onRowClick={row => {
            setSelectedRow(row);
            setShowDescriptionSheet(true);
          }}
        />
      )}
      <DescriptionSheet
        showDescriptionSheet={showDescriptionSheet}
        onClose={() => setShowDescriptionSheet(false)}
        selectedRow={selectedRow}
        onAccept={() => {}}
        onReject={() => {}}
      />
    </div>
  );
};

export default LeaveHistory;
