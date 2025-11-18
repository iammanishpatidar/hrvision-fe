import axiosInstance from '@/utils/api';
import { CREATE_LEAVE_TYPES, DELETE_LEAVE_TYPES, FETCH_LEAVE_TYPES, UPDATE_LEAVE_TYPES } from '../constants/route';

export const LeaveTypesService = {
  getLeaveTypes: async (businessId: string, leaveTypeId?: string) => {
    const res = await axiosInstance.get(`${FETCH_LEAVE_TYPES}/${businessId}`, {
      params: {
        leave_type_id: leaveTypeId,
      },
    });
    return res.data;
  },
  addLeaveType: async (payload: any) => {
    const res = await axiosInstance.post(CREATE_LEAVE_TYPES, payload);
    return res.data;
  },
  updateLeaveType: async (leaveTypeId: string, payload: any) => {
    const res = await axiosInstance.put(`${UPDATE_LEAVE_TYPES}/${leaveTypeId}`, payload);
    return res.data;
  },
  deleteLeaveType: async (leaveTypeId: string) => {
    const res = await axiosInstance.delete(`${DELETE_LEAVE_TYPES}/${leaveTypeId}`);
    return res.data;
  },
};
