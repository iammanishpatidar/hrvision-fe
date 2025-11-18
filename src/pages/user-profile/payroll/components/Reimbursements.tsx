import {
  Button,
  DatePicker,
  Input,
  Textarea,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { ChevronRight } from 'lucide-react';
import Filter from './../../../../../assets/filter.svg';
import { useState } from 'react';
import ReimbursementSideSheet from './ReimbursementSideSheet';
import ClaimReimbursementSheet from './ClaimReimbursementSheet';

const Reimbursements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isForClaim, setIsForClaim] = useState<boolean>(false);

  const reimbursementData = [
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Approved' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Pending' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Cancelled' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Approved' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Approved' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Approved' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Approved' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Approved' as 'Approved' | 'Pending' | 'Cancelled',
    },
    {
      date: '04 Dec, 2023',
      category: 'Travel & Meals',
      amount: 'XX,XXX',
      status: 'Cancelled' as 'Approved' | 'Pending' | 'Cancelled',
    },
  ];

  const [isReimbursementSheetOpen, setIsReimbursementSheetOpen] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <ReimbursementSideSheet
        isPayslipOpen={isOpen}
        setIsPayslipOpen={setIsOpen}
        reimbursementData={reimbursementData}
        setIsReimbursementSheetOpen={setIsReimbursementSheetOpen}
        setIsForClaim={setIsForClaim}
      />
      <ClaimReimbursementSheet
        isReimbursementSheetOpen={isReimbursementSheetOpen}
        setIsReimbursementSheetOpen={setIsReimbursementSheetOpen}
        isForClaim={isForClaim}
      />
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Reimbursements
        </Typography>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            className="min-w-[70px] h-[28px] hover:cursor-pointer !rounded-[10px]"
            onClick={() => {
              setIsForClaim(true);
              setIsReimbursementSheetOpen(true);
            }}
          >
            Raise
          </Button>

          <div className="h-7 hover:cursor-pointer">
            <div className="bg-[#e2e2ee] p-2 rounded-[10px]">
              <img src={Filter} alt="filter" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="Amount"
          type="text"
          placeholder="Enter amount"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />

        <DatePicker
          className="w-full"
          label="Date"
          mode="single"
          placeholder="Enter your birth date"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value={new Date('2001-02-28')}
          onChange={() => {}}
          disabled
        />

        <Input
          label="Status"
          type="text"
          placeholder="Enter status"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="Pending"
          disabled
        />
        <Textarea
          description="Description"
          placeholder="Enter description"
          descriptionClassName="text-xs text-primaryText font-medium"
          placeholderClassName="text-xs font-normal"
          textareaClassName="w-full h-[72px]"
          value="Travel expenses for client meeting in Delhi on April 5th – includes cab fare and meals."
        />
      </div>
      <div
        className="text-primary underline text-sm mt-3 font-normal flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography tag="t4" className="text-primary hover:cursor-pointer">
          View History
        </Typography>
        <ChevronRight size={14} color="#444291" />
      </div>
    </div>
  );
};

export default Reimbursements;
