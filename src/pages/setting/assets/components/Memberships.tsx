import SettingAssetsCard from '@/components/common/cards/SettingAssetsCard';
import {
  Button,
  PlusCircleIcon,
  SearchBar,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { clubMemberships, mockPrograms } from '../../mockData';
import AddEditProgramSheet from './AddEditProgramSheet';
import { useState } from 'react';

const clubFields = [
  { label: 'Club Name', key: 'name' },
  { label: 'ID', key: 'id' },
  { label: 'Status', key: 'status' },
  { label: 'Access Level', key: 'accessLevel' },
  { label: 'Perks', key: 'perks' },
];

const programFields = [
  { label: 'Program Name', key: 'name' },
  { label: 'ID', key: 'id' },
  { label: 'Status', key: 'status' },
  { label: 'Access Level', key: 'accessLevel' },
  { label: 'Perks', key: 'perks' },
];

const Memberships = () => {
  const [programSheet, setProgramSheet] = useState<{ visible: boolean; isToAddAsset: boolean }>({
    visible: false,
    isToAddAsset: true,
  });
  return (
    <div className="border border-gray-v9 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <SearchBar
          className="border border-[#E6E6E6] w-1/2 shadow-none"
          inputStyle="text-base bg-gray-100"
          onChange={() => {}}
          onSearch={() => {}}
          placeholder="Search"
          value=""
        />
        <Button
          icon={<PlusCircleIcon height="15" width="15" />}
          iconPosition="right"
          onClick={() => setProgramSheet({ visible: true, isToAddAsset: true })}
        >
          Add Program
        </Button>
      </div>
      <Typography tag="h4" className="font-semibold text-primary">
        Employee Benefit Club
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubMemberships && clubMemberships.length > 0 ? (
          clubMemberships.map((membership, index) => (
            <>
              <SettingAssetsCard
                asset={membership}
                index={index}
                assetFields={clubFields}
                setAssetSheet={setProgramSheet}
              />
            </>
          ))
        ) : (
          <div className="w-[1100px] h-[200px] flex items-center justify-center">
            No Benefit Club assets found
          </div>
        )}
      </div>
      <Typography tag="h4" className="font-semibold text-primary">
        Health & Wellness Programs
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrograms && mockPrograms.length > 0 ? (
          mockPrograms.map((program, index) => (
            <>
              <SettingAssetsCard
                asset={program}
                index={index}
                assetFields={programFields}
                setAssetSheet={setProgramSheet}
              />
            </>
          ))
        ) : (
          <div className="w-[1100px] h-[200px] flex items-center justify-center">
            No Programs assets found
          </div>
        )}
      </div>
      <AddEditProgramSheet
        showAddProgramSheet={programSheet.visible}
        onClose={() => setProgramSheet(prev => ({ ...prev, visible: false }))}
        isToAddProgram={programSheet.isToAddAsset}
      />
    </div>
  );
};

export default Memberships;
