import { OnboardingService } from '@/apis/services/OnboardingService';
import useAdminStore from '@/store/admin-store';
import { useEffect, useState } from 'react';
import AddressInfo from './components/AddressInfo';
import ContactInfo from './components/ContactInfo';
import EmergencyContact from './components/EmergencyContact';
import PersonalInformation from './components/PersonalInformation';

const PersonalDetails = () => {
  const { onboardingDetails } = useAdminStore();
  const [employeeData, setEmployeeData] = useState(onboardingDetails?.employeeData);

  useEffect(() => {
    if (onboardingDetails?.employeeData?.clerk_id) {
      const getEmployeeData = async (id: string) => {
        const res = await OnboardingService.getEmployeeBusinessInfo(id);
        setEmployeeData(res.data.admin_employee);
      };
      getEmployeeData(onboardingDetails.employeeData?.clerk_id);
    }
  }, [onboardingDetails?.employeeData?.clerk_id]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full gap-10 h-[300px]">
        <div className="w-2/3 h-full">
          <PersonalInformation employeeData={employeeData} />
        </div>
        <div className="w-1/3 h-full">
          <ContactInfo employeeData={employeeData} />
        </div>
      </div>
      <div className="flex size-full items-center gap-10 h-[620px]">
        <div className="w-1/2 h-full">
          <AddressInfo employeeData={employeeData} />
        </div>
        <div className="w-1/2 h-full">
          <EmergencyContact employeeData={employeeData} />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
