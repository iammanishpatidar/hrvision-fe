import {
  Close,
  Drawer,
  Typography,
  Dropdown,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { TimeTrackingService } from '@/apis/services/TimeTrackingService';
import useAdminStore from '@/store/admin-store';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useMemo } from 'react';

interface TimeTrackingHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeTrackingHistory: React.FC<TimeTrackingHistoryProps> = ({ isOpen, onClose }) => {
  const { onboardingDetails } = useAdminStore();
  const userId = onboardingDetails?.employeeData?.id || '';

  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // Generate month options for the last 12 months
  const monthOptions = useMemo(() => {
    const options = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      options.push({
        label: monthLabel,
        value: monthKey,
      });
    }

    return options;
  }, []);

  // Set current month as default when sheet opens
  useEffect(() => {
    if (isOpen && monthOptions.length > 0) {
      const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
      setSelectedMonth(currentMonth);
    }
  }, [isOpen, monthOptions]);

  const {
    data: timeTrackingHistory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['timeTrackingHistory', userId],
    queryFn: () => TimeTrackingService.fetchTimeTracking(userId),
    enabled: !!userId && isOpen,
  });

  const formatTimeRange = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  };

  // Filter time tracking data by selected month
  const filteredTimeTrackingData = useMemo(() => {
    if (!timeTrackingHistory?.data?.time_trackings || !selectedMonth) {
      return [];
    }

    return timeTrackingHistory.data.time_trackings.filter((tracking: any) => {
      if (!tracking.endTime || !tracking.date) return false;

      const trackingDate = new Date(tracking.date);
      const trackingMonth = `${trackingDate.getFullYear()}-${String(trackingDate.getMonth() + 1).padStart(2, '0')}`;

      return trackingMonth === selectedMonth;
    });
  }, [timeTrackingHistory?.data?.time_trackings, selectedMonth]);

  const handleMonthChange = (selected: any) => {
    if (selected?.value) {
      setSelectedMonth(selected.value);
    }
  };
  console.log(filteredTimeTrackingData, 'filteredTimeTrackingData');
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex justify-end">
          <div
            className="cursor-pointer hover:bg-custom-blue-v2 p-2 rounded-[14px]"
            onClick={onClose}
          >
            <Close />
          </div>
        </div>
        <div className="flex flex-col gap-6 h-full px-2">
          <div className="flex items-center justify-between">
            <Typography tag="h3" className="text-primary">
              History
            </Typography>
          </div>
          <div className="w-full  h-full flex flex-col gap-4">
            {isLoading && (
              <Typography tag="t5" className="text-gray-500 text-center">
                Loading time tracking history...
              </Typography>
            )}

            {error && (
              <Typography tag="t5" className="text-red-500 text-center">
                Failed to load time tracking history
              </Typography>
            )}
            <Dropdown
              options={monthOptions}
              selected={monthOptions.find(option => option.value === selectedMonth)}
              onChange={handleMonthChange}
              placeholder="Select Month"
              label="Select Month"
              theme={{
                labelStyle: 'text-sm font-medium text-primaryText',
              }}
            />
            {filteredTimeTrackingData.map((tracking: any, index: number) => (
              <div
                key={tracking.id || index}
                className="bg-white rounded-lg border border-gray-100 p-2 shadow-sm"
              >
                <div className="flex items-center gap-2 justify-between py-2">
                  <div>
                    <Typography tag="h6" className="font-semibold text-gray-900">
                      {new Date(tracking.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      : {tracking.projectName} - {tracking.taskName} - {tracking.workDescription} (
                      {formatTimeRange(tracking.startTime, tracking.endTime)})
                    </Typography>
                  </div>
                </div>
              </div>
            ))}

            {!isLoading && !error && filteredTimeTrackingData.length === 0 && (
              <Typography tag="t5" className="text-gray-500 text-center">
                No completed time tracking history found for the selected month
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end border-t border-gray-v2 p-6"></div>
    </Drawer>
  );
};

export default TimeTrackingHistory;
