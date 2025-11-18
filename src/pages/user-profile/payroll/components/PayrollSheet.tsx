import { Close, Drawer, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { Calendar } from 'lucide-react';
import Download from './../../../../../assets/downlaod.svg';
import { ChevronRight } from 'lucide-react';
import React from 'react';

type PayrollSheetProps = {
  showPayrollSheet: boolean;
  setShowPayrollSheet: (isOpen: boolean) => void;
  setShowPayrollDetailsSheet: (isOpen: boolean) => void;
  setSelectedPayrollItem: (item: any) => void;
};

const PayrollSheet: React.FC<PayrollSheetProps> = ({
  showPayrollSheet,
  setShowPayrollSheet,
  setShowPayrollDetailsSheet,
  setSelectedPayrollItem,
}) => {
  const payrollHistory = [
    {
      month: 'January',
      date: '06 January, 2022',
      netPay: '₹50,000',
      hike: '0%',
      netSalary: '₹50,000',
    },
    {
      month: 'July',
      date: '06 July, 2022',
      netPay: '₹50,000',
      hike: '0%',
      netSalary: '₹50,000',
    },
    {
      month: 'January',
      date: '06 January, 2023',
      netPay: '₹55,000',
      hike: '10%',
      netSalary: '₹55,000',
    },
    {
      month: 'July',
      date: '06 July, 2023',
      netPay: '₹55,000',
      hike: '0%',
      netSalary: '₹55,000',
    },
    {
      month: 'January',
      date: '06 January, 2024',
      netPay: '₹60,500',
      hike: '10%',
      netSalary: '₹60,500',
    },
    {
      month: 'July',
      date: '06 July, 2024',
      netPay: '₹60,500',
      hike: '0%',
      netSalary: '₹60,500',
    },
    {
      month: 'January',
      date: '06 January, 2025',
      netPay: '₹66,550',
      hike: '10%',
      netSalary: '₹66,550',
    },
  ];

  return (
    <Drawer
      isOpen={showPayrollSheet}
      onClose={() => setShowPayrollSheet(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col p-6"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setShowPayrollSheet(false)}
        >
          <Close />
        </div>
      </div>
      <div className="flex flex-col gap-6 overflow-y-auto py-6">
        <Typography tag="h3" className="text-primary flex items-center justify-between">
          Payroll History
          <div>
            <div className="p-1 border border-[#CBCBCB] rounded-md">
              <Calendar size={18} />
            </div>
          </div>
        </Typography>
        <div className="space-y-2">
          {payrollHistory.map((history, index) => (
            <div
              className="px-[18px] py-2.5 rounded-[14px] border border-gray-v9 space-y-1"
              key={index}
            >
              <div className="flex items-center justify-between">
                <Typography tag="t5">{history.date}</Typography>
                <img src={Download} alt="download" />
              </div>
              <div className="flex items-center justify-between">
                <Typography tag="t5" className="font-normal text-primaryText">
                  Net Pay : {history.netPay}
                </Typography>
                <div
                  className="text-primary underline text-sm flex items-center"
                  onClick={() => {
                    setSelectedPayrollItem(history);
                    setShowPayrollDetailsSheet(true);
                  }}
                >
                  <Typography tag="t5" className="text-primary hover:cursor-pointer font-normal">
                    View Details
                  </Typography>
                  <ChevronRight size={14} color="#444291" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default PayrollSheet;
