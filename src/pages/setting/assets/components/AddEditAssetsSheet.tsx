import {
  Button,
  DatePicker,
  Drawer,
  Dropdown,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import crossIcon from './../../../../../assets/temp/crossIcon.svg';
import React, { useEffect, useState, useRef } from 'react';
import { AssetsService } from '@/apis/services/AssetsService';
import { AssetConditionEnum, AssetStatusEnum } from '@/enums';
import useAdminStore from '@/store/admin-store';
import { handleToast } from '@/utils/toastUtils';
import { useEmployeeStore } from '@/store/employee-store';
import { CategoryService } from '@/apis/services/CategoryService';

interface AddEditAssetsSheetProps {
  showAddAssetsSheet: boolean;
  onClose: () => void;
  isToAddAsset?: boolean;
  assetToEdit?: any;
  onAssetAdded?: () => void;
}

const AddEditAssetsSheet: React.FC<AddEditAssetsSheetProps> = ({
  showAddAssetsSheet,
  onClose,
  isToAddAsset,
  assetToEdit,
  onAssetAdded,
}) => {

  const { categories, setCategories } = useEmployeeStore();
  const { onboardingDetails } = useAdminStore();
  const businessId = onboardingDetails?.businessData?.id;

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories.length === 0) {
        const categoriesResponse = await CategoryService.fetchCategories();
        const categoriesData = categoriesResponse.data?.categories || [];
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          const firstCategory = categoriesData[0];
          setSelectedCategory({ label: firstCategory.name, value: firstCategory.id });
          setAsset(prev => ({ ...prev, category_id: firstCategory.id }));
        }
      }
    };
    fetchCategories();
  }, [categories.length, setCategories]);

  useEffect(() => {
    if (businessId) {
      setAsset(prev => ({ ...prev, business_id: businessId }));
    }
  }, [businessId]);

  const [asset, setAsset] = useState({
    name: '',
    serial_number: '',
    business_id: '',
    category_id: '',
    asset_type: '',
    assigned_date: new Date(),
    current_status: AssetStatusEnum.AVAILABLE,
    condition: AssetConditionEnum.GOOD,
    warranty_expiry: new Date(),
    license_type: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<{ label: string; value: string } | null>(null);
  const populatedAssetId = useRef<string | null>(null);
  useEffect(() => {
    if (!showAddAssetsSheet) {
      setAsset({
        name: '',
        serial_number: '',
        business_id: businessId || '',
        category_id: '',
        asset_type: '',
        assigned_date: new Date(),
        current_status: AssetStatusEnum.AVAILABLE,
        condition: AssetConditionEnum.GOOD,
        warranty_expiry: new Date(),
        license_type: '',
      });
      setSelectedCategory(null);
      populatedAssetId.current = null;
    }
  }, [showAddAssetsSheet, businessId]);

  useEffect(() => {
    if (showAddAssetsSheet && assetToEdit && !isToAddAsset) {
      if (populatedAssetId.current !== assetToEdit.id) {
        setAsset({
          name: assetToEdit.name || '',
          serial_number: assetToEdit.serial_number || '',
          business_id: assetToEdit.business_id || businessId || '',
          category_id: assetToEdit.category_id || '',
          asset_type: assetToEdit.asset_type || '',
          assigned_date: assetToEdit.assigned_date ? new Date(assetToEdit.assigned_date) : new Date(),
          current_status: assetToEdit.current_status || AssetStatusEnum.AVAILABLE,
          condition: assetToEdit.condition || AssetConditionEnum.GOOD,
          warranty_expiry: assetToEdit.warranty_expiry ? new Date(assetToEdit.warranty_expiry) : new Date(),
          license_type: assetToEdit.license_type || '',
        });
        populatedAssetId.current = assetToEdit.id;
      }
    }
  }, [showAddAssetsSheet, assetToEdit, isToAddAsset, businessId]);

  useEffect(() => {
    if (showAddAssetsSheet && assetToEdit && !isToAddAsset && categories.length > 0 && populatedAssetId.current === assetToEdit.id) {
      if (assetToEdit.category_id) {
        const category = categories.find(cat => cat.id === assetToEdit.category_id);
        if (category) {
          setSelectedCategory({ label: category.name, value: category.id });
        }
      }
    }
  }, [categories, showAddAssetsSheet, assetToEdit, isToAddAsset, businessId]);

    const handleSaveAsset = async () => {
    try {
      if (isToAddAsset) {
        const assetPayload = {
          name: asset.name,
          serial_number: asset.serial_number,
          business_id: asset.business_id,
          category_id: asset.category_id,
          asset_type: asset.asset_type,
          assigned_date: new Date().toISOString().split('T')[0],
          current_status: asset.current_status,
          condition: asset.condition,
          warranty_expiry: asset.warranty_expiry.toISOString().split('T')[0],
          license_type: asset.license_type,
        };
        
        await AssetsService.addAsset(assetPayload);
        handleToast({
          message: 'Asset created successfully!',
          status: 'success',
        });
        onAssetAdded?.();
      } else {
        const updatePayload: any = {};
        updatePayload.business_id = asset.business_id;
        updatePayload.category_id = asset.category_id;
        
        if (asset.name !== assetToEdit.name) {
          updatePayload.name = asset.name;
        }
        if (asset.serial_number !== assetToEdit.serial_number) {
          updatePayload.serial_number = asset.serial_number;
        }
        if (asset.asset_type !== assetToEdit.asset_type) {
          updatePayload.asset_type = asset.asset_type;
        }
        if (asset.assigned_date.toISOString().split('T')[0] !== assetToEdit.assigned_date) {
          updatePayload.assigned_date = asset.assigned_date.toISOString().split('T')[0];
        }
        if (asset.current_status !== assetToEdit.current_status) {
          updatePayload.current_status = asset.current_status;
        }
        if (asset.condition !== assetToEdit.condition) {
          updatePayload.condition = asset.condition;
        }
        if (asset.warranty_expiry.toISOString().split('T')[0] !== assetToEdit.warranty_expiry) {
          updatePayload.warranty_expiry = asset.warranty_expiry.toISOString().split('T')[0];
        }
        if (asset.license_type !== assetToEdit.license_type) {
          updatePayload.license_type = asset.license_type;
        }
        
        await AssetsService.updateAsset(assetToEdit.id, updatePayload);
        handleToast({
          message: 'Asset updated successfully!',
          status: 'success',
        });
        onAssetAdded?.();
      }
      
      setAsset({
        name: '',
        serial_number: '',
        business_id: businessId || '',
        category_id: '',
        asset_type: '',
        assigned_date: new Date(),
        current_status: AssetStatusEnum.AVAILABLE,
        condition: AssetConditionEnum.GOOD,
        warranty_expiry: new Date(),
        license_type: '',
      });
      setSelectedCategory(null);
      onClose();
    } catch (error) {
      handleToast({
        message: isToAddAsset ? 'Failed to create asset. Please try again.' : 'Failed to update asset. Please try again.',
        status: 'error',
      });
    }
  };

  return (
    <Drawer
      isOpen={showAddAssetsSheet}
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
        {isToAddAsset ? 'Add Asset' : 'Edit Asset'}
      </Typography>

      <div className="space-y-2.5 w-full">
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Asset Name"
          placeholder="Enter asset name"
          className="w-full"
          type="text"
          value={asset.name}
          onChange={e => setAsset(prev => ({ ...prev, name: e.target.value }))}
        />
        
        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Asset Type"
          placeholder="Enter asset type"
          className="w-full"
          type="text"
          value={asset.asset_type}
          onChange={e => setAsset(prev => ({ ...prev, asset_type: e.target.value }))}
        />

        {isToAddAsset && categories.length > 0 && (
          <Dropdown
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'h-12 text-sm font-normal text-primaryText',
            }}
            label="Asset Category"
            placeholder="Enter asset category"
            options={categories.map(cat => ({ label: cat.name, value: cat.id }))}
            selected={selectedCategory}
            onChange={e => {
              if (e) {
                setSelectedCategory(e);
                setAsset(prev => ({ ...prev, category_id: e.value }));
              }
            }}
          />
        )}

        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Serial Number"
          placeholder="Enter asset serial number"
          className="w-full"
          type="text"
          value={asset.serial_number}
          onChange={e => setAsset(prev => ({ ...prev, serial_number: e.target.value }))}
        />



        <DatePicker
          className="w-full"
          label="Warranty Expiry"
          mode="single"
          placeholder="Select warranty expiry"
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          disablePast={true}
          value={asset.warranty_expiry}
          onChange={date => {
            if (date) {
              setAsset(prev => ({ ...prev, warranty_expiry: date }));
            }
          }}
        />

        <Dropdown
          options={Object.values(AssetStatusEnum).map(status => ({ label: status, value: status }))}
          label="Status"
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          selected={{ label: asset.current_status, value: asset.current_status }}
          onChange={e => {
            if (e) {
              setAsset(prev => ({ ...prev, current_status: e.value as AssetStatusEnum }));
            }
          }}
        />

        <Dropdown
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="Condition"
          placeholder="Select asset condition"
          options={Object.values(AssetConditionEnum).map(condition => ({ label: condition, value: condition }))}
          selected={{ label: asset.condition, value: asset.condition }}
          onChange={e => {
            if (e) {
              setAsset(prev => ({ ...prev, condition: e.value as AssetConditionEnum }));
            }
          }}
        />

        <Input
          theme={{
            labelStyle: 'text-primaryText text-sm font-medium',
            inputStyle: 'h-12 text-sm font-normal text-primaryText',
          }}
          label="License Type"
          placeholder="Enter license type"
          className="w-full"
          type="text"
          value={asset.license_type}
          onChange={e => setAsset(prev => ({ ...prev, license_type: e.target.value }))}
        />
      </div>

      <div className="flex justify-end mt-10">
        <Button variant="primary" type="button" className="w-[194px] h-input-default !rounded-2xl" onClick={handleSaveAsset}>
          Save Asset
        </Button>
      </div>
    </Drawer>
  );
};

export default AddEditAssetsSheet;
