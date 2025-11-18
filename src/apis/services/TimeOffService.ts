import axiosInstance from '@/utils/api';
import {  UPDATE_BUSINESS_SETTING_ROUTE } from '../constants/route';

export const TimeOffService = {
  getTimeOffCycle: async (businessId: string, payload?: any) => {
    const res = await axiosInstance.put(`${UPDATE_BUSINESS_SETTING_ROUTE}/${businessId}`, payload);
    return res.data;
  },
};
