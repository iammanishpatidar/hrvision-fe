import { Input, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { ChevronRight } from 'lucide-react';
import Download from './../../../../../assets/downlaod.svg';
import { useState } from 'react';
import PaySlipSideSheet from './PayslipSideSheet';
import { payrollHistory } from '../../mockData';
import PayrollSheet from './PayrollSheet';
import PayrollDetailsSheet from './PayrollDetailsSheet';

const LastPayslip = () => {
  const [paySlipDrawerOpen, setPaySlipDrawerOpen] = useState(false);
  const [showPayrollSheet, setShowPayrollSheet] = useState<boolean>(false);
  const [showPayrollDetailsSheet, setShowPayrollDetailsSheet] = useState<boolean>(false);
  const [selectedPayrollItem, setSelectedPayrollItem] = useState<any>();

  return (
    <div className="bg-white rounded-2xl py-6 size-full shadow-sm border border-gray-v2">
      <div className="px-6">
        <PaySlipSideSheet
          isPayslipOpen={paySlipDrawerOpen}
          setIsPayslipOpen={setPaySlipDrawerOpen}
        />
        <div className="flex items-center justify-between mb-2.5">
          <Typography tag="h4" className="text-primary">
            Payslip
          </Typography>

          <img src={Download} alt="download" />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label="Month"
            type="text"
            placeholder="Enter Month"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value="March 2025"
            disabled
          />
          <Input
            label="Net Pay"
            type="text"
            placeholder="Enter net pay"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value="₹XX,XXX"
            disabled
          />
        </div>
        <div
          className="text-primary underline text-sm mt-3 font-normal flex items-center"
          onClick={() => {
            setPaySlipDrawerOpen(true);
          }}
        >
          <Typography tag="t4" className="text-primary hover:cursor-pointer">
            Payslip History
          </Typography>
          <ChevronRight size={14} color="#444291" />
        </div>
      </div>
      <div className="h-[1px] my-3 bg-gray-v2" />
      <div className="px-6 space-y-2.5">
        <Typography tag="h4" className="text-primary">
          Payroll
        </Typography>
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
        <div
          className="text-primary underline text-sm mt-3 font-normal flex items-center"
          onClick={() => {
            setShowPayrollSheet(true);
          }}
        >
          <Typography tag="t4" className="text-primary hover:cursor-pointer">
            Payroll History
          </Typography>
          <ChevronRight size={14} color="#444291" />
        </div>
      </div>
      <PayrollSheet
        setShowPayrollSheet={setShowPayrollSheet}
        showPayrollSheet={showPayrollSheet}
        setShowPayrollDetailsSheet={setShowPayrollDetailsSheet}
        setSelectedPayrollItem={setSelectedPayrollItem}
      />
      <PayrollDetailsSheet
        showPayrollDetailsSheet={showPayrollDetailsSheet}
        setShowPayrollDetailsSheet={setShowPayrollDetailsSheet}
        selectedPayrollItem={selectedPayrollItem}
      />
    </div>
  );
};

export default LastPayslip;
