/* eslint-disable @typescript-eslint/no-explicit-any */
import { OnboardingService } from '@/apis/services/OnboardingService';
import { IAllWorkingDays, ICompany, IEmployee, IOnboardingDetails } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStore {
  adminDetails: IEmployee | null;
  setAdminDetails: (adminDetails: IEmployee) => void;
  businessDetails: ICompany | null;
  setBusinessDetails: (businessDetails: ICompany) => void;
  onboardingDetails: IOnboardingDetails | null;
  setOnboardingDetails: (response: IOnboardingDetails) => void;
  refreshEmployeeBusinessInfo: (id: string) => void;
  allWorkingDays: IAllWorkingDays[];
  setAllWorkingDays: (allWorkingDays: IAllWorkingDays[]) => void;
  refreshWorkingDays: (id: string) => void;
  workingDays: any[];
  setWorkingDays: (workingDays: any[] | ((prev: any[]) => any[])) => void;
  sameAsPermanentAddress: boolean;
  setSameAsPermanentAddress: (value: boolean) => void;
  clearUserData: () => void;
}

const useAdminStore = create<AdminStore>()(
  persist(
    set => ({
      adminDetails: null,
      setAdminDetails: (adminDetails: IEmployee) => set({ adminDetails }),
      businessDetails: null,
      setBusinessDetails: (businessDetails: ICompany) => set({ businessDetails }),
      onboardingDetails: null,
      setOnboardingDetails: onboardingDetails => set({ onboardingDetails }),
      refreshEmployeeBusinessInfo: async (id: string) => {
        const res = await OnboardingService.getEmployeeBusinessInfo(id);
        set({
          onboardingDetails: {
            businessData: res.data?.business || res.business,
            employeeData: res.data?.employee || res.employee,
          },
        });
      },
      allWorkingDays: [],
      setAllWorkingDays: (allWorkingDays: IAllWorkingDays[]) => set({ allWorkingDays }),
      sameAsPermanentAddress: false,
      setSameAsPermanentAddress: (value: boolean) => set({ sameAsPermanentAddress: value }),
      refreshWorkingDays: async (id: string) => {
        const res = await OnboardingService.getBusinessWorkingDays(id);
        set({ workingDays: res.data?.working_days || [] });
      },
      workingDays: [],
      setWorkingDays: (workingDays: any[] | ((prev: any[]) => any[])) =>
        set(state => ({
          workingDays:
            typeof workingDays === 'function' ? workingDays(state.workingDays) : workingDays,
        })),
      clearUserData: () =>
        set({
          adminDetails: null,
          businessDetails: null,
          onboardingDetails: null,
          sameAsPermanentAddress: false,
          workingDays: [],
          allWorkingDays: [],
        }),
    }),
    {
      name: 'admin-store',
      partialize: state => ({
        adminDetails: state.adminDetails,
        businessDetails: state.businessDetails,
        onboardingDetails: state.onboardingDetails,
        sameAsPermanentAddress: state.sameAsPermanentAddress,
        allWorkingDays: state.allWorkingDays,
        workingDays: state.workingDays,
      }),
    }
  )
);

export default useAdminStore;
