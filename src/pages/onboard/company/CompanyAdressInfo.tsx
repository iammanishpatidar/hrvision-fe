import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useGetLocations } from '@/hooks/useGetLocations';
import useAdminStore from '@/store/admin-store';
import { ICompany } from '@/types';
import { Dropdown, Input } from '@fibonacci-innovative-solutions/hrms-design-library';
import { validatePostalCode, extractNumericOnly } from '@/lib/helpers';

export interface CompanyAddressInfoRef {
  validate: () => boolean;
}

const CompanyAdressInfo = forwardRef<CompanyAddressInfoRef>((_, ref) => {
  const { businessDetails, setBusinessDetails } = useAdminStore();
  const { countries, states, cities, setSelectedCountry, setSelectedState } = useGetLocations();

  const [errors, setErrors] = useState({
    line1: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
  });
  const [showErrors, setShowErrors] = useState(false);

  const validate = () => {
    const line1 = businessDetails?.address?.line1?.trim() || '';
    const country = businessDetails?.address?.country?.trim() || '';
    const state = businessDetails?.address?.state?.trim() || '';
    const city = businessDetails?.address?.city?.trim() || '';
    const zipcode = businessDetails?.address?.zipcode?.toString().trim() || '';

    const newErrors = {
      line1: line1 ? '' : 'Address Line 1 is required',
      country: country ? '' : 'Country is required',
      state: state ? '' : 'State is required',
      city: city ? '' : 'City is required',
      zipcode: validatePostalCode(zipcode) ? '' : 'Please enter a valid 6-digit Postal code',
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every(err => !err);

    return isValid;
  };

  useEffect(() => {
    if (showErrors) {
      validate();
    }
  }, [businessDetails, showErrors]);

  const triggerValidation = () => {
    setShowErrors(true);
    return validate();
  };

  useImperativeHandle(ref, () => ({
    validate: triggerValidation,
  }));

  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-full">
      <div className="flex flex-col">
        <Input
          theme={{
            labelStyle: 'input-default text-primaryText',
            inputStyle: 'h-input-default text-sm',
          }}
          label="Address Line 1"
          placeholder="Enter Address Line 1"
          value={businessDetails?.address?.line1}
          onChange={e =>
            setBusinessDetails({
              ...businessDetails,
              address: { ...businessDetails?.address, line1: e.target.value },
            } as ICompany)
          }
          required={true}
          status={showErrors && errors.line1 ? { type: 'error', message: errors.line1 } : undefined}
          showError={showErrors}
          errorMessage={showErrors ? errors.line1 : ''}
        />
      </div>

      <Input
        theme={{
          labelStyle: 'input-default text-primaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Address Line 2"
        value={businessDetails?.address?.line2}
        onChange={e =>
          setBusinessDetails({
            ...businessDetails,
            address: { ...businessDetails?.address, line2: e.target.value },
          } as ICompany)
        }
        placeholder="Enter Address Line 2"
      />

      <div className="flex flex-col">
        <Dropdown
          searchable={true}
          theme={{
            labelStyle: 'input-default text-primaryText',
            inputStyle: `h-input-default text-sm ${errors.country ? 'border-red-500' : ''}`,
          }}
          label="Country"
          options={countries}
          selected={{
            label: businessDetails?.address?.country || '',
            value: businessDetails?.address?.country || '',
          }}
          onChange={e => {
            setSelectedCountry(e?.value);
            setSelectedState(undefined);
            setBusinessDetails({
              ...businessDetails,
              address: {
                ...businessDetails?.address,
                country: e?.value,
                state: '',
                city: '',
              },
            } as ICompany);
          }}
          required
          errorMessage={showErrors ? errors.country : ''}
          placeholder="Select Country"
          showError={showErrors}
        />
        {showErrors && errors.country && (
          <div className="text-red-500 text-xs mt-1">{errors.country}</div>
        )}
      </div>

      <div className="flex flex-col">
        <Dropdown
          searchable={true}
          theme={{
            labelStyle: 'input-default text-primaryText',
            inputStyle: `h-input-default text-sm ${errors.state ? 'border-red-500' : ''}`,
          }}
          label="State"
          options={states}
          selected={{
            label: businessDetails?.address?.state ?? '',
            value: businessDetails?.address?.state ?? '',
          }}
          onChange={e => {
            setSelectedState(e?.value);
            setBusinessDetails({
              ...businessDetails,
              address: { ...businessDetails?.address, state: e?.value, city: '' },
            } as ICompany);
          }}
          required
          errorMessage={showErrors ? errors.state : ''}
          placeholder="Select State"
          showError={showErrors}
        />
        {showErrors && errors.state && (
          <div className="text-red-500 text-xs mt-1">{errors.state}</div>
        )}
      </div>

      <div className="flex flex-col">
        <Dropdown
          searchable={true}
          theme={{
            labelStyle: 'input-default text-primaryText',
            inputStyle: `h-input-default text-sm ${errors.city ? 'border-red-500' : ''}`,
          }}
          label="City"
          options={cities}
          selected={{
            label: businessDetails?.address?.city ?? '',
            value: businessDetails?.address?.city ?? '',
          }}
          onChange={e =>
            setBusinessDetails({
              ...businessDetails,
              address: { ...businessDetails?.address, city: e?.value },
            } as ICompany)
          }
          required={true}
          errorMessage={showErrors ? errors.city : ''}
          placeholder="Select City"
          showError={showErrors}
        />
        {showErrors && errors.city && (
          <div className="text-red-500 text-xs mt-1">{errors.city}</div>
        )}
      </div>

      <Input
        theme={{
          labelStyle: 'input-default text-primaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Postal Code"
        value={businessDetails?.address?.zipcode?.toString()}
        onChange={e => {
          const numericValue = extractNumericOnly(e.target.value);
          setBusinessDetails({
            ...businessDetails,
            address: { ...businessDetails?.address, zipcode: numericValue },
          } as ICompany);
        }}
        required={true}
        status={
          showErrors && errors.zipcode ? { type: 'error', message: errors.zipcode } : undefined
        }
        placeholder="Enter Postal Code"
      />
    </div>
  );
});

CompanyAdressInfo.displayName = 'CompanyAdressInfo';

export default CompanyAdressInfo;
