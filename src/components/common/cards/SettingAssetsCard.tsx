import {
  BinIcon,
  MenuButton,
  MenuButtonItem,
  Pen,
  Tooltip,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import MenuOptionsIcon from './../../../../assets/MenuOptions';
import React from 'react';
import { AssetsService } from '@/apis/services/AssetsService';
import { handleToast } from '@/utils/toastUtils';

type AssetField = {
  label: string;
  key: string;
};

type SettingAssetsCardProps = {
  asset: Record<string, any>;
  index: number;
  assetFields: AssetField[];
  setAssetSheet: (value: any) => void;
  fetchAssets: () => void;
};

const
   SettingAssetsCard: React.FC<SettingAssetsCardProps> = ({
    index,
    asset,
    assetFields,
    setAssetSheet,
    fetchAssets,
  }) => {
    const handleDeleteAsset = () => {
      AssetsService.deleteAsset(asset.id).then(() => {
        handleToast({
          message: 'Asset deleted successfully!',
          status: 'success',
        });
        fetchAssets();
      }).catch(() => {
        handleToast({
          message: 'Failed to delete asset!',
          status: 'error',
        });
      });
    }
    const menuItems: MenuButtonItem[] = [
      {
        content: (
          <div className="flex items-center gap-4">
            <Pen color="#6F767E" height="24" width="24" />
            <div className="text-gray-v12 font-medium">Edit</div>
          </div>
        ),
        onClick: () => {
          setAssetSheet({ visible: true, isToAddAsset: false, assetToEdit: asset });
        },
      },
      {
        content: (
          <div className="flex items-center gap-4 text-[#91929e]">
            <BinIcon color="#6F767E" />
            <div className="text-gray-v12 font-medium">Delete</div>
          </div>
        ),
        onClick: handleDeleteAsset,
      },
    ];

    return (
      <div
        className="flex flex-col gap-2.5 bg-white rounded-lg shadow-cardShadow py-4 px-7 w-full max-w-xs relative"
        key={index}
      >
        <MenuButton
          items={menuItems}
          position="right"
          menuWidth="156px"
          icon={<MenuOptionsIcon />}
          className="absolute right-5 top-5"
        />
        <Typography tag="h4" className="text-primary">
          {asset.asset_type.charAt(0).toUpperCase() + asset.asset_type.slice(1).toLowerCase()}
        </Typography>
        <div className="text-gray-600 text-sm">

          {assetFields.map(({ label, key }) => {
            const value = asset[key];
            const isStatus = key.toLowerCase() === 'current_status';
            if (key === 'asset_type') return null;
            return (
              <div key={key} className="flex items-start gap-2">
                <Typography tag="t5" className="text-gray-v3 min-w-max">
                  {label}:
                </Typography>
                {
                  label !== 'Asset ID' ? (
                    <Typography
                      tag="t5"
                      className={`text-gray-v3 font-normal ${isStatus
                        ? value?.toLowerCase() === 'available'
                          ? 'text-green-700'
                          : 'text-red-500'
                        : ''
                        }`}
                    >
                      {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
                    </Typography>
                  ) : (
                    <div
                      title={value}
                      className="max-w-[140px] cursor-pointer"
                    >
                      <Tooltip content={value}>
                        <Typography tag="t5" className="text-gray-v3 font-normal truncate">
                          {value}
                        </Typography>
                      </Tooltip>
                    </div>
                  )
                }

              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default SettingAssetsCard;
