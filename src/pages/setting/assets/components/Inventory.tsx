import { Button, SearchBar, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { PlusCircleIcon } from '@fibonacci-innovative-solutions/hrms-design-library';
import SettingAssetsCard from '@/components/common/cards/SettingAssetsCard';
import { useEffect, useState } from 'react';
import AddEditAssetsSheet from './AddEditAssetsSheet';
import { AssetsService } from '@/apis/services/AssetsService';
import useAdminStore from '@/store/admin-store';
import { useEmployeeStore } from '@/store/employee-store';
import Skeleton from 'react-loading-skeleton';

const assetFields = [
  { label: 'Asset Name', key: 'name' },
  { label: 'Asset ID', key: 'id' },
  { label: 'Serial Number', key: 'serial_number' },
  { label: 'Warranty Expiry', key: 'warranty_expiry' },
  { label: 'Current Status', key: 'current_status' },
  { label: 'Condition', key: 'condition' },
  { label: 'Asset Type', key: 'asset_type' },
];

const Inventory = () => {
  const [assetSheet, setAssetSheet] = useState<{ visible: boolean; isToAddAsset: boolean; assetToEdit?: any }>({
    visible: false,
    isToAddAsset: true,
  });
  const [assets, setAssets] = useState<any[]>([]);
  const { onboardingDetails } = useAdminStore();
  const { categories } = useEmployeeStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    if (!onboardingDetails?.businessData?.id) return;

    setLoading(true);
    try {
      const response = await AssetsService.fetchAssets({
        business_id: onboardingDetails.businessData.id,
      });
      setAssets(response?.data || []);
    } catch (error) {
      setError('Failed to fetch assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (onboardingDetails?.businessData?.id) {
      fetchAssets();
    }
  }, [onboardingDetails?.businessData?.id]);

  const getAssetsByCategory = (categoryId: string) => {
    return assets.filter((asset: any) => asset.category_id === categoryId);
  };
  if (loading && !error) {
    return (
      <div className="border border-gray-v11 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton width={300} height={40} />
          <Skeleton width={120} height={40} />
        </div>

        {[1, 2, 3].map((categoryIndex) => (
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

  return (
    <div >
      <div className="border border-gray-v11 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <SearchBar
            className="border border-gray-v11 w-1/2 shadow-none"
            inputStyle="text-base bg-gray-100"
            onChange={() => { }}
            onSearch={() => { }}
            placeholder="Search"
            value=""
          />
          <div className="flex gap-2">
            <Button
              icon={<PlusCircleIcon height="15" width="15" />}
              iconPosition="right"
              onClick={() => setAssetSheet({ visible: true, isToAddAsset: true })}
            >
              Add Assets
            </Button>
          </div>
        </div>
        {
          categories.map((category) => (
            <div key={category.id} className=''>
              {getAssetsByCategory(category.id).length > 0 ? (
                <div key={category.id}>
                  <Typography tag="h4" className="font-semibold text-primary mb-4">
                    {category.name}
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getAssetsByCategory(category.id).map((asset, index) => (
                      <SettingAssetsCard key={asset.id} asset={asset} index={index} assetFields={assetFields} setAssetSheet={setAssetSheet} fetchAssets={fetchAssets} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))
        }
      </div>
      <AddEditAssetsSheet
        showAddAssetsSheet={assetSheet.visible}
        onClose={() => setAssetSheet(prev => ({ ...prev, visible: false }))}
        isToAddAsset={assetSheet.isToAddAsset}
        assetToEdit={assetSheet.assetToEdit}
        onAssetAdded={fetchAssets}
      />
    </div>
  );
};

export default Inventory;
