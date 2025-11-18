import { ApplyLeavesProps, ApplyLeavesService } from '@/apis/services/ApplyLeavesService';
import { LeaveTypesService } from '@/apis/services/LeaveTypesService';
import LeaveLogEntry from '@/components/LeaveLogEntry/LeaveLogEntry';
import useAdminStore from '@/store/admin-store';
import { handleToast } from '@/utils/toastUtils';
import {
  Button,
  Calendar,
  Close,
  Drawer,
  Dropdown,
  Textarea,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getDatesInRange, getHolidayForDate, isWeekend } from './../../../utils/getDatesInRange';
import { HolidayServices } from '@/apis/services/HolidayService';

type LeaveRequestSheetProps = {
  isLeaveRequestSheetOpen: boolean;
  onClose: (sheetName: string) => void;
  isToView?: boolean;
};

const LeaveRequestSheet: React.FC<LeaveRequestSheetProps> = ({
  isLeaveRequestSheetOpen,
  onClose,
  isToView = false,
}) => {
  const [sheet, setSheet] = useState(1);
  const [leaveDescription, setLeaveDescription] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveTypeId, setLeaveTypeId] = useState('');
  const [error, setError] = useState('');
  const [leaveDays, setLeaveDays] = useState<ApplyLeavesProps[]>([]);
  const { onboardingDetails } = useAdminStore();

  const { data: holidaysData } = useQuery({
    queryKey: ['holidaysData'],
    queryFn: () => HolidayServices.getHolidays(onboardingDetails?.businessData?.id ?? ''),
    enabled: !!onboardingDetails?.businessData?.id,
  });

  const handleDateRangeChange = (value: Date | { from?: Date; to?: Date } | undefined) => {
    if (
      value &&
      typeof value === 'object' &&
      'from' in value &&
      'to' in value &&
      value.from &&
      value.to
    ) {
      const dates = getDatesInRange(value.from, value.to);
      const newLeaveDays: ApplyLeavesProps[] = dates.map(date => {
        const holiday = getHolidayForDate(date, holidaysData?.data?.data || []);
        return {
          date: date.toISOString(),
          is_half_day: holiday?.type === 'OPTIONAL' ? true : false,
          leave_type_id: leaveTypeId,
          employee_id: onboardingDetails?.employeeData?.id ?? '',
          reason: leaveDescription,
        };
      });
      setLeaveDays(newLeaveDays);
    }
  };

  const { data: leaveTypesData } = useQuery({
    queryKey: ['leaveTypesData', onboardingDetails?.businessData?.id],
    queryFn: () => LeaveTypesService.getLeaveTypes(onboardingDetails?.businessData?.id ?? ''),
    enabled: !!onboardingDetails?.businessData?.id,
  });

  const { mutate: applyLeaves, isPending } = useMutation({
    mutationFn: async (leaveRequest: ApplyLeavesProps[]) => {
      return await ApplyLeavesService.applyLeaves(leaveRequest);
    },
    onSuccess: () => {
      onClose('leaveRequest');
      setLeaveDays([]);
      setLeaveTypeId('');
      setLeaveType('');
      setLeaveDescription('');
      setError('');
      setSheet(1);
      handleToast({
        message: 'Leave request submitted successfully',
        status: 'success',
      });
    },
    onError: () => {
      handleToast({
        message: 'Failed to submit leave request',
        status: 'error',
      });
    },
  });

  const leaveTypeOptions =
    leaveTypesData?.data?.data?.map((leaveType: any) => ({
      label: leaveType.name,
      value: leaveType.id,
    })) || [];

  return (
    <Drawer
      isOpen={isLeaveRequestSheetOpen}
      onClose={() => {
        setLeaveDays([]);
        setLeaveTypeId('');
        setLeaveType('');
        setLeaveDescription('');
        setError('');
        setSheet(1);
        onClose('leaveRequest');
      }}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto p-6"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-custom-blue-v2 p-2 rounded-[14px]"
          onClick={() => {
            setLeaveDays([]);
            setLeaveTypeId('');
            setLeaveType('');
            setLeaveDescription('');
            setError('');
            setSheet(1);
            onClose('leaveRequest');
          }}
        >
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Typography tag="h3" className="text-primary">
          {isToView ? 'View Request' : 'Add Request'}
        </Typography>
        <div className="w-full flex justify-center">
          <Calendar mode="range" onChange={handleDateRangeChange} disablePast />
        </div>

        {sheet === 2 ? (
          <div className="space-y-1.5">
            <Typography tag="h6" className="font-medium text-primaryText">
              Leave Log
            </Typography>
            <div className="space-y-3">
              {leaveDays.map((day, idx) => (
                <LeaveLogEntry
                  key={idx}
                  date={new Date(day.date)}
                  type={day.is_half_day ? 'half' : 'full'}
                  idx={idx}
                  holiday={getHolidayForDate(new Date(day.date), holidaysData?.data?.data || [])}
                  isWeekend={isWeekend(new Date(day.date))}
                  onChange={(val, index) => {
                    const updated = [...leaveDays];
                    updated[index].is_half_day = val === 'half' ? true : false;
                    setLeaveDays(updated);
                  }}
                />
              ))}
            </div>
            {error && <div className="text-[#E53935] font-semibold text-xs">{error}</div>}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="space-y-6">
              <Dropdown
                options={leaveTypeOptions}
                label="Leave Type"
                theme={{ labelStyle: 'text-sm font-medium text-primaryText' }}
                onChange={e => {
                  if (e) {
                    setLeaveTypeId(e.value);
                    setLeaveType(e.label);
                  }
                }}
                selected={leaveTypeId ? { label: leaveType, value: leaveTypeId } : undefined}
                disabled={leaveDays.length < 1}
              />
              <Textarea
                description="Request Description"
                placeholder="Add some description"
                descriptionClassName="text-sm text-gray-v4 font-medium"
                placeholderClassName="text-sm font-normal"
                textareaClassName="w-full"
                onChange={e => setLeaveDescription(e.target.value)}
                value={leaveDescription}
              />
            </div>
            {error && (
              <div className="text-[#E53935] font-semibold text-xs w-full mx-2">{error}</div>
            )}
          </div>
        )}
      </div>

      {sheet === 2 ? (
        <div className="flex items-center gap-4 mt-12 w-full">
          <Button
            variant="primary"
            type="button"
            className="h-input-default !rounded-2xl text-sm w-1/2"
            onClick={() => setSheet(1)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="button"
            className="h-input-default !rounded-2xl text-sm w-1/2"
            onClick={() => {
              if (leaveDays.length < 1) {
                setError('Please select the date for leave');
              } else if (!leaveTypeId) {
                setError('Please select the leave type');
              } else if (!leaveDescription.length) {
                setError('Please add the request description');
              } else {
                setError('');
                // prepare and send payload
                const payload: ApplyLeavesProps[] = leaveDays.map(d => ({
                  employee_id: onboardingDetails?.employeeData?.id ?? '',
                  leave_type_id: leaveTypeId,
                  date: d.date,
                  is_half_day: d.is_half_day,
                  reason: leaveDescription.trim(),
                  business_id: onboardingDetails?.businessData?.id ?? '',
                }));
                applyLeaves(payload);
              }
            }}
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      ) : (
        <div className="w-full flex justify-end mt-12">
          <Button
            variant="primary"
            type="button"
            className="h-input-default !rounded-2xl text-sm w-52"
            onClick={() => {
              if (leaveDays.length < 1) {
                setError('Please select the date for leave');
              } else if (!leaveTypeId) {
                setError('Please select the leave type');
              } else if (!leaveDescription.length) {
                setError('Please add the request description');
              } else {
                setError('');
                setSheet(2);
              }
            }}
          >
            Next
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default LeaveRequestSheet;
