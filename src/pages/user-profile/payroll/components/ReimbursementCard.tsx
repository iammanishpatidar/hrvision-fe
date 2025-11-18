import { ChevronRight, Download } from 'lucide-react';

type ReimbursementCardProps = {
  date: string;
  category: string;
  amount: string;
  status: 'Approved' | 'Pending' | 'Cancelled';
  setIsReimbursementSheetOpen: (isOpen: boolean) => void;
  setIsForClaim: (value: boolean) => void;
};

const ReimbursementCard = ({
  date,
  category,
  amount,
  status,
  setIsReimbursementSheetOpen,
  setIsForClaim,
}: ReimbursementCardProps) => {
  const statusColors: { [key in 'Approved' | 'Pending' | 'Cancelled']: string } = {
    Approved: 'text-[#43A047]',
    Pending: 'text-[#D2B674]',
    Cancelled: 'text-[#E53935]',
  };

  return (
    <div className="bg-white hover:shadow-md rounded-lg px-4 pb-4 pt-2 mb-4 border border-gray-v9">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{date}</span>
        <button className="text-gray-500 hover:bg-[#F4F9FD] rounded-[14px] p-1.5">
          <Download />
        </button>
      </div>

      <div className="text-xs text-primaryText">
        {category}
        <span className="text-sm font-semibold text-[#000] ml-1">- ₹{amount}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className={`text-xs font-bold ${statusColors[status]}`}>{status}</div>
        <div
          className="flex hover:underline"
          onClick={() => {
            setIsForClaim(false);
            setIsReimbursementSheetOpen(true);
          }}
        >
          <button className="text-primary text-sm">View Documents</button>
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  );
};

export default ReimbursementCard;
