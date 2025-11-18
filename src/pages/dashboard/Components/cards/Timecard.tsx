import { useTimerStore } from '@/store/timer-store';
import { formatDuration } from '@/utils/formatTime';
import { useState } from 'react';
import TimeTrackingHistory from '@/components/common/sidesheets/TimeTrackingHistory';

const Timecard = () => {
  const { workingHoursCompleted } = useTimerStore();
  const [isTimeTrackingHistoryOpen, setIsTimeTrackingHistoryOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-100 p-3 w-[262px] h-[171px]">
        <p
          className="text-primary font-semibold text-lg ml-2 cursor-pointer hover:text-primary/80"
          onClick={() => setIsTimeTrackingHistoryOpen(true)}
        >
          Total Logged Time
        </p>
        <p className="text-4xl mt-6 font-semibold flex justify-center">
          {formatDuration(workingHoursCompleted)}
        </p>
        <p className="text-xs text-gray-500 font-normal flex justify-center mt-3">
          Design 40% • Meetings 25%
        </p>
        <p className="text-green-v1 mt-2 text-xs font-medium">+12% from last week</p>
      </div>

      <TimeTrackingHistory
        isOpen={isTimeTrackingHistoryOpen}
        onClose={() => setIsTimeTrackingHistoryOpen(false)}
      />
    </>
  );
};

export default Timecard;
