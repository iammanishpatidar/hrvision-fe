import React, { useEffect, useState } from 'react';
import { useGetLocations } from '@/hooks/useGetLocations';
import useAdminStore from '@/store/admin-store';
import { IEmployee } from '@/types';
import { useUser } from '@clerk/clerk-react';
import { Dropdown, Input, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { City, ICity, IState, State } from 'country-state-city';
import { extractNumericOnly, isValidPhoneInput } from '@/lib/helpers';

interface Props {
  employee: IEmployee;
  setEmployee: (e: IEmployee) => void;
  triedSubmit: boolean;
}

const ContactInformation: React.FC<Props> = ({ employee, setEmployee, triedSubmit }) => {
  const { user } = useUser();
  const { sameAsPermanentAddress, setSameAsPermanentAddress } = useAdminStore();
  const { countries } = useGetLocations();

  const [permanentStates, setPermanentStates] = useState<{ label: string; value: string }[]>([]);
  const [permanentCities, setPermanentCities] = useState<{ label: string; value: string }[]>([]);
  const [currentStates, setCurrentStates] = useState<{ label: string; value: string }[]>([]);
  const [currentCities, setCurrentCities] = useState<{ label: string; value: string }[]>([]);
  const [selectedPermanentCountry, setSelectedPermanentCountry] = useState<string | undefined>(
    employee.permanent_address?.country
  );
  const [selectedPermanentState, setSelectedPermanentState] = useState<string | undefined>(
    employee.permanent_address?.state
  );
  const [selectedCurrentCountry, setSelectedCurrentCountry] = useState<string | undefined>(
    employee.current_address?.country
  );
  const [selectedCurrentState, setSelectedCurrentState] = useState<string | undefined>(
    employee.current_address?.state
  );

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setEmployee({ ...employee, email: user.primaryEmailAddress.emailAddress });
    }
  }, [user]);

  useEffect(() => {
    if (selectedPermanentCountry) {
      const states = State.getStatesOfCountry(selectedPermanentCountry).map((s: IState) => ({
        label: s.name,
        value: s.isoCode,
      }));
      setPermanentStates(states);
      if (selectedPermanentState) {
        const cities = City.getCitiesOfState(selectedPermanentCountry, selectedPermanentState).map(
          (c: ICity) => ({
            label: c.name,
            value: c.name,
          })
        );
        setPermanentCities(cities);
      }
    } else {
      setPermanentStates([]);
      setPermanentCities([]);
    }
    if (sameAsPermanentAddress && selectedPermanentCountry && selectedPermanentState) {
      const cities = City.getCitiesOfState(selectedPermanentCountry, selectedPermanentState).map(
        (c: ICity) => ({
          label: c.name,
          value: c.name,
        })
      );
      setCurrentCities(cities);
      setSelectedCurrentCountry(selectedPermanentCountry);
      setSelectedCurrentState(selectedPermanentState);
      setEmployee({
        ...employee,
        current_address: { ...employee.permanent_address },
      });
    }
  }, [selectedPermanentCountry, selectedPermanentState, sameAsPermanentAddress]);

  useEffect(() => {
    if (selectedCurrentCountry) {
      const states = State.getStatesOfCountry(selectedCurrentCountry).map((s: IState) => ({
        label: s.name,
        value: s.isoCode,
      }));
      setCurrentStates(states);
      if (selectedCurrentState) {
        const cities = City.getCitiesOfState(selectedCurrentCountry, selectedCurrentState).map(
          (c: ICity) => ({
            label: c.name,
            value: c.name,
          })
        );
        setCurrentCities(cities);
      } else {
        setCurrentCities([]);
      }
    } else {
      setCurrentStates([]);
      setCurrentCities([]);
    }
  }, [selectedCurrentCountry, selectedCurrentState]);

  const handleSameAsChange = (checked: boolean) => {
    setSameAsPermanentAddress(checked);
    if (checked) {
      setSelectedCurrentCountry(selectedPermanentCountry);
      setSelectedCurrentState(selectedPermanentState);
      setEmployee({
        ...employee,
        current_address: { ...employee.permanent_address },
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isValidPhoneInput(value)) {
      return;
    }

    if (value.length <= 14) {
      setEmployee({ ...employee, contact_number: value });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-full">
      <Input
        theme={{
          labelStyle: 'input-default text-primaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Contact Number"
        value={employee?.contact_number || ''}
        onChange={handlePhoneChange}
        placeholder="+91 9876543210"
        required
        showError={triedSubmit && !employee.contact_number}
        errorMessage="Please enter valid phone number"
      />

      <Input
        theme={{
          labelStyle: 'input-default text-primaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Email ID"
        placeholder="Enter your email"
        value={user?.primaryEmailAddress?.emailAddress || ''}
        onChange={e => setEmployee({ ...employee, email: e.target.value })}
        disabled
      />

      {/* Permanent Address */}
      <div className="col-span-2">
        <Typography tag="h3" className="text-lg !font-medium mb-3 text-gradient-primary">
          Permanent Address
        </Typography>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
          <Input
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Address Line 1"
            value={employee.permanent_address?.line1 || ''}
            onChange={e =>
              setEmployee({
                ...employee,
                permanent_address: { ...employee.permanent_address, line1: e.target.value },
              })
            }
            required
            showError={triedSubmit && !employee.permanent_address?.line1}
            errorMessage="Please enter valid address"
            placeholder="Enter your address"
          />

          <Input
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Address Line 2 (Optional)"
            value={employee.permanent_address?.line2 || ''}
            onChange={e =>
              setEmployee({
                ...employee,
                permanent_address: { ...employee.permanent_address, line2: e.target.value },
              })
            }
            placeholder="Enter your address"
          />

          <Dropdown
            searchable={true}
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Country"
            options={countries}
            selected={{
              label: employee.permanent_address?.country || '',
              value: employee.permanent_address?.country || '',
            }}
            onChange={e => {
              setSelectedPermanentCountry(e?.value);
              setEmployee({
                ...employee,
                permanent_address: {
                  ...employee.permanent_address,
                  country: e?.value || '',
                  state: '',
                  city: '',
                },
              });
            }}
            required
            showError={triedSubmit && !employee.permanent_address?.country}
            errorMessage="Please select country"
            placeholder="Select your country"
          />

          <Dropdown
            searchable={true}
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="State"
            options={permanentStates}
            selected={{
              label: employee.permanent_address?.state || '',
              value: employee.permanent_address?.state || '',
            }}
            onChange={e => {
              setSelectedPermanentState(e?.value);
              setEmployee({
                ...employee,
                permanent_address: {
                  ...employee.permanent_address,
                  state: e?.value || '',
                  city: '',
                },
              });
            }}
            required
            showError={triedSubmit && !employee.permanent_address?.state}
            errorMessage="Please select state"
            placeholder="Select your state"
          />

          <Dropdown
            searchable={true}
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="City"
            options={permanentCities}
            selected={{
              label: employee.permanent_address?.city || '',
              value: employee.permanent_address?.city || '',
            }}
            onChange={e =>
              setEmployee({
                ...employee,
                permanent_address: { ...employee.permanent_address, city: e?.value || '' },
              })
            }
            required
            showError={triedSubmit && !employee.permanent_address?.city}
            errorMessage="Please select city"
            placeholder="Select your city"
          />

          <Input
            theme={{
              labelStyle: 'input-default text-primaryText',
              inputStyle: 'h-input-default text-sm',
            }}
            label="Postal Code"
            value={
              employee.permanent_address?.zipcode
                ? employee.permanent_address.zipcode.toString()
                : ''
            }
            onChange={e => {
              const numericValue = extractNumericOnly(e.target.value);
              setEmployee({
                ...employee,
                permanent_address: { ...employee.permanent_address, zipcode: numericValue },
              });
            }}
            required
            showError={triedSubmit && !employee.permanent_address?.zipcode}
            errorMessage="Please enter valid postal code"
            placeholder="Enter your postal code"
          />
        </div>
      </div>

      {/* Same as Permanent */}
      <div className="col-span-2 flex items-center gap-2">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={sameAsPermanentAddress}
          onChange={e => handleSameAsChange(e.target.checked)}
        />
        <Typography tag="h6" className="text-gradient-primary">
          Current address is same as permanent address
        </Typography>
      </div>

      {/* Current Address */}
      {!sameAsPermanentAddress && (
        <div className="col-span-2 mt-4">
          <Typography tag="h3" className="text-lg !font-medium mb-3 text-gradient-primary">
            Current Address
          </Typography>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <Input
              theme={{
                labelStyle: 'input-default text-primaryText',
                inputStyle: 'h-input-default text-sm',
              }}
              label="Address Line 1"
              value={employee.current_address?.line1 || ''}
              onChange={e =>
                setEmployee({
                  ...employee,
                  current_address: { ...employee.current_address, line1: e.target.value },
                })
              }
              required
              showError={triedSubmit && !employee.current_address?.line1}
              errorMessage="Please enter valid address"
              placeholder="Enter your address"
            />

            <Input
              theme={{
                labelStyle: 'input-default text-primaryText',
                inputStyle: 'h-input-default text-sm',
              }}
              label="Address Line 2 (Optional)"
              value={employee.current_address?.line2 || ''}
              onChange={e =>
                setEmployee({
                  ...employee,
                  current_address: { ...employee.current_address, line2: e.target.value },
                })
              }
              placeholder="Enter your address"
            />

            <Dropdown
              searchable={true}
              theme={{
                labelStyle: 'input-default text-primaryText',
                inputStyle: 'h-input-default text-sm',
              }}
              label="Country"
              options={countries}
              selected={{
                label: employee.current_address?.country || '',
                value: employee.current_address?.country || '',
              }}
              onChange={e => {
                setSelectedCurrentCountry(e?.value);
                setEmployee({
                  ...employee,
                  current_address: {
                    ...employee.current_address,
                    country: e?.value || '',
                    state: '',
                    city: '',
                  },
                });
              }}
              required
              showError={triedSubmit && !employee.current_address?.country}
              errorMessage="Please select country"
              placeholder="Select your country"
            />

            <Dropdown
              searchable={true}
              theme={{
                labelStyle: 'input-default text-primaryText',
                inputStyle: 'h-input-default text-sm',
              }}
              label="State"
              options={currentStates}
              selected={{
                label: employee.current_address?.state || '',
                value: employee.current_address?.state || '',
              }}
              onChange={e => {
                setSelectedCurrentState(e?.value);
                setEmployee({
                  ...employee,
                  current_address: { ...employee.current_address, state: e?.value || '', city: '' },
                });
              }}
              required
              showError={triedSubmit && !employee.current_address?.state}
              errorMessage="Please select state"
              placeholder="Select your state"
            />

            <Dropdown
              searchable={true}
              theme={{
                labelStyle: 'input-default text-primaryText',
                inputStyle: 'h-input-default text-sm',
              }}
              label="City"
              options={currentCities}
              selected={{
                label: employee.current_address?.city || '',
                value: employee.current_address?.city || '',
              }}
              onChange={e =>
                setEmployee({
                  ...employee,
                  current_address: { ...employee.current_address, city: e?.value || '' },
                })
              }
              required
              showError={triedSubmit && !employee.current_address?.city}
              errorMessage="Please select city"
              placeholder="Select your city"
            />

            <Input
              theme={{
                labelStyle: 'input-default text-primaryText',
                inputStyle: 'h-input-default text-sm',
              }}
              label="Postal Code"
              value={
                employee.current_address?.zipcode ? employee.current_address.zipcode.toString() : ''
              }
              onChange={e => {
                const numericValue = extractNumericOnly(e.target.value);
                setEmployee({
                  ...employee,
                  current_address: { ...employee.current_address, zipcode: numericValue },
                });
              }}
              required
              showError={triedSubmit && !employee.current_address?.zipcode}
              errorMessage="Please enter valid postal code"
              placeholder="Enter your postal code"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInformation;
