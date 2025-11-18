import { OnboardingService } from '@/apis/services/OnboardingService';
import useAdminStore from '@/store/admin-store';
import { IAllWorkingDays } from '@/types';
import { handleToast } from '@/utils/toastUtils';
import {
  Button,
  Input,
  Pen,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

const useWorkingDays = () => {
  const { allWorkingDays, setAllWorkingDays, workingDays, setWorkingDays } = useAdminStore();
  const [updatingWorkingDayId, setUpdatingWorkingDayId] = useState<string | null>(null);

  const fetchAllWorkingDays = useMutation({
    mutationFn: () => OnboardingService.getAllWorkingDays(),
    onSuccess: (data: any) => {
      setAllWorkingDays(data.working_days);
    },
    onError: () => {
      handleToast({
        message: 'Failed to fetch working days',
        status: 'error',
      });
    },
  });

  const fetchBusinessWorkingDays = useMutation({
    mutationFn: (businessId: string) => OnboardingService.getBusinessWorkingDays(businessId),
    onSuccess: (data: any) => {
      setWorkingDays(data.data?.working_days || []);
    },
    onError: () => {
      handleToast({
        message: 'Failed to fetch business working days',
        status: 'error',
      });
    },
  });

  const updateWorkingDays = useMutation({
    mutationFn: (data: { business_id: string; working_days_id: string }) =>
      OnboardingService.updateBusinessWorkingDay(data),
    onMutate: async variables => {
      setUpdatingWorkingDayId(variables.working_days_id);

      const previousWorkingDays = [...workingDays];

      const isCurrentlySelected = workingDays.some(
        (workingDay: any) => workingDay.working_days_id === variables.working_days_id
      );

      if (isCurrentlySelected) {
        setWorkingDays(prev =>
          prev.filter((wd: any) => wd.working_days_id !== variables.working_days_id)
        );
      } else {
        // Add to working days
        setWorkingDays(prev => [
          ...prev,
          {
            working_days_id: variables.working_days_id,
            business_id: variables.business_id,
          },
        ]);
      }

      return { previousWorkingDays };
    },
    onSuccess: () => {
      setUpdatingWorkingDayId(null);
    },
    onError: (_error, _variables, context: any) => {
      setUpdatingWorkingDayId(null);
      if (context?.previousWorkingDays) {
        setWorkingDays(context.previousWorkingDays);
      }
      handleToast({
        message: 'Failed to update working days',
        status: 'error',
      });
    },
  });

  const optimisticToggleWorkingDay = (workingDayId: string, businessId: string) => {
    updateWorkingDays.mutate({ business_id: businessId, working_days_id: workingDayId });
  };

  return {
    allWorkingDays,
    workingDays,
    fetchAllWorkingDays,
    fetchBusinessWorkingDays,
    updateWorkingDays,
    optimisticToggleWorkingDay,
    updatingWorkingDayId,
  };
};

const useBusinessSettings = () => {
  const { onboardingDetails, refreshEmployeeBusinessInfo } = useAdminStore();

  const updateBusiness = useMutation({
    mutationFn: (data: any) => OnboardingService.updateBusiness(data.businessId, data.data),
    onSuccess: () => {
      handleToast({
        message: 'Business updated successfully',
        status: 'success',
      });
      refreshEmployeeBusinessInfo(onboardingDetails?.employeeData?.id ?? '');
    },
    onError: () => {
      handleToast({
        message: 'Failed to update business',
        status: 'error',
      });
    },
  });

  return {
    onboardingDetails,
    updateBusiness,
  };
};

const GeneralPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    allWorkingDays,
    workingDays,
    fetchAllWorkingDays,
    fetchBusinessWorkingDays,
    optimisticToggleWorkingDay,
    updatingWorkingDayId,
  } = useWorkingDays();

  const { onboardingDetails, updateBusiness } = useBusinessSettings();

  const [setting, setSetting] = useState({
    domainName: onboardingDetails?.businessData?.website,
    companyName: onboardingDetails?.businessData?.name,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: 'English',
    currency: 'USD',
    localeCode: navigator.language,
    workingDays: allWorkingDays,
    cycleStartDate: new Date(),
    authenticationMethods: ['Google', 'Microsoft', 'Apple', 'Mail'],
    companyContact: onboardingDetails?.businessData?.contact_number,
    companyEmail: onboardingDetails?.businessData?.email,
  });

  useEffect(() => {
    fetchAllWorkingDays.mutate(undefined);

    if (onboardingDetails?.businessData?.id) {
      fetchBusinessWorkingDays.mutate(onboardingDetails.businessData.id);
    }
  }, [onboardingDetails?.businessData?.id]);

  useEffect(() => {
    if (onboardingDetails?.businessData) {
      setSetting(prev => ({
        ...prev,
        domainName: onboardingDetails.businessData.website,
        companyName: onboardingDetails.businessData.name,
        companyContact: onboardingDetails.businessData.contact_number,
        companyEmail: onboardingDetails.businessData.email,
      }));
    }
  }, [onboardingDetails?.businessData]);

  const handleInputChange = (field: string, value: any) => {
    setSetting(prev => ({ ...prev, [field]: value }));
  };

  const toggleWorkingDay = (workingDayId: string) => {
    if (!onboardingDetails?.businessData?.id) return;

    optimisticToggleWorkingDay(workingDayId, onboardingDetails.businessData.id);
  };

  const handleSave = () => {
    if (!onboardingDetails?.businessData?.id) return;

    updateBusiness.mutate({
      businessId: onboardingDetails?.businessData.id,
      data: {
        name: setting.companyName,
        email: setting.companyEmail,
        contact_number: setting.companyContact,
        website: setting.domainName,
      },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSetting(prev => ({
      ...prev,
      domainName: onboardingDetails?.businessData?.website,
      companyName: onboardingDetails?.businessData?.name,
      companyContact: onboardingDetails?.businessData?.contact_number,
      companyEmail: onboardingDetails?.businessData?.email,
    }));
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 rounded-lg border border-gray-v2 bg-white flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2.5">
          <Typography tag="h4" className="text-primary">
            Personal Information
          </Typography>
          <div className="h-8 hover:cursor-pointer">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="min-w-[70px] h-[28px] hover:cursor-pointer"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="min-w-[70px] h-[28px] hover:cursor-pointer"
                  onClick={handleSave}
                  disabled={updateBusiness.isPending}
                >
                  {updateBusiness.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="hover:bg-custom-blue-v2 p-1.5 rounded-lg"
              >
                <Pen height="22" width="22" />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-5">
          <Input
            label="Domain Name"
            type="text"
            placeholder="Enter your Domain Name"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.domainName}
            onChange={e => handleInputChange('domainName', e.target.value)}
            disabled={!isEditing}
            ref={inputRef}
          />
          <Input
            label="Company Name"
            type="text"
            placeholder="Enter your Company Name"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.companyName}
            onChange={e => handleInputChange('companyName', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Company Contact"
            type="tel"
            placeholder="Enter company contact"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.companyContact}
            onChange={e => handleInputChange('companyContact', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Company Email"
            type="email"
            placeholder="abc@gmail.com"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.companyEmail}
            onChange={e => handleInputChange('companyEmail', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="p-6 rounded-lg border border-gray-v2 bg-white flex flex-col gap-4">
        <Typography tag="h4" className="text-primary">
          Locals
        </Typography>
        <div className="grid grid-cols-2 gap-x-20 gap-y-4">
          <Input
            label="Timezone"
            type="text"
            placeholder="Enter your Timezone"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.timezone}
            onChange={e => handleInputChange('timezone', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Language"
            type="text"
            placeholder="Enter your Language"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.language}
            onChange={e => handleInputChange('language', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Currency"
            type="text"
            placeholder="Enter your Currency"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.currency}
            onChange={e => handleInputChange('currency', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Locale Code"
            type="text"
            placeholder="Enter your Locale Code"
            theme={{
              labelStyle: 'text-primaryText ',
              inputStyle: 'focus:border-primary w-full',
            }}
            value={setting.localeCode}
            onChange={e => handleInputChange('localeCode', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="p-6 rounded-lg border border-gray-v2 bg-white flex flex-col gap-4">
        <Typography tag="h4" className="text-primary">
          Working Days
        </Typography>
        <div className="flex justify-between items-center gap-6">
          {allWorkingDays.map((day: IAllWorkingDays) => {
            const isSelected = workingDays.some(
              (workingDay: any) => workingDay.working_days_id === day.id
            );
            const isUpdating = updatingWorkingDayId === day.id;
            return (
              <button
                key={day.id}
                onClick={() => day.id && toggleWorkingDay(day.id)}
                disabled={isUpdating}
                className={`px-4 py-1 rounded-sm font-medium transition-all duration-200 border cursor-pointer
            ${
              isSelected
                ? 'bg-[rgba(68,66,145,0.10)] text-primary border-primary'
                : 'bg-white text-gray-v7 border-gray-v10 hover:bg-primary-50 hover:text-primary-500 hover:border-primary-500'
            }
            ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
          `}
              >
                {day.day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
