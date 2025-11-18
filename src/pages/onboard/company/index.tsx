import { Button, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BasicCompanyInfo, BasicCompanyInfoRef } from './BasicCompanyInfo';
import CompanyAdressInfo, { CompanyAddressInfoRef } from './CompanyAdressInfo';
import Stepper from '@/components/Stepper/Stepper';
import useAdminStore from '@/store/admin-store';

const Company: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [pageTitle, setPageTitle] = useState<string>('Company Profile Overview');
  const { onboardingDetails } = useAdminStore();
  const IsInvited = onboardingDetails?.employeeData?.invited;
  

  const basicInfoRef = useRef<BasicCompanyInfoRef>(null);
  const addressInfoRef = useRef<CompanyAddressInfoRef>(null);

  const pageSteps = [
    {
      id: '1',
      label: 'Company Profile Overview',
      value: 'company_basic_information',
    },
    {
      id: '2',
      label: 'Company Address Information',
      value: 'company_address_information',
    },
  ];

  useEffect(() => {
    if(IsInvited) {
      navigate('/onboard/employee/?step=basic_information')
    }
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const stepIndex = pageSteps.findIndex(step => step.value === stepParam);
      if (stepIndex !== -1) {
        setActiveStep(stepIndex);
        setPageTitle(pageSteps[stepIndex].label);
      } else {
        setSearchParams({ step: pageSteps[0].value });
      }
    } else {
      setSearchParams({ step: pageSteps[0].value });
    }
  }, [searchParams]);

  const handleStepClick = async (step: number) => {
    if (step === activeStep) return;

    let isValid = true;

    if (step > activeStep) {
      if (activeStep === 0) {
        isValid = (await basicInfoRef.current?.validate()) || false;
      } else if (activeStep === 1) {
        isValid = (await addressInfoRef.current?.validate()) || false;
      }

      if (!isValid) return;
    }

    setSearchParams({ step: pageSteps[step].value });
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setSearchParams({ step: pageSteps[activeStep - 1].value });
    } else {
      navigate('/signup');
    }
  };

  const handleNextStep = () => {
    if (activeStep === 0) {
      const isValid = basicInfoRef.current?.validate();
      if (!isValid) {
        return;
      }
    }

    if (activeStep === 1) {
      const isValid = addressInfoRef.current?.validate();
      if (!isValid) {
        return;
      }
    }

    if (activeStep < pageSteps.length - 1) {
      setSearchParams({ step: pageSteps[activeStep + 1].value });
    } else {
      navigate(`/onboard/employee?step=basic_information`);
    }
  };

  return (
    <>
      <form className="flex flex-grow flex-col gap-10 justify-center items-center w-full px-9 py-5">
        <div className="mt-10 flex flex-col gap-3.5">
          <Typography tag="t4" className="text-base font-semibold text-blueCyan text-center">
            STEP 3/4
          </Typography>
          <Typography tag="h2" className="text-center text-gradient-primary p-2">
            {pageTitle}
          </Typography>
        </div>

        <div
          className={` ${
            activeStep === 0
              ? 'flex flex-col gap-5 flex-grow w-[400px]'
              : 'flex-grow w-full overflow-y-auto'
          } `}
        >
          {activeStep === 0 && <BasicCompanyInfo ref={basicInfoRef} />}
          {activeStep === 1 && <CompanyAdressInfo ref={addressInfoRef} />}
        </div>

        <Stepper activeStep={activeStep} steps={pageSteps} onStepClick={handleStepClick} />
      </form>

      <div className="flex justify-between items-center w-full py-5 px-6 flex-nowrap border-t border-[#E4E6E8]">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={activeStep === 0}
          className={`${activeStep === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
          Previous
        </Button>
        <div className="text-base font-normal text-right text-primaryText">@2025 FibonacciX</div>
        <Button variant="primary" onClick={handleNextStep} className="cursor-pointer">
          Next
        </Button>
      </div>
    </>
  );
};

export default Company;
