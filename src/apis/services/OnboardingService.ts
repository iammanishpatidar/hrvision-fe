import axiosInstance from '@/utils/api';
import {
  CREATE_BUSINESS_ONBOARDING_ROUTE,
  DELETE_BUSINESS_SETTING_ROUTE,
  FETCH_ALL_WORKING_DAYS_ROUTE,
  FETCH_HOLIDAYS_ROUTE,
  FETCH_WORKING_DAYS_ROUTE,
  GET_ADMIN_EMPLOYEE_ROUTE,
  UPDATE_BUSINESS_SETTING_ROUTE,
  UPDATE_EMPLOYEE_DETAILS_ROUTE,
  UPDATE_WORKING_DAYS_ROUTE,
  UPLOAD_LOGO_ROUTE,
} from '../constants/route';

export const OnboardingService = {
  getEmployeeBusinessInfo: async (id: string) => {
    const response = await axiosInstance.get(`${GET_ADMIN_EMPLOYEE_ROUTE}/${id}`);
    return response.data;
  },
  updateEmployee: async (id: string, data: any) => {
    const response = await axiosInstance.get(`${UPDATE_EMPLOYEE_DETAILS_ROUTE}/${id}`, data);
    return response.data;
  },
  createBusiness: async (businessDetails: any) => {
    const response = await axiosInstance.post(CREATE_BUSINESS_ONBOARDING_ROUTE, businessDetails);
    return response.data;
  },
  updateBusiness: async (businessId: string, businessDetails: any) => {
    const response = await axiosInstance.put(
      `${UPDATE_BUSINESS_SETTING_ROUTE}/${businessId}`,
      businessDetails
    );
    return response.data;
  },
  deleteBusiness: async () => {
    const response = await axiosInstance.post(DELETE_BUSINESS_SETTING_ROUTE);
    return response.data;
  },
  getHolidays: async (businessId: string) => {
    const response = await axiosInstance.get(`${FETCH_HOLIDAYS_ROUTE}${businessId}`);
    return response.data;
  },
  getBusinessWorkingDays: async (businessId: string) => {
    const response = await axiosInstance.get(`${FETCH_WORKING_DAYS_ROUTE}/${businessId}`);
    return response.data;
  },
  getAllWorkingDays: async () => {
    const response = await axiosInstance.get(FETCH_ALL_WORKING_DAYS_ROUTE);
    return response.data.data;
  },
  updateBusinessWorkingDay: async (data: { business_id: string; working_days_id: string }) => {
    const response = await axiosInstance.post(UPDATE_WORKING_DAYS_ROUTE, data);
    return response.data;
  },
  uploadLogo: async (businessId: string, logoFile: File) => {
    const formData = new FormData();
    formData.append('logo', logoFile);

    const response = await axiosInstance.put(`${UPLOAD_LOGO_ROUTE}/${businessId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
