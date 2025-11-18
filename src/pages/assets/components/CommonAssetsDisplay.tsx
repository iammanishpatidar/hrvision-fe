import { Table, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState, useEffect } from 'react';
import HardwareSoftwareInfoCard from '@/components/common/cards/HardwareSoftwareInfoCard';
import IssueRaisingSheet from '@/components/common/sidesheets/IssueRaisingSheet';
import { AssetsService, FetchAssetsParams } from '@/apis/services/AssetsService';
import useAdminStore from '@/store/admin-store';
import Skeleton from 'react-loading-skeleton';
import { Asset } from '@/types';

interface CommonAssetsDisplayProps {
  categoryId: string;
  categoryName: string;
}

const activityOptions = ['All', 'Recent', 'Ongoing', 'Completed'];

const columns = [
  { key: 'datetime', title: 'Date & Time' },
  { key: 'activityType', title: 'Activity Type' },
  { key: 'assetType', title: 'Asset Type' },
  { key: 'status', title: 'Status' },
  { key: 'actionTaken', title: 'Action Taken' },
];

const CommonAssetsDisplay = ({ categoryId, categoryName }: CommonAssetsDisplayProps) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { onboardingDetails } = useAdminStore();

  const activityData = [
    {
      id: '1',
      datetime: '06 Aug, 2024, 09:30AM',
      activityType: 'Checked Asset Details',
      assetType: categoryName,
      status: 'Active',
      actionTaken: 'Viewed Details',
    },
    {
      id: '2',
      datetime: '07 Aug, 2024, 09:30AM',
      activityType: 'Checked Asset Details',
      assetType: categoryName,
      status: 'Active',
      actionTaken: 'Viewed Details',
    },
    {
      id: '3',
      datetime: '08 Aug, 2024, 09:30AM',
      activityType: 'Checked Asset Details',
      assetType: categoryName,
      status: 'Active',
      actionTaken: 'Viewed Details',
    },
  ];

  useEffect(() => {
    const fetchAssets = async () => {
      if (!categoryId || !onboardingDetails?.businessData?.id) return;

      try {
        setIsLoading(true);
        setError(null);

        const payload: FetchAssetsParams = {
          business_id: onboardingDetails.businessData.id,
          category_id: categoryId,
          employee_id: onboardingDetails.employeeData?.id || ''
        };

        const response = await AssetsService.fetchAssets(payload);
        if (response.data && Array.isArray(response.data)) {
          setAssets(response.data);
        } else {
          setAssets([]);
        }
      } catch (err) {
        console.error('Error fetching assets:', err);
        setError('Failed to load assets. Please try again.');
        setAssets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, [categoryId, onboardingDetails?.businessData?.id, onboardingDetails?.employeeData?.id]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };


  if (isLoading) {
    return (
      <div className="border border-gray-v11 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton width={300} height={40} />
          <Skeleton width={120} height={40} />
        </div>

        {[1, 2].map((categoryIndex) => (
          <div key={categoryIndex}>
            <Skeleton width={150} height={24} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((assetIndex) => (
                <div key={assetIndex} className="bg-white border border-gray-200 rounded-lg p-6">
                  <Skeleton height={20} count={4} className="mb-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center h-64">
          <Typography tag="t1" className="text-danger-red">
            {error}
          </Typography>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-center w-full p-2.5 bg-gray-v5 rounded-2xl border border-blue-custom border-dotted">
        <Typography tag="h5" className="text-custom-black font-bold">
          Active Assets
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.length > 0 ? (
          assets.map((asset, index) => (
            <HardwareSoftwareInfoCard
              key={asset.id || index}
              asset={{
                ...asset,
                name: asset.name || (asset as any).asset_type || 'Unknown Asset',
                current_status: (asset as any).current_status,
                asset_type: categoryName
              }}
              index={index}
              type="asset"
              handleClick={handleClick}
            />
          ))
        ) : (
          <div className="col-span-full h-[200px] flex items-center justify-center">
            <Typography tag="t1" className="text-gray-500">
              No {categoryName.toLowerCase().replace(/_/g, ' ')} assets found
            </Typography>
          </div>
        )}
      </div>

      <Typography tag="h3" className="text-primary font-bold">
        Recent Activities
      </Typography>

      <div>
        <div className="w-fit h-10">
          <div className="flex border border-gray-custom rounded-lg overflow-hidden">
            {activityOptions.map(activityOption => (
              <button
                key={activityOption}
                className={`flex-1 py-3 px-4 text-center text-xs font-medium border-r border-gray-custom last:border-r-0 ${activeTab === activityOption ? 'bg-gray-v5 text-custom-blue' : 'text-gray-v7'
                  }`}
                onClick={() => setActiveTab(activityOption)}
              >
                {activityOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Table
        headerClassName="text-2xl text-black"
        borderRadius={18}
        data={activityData}
        columns={columns}
        keyExtractor={row => row.id}
        pagination={{
          itemsPerPage,
          initialPage: currentPage,
          onPageChange: setCurrentPage,
          totalItems: activityData.length,
        }}
      />

      <IssueRaisingSheet
        isOpen={isOpen}
        onClose={handleClick}
        toggleDrawer={handleClick}
        asset={assets.length > 0 ? assets[0] : {}}
        issueSource={categoryName.toLowerCase()}
      />
    </div>
  );
};

export default CommonAssetsDisplay; 