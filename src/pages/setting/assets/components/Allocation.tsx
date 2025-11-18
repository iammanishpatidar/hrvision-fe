import {
  Button,
  MenuButton,
  MenuButtonItem,
  PlusCircleIcon,
  Table,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import AllocateAssetSheet from './AllocateAssetSheet';
import { AllocationColumn } from './AllocationColumn';
import useAdminStore from '@/store/admin-store';
import { EmployeeService } from '@/apis/services/EmployeeService';
import { AssetsService } from '@/apis/services/AssetsService';

const Allocation = () => {
  const [showAllocateAssetSheet, setAllocateAssetSheet] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allocationData, setAllocationData] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const itemsPerPage = 10;
  const { onboardingDetails } = useAdminStore();
  const onClose = () => {
    setAllocateAssetSheet(false);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await EmployeeService.getEmployeeBusinessInfo(onboardingDetails?.businessData?.id || '');
      setEmployees(response.data || []);
    };
    fetchEmployees();
  }, [onboardingDetails?.businessData?.id]);

  const fetchAssetsRequest = async () => {
    try {
      const response = await AssetsService.fetchAssetsRequest({
        business_id: onboardingDetails?.businessData?.id || '',
      });
      setAllocationData(response.data.asset_requests || []);
    } catch (error) {
      console.error('Error fetching asset requests:', error);
    }
  };

  useEffect(() => {
    fetchAssetsRequest();
  }, [onboardingDetails?.businessData?.id]);

  const handleAllocate = async () => {
    await fetchAssetsRequest();
  };
  
  const handleAssetRequest = async (id: string, status: 'APPROVED' | 'REJECTED', row: any) => {
    try {
      const response = await AssetsService.updateAssetRequest({
        request_id: id,
        status: status,
        approved_by: onboardingDetails?.employeeData?.id,
        comments: status === 'APPROVED' 
          ? `Asset request approved for ${row.employee?.name || 'employee'}`
          : `Asset request rejected for ${row.employee?.name || 'employee'}`
      });
      if (response.statusCode === 200) {
        fetchAssetsRequest();
      }
    }
    catch(err){
      console.error('Error updating asset request:', err);
    }
  }
  const renderActionMenu = (row: any) => {
    const menuItems: MenuButtonItem[] = [
      {
        label: 'Reject Request',
        onClick: () => handleAssetRequest(row.id, 'REJECTED', row),
      },
      {
        label: 'Accept Request',
        onClick: () => handleAssetRequest(row.id, 'APPROVED', row),
      }
    ];

    return <MenuButton items={menuItems} position="right" menuWidth="200px" />;
  };

  return (
    <>
      <div className="border border-gray-v11 rounded-xl p-6 space-y-6 min-h-[520px]">
        <div className="w-full flex items-center justify-end">
          <Button
            variant="primary"
            icon={<PlusCircleIcon height="15" width="15" />}
            iconPosition="right"
            onClick={() => setAllocateAssetSheet(true)}
          >
            Allocate Asset
          </Button>
        </div>
        <Table
          data={allocationData}
          keyExtractor={row => row.employeeId}
          columns={AllocationColumn}
          actionMenu={(row) => renderActionMenu(row)}
          pagination={{
            itemsPerPage,
            initialPage: currentPage,
            onPageChange: setCurrentPage,
            totalItems: allocationData.length,
          }}
          hoverEffect={true}
          bordered={true}
        />
      </div>

      <AllocateAssetSheet
        showAllocateAssetSheet={showAllocateAssetSheet}
        onClose={onClose}
        onAllocate={handleAllocate}
        employees={employees}
      />
    </>
  );
};

export default Allocation;
