import axiosInstance from '@/utils/api';
import axios from 'axios';
import { FETCH_EMPLOYEE_BUSINESS_ROUTE, GET_ALL_DEPARTMENTS, GET_ALL_DESIGNATIONS, GET_ALL_ROLES, INVITE_EMPLOYEE, VALIDATE_INVITATION_TOKEN, RESPOND_TO_INVITATION } from '../constants/route';

// Create a separate axios instance for invitation calls without authentication
const invitationAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface inviteEmployeePayload {
  role_id: string;
  admin_id: string;
  business_id: string;
  department_id: string;
  name: string;
  email: string;
  pay_rate: number;
  pay_rate_period: string;
  employment_status: string;
  designation_id: string;
  hire_date: string | null;
  manager: string;
  gender?: string;
}

export const EmployeeService = {
  getEmployeeBusinessInfo: async (id: string) => {
    const response = await axiosInstance.get(`${FETCH_EMPLOYEE_BUSINESS_ROUTE}?business_id=${id}`);
    return response.data;
  },
  inviteEmployee: async (payload: inviteEmployeePayload, userId?: string) => {
    const headers: Record<string, string> = {};
    if (userId && userId !== 'undefined' && userId !== 'null') {
      headers['X-User-ID'] = userId;
    } else {
      console.log('Invite employee - No user ID provided, skipping X-User-ID header', userId);
    }
    const response = await axiosInstance.post(INVITE_EMPLOYEE, payload, { headers });
    return response.data;
  },

  getAllRoles: async () => {
    const response = await axiosInstance.get(GET_ALL_ROLES);
    return response.data;
  },
  getAllDesignations: async () => {
    const response = await axiosInstance.get(GET_ALL_DESIGNATIONS);
    return response.data;
  },
  getAllDepartments: async () => {
    const response = await axiosInstance.get(GET_ALL_DEPARTMENTS);
    return response.data;
  },
  validateInvitationToken: async (token: object) => {
    const response = await invitationAxiosInstance.post(VALIDATE_INVITATION_TOKEN, { token });
    return response.data;
  },
  respondToInvitation: async (params: {
    action: 'accepted' | 'rejected';
    token: string;
    email: string;
    business_id: string;
    role_id: string;
    expires_at: string;
  }) => {
    const response = await invitationAxiosInstance.post(RESPOND_TO_INVITATION, params);
    return response.data;
  },
};
