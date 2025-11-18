import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';
import {
  Button,
  Input,
  Pen,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export type BankDetailsType = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  ifscCode: string;
  branch: string;
  swiftCode: string;
};

type BankDetailsProps = {
  details: BankDetailsType;
};

const formFields = [
  { label: 'Bank Name', field: 'bankName', placeholder: 'Enter Bank Name' },
  { label: 'Account No', field: 'accountNumber', placeholder: 'XXXXXXXXXXXX' },
  {
    label: 'Account Holder Name',
    field: 'accountHolderName',
    placeholder: 'Enter account holder name',
  },
  { label: 'IFSC Code', field: 'ifscCode', placeholder: 'Enter IFSC code' },
  { label: 'Swift Code', field: 'swiftCode', placeholder: 'Enter Swift code' },
  { label: 'Branch', field: 'branch', placeholder: 'Enter branch' },
];

const BankDetails: React.FC<BankDetailsProps> = ({ details }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [bankDetails, setBankDetails] = useState(details);
  const [isEditing, setIsEditing] = useState(false);
  const { onboardingDetails } = useAdminStore();

  useEffect(() => {
    if (details) {
      setBankDetails(details);
    }
  }, [details]);

  const { mutate } = useMutation({
    mutationFn: async ({
      data,
      bankDetailsId,
      employeeId,
    }: {
      data: BankDetailsType;
      bankDetailsId?: string;
      employeeId?: string;
    }) => {
      const payload = {
        bank_name: data.bankName,
        account_number: data.accountNumber,
        account_holder_name: data.accountHolderName,
        ifsc_code: data.ifscCode,
        swift_code: data.swiftCode,
        branch: data.branch,
      };

      if (details) {
        return await UserProfileService.updateBankDetails(bankDetailsId!, payload);
      } else {
        return await UserProfileService.setBankDetails({ ...payload, employee_id: employeeId });
      }
    },
    onSuccess: () => {
      setIsEditing(false);
    },
    onError: (error: any) => {
      const beErrors = error?.response?.data?.data;
      if (beErrors && typeof beErrors === 'object') {
        const firstErrorKey = Object.keys(beErrors)[0];
        const message = beErrors[firstErrorKey];
        setErrorMessage(message);
      }
    },
  });

  const validateForm = () => {
    let message = '';
    if (!bankDetails.bankName) message = 'Bank name is required';
    if (!bankDetails.accountNumber) message = 'Account number is required';
    if (!bankDetails.accountHolderName) message = 'Account holder name is required';
    if (!bankDetails.ifscCode) message = 'IFSC code is required';
    if (!bankDetails.swiftCode) message = 'Swift code is required';
    if (!bankDetails.branch) message = 'Branch is required';
    setErrorMessage(message);
    return message;
  };

  const handleSave = () => {
    const error = validateForm();
    if (error) return;
    mutate({
      data: bankDetails,
      bankDetailsId: details?.id,
      employeeId: onboardingDetails!.employeeData.id,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Bank Details
        </Typography>
        <div className="h-8 hover:cursor-pointer">
          {isEditing ? (
            <Button
              variant="primary"
              className="min-w-[70px] h-[28px] hover:cursor-pointer"
              onClick={handleSave}
            >
              {details ? 'Save' : 'Add'}
            </Button>
          ) : (
            <div onClick={() => setIsEditing(true)} className="hover:bg-gray-200 p-1.5 rounded-lg">
              <Pen height="22" width="22" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {formFields.map(({ label, field, placeholder }) => (
          <div key={field}>
            <Input
              label={label}
              type="text"
              placeholder={placeholder}
              theme={{
                labelStyle: 'text-primaryText text-xs',
                inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
              }}
              value={bankDetails?.[field as keyof BankDetailsType] || ''}
              onChange={e => {
                setBankDetails({ ...bankDetails, [field]: e.target.value });
                setErrorMessage('');
              }}
              disabled={!isEditing}
            />
          </div>
        ))}
        {errorMessage && <p className="text-xs text-red-500 mb-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default BankDetails;
