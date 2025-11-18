import React from 'react';
import { cn } from '@/lib/utils';
import fileIcon from './../../../../../assets/file.svg';
import PolicyDropdown from './PolicyDropdown';

export type PolicyCardDataItem = {
  title: string;
  fileType: 'doc' | 'pdf' | 'ppt';
  effectiveFrom: string;
  effectiveTill: string;
  createdBy: string;
};

export interface PolicyCardProps extends PolicyCardDataItem {
  setShowCompanyPolicySheet: (value: boolean) => void;
}

const fileTypeColors: Record<PolicyCardDataItem['fileType'], string> = {
  doc: 'border-blue-300 ',
  pdf: 'border-yellow-300 ',
  ppt: 'border-green-300 ',
};
const fileBgTypeColors: Record<PolicyCardDataItem['fileType'], string> = {
  doc: 'bg-blue-100 ',
  pdf: 'bg-yellow-100 ',
  ppt: 'bg-green-100 ',
};
const fileTagTypeColors: Record<PolicyCardDataItem['fileType'], string> = {
  doc: 'bg-blue-100 text-blue-400',
  pdf: 'bg-yellow-100  text-yellow-400',
  ppt: 'bg-green-100  text-green-400',
};

export const PolicyCard: React.FC<PolicyCardProps> = ({
  title,
  fileType,
  effectiveFrom,
  effectiveTill,
  createdBy,
  setShowCompanyPolicySheet,
}) => {
  return (
    <div
      className={cn(
        'border rounded-xl w-full max-w-xs shadow-sm flex flex-col  justify-between',
        fileTypeColors[fileType]
      )}
    >
      <div className="flex flex-col gap-4  p-4 ">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-[10px]   ${fileBgTypeColors[fileType]}`}>
            <img src={fileIcon} alt={`${fileType} icon`} className="w-5 h-5" />
          </div>
          <PolicyDropdown
            onDownload={() => console.log('Download', title)}
            onAcknowledge={() => console.log('Acknowledge', title)}
            onViewDescription={() => setShowCompanyPolicySheet(true)}
          />
        </div>
        <h3 className="  text-sm text-black">{title}</h3>
      </div>

      <div className=" border-[rgba(229,229,234,0.51)] border-t "></div>

      <div className=" flex justify-between items-center p-4">
        <div className=" text-xs text-[#8E8E93]">{`${effectiveFrom} – ${effectiveTill}`}</div>
        <div className={`text-xs   px-2 py-1 rounded-xl ${fileTagTypeColors[fileType]} `}>
          By {createdBy}
        </div>
      </div>
    </div>
  );
};
