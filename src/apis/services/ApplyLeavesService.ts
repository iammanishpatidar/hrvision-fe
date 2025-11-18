import axiosInstance from '@/utils/api';
import {
  CREATE_EMPLOYEE_LEAVES,
  DELETE_EMPLOYEE_LEAVES,
  FETCH_EMPLOYEE_LEAVES,
  FETCH_LEAVE_REQUEST_ROUTE,
  UPDATE_EMPLOYEE_LEAVES,
  UPDATE_LEAVE_STATUS_ROUTE,
} from '../constants/route';

export interface ApplyLeavesProps {
  employee_id: string;
  leave_type_id: string;
  date: string;
  is_half_day: boolean;
  reason: string;
}

export const ApplyLeavesService = {
  applyLeaves: async (data: ApplyLeavesProps[]) => {
    const response = await axiosInstance.post(CREATE_EMPLOYEE_LEAVES, data);
    return response.data;
  },
  fetchLeaves: async (employeeId: string, offset?: number, limit?: number) => {
    const response = await axiosInstance.get(`${FETCH_EMPLOYEE_LEAVES}/${employeeId}`, {
      params: {
        offset,
        limit,
      },
    });
    return response.data;
  },
  updateLeaves: async (leaveId: string, data: ApplyLeavesProps) => {
    const response = await axiosInstance.put(`${UPDATE_EMPLOYEE_LEAVES}/${leaveId}`, data);
    return response.data;
  },
  deleteLeave: async (leaveId: string) => {
    const response = await axiosInstance.delete(`${DELETE_EMPLOYEE_LEAVES}/${leaveId}`);
    return response.data;
  },
  updateLeaveStatus: async (
    leaveId: string,
    payload: { status: 'PENDING' | 'APPROVED' | 'REJECT' }
  ) => {
    const response = await axiosInstance.put(`${UPDATE_LEAVE_STATUS_ROUTE}/${leaveId}`, payload);
    return response.data;
  },
  getLeaveRequests: async (businessId: string, offset: number, limit: number) => {
    const response = await axiosInstance.get(
      `${FETCH_LEAVE_REQUEST_ROUTE}/${businessId}?offset=${offset}&limit=${limit}`
    );
    return response.data;
  },
};
