import { OnboardingService } from '@/apis/services/OnboardingService';
import useAdminStore from '@/store/admin-store';
import { handleToast } from '@/utils/toastUtils';
import { Button, Input, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useMutation } from '@tanstack/react-query';
import { Crop, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { isHexColor } from 'validator';

const BrandingPage = () => {
  const { onboardingDetails, setOnboardingDetails } = useAdminStore();
  const [logo, setLogo] = useState<string | null>(onboardingDetails?.businessData?.logo || null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState(72);
  const [primaryColor, setPrimaryColor] = useState(
    onboardingDetails?.businessData?.primary_color || ''
  );
  const [secondaryColor, setSecondaryColor] = useState(
    onboardingDetails?.businessData?.secondary_color || ''
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const { mutate: updateBusiness } = useMutation({
    mutationFn: (data: any) => OnboardingService.updateBusiness(data.businessId, data.data),
    onSuccess: () => {
      handleToast({
        message: 'Brand Colors updated successfully',
        status: 'success',
      });
    },
    onError: () => {
      handleToast({
        message: 'Failed to update Brand Colors',
        status: 'error',
      });
    },
  });
  const { mutate: uploadLogo, isPending: isUploading } = useMutation({
    mutationFn: (data: { businessId: string; logo: File }) =>
      OnboardingService.uploadLogo(data.businessId, data.logo),
    onSuccess: response => {
      // Update the store with the new logo URL from the response
      if (response?.data?.logo && onboardingDetails) {
        setOnboardingDetails({
          ...onboardingDetails,
          businessData: {
            ...onboardingDetails.businessData,
            logo: response.data.logo,
          },
        });
        setLogo(response.data.logo);
      }
      handleToast({
        message: 'Logo uploaded successfully',
        status: 'success',
      });
    },
    onError: () => {
      handleToast({
        message: 'Failed to upload logo',
        status: 'error',
      });
    },
  });

  const handleApplyLogo = () => {
    if (logoFile && onboardingDetails?.businessData?.id) {
      uploadLogo({
        businessId: onboardingDetails.businessData.id,
        logo: logoFile,
      });
    }
  };

  const handleSave = async () => {
    if (onboardingDetails?.businessData?.id) {
      if (!isHexColor(primaryColor) || !isHexColor(secondaryColor)) {
        handleToast({
          message: 'Invalid Color Format. Please enter a valid hex color code.',
          status: 'error',
        });
        return;
      }
      updateBusiness({
        businessId: onboardingDetails.businessData?.id,
        data: {
          primary_color: primaryColor,
          secondary_color: secondaryColor,
        },
      });
    }
  };

  return (
    <div className="p-6 rounded-lg border border-[#E9EBEF]  flex flex-col gap-6 bg-white">
      <Typography tag="h4" className="text-primary">
        Domain
      </Typography>
      <div className="">
        {logo ? (
          <div className="relative w-full h-[180px] bg-white border border-[#F2F2F2] rounded-t-lg flex items-center justify-center overflow-hidden ">
            <img
              src={logo}
              alt="Logo Preview"
              style={{ transform: `scale(${zoom / 100})`, transition: 'transform 0.3s ease' }}
              className="max-h-full max-w-full"
            />
          </div>
        ) : (
          <div className="h-[180px] border border-[#F2F2F2] bg-white flex items-center justify-center rounded-t-lg ">
            <span className="text-primaryText">No logo uploaded</span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
          ref={fileInputRef}
        />

        <div className=" flex flex-col gap-8 px-2 py-4 border border-[#F2F2F2] rounded-b-lg bg-white">
          <div className=" border-b border-[#DDE2E5] ">
            <div className=" flex justify-center items-center gap-2 border-b-2  border-primary max-w-fit min-w-fit pb-4 z-10 cursor-pointer">
              <Crop className="text-primary font-medium" height={16} width={16} />
              <span className="text-primary text-xs font-medium  ">Crop</span>
            </div>
          </div>

          <div className="flex flex-col w-full items-center gap-2 text-primary text-sm font-medium">
            <div className=" flex justify-between items-center w-full">
              <span className=" text-gray-v9">Zoom</span>
              <span className=" text-gray-v9">{zoom}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              className="flex-grow w-full  accent-primary"
            />
          </div>

          <div className="flex justify-between items-center">
            {logo && (
              <button
                className="text-danger-red-v2 text-sm border border-danger-red-v2 px-3 py-1.5 rounded-md hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                onClick={handleRemoveLogo}
              >
                Remove Logo
                <Trash2 className="text-danger-red-v2" height={16} width={16} />
              </button>
            )}
            <div className="flex flex-grow justify-end gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="primary"
                type="button"
                className="cursor-pointer"
              >
                {logo ? 'Change Logo' : 'Upload Logo'}
              </Button>

              <Button
                variant="primary"
                type="button"
                disabled={!logoFile || isUploading}
                className="cursor-pointer"
                onClick={handleApplyLogo}
              >
                {isUploading ? 'Uploading...' : 'Apply'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 ">
        <div className=" flex flex-col gap-3 mt-2">
          <Typography tag="h4" className="text-primary">
            Brand Colors
          </Typography>
          <div className="flex items-center gap-6">
            <Input
              label="Primary Color*"
              type="text"
              placeholder="Enter your Primary Color"
              theme={{
                labelStyle: 'text-primaryText text-xs',
                inputStyle:
                  'text-xs placeholder:text-xs focus:border-primary w-[300px] text-primaryText',
              }}
              value={primaryColor}
              onChange={e => setPrimaryColor(e.target.value)}
            />
            <div
              className="w-52 h-12 mt-4.5  rounded-md"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
          <div className="flex items-center gap-6">
            <Input
              label="Secondary Color*"
              type="text"
              placeholder="Enter your Secondary Color"
              theme={{
                labelStyle: 'text-primaryText text-xs',
                inputStyle:
                  'text-xs placeholder:text-xs focus:border-primary w-[300px]  text-primaryText',
              }}
              value={secondaryColor}
              onChange={e => setSecondaryColor(e.target.value)}
            />
            <div
              className="w-52 h-12 mt-4.5 rounded-md"
              style={{ backgroundColor: secondaryColor }}
            />
          </div>
        </div>

        <div className="">
          <Button variant="primary" type="button" onClick={handleSave} className="cursor-pointer">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandingPage;
