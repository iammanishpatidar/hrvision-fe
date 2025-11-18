import { Button, Dropdown, SearchBar } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import { policyData, policyTypes } from '../mockData';
import { PolicyCard } from './components/PolicyCard';
import AddPolicySideSheet from './components/AddPolicySideSheet';
import CompanyPolicySheet from './components/CompanyPolicySheet';

const Policies = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [showCompanyPolicySheet, setShowCompanyPolicySheet] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-6 px-10 pb-10">
      <div className=" flex justify-between items-center">
        <div>Company Policies</div>
        <Button onClick={() => setIsPolicyOpen(true)} variant="primary">
          Add
        </Button>
      </div>

      <div className="flex flex-col gap-6 border-1 border-gray-v2 p-6 rounded-xl">
        <div className="flex items-center gap-4">
          <SearchBar className=" w-1/2 h-9 " />
          <Dropdown
            options={policyTypes}
            onChange={selected => console.log('Selected:', selected)}
            label=""
            theme={{ inputStyle: 'w-fit !h-10' }}
            multi
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policyData.map((policy, index) => (
            <PolicyCard
              key={index}
              {...policy}
              setShowCompanyPolicySheet={setShowCompanyPolicySheet}
            />
          ))}
        </div>
      </div>
      <CompanyPolicySheet
        showCompanyPolicySheet={showCompanyPolicySheet}
        setShowCompanyPolicySheet={setShowCompanyPolicySheet}
      />

      <AddPolicySideSheet isOpen={isPolicyOpen} setIsOpen={setIsPolicyOpen} />
    </div>
  );
};

export default Policies;
