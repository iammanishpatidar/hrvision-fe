import { totalWorkingHours } from '@/pages/user-profile/mockData';
import { TimeTrackingService } from '@/apis/services/TimeTrackingService';
import { handleToast } from '@/utils/toastUtils';
import { useTimerStore } from '@/store/timer-store';
import {
  Button,
  Close,
  Drawer,
  TimeTracking,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import useAdminStore from '@/store/admin-store';

interface StopTimeTractingSheetProps {
  isOpen: boolean;
  toggleDrawer: (sheetName: string) => void;
  onClose: (sheetName: string) => void;
  workingHoursCompleted: number;
  handleStopTimer: () => void;
}

const StopTimeTractingSheet: React.FC<StopTimeTractingSheetProps> = ({
  isOpen,
  toggleDrawer,
  onClose,
  workingHoursCompleted,
  handleStopTimer,
}) => {
  const { onboardingDetails } = useAdminStore();
  const { timeTrackingData, clearStartTimerStates } = useTimerStore();
  const userId = onboardingDetails?.employeeData?.id || '';
  console.log(timeTrackingData, 'timeTrackingData');

  const { mutate: stopTimeTracking, isPending } = useMutation({
    mutationFn: async () => {
      return await TimeTrackingService.stopTimeTracking(
        userId,
        timeTrackingData?.data?.time_tracking?.id
      );
    },
    onSuccess: () => {
      handleToast({
        message: 'Time tracking stopped successfully',
        status: 'success',
      });
      clearStartTimerStates(); // Clear the start timer states
      handleStopTimer();
      onClose('stopTimeTracking');
    },
    onError: () => {
      handleToast({
        message: 'Failed to stop time tracking',
        status: 'error',
      });
    },
  });

  const handleStopTimeTracking = () => {
    stopTimeTracking();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => onClose('stopTimeTracking')}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex justify-end">
          <div
            className="cursor-pointer hover:bg-custom-blue-v2 p-2 rounded-[14px]"
            onClick={() => toggleDrawer('stopTimeTracking')}
          >
            <Close />
          </div>
        </div>
        <div className="flex flex-col gap-6 h-full px-6">
          <Typography tag="h3" className="text-primary">
            Time Tracking
          </Typography>
          <TimeTracking
            totalTimeInSeconds={totalWorkingHours}
            activeTimeInSeconds={workingHoursCompleted}
          />
          <div>
            <ul>
              <li className="flex items-start gap-2">
                <Typography tag="t5" className="text-gray-v3 font-semibold min-w-max">
                  Task Mode:
                </Typography>
                <Typography tag="t5" className="text-gray-v3 font-normal">
                  {timeTrackingData?.data?.time_tracking?.taskMode}
                </Typography>
              </li>

              <li className="flex items-start gap-2">
                <Typography tag="t5" className="text-gray-v3 font-semibold min-w-max">
                  Project Name:
                </Typography>
                <Typography tag="t5" className="text-gray-v3 font-normal">
                  {timeTrackingData?.data?.time_tracking?.projectName}
                </Typography>
              </li>

              <li className="flex items-start gap-2">
                <Typography tag="t5" className="text-gray-v3 font-semibold min-w-max">
                  Task Name:
                </Typography>
                <Typography tag="t5" className="text-gray-v3 font-normal">
                  {timeTrackingData?.data?.time_tracking?.taskName}
                </Typography>
              </li>

              <li className="flex items-start gap-2">
                <Typography tag="t5" className="text-gray-v3 font-semibold min-w-max">
                  Start Date:
                </Typography>
                <Typography tag="t5" className="text-gray-v3 font-normal">
                  {new Date(timeTrackingData?.data?.time_tracking.date).toLocaleDateString()}
                </Typography>
              </li>

              <li className="flex items-start gap-2">
                <Typography tag="t5" className="text-gray-v3 font-semibold min-w-max">
                  Start Time:
                </Typography>
                <Typography tag="t5" className="text-gray-v3 font-normal">
                  {new Date(timeTrackingData?.data?.time_tracking.startTime).toLocaleTimeString()}
                </Typography>
              </li>

              <li className="inline-block">
                <Typography tag="t5" className="text-gray-v3 font-semibold min-w-max h-fit">
                  Work Description:
                </Typography>
                <Typography tag="t5" className="text-gray-v3 font-normal">
                  {timeTrackingData?.data?.time_tracking?.workDescription}
                </Typography>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end border-t border-gray-v2 p-6">
        <Button
          variant="error"
          type="button"
          className="h-input-default !rounded-2xl text-sm w-52"
          onClick={handleStopTimeTracking}
          disabled={isPending}
        >
          {isPending ? 'Stopping...' : 'Stop Timer'}
        </Button>
      </div>
    </Drawer>
  );
};

export default StopTimeTractingSheet;
