import { UserProfileService } from '@/apis/services/UserprofileService';
import { useGetLocations } from '@/hooks/useGetLocations';
import useAdminStore from '@/store/admin-store';
import { IOnboardingDetailsEmergencyContactData } from '@/types';
import { handleToast } from '@/utils/toastUtils';
import {
  Button,
  Dropdown,
  Input,
  Pen,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { AddressType } from './AddressInfo';

interface EmergencyContactProps {
  employeeData?: any;
}

type EmergencyContactType = {
  id?: string;
  name?: string;
  relationship?: string;
  contact_number?: string;
  address?: AddressType;
};

type EmergencyContactState = Omit<IOnboardingDetailsEmergencyContactData, 'address'> & {
  address?: Partial<IOnboardingDetailsEmergencyContactData['address']>;
};

const EmergencyContact = ({ employeeData }: EmergencyContactProps) => {
  const { onboardingDetails, setOnboardingDetails } = useAdminStore();
  const [emergencyContact, setEmergencyContact] = useState<Partial<EmergencyContactState> | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (employeeData) {
      setEmergencyContact(employeeData?.emergency_contact);
    }
  }, [employeeData]);

  const { states, cities, setSelectedCountry, setSelectedState } = useGetLocations();

  useEffect(() => {
    const country = emergencyContact?.address?.country;
    const state = emergencyContact?.address?.state;

    if (country) setSelectedCountry(country);
    if (state) setSelectedState(state);
  }, [emergencyContact?.address?.country, emergencyContact?.address?.state]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!emergencyContact?.id) return;
      await UserProfileService.updateEmergencyDetails(
        emergencyContact?.id,
        emergencyContact as IOnboardingDetailsEmergencyContactData
      );
    },
    onSuccess: () => {
      setIsEditing(false);
      handleToast({
        message: 'Updated Emergency Contact Successfully',
        status: 'success',
      });
      setOnboardingDetails({
        ...onboardingDetails!,
        employeeData: {
          ...onboardingDetails!.employeeData,
          emergency_contact: emergencyContact as IOnboardingDetailsEmergencyContactData,
        },
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

  const handleInputChange = (field: keyof EmergencyContactType, value: any) => {
    const updated = {
      ...emergencyContact,
      [field]: value,
    };
    setEmergencyContact(updated);
  };

  const handleAddressChange = (field: keyof AddressType, value: string) => {
    const updatedAddress = {
      ...emergencyContact?.address,
      [field]: value,
    };

    const updated = {
      ...emergencyContact,
      address: updatedAddress,
    };

    setEmergencyContact(updated);
  };

  const handleSave = () => {
    mutate();
  };

  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Emergency Contact
        </Typography>
        <div className="h-8 hover:cursor-pointer">
          {isEditing ? (
            <Button variant="primary" className="min-w-[70px] h-[28px]" onClick={handleSave}>
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
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize',
          }}
          value={emergencyContact?.name ?? ''}
          onChange={e => handleInputChange('name', e.target.value)}
          disabled={!isEditing}
          ref={inputRef}
        />

        <Input
          label="Relationship to Employee"
          type="text"
          placeholder="Enter relationship"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize',
          }}
          value={emergencyContact?.relationship ?? ''}
          onChange={e => handleInputChange('relationship', e.target.value)}
          disabled={!isEditing}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value={emergencyContact?.contact_number ?? ''}
          onChange={e => handleInputChange('contact_number', e.target.value)}
          disabled={!isEditing}
        />

        <Typography tag="t5" className="text-primaryText font-semibold mt-4">
          Address
        </Typography>

        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          <Input
            label="Address Line 1"
            placeholder="Enter address line 1"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize',
            }}
            value={emergencyContact?.address?.line1 ?? ''}
            onChange={e => handleAddressChange('line1', e.target.value)}
            disabled={!isEditing}
          />

          <Input
            label="Address Line 2"
            placeholder="Enter address line 2"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary capitalize',
            }}
            value={emergencyContact?.address?.line2 ?? ''}
            onChange={e => handleAddressChange('line2', e.target.value)}
            disabled={!isEditing}
          />

          <Dropdown
            label="State"
            options={states}
            selected={{
              label: emergencyContact?.address?.state ?? '',
              value: emergencyContact?.address?.state ?? '',
            }}
            onChange={e => {
              if (!e) return;
              handleAddressChange('state', e.value);
              handleAddressChange('city', '');
              setSelectedState(e.value);
            }}
            disabled={!isEditing}
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
          />

          <Dropdown
            label="City"
            options={cities}
            selected={{
              label: emergencyContact?.address?.city ?? '',
              value: emergencyContact?.address?.city ?? '',
            }}
            onChange={e => {
              if (e) handleAddressChange('city', e.value);
            }}
            disabled={!isEditing}
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
