import { useState } from 'react';
import Inventory from './components/Inventory';
import Allocation from './components/Allocation';

const Assets = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'allocation'>('inventory');
  return (
    <div className="flex gap-6 ">
      <div className="flex flex-col w-[200px] max-h-fit rounded-lg border border-gray-v11 bg-white">
        <button
          className={`text-left px-6 py-3 font-medium text-sm rounded-t-lg  ${
            activeTab === 'inventory'
              ? 'bg-[rgba(68,66,145,0.10)] text-[#444291] font-semibold'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-500'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`text-left px-6 py-3 font-medium text-sm rounded-b-lg ${
            activeTab === 'allocation'
              ? 'bg-[rgba(68,66,145,0.10)] text-[#444291] font-semibold'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-500'
          }`}
          onClick={() => setActiveTab('allocation')}
        >
          Allocation
        </button>
      </div>
      <div className="flex-1">
        {activeTab === 'inventory' && <Inventory />}
        {/* {activeTab === 'memberships' && <Memberships />} */}
        {activeTab === 'allocation' && <Allocation />}
      </div>
    </div>
  );
};

const SettingAssets = Assets;

export default SettingAssets;
