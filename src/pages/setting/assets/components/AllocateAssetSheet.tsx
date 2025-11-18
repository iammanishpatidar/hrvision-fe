import React, { useEffect, useState } from 'react';
import {
  Button,
  Drawer,
  Typography,
  Avatar,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import crossIcon from './../../../../../assets/temp/crossIcon.svg';
import { CategoryService } from '@/apis/services/CategoryService';
import { AssetsService } from '@/apis/services/AssetsService';
import { Category, Asset } from '@/types';
import useAdminStore from '@/store/admin-store';

type AllocateAssetSheetProps = {
  showAllocateAssetSheet: boolean;
  onClose: () => void;
  onAllocate: (allocationData: any) => void;
  employees: any[];
};

const AllocateAssetSheet: React.FC<AllocateAssetSheetProps> = ({
  showAllocateAssetSheet,
  onClose,
  onAllocate,
  employees,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(false);

  const { onboardingDetails } = useAdminStore();

  const getEmployeeId = (employee: any) => employee?.value || employee?.employee_id || employee?.id || '';
  const getEmployeeOfficeId = (employee: any) => employee?.officeId || employee?.employee_id || employee?.id || '';
  const getEmployeeName = (employee: any) => employee?.name || '';
  const getEmployeeAvatar = (employee: any) => employee?.avatar || employee?.profile_image || employee?.image || '';

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await CategoryService.fetchCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    if (showAllocateAssetSheet) {
      fetchCategories();
    }
  }, [showAllocateAssetSheet]);

  useEffect(() => {
    const fetchAssets = async () => {
      if (!selectedCategoryId) {
        setAssets([]);
        return;
      }

      setLoadingAssets(true);
      try {
        const response = await AssetsService.fetchAssets({
          business_id: onboardingDetails?.businessData?.id || '',
          category_id: selectedCategoryId,
        });
        setAssets(response.data || []);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setAssets([]);
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchAssets();
  }, [selectedCategoryId, onboardingDetails?.businessData?.id]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedAssetId('');
    setSelectedEmployeeId('');
    setAssets([]);
    setSelectedCategoryId(categoryId);
  };

  const handleAssetChange = (assetId: string) => {
    setSelectedAssetId(assetId);
  };

  const handleEmployeeChange = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
  };

  const handleAllocate = async () => {
    const selectedAsset = assets.find(asset => asset.id === selectedAssetId);
    const selectedEmployee = employees.find(emp => getEmployeeId(emp) === selectedEmployeeId);
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

    if (selectedAsset && selectedEmployee && selectedCategory) {
      try {
        const requestData = {
          category_id: selectedCategoryId,
          asset_types: [selectedAsset.name],
          employee_id: getEmployeeOfficeId(selectedEmployee),
          comments: `Asset allocation request for ${selectedAsset.name}`
        };

        await AssetsService.createAssetRequest(requestData);

        const allocationData = {
          id: Date.now().toString(),
          assetName: selectedAsset.name,
          assetCategory: selectedCategory.name,
          employeeName: getEmployeeName(selectedEmployee),
          employeeId: getEmployeeOfficeId(selectedEmployee),
          assignedDate: new Date().toISOString().split('T')[0],
        };

        onAllocate(allocationData);
        
        setSelectedCategoryId('');
        setSelectedAssetId('');
        setSelectedEmployeeId('');
        onClose();
      } catch (error) {
        console.error('Error creating asset request:', error);
      }
    }
  };

  const selectedEmployee = employees.find(emp => getEmployeeId(emp) === selectedEmployeeId);

  return (
    <Drawer
      isOpen={showAllocateAssetSheet}
      onClose={onClose}
      position="right"
      width="450px"
      className="p-6 rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto"
    >
      <div className="flex justify-end items-center w-full">
        <img
          src={crossIcon}
          alt="crossIcon"
          className="w-11 h-11 cursor-pointer"
          onClick={onClose}
        />
      </div>
      <Typography tag="h3" className="text-primary text-left w-full mb-6">
        Allocate Asset
      </Typography>

      <div className="flex items-end justify-between flex-col h-[calc(100vh-150px)]">
        <div className="space-y-2.5 w-full">
          <div className="space-y-1">
            <label className="text-primaryText text-sm">Asset Category</label>
            <select
              className="w-full h-12 text-sm font-normal text-primaryText border border-gray-200 rounded-xl p-3 outline-none focus:border-primary"
              value={selectedCategoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={loadingCategories}
            >
              <option value="" className='text-sm font-normal text-primaryText'>
                {loadingCategories ? "Loading categories..." : "Select asset category"}
              </option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name
                    .replace(/_/g, ' ')
                    .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-primaryText text-sm">Asset Name</label>
            <select
              className="w-full h-12 text-sm font-normal text-primaryText border border-gray-200 rounded-xl p-3 outline-none focus:border-primary"
              value={selectedAssetId}
              onChange={(e) => handleAssetChange(e.target.value)}
              disabled={!selectedCategoryId || loadingAssets || assets.length === 0}
            >
              <option value="">
                {!selectedCategoryId
                  ? "Select category first"
                  : loadingAssets
                    ? "Loading assets..."
                    : assets.length === 0
                      ? "No assets available"
                      : "Select asset"}
              </option>
              {assets.map(asset => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <label className="text-primaryText text-sm">Employee</label>
              <select
                className="w-full h-12 text-sm font-normal text-primaryText border border-gray-200 rounded-xl p-3 outline-none focus:border-primary"
                value={selectedEmployeeId}
                onChange={(e) => handleEmployeeChange(e.target.value)}
              >
                <option value="">Select assignee</option>
                {employees.map(user => (
                  <option key={getEmployeeId(user)} value={getEmployeeId(user)}>
                    {`${getEmployeeName(user)} ${getEmployeeOfficeId(user)}`}
                  </option>
                ))}
              </select>
            </div>
            {selectedEmployee && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar src={getEmployeeAvatar(selectedEmployee)} alt={getEmployeeName(selectedEmployee)} size={32} />
                  <span className="text-sm font-medium text-primaryText">{getEmployeeName(selectedEmployee)}</span>
                </div>
                <span className="text-xs text-gray-500">{getEmployeeOfficeId(selectedEmployee)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            type="button"
            className="w-[194px] h-input-default !rounded-2xl"
            onClick={handleAllocate}
            disabled={!selectedCategoryId || !selectedAssetId || !selectedEmployeeId}
          >
            Allocate
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default AllocateAssetSheet;
