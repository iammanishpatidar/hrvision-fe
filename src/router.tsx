import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App';
import OAuthCallback from './components/OAuthCallback/OAuthCallback';
import PublicRouteProtection from './components/PublicRouteProtection';
import Layout from './layout';
import Calendar from './pages/Calendar';
import Assets from './pages/assets';
import CategoryComponent from './pages/assets/components/CategoryComponent';  
import Dashboard from './pages/dashboard';
import { DashboardLandingPage } from './pages/dashboard/dashboardLandingPage';
import Policies from './pages/dashboard/policies';
import EmployeeMain from './pages/employee';
import LeaveManagement from './pages/leave-management';
import LeaveHistory from './pages/leave-management/history';
import LeaveRequests from './pages/leave-management/requests';
import OnBoard from './pages/onboard';
import Company from './pages/onboard/company';
import Employee from './pages/onboard/employee';
import RegisterSuccess from './pages/onboard/register-success';
import Setting from './pages/setting';
import SettingAssets from './pages/setting/assets';
import DomainSetting from './pages/setting/domain-setting';
import EmployeeDocument from './pages/setting/employee-document';
import Holiday from './pages/setting/holiday';
import JobTitle from './pages/setting/job-title';
import ReliefOfficers from './pages/setting/relief-officers';
import TimeOff from './pages/setting/time-off';
import CustomSignIn from './pages/sign-in';
import CustomSignUp from './pages/sign-up';
import InvitationAcceptance from './pages/invitation-acceptance';
import UserProfile from './pages/user-profile';
import Documents from './pages/user-profile/documents/index';
import EmployementDetails from './pages/user-profile/employement-details';
import Leaves from './pages/user-profile/leaves';
import Payroll from './pages/user-profile/payroll/index';
import PersonalDetails from './pages/user-profile/personal-details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error Page will go here</div>,
    children: [
      // Public Routes
      {
        index: true,
        loader: async () => redirect('signin'),
      },
      {
        path: 'signin',
        element: (
          <PublicRouteProtection>
            <CustomSignIn />
          </PublicRouteProtection>
        ),
      },
      {
        path: 'signup',
        element: (
          <PublicRouteProtection>
            <CustomSignUp />
          </PublicRouteProtection>
        ),
      },
      {
        path: '/authcallback',
        element: (
          <PublicRouteProtection>
            <OAuthCallback />
          </PublicRouteProtection>
        ),
      },
      {
        path: '/invitation/accept',
        element: <InvitationAcceptance />,
      },
      {
        path: '/invitation/accept/:token',
        element: <InvitationAcceptance />,
      },
      {
        path: '/invitation',
        element: <InvitationAcceptance />,
      },

      // Private Routes
      {
        element: <Layout />,
        children: [
          {
            index: true,
            loader: async () => redirect('dashboard'),
          },
          {
            path: 'onboard',
            element: <OnBoard />,
            children: [
              {
                index: true,
                loader: async () => redirect('company'),
              },
              {
                path: 'company',
                element: <Company />,
              },
              {
                path: 'employee',
                element: <Employee />,
              },
              {
                path: 'register-success/:employeeId',
                element: <RegisterSuccess />,
              },
            ],
          },
          {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
              // {
              //   index: true,
              //   loader: async () => redirect('poilcies'),
              // },
              // {
              //   index: true,
              //   loader: async () => redirect('poilcies'),
              // },
              {
                path: '',
                element: <DashboardLandingPage />,
              },
              {
                path: 'poilcies',
                element: <Policies />,
              },
            ],
          },
          {
            path: '/reports-analytics',
            element: <div> Reports and Analytics </div>,
          },
          {
            path: '/assets',
            element: <Assets />,
            children: [
              {
                path: ':categorySlug',
                element: <CategoryComponent />,
              },
            ],
          },
          {
            path: '/employee',
            element: <EmployeeMain />,
          },
          {
            path: '/recruitment',
            element: <div> Recruitment </div>,
          },
          {
            path: '/performance',
            element: <div> Performance </div>,
          },
          {
            path: '/training',
            element: <div> Training </div>,
          },
          {
            path: '/calendar',
            element: <Calendar />,
          },
          {
            path: '/setting',
            element: <Setting />,
            children: [
              {
                index: true,
                loader: async () => redirect('domain'),
              },
              {
                path: 'domain',
                element: <DomainSetting />,
              },
              {
                path: 'time-off',
                element: <TimeOff />,
              },
              {
                path: 'employee-document-structure',
                element: <EmployeeDocument />,
              },
              {
                path: 'job-titles',
                element: <JobTitle />,
              },
              {
                path: 'holidays',
                element: <Holiday />,
              },
              {
                path: 'assets',
                element: <SettingAssets />,
              },
              { path: 'relief-officers', element: <ReliefOfficers /> },
            ],
          },
          { path: '/policies', element: <Policies /> },
          {
            path: '/leave-details',
            element: <LeaveManagement />,
            children: [
              { index: true, loader: async () => redirect('requests') },
              { path: 'requests', element: <LeaveRequests /> },
              { path: 'history', element: <LeaveHistory /> },
            ],
          },
          {
            path: '/user-profile',
            element: <UserProfile />,
            children: [
              {
                index: true,
                loader: async () => redirect('details/:userId'),
              },
              {
                path: 'details/:userId',
                element: <PersonalDetails />,
              },
              {
                path: 'contract/:userId',
                element: <EmployementDetails />,
              },
              {
                path: 'payroll/:userId',
                element: <Payroll />,
              },
              {
                path: 'documents/:userId',
                element: <Documents />,
              },
              {
                path: 'leaves/:userId',
                element: <Leaves />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
