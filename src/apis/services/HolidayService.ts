import axiosInstance from "@/utils/api";
import { CREATE_HOLIDAY_ROUTE, DELETE_HOLIDAY_ROUTE, FETCH_HOLIDAYS_ROUTE, UPDATE_HOLIDAY_ROUTE } from "../constants/route";

export const HolidayServices = {
  getHolidays: async (businessId: string) => {
    const response = await axiosInstance.get(`${FETCH_HOLIDAYS_ROUTE}/${businessId}`);
    return response.data;
  },
  createHoliday: async (payload: any) => {
    const response = await axiosInstance.post(CREATE_HOLIDAY_ROUTE, payload);
    return response.data;
  },
  updateHoliday: async (payload: any, holidayId: string) => {
    const response = await axiosInstance.put(`${UPDATE_HOLIDAY_ROUTE}/${holidayId}`, payload);
    return response.data;
  },
  deleteHoliday: async (holidayId: any) => {
    const response = await axiosInstance.delete(`${DELETE_HOLIDAY_ROUTE}/${holidayId}`);
    return response.data;
  },
};
