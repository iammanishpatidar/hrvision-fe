import { totalWorkingHours } from '@/pages/user-profile/mockData';
import { TimeTrackingService } from '@/apis/services/TimeTrackingService';
import { handleToast } from '@/utils/toastUtils';
import useAdminStore from '@/store/admin-store';
import { useTimerStore } from '@/store/timer-store';
import {
  Button,
  Close,
  Drawer,
  Input,
  Textarea,
  TimeTracking,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

interface StartTimeTrackingSheetProps {
  isOpen: boolean;
  toggleDrawer: (sheetName: string) => void;
  onClose: (sheetName: string) => void;
  handleStartTimer: () => void;
}

const StartTimeTrackingSheet: React.FC<StartTimeTrackingSheetProps> = ({
  isOpen,
  toggleDrawer,
  onClose,
  handleStartTimer,
}) => {
  const [taskMode, setTaskMode] = useState('');
  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const { onboardingDetails } = useAdminStore();
  const userId = onboardingDetails?.employeeData?.id || '';
  const { setTimeTrackingData, timeTrackingData } = useTimerStore();
  const { mutate: createTimeTracking, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      return await TimeTrackingService.createTimeTracking(payload, userId);
    },
    onSuccess: data => {
      setTimeTrackingData(data);
      handleToast({
        message: 'Time tracking started successfully',
        status: 'success',
      });
      handleStartTimer();
      onClose('startTimeTracking');
    },
    onError: () => {
      handleToast({
        message: 'Failed to start time tracking',
        status: 'error',
      });
    },
  });

  const handleStartTimeTracking = () => {
    const payload = {
      task_mode: taskMode,
      project_name: projectName,
      task_name: taskName,
      work_description: workDescription,
      date: new Date().toISOString().split('T')[0],
      employee_id: onboardingDetails?.employeeData?.id,
    };
    createTimeTracking(payload);
  };

  // Clear states when component mounts
  useEffect(() => {
    setTaskMode('');
    setProjectName('');
    setTaskName('');
    setWorkDescription('');
  }, []);

  // Clear states when timeTrackingData becomes null (when timer is stopped)
  useEffect(() => {
    if (timeTrackingData === null) {
      setTaskMode('');
      setProjectName('');
      setTaskName('');
      setWorkDescription('');
    }
  }, [timeTrackingData]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => onClose('startTimeTracking')}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex justify-end">
          <div
            className="cursor-pointer hover:bg-custom-blue-v2 p-2 rounded-[14px]"
            onClick={() => toggleDrawer('startTimeTracking')}
          >
            <Close />
          </div>
        </div>
        <div className="flex flex-col gap-6 h-full px-6">
          <Typography tag="h3" className="text-primary">
            Time Tracking
          </Typography>
          <TimeTracking totalTimeInSeconds={totalWorkingHours} activeTimeInSeconds={0} />
          <div className="w-full overflow-y-auto flex flex-col gap-4">
            <Input
              theme={{
                labelStyle: 'text-primaryText text-sm font-medium',
                inputStyle: 'h-12 text-sm font-normal',
              }}
              label="Task Mode"
              placeholder="Select Task Mode"
              className="w-full"
              type="text"
              value={taskMode}
              onChange={e => setTaskMode(e.target.value)}
            />
            <Input
              theme={{
                labelStyle: 'text-primaryText text-sm font-medium',
                inputStyle: 'h-12 text-sm font-normal',
              }}
              label="Project Name"
              placeholder="Enter project name"
              className="w-full"
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
            />
            <Input
              theme={{
                labelStyle: 'text-primaryText text-sm font-medium',
                inputStyle: 'h-12 text-sm font-normal',
              }}
              label="Task Name"
              placeholder="Enter task name"
              className="w-full"
              type="text"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
            />

            <Input
              theme={{
                labelStyle: 'text-primaryText text-sm font-medium',
                inputStyle: 'text-sm w-60',
              }}
              label="Date"
              type="text"
              value={new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              disabled={true}
            />
            <Textarea
              description="Work description"
              placeholder="Add some description of the work"
              descriptionClassName="text-sm text-primaryText font-medium"
              placeholderClassName="text-sm font-normal"
              textareaClassName="w-full"
              value={workDescription}
              onChange={e => setWorkDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end border-t border-gray-v2 p-6">
        <Button
          variant="success"
          type="button"
          className="h-input-default !rounded-2xl text-sm w-52"
          onClick={handleStartTimeTracking}
          disabled={isPending}
        >
          {isPending ? 'Starting...' : 'Start Timer'}
        </Button>
      </div>
    </Drawer>
  );
};

export default StartTimeTrackingSheet;
