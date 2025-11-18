import axiosInstance from '@/utils/api';
import {
  FETCH_BANK_DETAILS_ROUTE,
  CREATE_BANK_DETAILS_ROUTE,
  UPDATE_BANK_DETAILS_ROUTE,
  UPDATE_ADDRESS_DETAILS_ROUTE,
  UPDATE_EMERGENCY_DETAILS_ROUTE,
  UPDATE_EMPLOYEE_DETAILS_ROUTE,
  FETCH_CURRENT_SALARY_ROUTE,
  UPDATE_CURRENT_SALARY_ROUTE,
  CREATE_JOB_TITLE_ROUTE,
  UPDATE_JOB_TITLE_ROUTE,
  FETCH_JOB_TITLES_ROUTE,
} from '../constants/route';

export const UserProfileService = {
  getCurrentSalary: async (employeeId: string) => {
    const response = await axiosInstance.get(
      `${FETCH_CURRENT_SALARY_ROUTE}${employeeId}`
    );
    return response.data?.data?.[0];
  },
  updateCurrentSalary: async ( payload: any ,compensationId:string) => {
    const response = await axiosInstance.put(
      `${UPDATE_CURRENT_SALARY_ROUTE}/${compensationId}`,
      payload
    );
    return response.data;
  },
  getBankDetails: async (employeeId: string) => {
    const response = await axiosInstance.get(
      `${FETCH_BANK_DETAILS_ROUTE}?employee_id=${employeeId}`
    );
    return response.data;
  },
  setBankDetails: async (payload: any) => {
    const response = await axiosInstance.post(`${CREATE_BANK_DETAILS_ROUTE}`, payload);
    return response.data;
  },
  updateBankDetails: async (bankDetailsId: string, payload: any) => {
    console.log(payload, bankDetailsId, '+++++++++++++');
    const response = await axiosInstance.put(
      `${UPDATE_BANK_DETAILS_ROUTE}/${bankDetailsId}`,
      payload
    );
    return response.data;
  },
  updateAddressDetails: async (addressId: string, payload: any) => {
    const response = await axiosInstance.put(
      `${UPDATE_ADDRESS_DETAILS_ROUTE}/${addressId}`,
      payload
    );
    return response.data;
  },
  updateEmergencyDetails: async (emergencyDetailsId: string, payload: any) => {
    const response = await axiosInstance.put(
      `${UPDATE_EMERGENCY_DETAILS_ROUTE}/${emergencyDetailsId}`,
      payload
    );
    return response.data;
  },
  updateUserDetails: async (employeeId: string, payload: any) => {
    const response = await axiosInstance.put(
      `${UPDATE_EMPLOYEE_DETAILS_ROUTE}/${employeeId}`,
      payload
    );
    return response.data;
  },
  createJobTitle: async (payload: any) => {
    const response = await axiosInstance.post(`${CREATE_JOB_TITLE_ROUTE}`, payload);
    return response.data;
  },
  updateJobTitle: async (jobTitleId: string, payload: any) => {
    const response = await axiosInstance.put(`${UPDATE_JOB_TITLE_ROUTE}/${jobTitleId}`, payload);
    return response.data;
  },
  getJobTitles: async (businessId: string) => {
    const response = await axiosInstance.get(`${FETCH_JOB_TITLES_ROUTE}/${businessId}`);
    return response.data;
  },
};
