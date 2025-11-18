import {
  BinIcon,
  Button,
  MenuButton,
  MenuButtonItem,
  Pen,
  Table,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { JobTitleColumn, jobTitleColumns } from './constants';
import { useState } from 'react';
import AddJobTitleSidesheet from './addJobTitleSideSheet';
import EditJobTitleSidesheet from './editJobTitleSideSheet';
import DescriptionSheet from './DescriptionSheet';
import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const JobTitle = () => {
  const [isJobTitleOpen, setIsJobTitleOpen] = useState(false);
  const [isEditJobTitleOpen, setIsEditJobTitleOpen] = useState(false);
  const [selectedMenuRow, setSelectedMenuRow] = useState<JobTitleColumn>();
  const { onboardingDetails } = useAdminStore();
  const queryClient = useQueryClient();

  const { data: jobTitlesResponse, isLoading } = useQuery({
    queryKey: ['jobTitles', onboardingDetails?.businessData?.id],
    queryFn: async () => {
      const response = await UserProfileService.getJobTitles(
        onboardingDetails?.businessData?.id || '1a97cba7-bf32-4041-bcc3-39f6505821dc'
      );
      return response;
    },
    enabled: !!onboardingDetails?.businessData?.id,
  });

  const jobTitlesData: JobTitleColumn[] =
    jobTitlesResponse?.data?.map((item: any) => ({
      id: item.id,
      jobTitle: item.title,
      description: item.description,
      createdOn: new Date(item.created_at).toLocaleDateString(),
      visibleTo: 'Employee & HR Manager', // Default value since API doesn't provide this
      action: '',
    })) || [];

  const renderActionMenu = (row: JobTitleColumn) => {
    const menuItem: MenuButtonItem[] = [
      {
        icon: <Pen />,
        label: 'Edit',
        onClick: () => {
          setSelectedMenuRow(row);
          setIsEditJobTitleOpen(true);
        },
      },
      {
        icon: <BinIcon />,
        label: 'Delete',
        onClick: () => console.log('jobTitle', JobTitle),
      },
    ];
    return <MenuButton items={menuItem} position="left" menuWidth="160px" />;
  };
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [showDescriptionSheet, setShowDescriptionSheet] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<JobTitleColumn>();

  return (
    <div>
      <div className="flex justify-end">
        <Button className="mb-[24px]" onClick={() => setIsJobTitleOpen(true)} variant="primary">
          Add Job Title
        </Button>
        {isJobTitleOpen && (
          <AddJobTitleSidesheet
            isOpen={isJobTitleOpen}
            setIsOpen={setIsJobTitleOpen}
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ['jobTitles'] })}
          />
        )}
        {
          <EditJobTitleSidesheet
            isOpen={isEditJobTitleOpen}
            setIsOpen={setIsEditJobTitleOpen}
            selectedRow={selectedMenuRow!}
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ['jobTitles'] })}
          />
        }
        <DescriptionSheet
          showDescriptionSheet={showDescriptionSheet}
          onClose={() => setShowDescriptionSheet(false)}
          selectedRow={selectedRow}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Loading job titles...</div>
        </div>
      ) : (
        <Table
          keyExtractor={row => row.id!}
          data={jobTitlesData}
          columns={jobTitleColumns}
          actionMenu={row => renderActionMenu(row)}
          pagination={{
            itemsPerPage,
            initialPage: currentPage,
            onPageChange: setCurrentPage,
            totalItems: jobTitlesData.length,
          }}
          onRowClick={row => {
            setSelectedRow(row);
            setShowDescriptionSheet(true);
          }}
        />
      )}
    </div>
  );
};

export default JobTitle;
