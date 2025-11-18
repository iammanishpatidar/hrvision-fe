import { LeaveTypesService } from '@/apis/services/LeaveTypesService';
import { TimeOffService } from '@/apis/services/TimeOffService';
import useAdminStore from '@/store/admin-store';
import {
  BinIcon,
  Button,
  DatePicker,
  MenuButton,
  MenuButtonItem,
  Pen,
  Table,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import AddEditTimeOffSheet from './AddEditTimeOffSheet';
import { TimeOffColumnType, timeOffColumns } from './constants';

const TimeOff = () => {
  const [isTimeOffOpen, setIsTimeOffOpen] = useState(false);
  const [selectedMenuRow, setSelectedMenuRow] = useState<TimeOffColumnType | null>();
  const [isEditTimeOff, setIsEditTimeOff] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { onboardingDetails, setOnboardingDetails } = useAdminStore();
  const [leaveTypes, setLeaveTypes] = useState<TimeOffColumnType[]>([]);
  const [startTimeOffCycle, setStartTimeOffCycle] = useState<string | null>(
    onboardingDetails?.businessData?.time_off_cycle_start_date || null
  );
  const [endTimeOffCycle, setEndTimeOffCycle] = useState<string | null>(
    onboardingDetails?.businessData?.time_off_cycle_end_date || null
  );

  const fetchLeaveTypesMutation = useMutation({
    mutationFn: async () => {
      const businessId = onboardingDetails?.businessData?.id;
      return await LeaveTypesService.getLeaveTypes(businessId || '');
    },
    onSuccess: data => {
      console.log('Leave types fetched successfully:', data.data.data);
      setLeaveTypes(data.data.data);
    },
    onError: error => {
      console.error('Error fetching leave types:', error);
    },
  });

  const deleteLeaveTypeMutation = useMutation({
    mutationFn: async (leaveTypeId: string) => {
      return await LeaveTypesService.deleteLeaveType(leaveTypeId);
    },
    onSuccess: () => {
      console.log('Leave type deleted successfully');
      fetchLeaveTypesMutation.mutate();
    },
    onError: error => {
      console.error('Error deleting leave type:', error);
    },
  });

  const handleDatePickerChange = async (dateRange: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const businessId = onboardingDetails?.businessData?.id;
      const formatDate = (date: Date) => {
        return format(date, 'yyyy-MM-dd');
      };

      const payload = {
        time_off_cycle_start_date: dateRange?.from ? formatDate(dateRange.from) : null,
        time_off_cycle_end_date: dateRange?.to ? formatDate(dateRange.to) : null,
      };

      const response = await TimeOffService.getTimeOffCycle(businessId || '', payload);

      if (response.statusCode === 200) {
        console.log(response.data);
        setStartTimeOffCycle(response.data.timeOffCycleStartDate);
        setEndTimeOffCycle(response.data.timeOffCycleEndDate);
        setOnboardingDetails({
          ...onboardingDetails!,
          businessData: {
            ...onboardingDetails!.businessData,
            time_off_cycle_start_date: response.data.timeOffCycleStartDate,
            time_off_cycle_end_date: response.data.timeOffCycleEndDate,
          },
        });
      }


    } catch (err) {
      console.error('Error fetching time off cycle:', err);
      setError('Failed to fetch time off cycle data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTimeOff = (newTimeOff: TimeOffColumnType) => {
    if (isEditTimeOff && selectedMenuRow) {
      setLeaveTypes(prev => prev.map(item => (item.id === selectedMenuRow.id ? newTimeOff : item)));
    }

    setIsEditTimeOff(false);
    setSelectedMenuRow(null);
  };

  const handleDelete = (row: TimeOffColumnType) => {
    if (row.id) {
      deleteLeaveTypeMutation.mutate(row.id);
    }
  };

  const renderActionMenu = (row: TimeOffColumnType) => {
    const menuItem: MenuButtonItem[] = [
      {
        icon: <Pen />,
        label: 'Edit',
        onClick: () => {
          setSelectedMenuRow(row);
          setIsEditTimeOff(true);
          setIsTimeOffOpen(true);
        },
      },
      {
        icon: <BinIcon />,
        label: 'Delete',
        onClick: () => handleDelete(row),
      },
    ];
    return <MenuButton items={menuItem} position="left" menuWidth="160px" />;
  };

  const handleAddNew = () => {
    setSelectedMenuRow(null);
    setIsEditTimeOff(false);
    setIsTimeOffOpen(true);
  };

  useEffect(() => {
    fetchLeaveTypesMutation.mutate();
  }, []);

  return (
    <div>
      <div className="p-6 rounded-lg border border-gray-v2 bg-white flex flex-col gap-4">
        <Typography tag="h4" className="text-primary">
          Time off Cycle
        </Typography>
        <div className="grid grid-cols-2 gap-x-20">
          <div className="relative">
            <DatePicker
              className="w-full"
              label="Cycle Start Date"
              mode="range"
              placeholder="Select Start Date"
              theme={{
                labelStyle: 'text-primaryText text-xs',
              }}
              value={{
                from: startTimeOffCycle ? parseISO(startTimeOffCycle) : undefined,
                to: endTimeOffCycle ? parseISO(endTimeOffCycle) : undefined,
              }}
              onChange={handleDatePickerChange}
            />
            {isLoading && (
              <div className="mt-2 text-sm text-blue-600">Loading time off cycle data...</div>
            )}
            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          </div>
        </div>
      </div>
      <Table
        keyExtractor={row => row.id!}
        data={leaveTypes}
        columns={timeOffColumns}
        actionMenu={renderActionMenu}
      />
      <div className="flex gap-4 mt-[24px]">
        <Button onClick={handleAddNew} variant="primary">
          Add Time Off Type
        </Button>
      </div>
      <AddEditTimeOffSheet
        isOpen={isTimeOffOpen}
        setIsOpen={setIsTimeOffOpen}
        isEditTimeOff={isEditTimeOff}
        selectedMenuRow={selectedMenuRow}
        onAddTimeOff={handleAddTimeOff}
        onRefreshLeaveTypes={() => fetchLeaveTypesMutation.mutate()}
      />
    </div>
  );
};

export default TimeOff;
