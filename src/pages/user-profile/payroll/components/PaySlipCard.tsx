import { Download } from 'lucide-react';

interface PaySlipCardProps {
  month: string;
  grossSalary: string;
  netSalary: string;
}
const PaySlipCard = ({ month, grossSalary, netSalary }: PaySlipCardProps) => {
  return (
    <div className="bg-white hover:shadow-md rounded-lg px-4 pb-4 pt-1 mb-4 border border-gray-v9">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">{month}</h3>
        <button className="text-gray-500 hover:bg-[#F4F9FD] rounded-[14px] p-2">
          <Download />
        </button>
      </div>
      <div className="text-primaryText text-xs">
        <p>Gross Salary: {grossSalary}</p>
        <p>Net Salary: {netSalary}</p>
      </div>
    </div>
  );
};

export default PaySlipCard;
