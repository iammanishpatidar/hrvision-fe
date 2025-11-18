import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';
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
import { City, State } from 'country-state-city';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AddressInfoProps {
  employeeData?: any;
}

export type AddressType = {
  id?: string;
  line1?: string;
  line2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string | number;
};

const AddressInfo = ({ employeeData }: AddressInfoProps) => {
  const { onboardingDetails, setOnboardingDetails } = useAdminStore();
  const [addressInfo, setAddressInfo] = useState<{
    current_address: AddressType;
    permanent_address: AddressType;
  }>({ current_address: {}, permanent_address: {} });

  useEffect(() => {
    if (employeeData) {
      setAddressInfo({
        current_address: employeeData.current_address!,
        permanent_address: employeeData.permanent_address!,
      });
    }
  }, [employeeData]);

  const [isEditing, setIsEditing] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  const [permanentStates, setPermanentStates] = useState<{ label: string; value: string }[]>([]);
  const [permanentCities, setPermanentCities] = useState<{ label: string; value: string }[]>([]);
  const [currentStates, setCurrentStates] = useState<{ label: string; value: string }[]>([]);
  const [currentCities, setCurrentCities] = useState<{ label: string; value: string }[]>([]);

  const getCities = (country: string, state: string) => {
    const stateObj = State.getStatesOfCountry(country).find(s => s.name === state);
    if (!stateObj) return [];
    return City.getCitiesOfState(stateObj.countryCode, stateObj.isoCode).map(c => ({
      label: c.name,
      value: c.name,
    }));
  };

  useEffect(() => {
    const { country, state } = addressInfo?.current_address ?? {};
    if (country) {
      setCurrentStates(
        State.getStatesOfCountry(country).map(s => ({ label: s.name, value: s.name }))
      );
      if (state) {
        setCurrentCities(getCities(country, state));
      }
    }
  }, [addressInfo?.current_address?.country, addressInfo?.current_address?.state]);

  useEffect(() => {
    const { country, state } = addressInfo?.permanent_address ?? {};
    if (country) {
      setPermanentStates(
        State.getStatesOfCountry(country).map(s => ({ label: s.name, value: s.name }))
      );
      if (state) {
        setPermanentCities(getCities(country, state));
      }
    }
  }, [addressInfo?.permanent_address?.country, addressInfo?.permanent_address?.state]);

  const handleInputChange = (
    type: 'current_address' | 'permanent_address',
    field: string,
    value: string
  ) => {
    setAddressInfo(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
    setOnboardingDetails({
      ...onboardingDetails!,
      employeeData: {
        ...onboardingDetails!.employeeData,
        [type]: {
          ...onboardingDetails!.employeeData[type],
          [field]: value,
        },
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      await UserProfileService.updateAddressDetails(
        onboardingDetails!.employeeData?.current_address.id,
        addressInfo?.current_address
      );
      await UserProfileService.updateAddressDetails(
        onboardingDetails!.employeeData?.permanent_address.id,
        addressInfo?.permanent_address
      );
    },
    onSuccess: () => {
      setIsEditing(false);
      handleToast({
        message: 'Updated Address Information Successfully',
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

  const handleSave = () => {
    mutate();
  };

  const renderAddressFields = (type: 'current_address' | 'permanent_address') => {
    const addr = addressInfo && addressInfo[type];
    const isCurrent = type === 'current_address';
    const states = isCurrent ? currentStates : permanentStates;
    const cities = isCurrent ? currentCities : permanentCities;

    return (
      <>
        <Typography tag="t5" className="text-primaryText font-semibold mb-2">
          {isCurrent ? 'Current Address' : 'Permanent Address'}
        </Typography>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          <Input
            label="Address Line 1"
            type="text"
            placeholder="Enter address line 1"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={addr && addr?.line1}
            onChange={e => handleInputChange(type, 'line1', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Address Line 2"
            type="text"
            placeholder="Enter address line 2"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={addr && addr?.line2}
            onChange={e => handleInputChange(type, 'line2', e.target.value)}
            disabled={!isEditing}
          />
          <Dropdown
            searchable={true}
            label="State"
            options={states}
            selected={{
              label: addr?.state ?? '',
              value: addr?.state ?? '',
            }}
            onChange={e => {
              if (!e) return;
              handleInputChange(type, 'state', e.value);
              handleInputChange(type, 'city', '');
              const cities = addr && getCities(addr.country!, e.value);
              if (isCurrent) {
                setCurrentCities(cities!);
              } else {
                setPermanentCities(cities!);
              }
            }}
            disabled={!isEditing}
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
          />
          <Dropdown
            searchable={true}
            label="City"
            options={cities}
            selected={{
              label: addr?.city ?? '',
              value: addr?.city ?? '',
            }}
            onChange={e => {
              if (e) handleInputChange(type, 'city', e.value);
            }}
            disabled={!isEditing}
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
          />
          <Input
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            label="Postal Code"
            value={addr?.zipcode?.toString() ?? ''}
            onChange={e => handleInputChange(type, 'zipcode', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Address Information
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

      <div className="flex flex-col gap-6">
        <div>
          {renderAddressFields('current_address')}
          <div className="underline text-xs place-self-end mt-1.5 flex items-center">
            <Typography tag="t5" className="text-primary hover:cursor-pointer">
              View on Map
            </Typography>
            <ChevronRight size={12} color="#444291" />
          </div>
        </div>

        <div>
          {renderAddressFields('permanent_address')}
          <div className="underline text-xs place-self-end mt-1.5 flex items-center">
            <Typography tag="t5" className="text-primary hover:cursor-pointer">
              View on Map
            </Typography>
            <ChevronRight size={12} color="#444291" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
