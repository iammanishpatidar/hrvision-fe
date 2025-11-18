import {
  CalendarTabIcon,
  CustomIcon,
  Tab,
  Tabs,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

const tabs = [
  {
    label: 'Leave Requests',
    labelIcon: <CustomIcon height="16" width="16" />,
    value: '/leave-details/requests',
  },
  {
    label: 'Leave History',
    labelIcon: <CalendarTabIcon height="16" width="16" />,
    value: '/leave-details/history',
  },
];

const LeaveManagement = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || '0';
  const [activeTabIndex, setActiveTabIndex] = useState(parseInt(tab));
  const navigate = useNavigate();

  const handleTabChange = (index: number, tab: Tab) => {
    setActiveTabIndex(index);
    navigate(`${tab.value}?tab=${index}`);
  };
  return (
    <div className="px-10 pb-10">
      <Tabs tabs={tabs} activeIndex={activeTabIndex} onChange={handleTabChange}>
        <div className="my-5">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
};

export default LeaveManagement;
