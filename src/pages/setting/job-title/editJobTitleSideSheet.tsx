'use client';

import {
  Close,
  Drawer,
  Input,
  Typography,
  Button,
  Textarea,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import { JobTitleColumn } from './constants';
import { useMutation } from '@tanstack/react-query';
import { handleToast } from '@/utils/toastUtils';
import { AxiosError } from 'axios';
import { UserProfileService } from '@/apis/services/UserprofileService';

interface EditJobTitleSidesheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedRow: JobTitleColumn;
  onSuccess?: () => void;
}
// const [isEditing, setIsEditing] = useState(false);

const EditJobTitleSidesheet = ({
  isOpen,
  setIsOpen,
  selectedRow,
  onSuccess,
}: EditJobTitleSidesheetProps) => {
  const [jobTitleInfo, setJobTitleInfo] = useState<JobTitleColumn>(selectedRow);
  const [description, setDescription] = useState(selectedRow?.description || '');

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ jobTitleId, payload }: { jobTitleId: string; payload: any }) => {
      return await UserProfileService.updateJobTitle(jobTitleId, payload);
    },
    onSuccess: () => {
      handleToast({
        message: 'Job title updated successfully!',
        status: 'success',
      });
      setIsOpen(false);
      onSuccess?.();
    },
    onError: err => {
      const error = err as AxiosError<{
        data: Record<string, string[]>;
      }>;
      const message = error.response?.data?.data && Object.values(error.response.data.data)[0][0];
      handleToast({
        message: message || 'Failed to update job title. Please try again.',
        status: 'error',
      });
    },
  });

  useEffect(() => {
    if (isOpen) {
      setJobTitleInfo(selectedRow);
      setDescription(selectedRow.description || '');
    }
  }, [isOpen, selectedRow]);

  const handleInputChange = (field: string, value: string) => {
    setJobTitleInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setJobTitleInfo(selectedRow);
    setDescription(selectedRow.description || '');
    setIsOpen(false);
  };

  const handleUpdateJobTitle = () => {
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
    };

    mutate({ jobTitleId: selectedRow.id!, payload });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
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
          Edit Job Title
        </Typography>

        <Input
          label="Job Title"
          type="text"
          placeholder=""
          theme={{
            labelStyle: 'text-primaryText ',
            inputStyle:
              'h-[50px] text-sm placeholder:text-[#7D8592] font-normal focus:border-primary rounded-xl',
          }}
          value={jobTitleInfo?.jobTitle}
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
          onClick={handleUpdateJobTitle}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Save Job Title'}
        </Button>
      </div>
    </Drawer>
  );
};

export default EditJobTitleSidesheet;
