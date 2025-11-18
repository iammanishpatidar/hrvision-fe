import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-react';
import {
  AssetsIcon,
  BellFilledIcon,
  CalendarIcon,
  CalendarRemoveIcon,
  ClockSearchIcon,
  CustomIcon,
  Dashboard,
  Employee,
  Header,
  Profile,
  Settings,
  Sidebar,
  Training,
  UserAddPofileIcon,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import LeaveRequestSheet from './components/common/sidesheets/LeaveRequestSheet';
import NotificationsSheet from './components/common/sidesheets/NotificationsSheet';
import StartTimeTrackingSheet from './components/common/sidesheets/StartTimeTrackingSheet';
import StopTimeTractingSheet from './components/common/sidesheets/StopTimeTractingSheet';
import InviteEmployeeDrawer from './components/InviteEmployeeDrawer/InviteEmployeeDrawer';
import { profileImageUrl } from './pages/user-profile/mockData';
import useAdminStore from './store/admin-store';
import { useTimerStore } from './store/timer-store';

const Layout = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const location = useLocation();

  // Zustand state and actions
  const isTimerRunning = useTimerStore(state => state.isTimerRunning);
  const workingHoursCompleted = useTimerStore(state => state.workingHoursCompleted);
  const startTimer = useTimerStore(state => state.startTimer);
  const stopTimer = useTimerStore(state => state.stopTimer);
  const incrementWorkingHours = useTimerStore(state => state.incrementWorkingHours);
  const resetWorkingHours = useTimerStore(state => state.resetWorkingHours);
  const [isStartTimeTrackingSheetOpen, setIsStartTimeTrackingSheetOpen] = useState(false);
  const [isStopTimeTrackingSheetOpen, setIsStopTimeTrackingSheetOpen] = useState(false);
  const [isNotificationsSheetOpen, setIsNotificationsSheetOpen] = useState(false);
  const [isEmployeeInviteSheetOpen, setIsEmployeeInviteSheetOpen] = useState(false);
  const [isLeaveRequestSheetOpen, setIsLeaveRequestSheetOpen] = useState<boolean>(false);
  const { refreshEmployeeBusinessInfo, clearUserData } = useAdminStore();

  useEffect(() => {
    if (user) {
      refreshEmployeeBusinessInfo(user.id);
    }
  }, [user]);

  const { signOut } = useClerk();

  const ignoreSidebarRoutes = ['/onboard', '/signup', '/signin'];
  const ignoreAuthRedirectRoutes = ['/invitation', '/signup', '/signin'];

  const handleSidebarNavigation = (path: string) => {
    navigate(`/${path}`);
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        incrementWorkingHours(); // increment in Zustand store
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTimerRunning, incrementWorkingHours]);

  const handleStartTimer = () => {
    startTimer();
    setIsStartTimeTrackingSheetOpen(false);
    setIsStopTimeTrackingSheetOpen(true);
  };

  const handleStopTimer = () => {
    stopTimer();
    resetWorkingHours();
    setIsStopTimeTrackingSheetOpen(false);
    setIsStartTimeTrackingSheetOpen(true);
  };

  const handleTimeTrackingClick = () => {
    if (isTimerRunning) {
      setIsStopTimeTrackingSheetOpen(true);
    } else {
      setIsStartTimeTrackingSheetOpen(true);
    }
  };
  const sidebarItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
      onClick: () => handleSidebarNavigation('dashboard'),
    },
    {
      path: '/assets',
      label: 'Assets',
      icon: <AssetsIcon height="24" width="24" />,
      onClick: () => handleSidebarNavigation('assets'),
    },
    {
      path: '/employee',
      label: 'Employee',
      icon: <Employee />,
      onClick: () => handleSidebarNavigation('employee'),
    },
    {
      path: '/calendar',
      label: 'Calendar',
      icon: <CalendarIcon />,
      onClick: () => handleSidebarNavigation('calendar'),
    },
    {
      path: '/setting',
      label: 'Settings',
      icon: <Settings />,
      onClick: () => handleSidebarNavigation('setting'),
    },
    {
      path: '/policies',
      label: 'Policies',
      icon: <Training />,
      onClick: () => handleSidebarNavigation('policies'),
    },
    {
      path: '/leave-details',
      label: 'Leave Management',
      icon: <CustomIcon height="24" width="24" />,
      onClick: () => handleSidebarNavigation('leave-details'),
    },
    {
      path: `/user-profile`,
      label: 'Profile',
      icon: <Profile />,
      onClick: () => handleSidebarNavigation(`user-profile/details/${user?.id}`),
    },
  ];

  const toggleSideSheet = (sheetName: string) => {
    if (sheetName === 'startTimeTracking') {
      if (!isTimerRunning) {
        setIsStartTimeTrackingSheetOpen(!isStartTimeTrackingSheetOpen);
      }
    }
    if (sheetName === 'stopTimeTracking') {
      setIsStopTimeTrackingSheetOpen(!isStopTimeTrackingSheetOpen);
    }
    if (sheetName === 'notifications') {
      setIsNotificationsSheetOpen(!isNotificationsSheetOpen);
    }
    if (sheetName === 'EmployeeInvite') {
      setIsEmployeeInviteSheetOpen(!isEmployeeInviteSheetOpen);
    }
    if (sheetName === 'leaveRequest') {
      setIsLeaveRequestSheetOpen(!isLeaveRequestSheetOpen);
    }
  };

  const headerActions = [
    {
      icon: <UserAddPofileIcon />,
      badge: false,
      onClick: () => setIsEmployeeInviteSheetOpen(!isEmployeeInviteSheetOpen),
    },
    {
      icon: <CalendarRemoveIcon />,
      badge: false,
      onClick: () => setIsLeaveRequestSheetOpen(!isLeaveRequestSheetOpen),
    },
    {
      icon: <ClockSearchIcon />,
      badge: false,
      onClick: handleTimeTrackingClick,
    },
    {
      icon: <BellFilledIcon />,
      badge: true,
      onClick: () => setIsNotificationsSheetOpen(!isNotificationsSheetOpen),
    },
  ];

  return (
    <>
      <SignedOut>
        {!ignoreAuthRedirectRoutes.some(route => location.pathname.startsWith(route)) && (
          <Navigate to="/signup" replace />
        )}
      </SignedOut>
      <SignedIn>
        {!isLoaded ? (
          <h1>it is loading</h1>
        ) : (
          <div className="flex flex-col h-screen overflow-hidden">
            {!ignoreSidebarRoutes.some(route => location.pathname.startsWith(route)) && (
              <div className="flex-shrink-0 z-30">
                <Header
                  actions={headerActions}
                  searchBarProps={{
                    clasName: 'w-[400px]',
                  }}
                  userProfileProps={{
                    imageUrl: profileImageUrl,
                    showDropdown: true,
                    dropdownOptions: [
                      {
                        label: 'Sign Out',
                        onClick: () => {
                          signOut().then(() => {
                            clearUserData();
                          });
                        },
                      },
                    ],
                  }}
                />
              </div>
            )}
            <div className="flex flex-1 overflow-hidden">
              {!ignoreSidebarRoutes.some(route => location.pathname.startsWith(route)) && (
                <div className="flex-shrink-0">
                  <Sidebar items={sidebarItems} className="min-w-max" />
                </div>
              )}

              <main className={`flex-1 overflow-y-auto ${!ignoreSidebarRoutes.some(route => location.pathname.startsWith(route)) ? 'py-10' : ''}`}>
                {/* {!ignoreSidebarRoutes.some(route => location.pathname.startsWith(route)) && (
                  <Breadcrumbs />
                )} */}
                {/* <Breadcrumbs
                  items={[
                    {
                      label: 'Home',
                      path: '/',
                    },
                    {
                      label: 'Dashboard',
                      path: '/dashboard',
                    },
                    {
                      label: 'Profile',
                    },
                  ]}
                  onClick={() => {}}
                /> */}
                <Outlet />
              </main>

              <StartTimeTrackingSheet
                isOpen={isStartTimeTrackingSheetOpen}
                onClose={() => toggleSideSheet('startTimeTracking')}
                toggleDrawer={() => toggleSideSheet('startTimeTracking')}
                handleStartTimer={handleStartTimer}
              />

              <StopTimeTractingSheet
                isOpen={isStopTimeTrackingSheetOpen}
                onClose={() => toggleSideSheet('stopTimeTracking')}
                toggleDrawer={() => toggleSideSheet('stopTimeTracking')}
                workingHoursCompleted={workingHoursCompleted}
                handleStopTimer={handleStopTimer}
              />

              <NotificationsSheet
                isOpen={isNotificationsSheetOpen}
                onClose={() => toggleSideSheet('notifications')}
                toggleDrawer={() => toggleSideSheet('notifications')}
              />
              <InviteEmployeeDrawer
                isOpen={isEmployeeInviteSheetOpen}
                onClose={toggleSideSheet}
                toggleDrawer={toggleSideSheet}
              />

              <LeaveRequestSheet
                isLeaveRequestSheetOpen={isLeaveRequestSheetOpen}
                onClose={toggleSideSheet}
              />
            </div>
          </div>
        )}
      </SignedIn>
    </>
  );
};

export default Layout;
