import { OnboardingService } from '@/apis/services/OnboardingService';
import Stepper from '@/components/Stepper/Stepper';
import useAdminStore from '@/store/admin-store';
import { IEmployee } from '@/types';
import { useUser } from '@clerk/clerk-react';
import { Button, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BasicInformation from './BasicInformation';
import ContactInformation from './ContactInformation';
import EmergencyContactInformation from './EmergencyContactInformation';

const Employee: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    adminDetails,
    businessDetails,
    onboardingDetails,
    setAdminDetails,
    setSameAsPermanentAddress,
    refreshEmployeeBusinessInfo,
  } = useAdminStore();
  const [activeStep, setActiveStep] = useState(0);
  const [pageTitle, setPageTitle] = useState('Basic Information');
  const [triedSubmit, setTriedSubmit] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => () => setSameAsPermanentAddress(false), []);

  const pageSteps = [
    { id: '1', label: 'Basic Information', value: 'basic_information' },
    { id: '2', label: 'Contact Information', value: 'contact_information' },
    { id: '3', label: 'Emergency Contact Information', value: 'emergency_contact_information' },
  ];

  useEffect(() => {
    const stepParam = searchParams.get('step');
    const idx = pageSteps.findIndex(s => s.value === stepParam);
    if (idx !== -1) {
      setActiveStep(idx);
      setPageTitle(pageSteps[idx].label);
    } else {
      setSearchParams({ step: pageSteps[0].value });
    }
  }, [searchParams]);

  const handleStepClick = (step: number) => {
    if (step > activeStep) {
      setTriedSubmit(true);
      if (!validateStep()) return;
      setTriedSubmit(false);
    }
    setSearchParams({ step: pageSteps[step].value });
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setSearchParams({ step: pageSteps[activeStep - 1].value });
    } else {
      navigate('/onboard/company');
    }
  };

  const validateStep = (): boolean => {
    if (activeStep === 0) {
      return !!(
        adminDetails?.gender &&
        adminDetails?.marital_status &&
        adminDetails?.date_of_birth
      );
    }
    if (activeStep === 1) {
      const pa = adminDetails?.permanent_address;
      return !!(
        adminDetails?.contact_number &&
        pa?.line1 &&
        pa.country &&
        pa.state &&
        pa.city &&
        pa.zipcode
      );
    }
    if (activeStep === 2) {
      const ec = adminDetails?.emergency_contact;
      // List all required fields
      const requiredFields = [
        ec?.name,
        ec?.relationship,
        ec?.contact_number,
        ec?.address?.line1,
        ec?.address?.country,
        ec?.address?.state,
        ec?.address?.city,
        ec?.address?.zipcode,
      ];
      const anyFieldFilled = requiredFields.some(field => field && field !== '');
      if (!anyFieldFilled) {
        return true;
      }
      const allFieldsFilled = requiredFields.every(field => field && field !== '');
      return allFieldsFilled;
    }
    return true;
  };

  const { mutate } = useMutation({
    // mutationFn: (data: any) => OnboardingService.createBusiness(data),
    mutationFn: (data: any) => {
      const IsInvited = onboardingDetails?.employeeData?.invited;
      const id = onboardingDetails?.employeeData?.id;
      const rest = OnboardingService.createBusiness(data);
      
      if (!IsInvited && IsInvited !== undefined) {
        
        return OnboardingService.createBusiness(data);
      } else {
      
        return OnboardingService.updateEmployee(data, id);
      }
      
    },
    onSuccess: res => {
      refreshEmployeeBusinessInfo(res.data.employee.clerk_id);
      navigate(`/onboard/register-success/${res.data.employee.id}`);
    },
    onError: e => console.error('Onboarding error', e),
  });
  const handleNextStep = () => {
    if (activeStep < pageSteps.length - 1) {
      setSearchParams({ step: pageSteps[activeStep + 1].value });
    } else {
      if (user) {
        const payload = {
          name: businessDetails?.name,
          email: businessDetails?.email,
          contact_number: businessDetails?.contact_number,
          address: businessDetails?.address,
          website: businessDetails?.domain_name,
          business_sector: businessDetails?.business_sector,
          address_id: businessDetails?.address_id,
          admin: {
            clerk_id: user.id,
            marital_status: adminDetails?.marital_status,
            date_of_birth: adminDetails?.date_of_birth
              ? adminDetails.date_of_birth instanceof Date
                ? adminDetails.date_of_birth.toISOString().split('T')[0]
                : new Date(adminDetails.date_of_birth).toISOString().split('T')[0]
              : undefined,
            blood_group: adminDetails?.blood_group.toUpperCase(),
            contact_number: adminDetails?.contact_number,
            permanent_address: adminDetails?.permanent_address,
            current_address: adminDetails?.current_address,
            emergency_contact: adminDetails?.emergency_contact,
            name: user?.fullName,
            gender: adminDetails?.gender,
            religion: adminDetails?.religion,
            email: adminDetails?.email,
          },
        };
        mutate(payload);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleNextStep}
        className="flex flex-grow flex-col gap-10 justify-center items-center w-full h-full px-9 py-5 overflow-hidden"
      >
        <div className="mt-10 flex flex-col gap-3.5">
          <Typography tag="t4" className="text-base font-semibold text-blueCyan text-center">
            STEP {activeStep + 1}/{pageSteps.length}
          </Typography>
          <Typography tag="h2" className="text-center text-gradient-primary p-2">
            {pageTitle}
          </Typography>
        </div>

        <div className="flex-grow w-full overflow-y-auto">
          {activeStep === 0 && (
            <BasicInformation
              employee={adminDetails!}
              setEmployee={setAdminDetails}
              triedSubmit={triedSubmit}
            />
          )}
          {activeStep === 1 && (
            <ContactInformation
              employee={adminDetails as IEmployee}
              setEmployee={setAdminDetails}
              triedSubmit={triedSubmit}
            />
          )}
          {activeStep === 2 && <EmergencyContactInformation />}
        </div>

        <Stepper activeStep={activeStep} steps={pageSteps} onStepClick={handleStepClick} />
      </form>

      <div className="flex justify-between items-center w-full py-5 px-6 border-t border-[#E4E6E8]">
        <Button variant="outline" onClick={handlePreviousStep}>
          Previous
        </Button>
        <div className="text-base font-normal text-primaryText">@2025 FibonacciX</div>
        <Button variant="primary" onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Employee;
