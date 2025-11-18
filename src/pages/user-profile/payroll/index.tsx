import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';
import { useQuery } from '@tanstack/react-query';
import Allowances from './components/Allowances';
import BankDetails, { BankDetailsType } from './components/BankDetails';
import Bonus from './components/Bonus';
import CurrentSalary from './components/CurrentSalary';
import LastPayslip from './components/LastPayslip';
import Reimbursements from './components/Reimbursements';

const Payroll = () => {
  const { onboardingDetails } = useAdminStore();
  const { data: bankDetails } = useQuery<BankDetailsType>({
    queryKey: ['bankDetails'],
    queryFn: async () => {
      const res = await UserProfileService.getBankDetails(onboardingDetails?.employeeData?.id ?? '');
      return res.data;
    },
    enabled: !!onboardingDetails?.employeeData?.id,
  });

  const { data: currentSalary } = useQuery({
    queryKey: ['currentSalary'],
    queryFn: () => UserProfileService.getCurrentSalary(onboardingDetails?.employeeData?.id ?? ''),
    enabled: !!onboardingDetails?.employeeData?.id,
  });
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full gap-10 h-[425px]">
        <div className="w-1/3 h-full">
          <CurrentSalary currentSalary={currentSalary} />
        </div>
        <div className="w-1/3 h-full">
          <Allowances />
        </div>
        <div className="w-1/3 h-full">
          <Bonus />
        </div>
      </div>
      <div className="flex w-full gap-10 h-[500px]">
        <div className="w-1/3 h-full">
          <Reimbursements />
        </div>
        <div className="w-1/3 h-full">
          <BankDetails details={bankDetails!} />
        </div>
        <div className="w-1/3 h-full">
          <LastPayslip />
        </div>
      </div>
    </div>
  );
};

export default Payroll;
