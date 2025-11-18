import { Button, Tooltip, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';
import { Asset } from '@/types';
import { calculateExpiryDays } from '@/utils/calculateExpiryDays';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface HardwareSoftwareInfoCardProps {
  asset: Asset;
  index: number;
  type: string;
  handleClick: () => void;
}

const HardwareSoftwareInfoCard: React.FC<HardwareSoftwareInfoCardProps> = ({
  asset,
  index,
  type,
  handleClick,
}) => {
  return (
    <div
      className="flex flex-col gap-2.5 bg-white rounded-lg shadow-cardShadow py-6 px-9 w-full max-w-xs"
      key={index}
    >
      <Typography tag="h4" className="text-primary">
        {asset.asset_type}
      </Typography>

      <div className="text-gray-600 text-sm">
        {type === 'software' && (
          <div className="flex items-center gap-2">
            <Typography tag="t5" className="text-gray-v3">
              License Type:
            </Typography>
            <Typography tag="t5" className="text-gray-v3 font-normal">
              {asset.license_type}
            </Typography>
          </div>
        )}
        {type === 'hardware' && (
          <div className="flex items-center gap-2">
            <Typography tag="t5" className="text-gray-v3">
              Asset Name:
            </Typography>
            <Typography tag="t5" className="text-gray-v3 font-normal">
              {asset.name}
            </Typography>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Typography tag="t5" className="text-gray-v3">
            Asset Name:
          </Typography>
          <Typography tag="t5" className="text-gray-v3 font-normal">
            {asset.name}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Typography tag="t5" className="text-gray-v3">
            Asset ID:
          </Typography>
          <div
              title={asset.id}
              className="max-w-[120px] cursor-pointer"
            >
          <Tooltip content={asset.id}>
            <Typography tag="t5" className="text-gray-v3 font-normal truncate">
                {asset.id}
              </Typography>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Typography tag="t5" className="text-gray-v3">
            Serial Number:
          </Typography>
          <Typography tag="t5" className="text-gray-v3 font-normal">
            {asset.serial_number}
          </Typography>
        </div>
        {type === 'hardware' && (
          <div className="flex items-center gap-2">
            <Typography tag="t5" className="text-gray-v3">
              Warranty Expiry:
            </Typography>
            <Typography tag="t5" className="text-gray-v3 font-normal">
              {asset.warranty_expiry}
            </Typography>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Typography tag="t5" className="text-gray-v3">
            Assigned Date:
          </Typography>
          <Typography tag="t5" className="text-gray-v3 font-normal">
            {asset.assigned_date}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Typography tag="t5" className="text-gray-v3">
            Warranty Expiry:
          </Typography>
          <Typography tag="t5" className="text-gray-v3 font-normal">
            {asset.warranty_expiry}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Typography tag="t5" className="text-gray-v3">
            Current Status:
          </Typography>
          <Typography tag="t5" className="text-gray-v3 font-normal">
            {asset.current_status}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Typography tag="t5" className="text-gray-v3">
            Condition:
          </Typography>
          <Typography tag="t5" className="text-gray-v3 font-normal">
            {asset.condition}
          </Typography>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-custom-blue-v2 px-5 py-3 rounded-lg text-gray-500 flex items-center">
          <Typography tag="t5" className="text-gray-v4 font-semibold">
            {calculateExpiryDays(asset.warranty_expiry)} d
          </Typography>
        </div>

        {calculateExpiryDays(asset.warranty_expiry) > 0 ? <ArrowUpIcon className="w-7 h-6 text-yellow-v1" /> : <ArrowDownIcon className="w-7 h-7 text-danger-red" />}

      </div>

      <Button variant="outline" size="medium" className="!rounded-2xl" onClick={handleClick}>
        Raise Issue
      </Button>
    </div>
  );
};

export default HardwareSoftwareInfoCard;
