// EmergencyContactInformation.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '@/store/admin-store';
import { IEmployee } from '@/types';
import { Dropdown, Input } from '@fibonacci-innovative-solutions/hrms-design-library';
import { City, Country, ICity, ICountry, IState, State } from 'country-state-city';
import { RELATIONSHIP_OPTIONS } from '../constants';

const EmergencyContactInformation: React.FC = () => {
  const navigate = useNavigate();
  const { adminDetails, setAdminDetails } = useAdminStore();

  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    adminDetails?.emergency_contact?.address?.country
  );
  const [selectedState, setSelectedState] = useState<string | undefined>(
    adminDetails?.emergency_contact?.address?.state
  );

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((country: ICountry) => ({
        label: country.name,
        value: country.isoCode,
      }))
    );
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(
        State.getStatesOfCountry(selectedCountry).map((state: IState) => ({
          label: state.name,
          value: state.isoCode,
        }))
      );
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(
        City.getCitiesOfState(selectedCountry, selectedState).map((city: ICity) => ({
          label: city.name,
          value: city.name,
        }))
      );
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-full">
      <Input
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Full Name"
        value={adminDetails?.emergency_contact?.name || ''}
        onChange={e =>
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              name: e.target.value,
            },
          } as IEmployee)
        }
        placeholder="Enter full name"
      />

      <Dropdown
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Relationship to Employee"
        options={RELATIONSHIP_OPTIONS}
        selected={{
          label: adminDetails?.emergency_contact?.relationship || '',
          value: adminDetails?.emergency_contact?.relationship || '',
        }}
        onChange={e =>
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              relationship: e?.value,
            },
          } as IEmployee)
        }
        placeholder="Select relationship"
      />

      <Input
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Phone Number"
        value={adminDetails?.emergency_contact?.contact_number || ''}
        onChange={e =>
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              contact_number: e.target.value,
            },
          } as IEmployee)
        }
        placeholder="+91 9876543210"
      />

      <Input
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Address Line 1"
        value={adminDetails?.emergency_contact?.address?.line1 || ''}
        onChange={e =>
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              address: {
                ...adminDetails?.emergency_contact?.address,
                line1: e.target.value,
              },
            },
          } as IEmployee)
        }
        placeholder="Enter address"
      />

      <Input
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Address Line 2 (Optional)"
        value={adminDetails?.emergency_contact?.address?.line2 || ''}
        onChange={e =>
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              address: {
                ...adminDetails?.emergency_contact?.address,
                line2: e.target.value,
              },
            },
          } as IEmployee)
        }
        placeholder="Enter address"
      />

      <Dropdown
        searchable={true}
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Country"
        options={countries}
        selected={{
          label: adminDetails?.emergency_contact?.address?.country || '',
          value: adminDetails?.emergency_contact?.address?.country || '',
        }}
        onChange={e => {
          setSelectedCountry(e?.value);
          setSelectedState(undefined);
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              address: {
                ...adminDetails?.emergency_contact?.address,
                country: e?.value || '',
                state: '',
                city: '',
              },
            },
          } as IEmployee);
        }}
        placeholder="Select country"
      />

      <Dropdown
        searchable={true}
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="State"
        options={states}
        selected={{
          label: adminDetails?.emergency_contact?.address?.state || '',
          value: adminDetails?.emergency_contact?.address?.state || '',
        }}
        onChange={e => {
          setSelectedState(e?.value);
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              address: {
                ...adminDetails?.emergency_contact?.address,
                state: e?.value || '',
                city: '',
              },
            },
          } as IEmployee);
        }}
        placeholder="Select state"
      />

      <Dropdown
        searchable={true}
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="City"
        options={cities}
        selected={{
          label: adminDetails?.emergency_contact?.address?.city || '',
          value: adminDetails?.emergency_contact?.address?.city || '',
        }}
        onChange={e =>
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              address: {
                ...adminDetails?.emergency_contact?.address,
                city: e?.value || '',
              },
            },
          } as IEmployee)
        }
        placeholder="Select city"
      />

      <Input
        theme={{
          labelStyle: 'input-default text-secondaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Postal Code"
        value={
          adminDetails?.emergency_contact?.address?.zipcode
            ? adminDetails?.emergency_contact?.address?.zipcode.toString()
            : ''
        }
        onChange={e =>
          setAdminDetails({
            ...adminDetails,
            emergency_contact: {
              ...adminDetails?.emergency_contact,
              address: {
                ...adminDetails?.emergency_contact?.address,
                zipcode: e.target.value,
              },
            },
          } as IEmployee)
        }
        placeholder="Enter postal code"
      />

      <div
        className="col-span-2 flex justify-center items-center text-sm font-normal text-gray-v1 mt-10 cursor-pointer"
        onClick={() => navigate('/onboard/register-success')}
      >
        Skip this page
      </div>
    </div>
  );
};

export default EmergencyContactInformation;
