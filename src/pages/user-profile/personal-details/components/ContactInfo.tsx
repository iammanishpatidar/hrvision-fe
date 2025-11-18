import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';
import { handleToast } from '@/utils/toastUtils';
import {
  Button,
  Input,
  Pen,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';

interface ContactInfoProps {
  employeeData?: any;
}

const ContactInfo = ({ employeeData }: ContactInfoProps) => {
  const { onboardingDetails, setOnboardingDetails } = useAdminStore();
  const [contactInfo, setContactInfo] = useState<{ contact_number: string; email: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (employeeData) {
      setContactInfo({
        contact_number: employeeData?.contact_number,
        email: employeeData?.email,
      });
    }
  }, [employeeData]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    mutate({ employeeId: onboardingDetails!.employeeData.id, payload: contactInfo });
  };

  const { mutate } = useMutation({
    mutationFn: async ({ employeeId, payload }: { employeeId: string; payload: any }) => {
      return await UserProfileService.updateUserDetails(employeeId, payload);
    },
    onSuccess: () => {
      setIsEditing(false);
      handleToast({
        message: 'Updated Contact Information Successfully',
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

  const handleInputChange = (field: string, value: any) => {
    setContactInfo((prev: any) => ({ ...prev, [field]: value }));
    setOnboardingDetails({
      ...onboardingDetails!,
      employeeData: { ...onboardingDetails!.employeeData, [field]: value },
    });
  };

  return (
    <div className="bg-white rounded-2xl size-full shadow-sm border border-gray-v2">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2.5">
          <Typography tag="h4" className="text-primary">
            Contact Information
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
        <div className="flex flex-col gap-2">
          <Input
            label="Personal Contact"
            type="tel"
            placeholder="Enter your personal contact"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contactInfo && contactInfo.contact_number}
            onChange={e => handleInputChange('contact_number', e.target.value)}
            disabled={!isEditing}
            ref={inputRef}
          />
          <Input
            label="Personal Email Id"
            type="email"
            placeholder="abc@gmail.com"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contactInfo && contactInfo.email}
            onChange={e => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
