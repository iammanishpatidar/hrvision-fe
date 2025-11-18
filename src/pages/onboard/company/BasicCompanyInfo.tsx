import useAdminStore from '@/store/admin-store';
import { ICompany } from '@/types';
import { Dropdown, Input } from '@fibonacci-innovative-solutions/hrms-design-library';
import { BUSINESS_SECTOR_OPTIONS } from '../constants';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { isValidEmail, validatePhone, isValidPhoneInput } from '@/lib/helpers';

export interface BasicCompanyInfoRef {
  validate: () => boolean;
}

export const BasicCompanyInfo = forwardRef<BasicCompanyInfoRef>((_, ref) => {
  const { businessDetails, setBusinessDetails } = useAdminStore();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [businessSectorError, setBusinessSectorError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const validateForm = () => {
    let hasErrors = false;

    if (!businessDetails?.name?.trim()) {
      setNameError('Company Name is required');
      hasErrors = true;
    } else {
      setNameError(null);
    }

    const email = businessDetails?.email?.trim();

    if (!email) {
      setEmailError('Company email is required');
      hasErrors = true;
    } else {
      const isValid = isValidEmail(email);

      if (!isValid) {
        setEmailError('Enter a valid email address');
        hasErrors = true;
      } else {
        setEmailError(null);
      }
    }

    const phoneNumber = businessDetails?.contact_number?.trim();

    if (!phoneNumber) {
      setPhoneError('Contact number is required');
      hasErrors = true;
    } else if (!validatePhone(phoneNumber)) {
      setPhoneError('Enter a valid phone number');
      hasErrors = true;
    } else {
      setPhoneError(null);
    }

    if (!businessDetails?.business_sector?.trim()) {
      setBusinessSectorError('Please select a business sector');
      hasErrors = true;
    } else {
      setBusinessSectorError(null);
    }

    return !hasErrors;
  };

  const triggerValidation = () => {
    setShowErrors(true);
    const result = validateForm();
    return result;
  };

  useEffect(() => {
    if (showErrors) {
      validateForm();
    }
  }, [businessDetails, showErrors]);

  useImperativeHandle(ref, () => ({
    validate: triggerValidation,
  }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isValidPhoneInput(value)) {
      return;
    }

    if (value.length <= 14) {
      setBusinessDetails({ ...businessDetails, contact_number: value } as ICompany);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        theme={{ labelStyle: 'input-default' }}
        label="Company's Name"
        placeholder="Enter Company's Name"
        value={businessDetails?.name}
        onChange={e => setBusinessDetails({ ...businessDetails, name: e.target.value } as ICompany)}
        required
        errorMessage={showErrors ? (nameError ?? 'Company Name is required') : ''}
        status={showErrors && nameError ? { type: 'error', message: nameError } : undefined}
      />

      <Input
        theme={{ labelStyle: 'input-default' }}
        label="Domain Name"
        placeholder="Enter Domain Name"
        value={businessDetails?.domain_name}
        onChange={e =>
          setBusinessDetails({ ...businessDetails, domain_name: e.target.value } as ICompany)
        }
      />

      <Input
        type="email"
        theme={{ labelStyle: 'input-default' }}
        label="Company's Email"
        value={businessDetails?.email}
        onChange={e =>
          setBusinessDetails({ ...businessDetails, email: e.target.value } as ICompany)
        }
        placeholder="Enter Company's Email"
        required
        errorMessage={showErrors ? (emailError ?? 'Company email is required') : ''}
        status={showErrors && emailError ? { type: 'error', message: emailError } : undefined}
      />

      <Input
        theme={{
          labelStyle: 'input-default text-primaryText',
          inputStyle: 'h-input-default text-sm',
        }}
        label="Contact Number"
        value={businessDetails?.contact_number}
        onChange={handlePhoneChange}
        placeholder="+91 9876543210"
        required
        errorMessage={showErrors ? (phoneError ?? 'Contact number is required') : ''}
        status={showErrors && phoneError ? { type: 'error', message: phoneError } : undefined}
      />


      <div className="flex flex-col">
        <Dropdown
          searchable={true}
          theme={{
            inputStyle: 'h-input-default w-input-default',
            labelStyle: 'input-default',
            dropdownStyle: 'h-[140px]',
          }}
          label="Business Sector"
          options={BUSINESS_SECTOR_OPTIONS}
          selected={
            businessDetails?.business_sector
              ? BUSINESS_SECTOR_OPTIONS.find(
                  option => option.value === businessDetails.business_sector
                ) || {
                  label: businessDetails.business_sector,
                  value: businessDetails.business_sector,
                }
              : { label: '', value: '' }
          }
          onChange={e =>
            setBusinessDetails({ ...businessDetails, business_sector: e?.value } as ICompany)
          }
          required
          errorMessage={
            showErrors ? (businessSectorError ?? 'Please select a business sector') : ''
          }
          placeholder="Select Business Sector"
        />
        {showErrors && businessSectorError && (
          <div className="text-red-500 text-xs mt-1">{businessSectorError}</div>
        )}
      </div>
    </div>
  );
});

BasicCompanyInfo.displayName = 'BasicCompanyInfo';
