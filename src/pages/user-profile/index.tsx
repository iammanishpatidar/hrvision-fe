import useAdminStore from '@/store/admin-store';
import { getFormattedNotificationTime } from '@/utils/getFormattedNotificationTime';
import { useUser } from '@clerk/clerk-react';
import {
  CalendarTabIcon,
  CustomIcon,
  FileIcon,
  LockIcon,
  Tab,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  UserIcon,
  UserProfileWithDropdown,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { profileImageUrl } from './mockData';

const tabs = [
  {
    label: 'Personal Details',
    labelIcon: <UserIcon height="16" width="16" />,
    value: '/user-profile/details',
  },
  {
    label: 'Employment Detail',
    labelIcon: <CustomIcon height="16" width="16" />,
    value: '/user-profile/contract',
  },
  {
    label: 'Payroll',
    labelIcon: <LockIcon height="16" width="16" />,
    value: '/user-profile/payroll',
  },
  {
    label: 'Documents',
    labelIcon: <FileIcon height="16" width="16" />,
    value: '/user-profile/documents',
  },
  {
    label: 'Leaves',
    labelIcon: <CalendarTabIcon height="16" width="16" />,
    value: '/user-profile/leaves',
  },
];

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || '0';
  const [activeTabIndex, setActiveTabIndex] = useState(parseInt(tab));
  const navigate = useNavigate();
  const { onboardingDetails } = useAdminStore();

  const { user } = useUser();
  const lastLoggedIn = user?.lastSignInAt;

  const handleTabChange = (index: number, tab: Tab) => {
    if (onboardingDetails?.employeeData?.id) {
      setActiveTabIndex(index);
      navigate(`${tab.value}/${onboardingDetails?.employeeData?.id}?tab=${index}`);
    }
  };

  return (
    <div className="flex flex-col px-10 pb-10">
      <div className="flex items-center gap-20">
        <div className="flex items-center gap-4 border-r border-gray-v8">
          <UserProfileWithDropdown imageUrl={profileImageUrl} size="md" showEditIcon />
          <div className="flex flex-col items-center gap-1 mr-4">
            <Typography tag="t3" className="capitalize">
              {onboardingDetails?.employeeData?.name}
            </Typography>

            <Tag
              variant={onboardingDetails?.employeeData?.is_active ? 'success' : 'error'}
              className="h-5 capitalize"
            >
              {onboardingDetails?.employeeData?.is_active ? 'Active' : 'Inactive'}
            </Tag>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-2 items-center">
            <Typography tag="t4" className="text-[#98999D]">
              Last Login
            </Typography>
            <Typography tag="h5">
              {lastLoggedIn ? getFormattedNotificationTime(lastLoggedIn.toString()) : '--'}
            </Typography>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Typography tag="t4" className="text-[#98999D]">
              Employee ID
            </Typography>
            <div
              title={onboardingDetails?.employeeData?.id}
              className="max-w-[120px] cursor-pointer"
            >
              <Tooltip content={onboardingDetails?.employeeData?.id}>
                <Typography tag="h5" className="truncate">
                  {onboardingDetails?.employeeData?.id}
                </Typography>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Typography tag="t4" className="text-[#98999D]">
              Manager
            </Typography>
            <Typography tag="h5">
              {onboardingDetails?.employeeData?.manager?.name ?? 'No Manager Assigned'}
            </Typography>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} activeIndex={activeTabIndex} onChange={handleTabChange}>
        <div className="my-5">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
};

export default UserProfile;
