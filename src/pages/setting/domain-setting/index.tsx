import { useState } from 'react';
import GeneralPage from './general-page/GeneralPage';
import BrandingPage from './branding-page/BrandingPage';

const DomainSetting = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'branding'>('general');

  return (
    <div className="flex gap-6">
      <div className="flex flex-col w-[200px] max-h-fit rounded-lg border border-gray-v2 bg-white">
        <button
          className={`text-left px-6 py-3 font-medium text-sm rounded-t-lg  ${
            activeTab === 'general'
              ? 'bg-[rgba(68,66,145,0.10)] text-primary font-semibold'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-500'
          }`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`text-left px-6 py-3 font-medium text-sm rounded-b-lg ${
            activeTab === 'branding'
              ? 'bg-[rgba(68,66,145,0.10)] text-primary font-semibold'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-500'
          }`}
          onClick={() => setActiveTab('branding')}
        >
          Branding
        </button>
      </div>
      <div className="flex-1">
        {activeTab === 'general' && <GeneralPage />}
        {activeTab === 'branding' && <BrandingPage />}
      </div>
    </div>
  );
};

export default DomainSetting;
