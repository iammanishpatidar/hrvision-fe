import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';
import { handleToast } from '@/utils/toastUtils';
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Pen,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { bloodTypeOptions, genderOptions, religionOptions } from '../../mockData';

interface PersonalInformationProps {
  employeeData?: any;
}

type PersonalInfo = {
  id: string;
  name: string;
  gender: string;
  marital_status: string;
  religion: string;
  date_of_birth: Date;
  blood_group: string;
};

const PersonalInformation = ({ employeeData }: PersonalInformationProps) => {
  const { onboardingDetails, setOnboardingDetails } = useAdminStore();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();

  useEffect(() => {
    if (employeeData) {
      setPersonalInfo({
        id: employeeData?.id || '',
        name: employeeData?.name || '',
        gender: employeeData?.gender || '',
        marital_status: employeeData?.marital_status || '',
        religion: employeeData?.religion || '',
        date_of_birth: employeeData?.date_of_birth || '',
        blood_group: employeeData?.blood_group || '',
      });
    }
  }, [employeeData]);

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: async ({ employeeId, payload }: { employeeId: string; payload: any }) => {
      return await UserProfileService.updateUserDetails(employeeId, payload);
    },
    onSuccess: () => {
      setIsEditing(false);
      handleToast({
        message: 'Updated Personal Information Successfully',
        status: 'success',
      });
    },
    onError: err => {
      const error = err as AxiosError<{
        data: Record<string, string[]>;
      }>;

      const message = error.response?.data?.data && Object.values(error.response.data.data)[0][0];
      handleToast({
        message: message || 'Something went wrong',
        status: 'error',
      });
    },
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (personalInfo) {
      mutate({ employeeId: personalInfo.id, payload: personalInfo });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setPersonalInfo((prev: any) => ({ ...prev, [field]: value }));
    setOnboardingDetails({
      ...onboardingDetails!,
      employeeData: {
        ...onboardingDetails!.employeeData,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Personal Information
        </Typography>
        <div className="h-8 hover:cursor-pointer">
          {isEditing ? (
            <Button
              variant="primary"
              className="min-w-[70px] h-[28px] hover:cursor-pointer"
              onClick={handleSave}
            >
              Save
            </Button>
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
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-x-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize',
            }}
            value={personalInfo?.name}
            onChange={e => handleInputChange('name', e.target.value)}
            disabled={!isEditing}
            ref={inputRef}
          />
          <Dropdown
            label="Gender"
            placeholder="Select your gender"
            theme={{
              labelStyle: 'text-primaryText text-xs !mb-0',
              inputStyle: `!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize ${!isEditing ? 'hover:cursor-default' : ''}`,
            }}
            options={genderOptions}
            selected={
              personalInfo?.gender
                ? {
                    label: personalInfo?.gender,
                    value: personalInfo?.gender,
                  }
                : undefined
            }
            onChange={e => {
              if (e?.value) {
                handleInputChange('gender', e.value);
              }
            }}
            disabled={!isEditing}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <Input
            label="Marital Status"
            type="text"
            placeholder="Enter your marital status"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize',
            }}
            value={personalInfo?.marital_status}
            onChange={e => handleInputChange('marital_status', e.target.value)}
            disabled={!isEditing}
          />
          <Dropdown
            label="Religion"
            placeholder="Select your religion"
            theme={{
              labelStyle: 'text-primaryText text-xs !mb-0',
              inputStyle: `!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize ${!isEditing ? 'hover:cursor-default' : ''}`,
            }}
            options={religionOptions}
            selected={
              personalInfo?.religion
                ? {
                    label: personalInfo?.religion,
                    value: personalInfo?.religion,
                  }
                : undefined
            }
            onChange={e => {
              if (e?.value) {
                handleInputChange('religion', e.value);
              }
            }}
            formatValue
            disabled={!isEditing}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <DatePicker
            className="w-full"
            label="Birth Date"
            mode="single"
            placeholder="Enter your birth date"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs !placeholder:text-xs focus:border-primary capitalize',
            }}
            value={new Date(personalInfo?.date_of_birth ? personalInfo?.date_of_birth : '')}
            onChange={date => {
              handleInputChange('date_of_birth', date);
            }}
            disabled={!isEditing}
          />

          <Dropdown
            label="Blood Type"
            placeholder="Select your blood type"
            theme={{
              labelStyle: 'text-primaryText text-xs !mb-0',
              inputStyle: `!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize ${!isEditing ? 'hover:cursor-default' : ''}`,
            }}
            options={bloodTypeOptions}
            selected={
              personalInfo?.blood_group
                ? {
                    label: personalInfo?.blood_group,
                    value: personalInfo?.blood_group,
                  }
                : undefined
            }
            onChange={e => {
              if (e?.value) {
                handleInputChange('blood_group', e.value);
              }
            }}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
