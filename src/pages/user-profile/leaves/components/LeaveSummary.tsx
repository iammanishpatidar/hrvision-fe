import { Button, Typography, Input } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';

type LeaveSummaryProps = {
  handleClick: () => void;
};

const LeaveSummary: React.FC<LeaveSummaryProps> = ({ handleClick }) => {
  const [leaves, setLeaves] = useState({
    totalLeavesAllotted: '13',
    totalLeavesTaken: '2',
    remainingPaidLeaves: '11',
  });

  // const handleApplyLeave = () => {
  //   setLeaves({
  //     totalLeavesAllotted: '13',
  //     totalLeavesTaken: '2',
  //     remainingPaidLeaves: '11',
  //   });
  // };

  const handleInputChange = (field: keyof typeof leaves, value: string) => {
    setLeaves(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2.5">
          <Typography tag="h4" className="text-primary">
            Leave Summary
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            label="Total Leaves Allotted"
            type="text"
            placeholder="13"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle:
                '!h-[35px] w-full rounded-xl text-sm placeholder:text-sm focus:border-primary ',
            }}
            value={leaves.totalLeavesAllotted}
            onChange={e => handleInputChange('totalLeavesAllotted', e.target.value)}
            disabled
          />
          <Input
            label="Total Leaves Taken"
            type="text"
            placeholder="2"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle:
                '!h-[35px] w-full rounded-xl text-sm placeholder:text-sm focus:border-primary ',
            }}
            value={leaves.totalLeavesTaken}
            onChange={e => handleInputChange('totalLeavesTaken', e.target.value)}
            disabled
          />
          <Input
            label="Remaining Paid Leaves"
            type="text"
            placeholder="7"
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle:
                '!h-[35px] w-full rounded-xl text-sm placeholder:text-sm focus:border-primary ',
            }}
            value={leaves.remainingPaidLeaves}
            onChange={e => handleInputChange('remainingPaidLeaves', e.target.value)}
            disabled
          />
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button
          variant="primary"
          type="button"
          className="!rounded-[16px] w-full h-[44px] text-base font-semibold font-Poppins"
          onClick={handleClick}
        >
          Apply For Leave
        </Button>
      </div>
    </div>
  );
};

export default LeaveSummary;
