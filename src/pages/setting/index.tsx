import {
  AssetsIcon,
  CalendarTabIcon,
  CustomIcon,
  FileIcon,
  LockIcon,
  Tab,
  Tabs,
  Typography,
  UserIcon,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
const tabs = [
  {
    label: 'General Settings',
    labelIcon: <UserIcon height="16" width="16" />,
    value: '/setting/domain',
  },
  {
    label: 'Time Off',
    labelIcon: <FileIcon height="16" width="16" />,
    value: '/setting/time-off',
  },
  {
    label: 'Employee Document Structure',
    labelIcon: <CustomIcon height="16" width="16" />,
    value: '/setting/employee-document-structure',
  },
  {
    label: 'Job Titles',
    labelIcon: <LockIcon height="16" width="16" />,
    value: '/setting/job-titles',
  },
  {
    label: 'Holidays',
    labelIcon: <CalendarTabIcon height="16" width="16" />,
    value: '/setting/holidays',
  },
  {
    label: 'Assets',
    labelIcon: <AssetsIcon height="16" width="16" />,
    value: '/setting/assets',
  },
  // {
  //   label: 'Relief Officers',
  //   labelIcon: <AssetsIcon height="16" width="16" />,
  //   value: '/setting/relief-officers',
  // },
];

const Setting = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || '0';
  const [activeTabIndex, setActiveTabIndex] = useState(parseInt(tab));
  const navigate = useNavigate();

  const handleTabChange = (index: number, tab: Tab) => {
    setActiveTabIndex(index);
    navigate(`${tab.value}?tab=${index}`);
  };
  return (
    <div className="flex flex-col px-10 pb-10">
      <Typography tag="h2" className="text-primary">
        Settings
      </Typography>
      <Tabs tabs={tabs} activeIndex={activeTabIndex} onChange={handleTabChange}>
        <div className="my-5">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
};

export default Setting;
