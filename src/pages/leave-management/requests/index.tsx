import {
  BinIcon,
  MenuButton,
  MenuButtonItem,
  Table,
  Typography,
  ViewIcon,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import DescriptionSheet from '../components/DescriptionSheet';
import useAdminStore from '@/store/admin-store';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { LeaveRequestColumn, BusinessLeave } from './LeaveRequestColumn';
import { handleToast } from '@/utils/toastUtils';
import { ApplyLeavesService } from '@/apis/services/ApplyLeavesService';

const LeaveRequests = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDescriptionSheet, setShowDescriptionSheet] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<BusinessLeave | null>(null);
  const { onboardingDetails } = useAdminStore();
  const businessId = onboardingDetails?.businessData?.id ?? '';
  const queryClient = useQueryClient();

  const handleAcceptRequest = async (leaveRequest: BusinessLeave) => {
    try {
      const response = await ApplyLeavesService.updateLeaveStatus(leaveRequest.id, {
        status: 'APPROVED',
      });
      if (response?.statusCode === 200) {
        handleToast({
          message: response.message || 'Leave request accepted',
          status: 'success',
        });
        setShowDescriptionSheet(false);
        queryClient.invalidateQueries({ queryKey: ['leaveRequests', businessId] });
      } else {
        handleToast({
          message: response?.message || 'Failed to accept leave request',
          status: 'error',
        });
      }
    } catch {
      handleToast({
        message: 'An error occurred while accepting the leave request',
        status: 'error',
      });
    }
  };

  const handleRejectRequest = async (leaveRequest: BusinessLeave) => {
    try {
      const response = await ApplyLeavesService.updateLeaveStatus(leaveRequest.id, {
        status: 'REJECT',
      });
      if (response?.statusCode === 200) {
        handleToast({
          message: response.message || 'Leave request rejected',
          status: 'success',
        });
        setShowDescriptionSheet(false);
        queryClient.invalidateQueries({ queryKey: ['leaveRequests', businessId] });
      } else {
        handleToast({
          message: response?.message || 'Failed to reject leave request',
          status: 'error',
        });
      }
    } catch {
      handleToast({
        message: 'An error occurred while rejecting the leave request',
        status: 'error',
      });
    }
  };

  const renderActionMenu = (leaveRequest: BusinessLeave) => {
    const menuItems: MenuButtonItem[] = [
      {
        content: (
          <div className="flex items-center gap-2">
            <ViewIcon />
            <p>Accept</p>
          </div>
        ),
        onClick: () => handleAcceptRequest(leaveRequest),
      },
      {
        content: (
          <div className="flex items-center gap-2">
            <BinIcon color="#e7000b" />
            <p>Reject</p>
          </div>
        ),
        onClick: () => handleRejectRequest(leaveRequest),
        variant: 'danger',
      },
    ];

    return <MenuButton items={menuItems} position="right" menuWidth="200px" />;
  };

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

  // Filter leaves to only those with status 'PENDING' and not expired (date >= today)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight for date-only comparison
  const pendingLeaves =
    leaveRequestsData?.data.leaves?.filter((leave: any) => {
      if (leave.status !== 'PENDING') return false;
      if (!leave.date) return false;
      const leaveDate = new Date(leave.date);
      leaveDate.setHours(0, 0, 0, 0);
      return leaveDate >= today;
    }) || [];

  const renderTableHeader = () => {
    return (
      <div className="flex items-center gap-1 font-semibold text-sm">
        <div className="text-[#4A5567]">Total Requests:</div>
        <div>{pendingLeaves.length}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Typography tag="h4" className="text-gradient-primary font-semibold">
        Leave Requests
      </Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error loading leave requests</div>
      ) : (
        <Table
          data={pendingLeaves}
          columns={LeaveRequestColumn()}
          keyExtractor={row => row.id}
          pagination={{
            itemsPerPage,
            initialPage: currentPage,
            onPageChange: setCurrentPage,
            totalItems: pendingLeaves.length,
          }}
          hoverEffect={true}
          bordered={true}
          actionMenu={renderActionMenu}
          customHeader={renderTableHeader()}
          onRowClick={row => {
            setSelectedRow(row);
            setShowDescriptionSheet(true);
          }}
        />
      )}
      <DescriptionSheet
        showDescriptionSheet={showDescriptionSheet}
        onClose={() => setShowDescriptionSheet(false)}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
        selectedRow={selectedRow}
        showAction={true}
      />
    </div>
  );
};

export default LeaveRequests;
