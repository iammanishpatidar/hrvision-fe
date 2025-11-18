'use client';

import {
  Close,
  Drawer,
  Input,
  Typography,
  Button,
  Textarea,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import { UserProfileService } from '@/apis/services/UserprofileService';
import useAdminStore from '@/store/admin-store';
import { useMutation } from '@tanstack/react-query';
import { handleToast } from '@/utils/toastUtils';
import { AxiosError } from 'axios';

type AddJobTitleSidesheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess?: () => void;
};

const AddJobTitleSidesheet = ({ isOpen, setIsOpen, onSuccess }: AddJobTitleSidesheetProps) => {
  const [jobTitleInfo, setJobTitleInfo] = useState({
    jobRole: '',
    department: '',
    jobTitle: '',
    jobType: '',
    jobDescription: '',
    effectiveFrom: '',
    effectiveTill: '',
    visibleTo: '',
    uploadDocuments: null,
    acknowledgement: false,
  });
  const [description, setDescription] = useState('');
  const { onboardingDetails } = useAdminStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      return await UserProfileService.createJobTitle(payload);
    },
    onSuccess: () => {
      handleToast({
        message: 'Job title created successfully!',
        status: 'success',
      });
      setIsOpen(false);
      onSuccess?.();
      // Reset form
      setJobTitleInfo({
        jobRole: '',
        department: '',
        jobTitle: '',
        jobType: '',
        jobDescription: '',
        effectiveFrom: '',
        effectiveTill: '',
        visibleTo: '',
        uploadDocuments: null,
        acknowledgement: false,
      });
      setDescription('');
    },
    onError: err => {
      const error = err as AxiosError<{
        data: Record<string, string[]>;
      }>;
      const message = error.response?.data?.data && Object.values(error.response.data.data)[0][0];
      handleToast({
        message: message || 'Failed to create job title. Please try again.',
        status: 'error',
      });
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setJobTitleInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddJobTitle = () => {
    if (!jobTitleInfo.jobTitle.trim()) {
      handleToast({
        message: 'Please enter a job title',
        status: 'error',
      });
      return;
    }

    const payload = {
      title: jobTitleInfo.jobTitle,
      description: description,
      business_id: onboardingDetails?.businessData?.id,
    };

    mutate(payload);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-start pl-6 py-6 pr-3"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]"
          onClick={() => setIsOpen(false)}
        >
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        <Typography tag="h3" className="font-semibold text-primary text-xl pt-4">
          Add Job Title
        </Typography>

        <Input
          label="Job Title"
          type="text"
          placeholder="HR"
          theme={{
            labelStyle: 'text-primaryText ',
            inputStyle:
              'h-[50px] text-sm placeholder:text-[#7D8592] font-normal focus:border-primary rounded-xl',
          }}
          value={jobTitleInfo.jobTitle}
          onChange={e => handleInputChange('jobTitle', e.target.value)}
        />

        <div className="">
          <Textarea
            description="Description( Optional)"
            placeholder="Covers key HR practices like onboarding, work hours, code of conduct, and employee expectations."
            descriptionClassName="text-sm text-[#7D8592] font-medium"
            placeholderClassName="text-sm font-normal"
            textareaClassName="w-full"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 pr-2">
        <Button
          variant="primary"
          className="rounded-full px-6 py-2"
          onClick={handleAddJobTitle}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Add Job Title'}
        </Button>
      </div>
    </Drawer>
  );
};

export default AddJobTitleSidesheet;
