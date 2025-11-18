import { Close, Drawer, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { Calendar } from 'lucide-react';
import PaySlipCard from './PaySlipCard';

type PaySlipSideSheetProps = {
  isPayslipOpen: boolean;
  setIsPayslipOpen: (isOpen: boolean) => void;
};
const PaySlipSideSheet = ({ isPayslipOpen, setIsPayslipOpen }: PaySlipSideSheetProps) => {
  const salaryData = [
    { month: 'March 2022', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'February 2022', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'January 2022', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'December 2021', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'November 2021', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'November 2021', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'November 2021', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'November 2021', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
    { month: 'November 2021', grossSalary: '₹XX,XXX', netSalary: '₹XX,XXX' },
  ];

  return (
    <Drawer
      isOpen={isPayslipOpen}
      onClose={() => setIsPayslipOpen(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] py-6"
    >
      <div className="flex flex-col gap-8 mb-6 px-6">
        <div className="flex justify-end">
          <div
            className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
            onClick={() => setIsPayslipOpen(false)}
          >
            <Close />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Typography tag="h3" className="text-primary ">
            Payslip History
          </Typography>
          <div className="p-1 border border-[#CBCBCB] rounded-md">
            <Calendar size={18} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 h-[610px] overflow-y-auto px-6">
        <div className="flex flex-col">
          {salaryData.map((data, index) => (
            <PaySlipCard
              key={index}
              month={data.month}
              grossSalary={data.grossSalary}
              netSalary={data.netSalary}
            />
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default PaySlipSideSheet;
