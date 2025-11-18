import { Typography, Input } from '@fibonacci-innovative-solutions/hrms-design-library';
import { userInfo } from '../../mockData';
import { useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ContractInfoProps {
  initialData?: typeof userInfo.contractInfo;
}

const ContractDetails = ({ initialData = userInfo.contractInfo }: ContractInfoProps) => {
  const [contractInfo, setContractInfo] = useState(initialData);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setContractInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm size-full h-[508px] border p-6 border-gray-v2">
      <div className="">
        <div className="flex items-center justify-between mb-2.5">
          <Typography tag="h4" className="text-primary">
            Contract Details
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label="Contract ID"
            type="text"
            placeholder="#ABC123"
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contractInfo.contractId}
            onChange={e => handleInputChange('ContractId', e.target.value)}
            disabled
            ref={inputRef}
          />
          <Input
            label="Contract Name"
            type="text"
            placeholder=""
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contractInfo.contractName}
            onChange={e => handleInputChange('personalEmail', e.target.value)}
            disabled
          />
          <Input
            label="Contract Type"
            type="text"
            placeholder=""
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contractInfo.contractType}
            onChange={e => handleInputChange('personalEmail', e.target.value)}
            disabled
          />
          <Input
            label="Start Date"
            type="text"
            placeholder=" "
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contractInfo.startDate}
            onChange={e => handleInputChange('personalEmail', e.target.value)}
            disabled
          />
          <Input
            label="End Date"
            type="text"
            placeholder=" "
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contractInfo.endDate}
            onChange={e => handleInputChange('personalEmail', e.target.value)}
            disabled
          />
          <Input
            label="Status"
            type="text"
            placeholder=" "
            theme={{
              labelStyle: 'text-primaryText text-xs',
              inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
            }}
            value={contractInfo.status}
            onChange={e => handleInputChange('personalEmail', e.target.value)}
            disabled
          />
        </div>
      </div>
      {/* <hr className="text-[#DDE2E5BA]" /> */}
      {/* <div className="p-6">
        <div className="flex items-center justify-between mb-2.5">
          <Typography tag="h5" className="text-primary">
            Other Contacts
          </Typography>
          <Button variant="primary" className="min-w-[70px] h-[28px]">
            Add+
          </Button>
        </div>
        {contractInfo.otherContact !== undefined && contractInfo.otherContact !== null ? (
          <div>Need ui</div> //TODO: we will need
        ) : (
          <Typography tag="t5" className="text-primaryText">
            No contacts
          </Typography>
        )}
      </div> */}
      <div className=" text-sm mt-3 font-normal flex items-center justify-end w-full ">
        <div className="cursor-pointer border-b border-primary flex items-center justify-center">
          <Typography tag="t4" className="text-primary">
            View Documents
          </Typography>
          <ChevronRight size={14} color="#444291" />
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
