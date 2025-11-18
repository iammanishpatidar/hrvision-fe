import { Close, Drawer, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { Calendar } from 'lucide-react';
import ReimbursementCard from './ReimbursementCard';

type ReimbursementSideSheetProps = {
  isPayslipOpen: boolean;
  setIsPayslipOpen: (isOpen: boolean) => void;
  setIsForClaim: (value: boolean) => void;
  reimbursementData?: {
    date: string;
    category: string;
    amount: string;
    status: 'Approved' | 'Pending' | 'Cancelled';
  }[];
  setIsReimbursementSheetOpen: (isOpen: boolean) => void;
};

const ReimbursementSideSheet = ({
  isPayslipOpen,
  setIsPayslipOpen,
  reimbursementData,
  setIsReimbursementSheetOpen,
  setIsForClaim,
}: ReimbursementSideSheetProps) => {
  return (
    <Drawer
      isOpen={isPayslipOpen}
      onClose={() => setIsPayslipOpen(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between pl-6 py-6 pr-3"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setIsPayslipOpen(false)}
        >
          <Close />
        </div>
      </div>
      <div className="flex flex-col gap-6 pb-6">
        <Typography
          tag="h3"
          className="font-semibold leading-[32px] text-primary flex items-center justify-between pt-6 pl-0"
        >
          Reimbursement History
          <div>
            <div className="p-1 border border-[#CBCBCB] rounded-md hover:bg-[#F4F9FD]">
              <Calendar size={18} />
            </div>
          </div>
        </Typography>
      </div>
      <div className="flex flex-col overflow-y-auto pr-4">
        {reimbursementData && reimbursementData?.length > 0 ? (
          reimbursementData.map((data, index) => (
            <ReimbursementCard
              key={index}
              date={data.date}
              category={data.category}
              amount={data.amount}
              status={data.status}
              setIsReimbursementSheetOpen={setIsReimbursementSheetOpen}
              setIsForClaim={setIsForClaim}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </Drawer>
  );
};

export default ReimbursementSideSheet;
