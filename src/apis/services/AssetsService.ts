import axiosInstance from '@/utils/api';
import { ADD_ASSET_ROUTE, CREATE_ASSET_REQUEST_ROUTE, DELETE_ASSET_ROUTE, FETCH_ASSETS_ROUTE, FETCH_ASSETS_REQUEST_ROUTE, UPDATE_ASSET_ROUTE, UPDATE_ASSET_REQUEST_ROUTE } from '../constants/route';
import { AssetsResponse } from '@/types';

export interface FetchAssetsParams {
  business_id: string;
  category_id?: string;
  employee_id?: string;
  id?: string;
}

export interface FetchAssetsRequest {
  category_id?: string;
  employee_id?: string;
  business_id?: string;
}

export interface CreateAssetRequestParams {
  category_id: string;
  asset_types: string[];
  employee_id: string;
  comments?: string;
}

export interface AddAssetParams {
  name: string;
  serial_number: string;
  business_id: string;
  category_id: string;
  asset_type: string;
  assigned_date: string;
  current_status: string;
  condition: string;
  warranty_expiry: string;
  license_type: string;
}

export interface UpdateAssetParams {
  name?: string;
  serial_number?: string;
  business_id: string;
  category_id: string;
  asset_type?: string;
  assigned_date?: string;
  current_status?: string;
  condition?: string;
  warranty_expiry?: string;
  license_type?: string;
}

interface AssetRequestEmployee {
  id: string;
  name: string;
  employee_id: string | null;
  clerk_id: string;
  email: string;
  contact_number: string;
  permanent_address_id: string;
  current_address_id: string;
  business_id: string;
  marital_status: string;
  gender: string;
  religion: string;
  date_of_birth: string;
  date_of_hire: string | null;
  designation: string | null;
  is_active: boolean;
  blood_group: string;
  manager_id: string | null;
  employment_type: string | null;
  last_working_date: string | null;
  department_id: string | null;
  role_id: string;
  designation_id: string | null;
  location_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface AssetRequestCategory {
  id: string;
  name: string;
  created_at: string;
}

interface AssetRequest {
  id: string;
  employee_id: string;
  asset_type: string;
  category_id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  employee: AssetRequestEmployee;
  category: AssetRequestCategory;
}

interface Pagination {
  page: number;
  limit: number;
  total: string;
  total_pages: number;
}

export interface AssetsRequestResponse {
  statusCode: number;
  data: {
    asset_requests: AssetRequest[];
    pagination: Pagination;
  };
  message: string;
}

export const AssetsService = {
  fetchAssets: async (payload: FetchAssetsParams): Promise<AssetsResponse> => {
    const response = await axiosInstance.post(FETCH_ASSETS_ROUTE, payload);
    return response.data;
  },

  addAsset: async (params: AddAssetParams): Promise<AssetsResponse> => {
    const response = await axiosInstance.post(ADD_ASSET_ROUTE, params);
    return response.data;
  },

  updateAsset: async (id: string, params: UpdateAssetParams): Promise<AssetsResponse> => {
    const response = await axiosInstance.patch(`${UPDATE_ASSET_ROUTE}/${id}`, params);
    return response.data;
  },

  deleteAsset: async (id: string): Promise<AssetsResponse> => {
    const response = await axiosInstance.delete(`${DELETE_ASSET_ROUTE}/${id}`);
    return response.data;
  },

  fetchAssetsRequest: async (payload: FetchAssetsRequest): Promise<AssetsRequestResponse> => {
    const response = await axiosInstance.post(FETCH_ASSETS_REQUEST_ROUTE, payload);
    return response.data;
  },

  createAssetRequest: async (payload: CreateAssetRequestParams): Promise<AssetsResponse> => {
    const response = await axiosInstance.post(CREATE_ASSET_REQUEST_ROUTE, payload);
    return response.data;
  },

  updateAssetRequest: async (payload: { 
    request_id: string; 
    status: 'APPROVED' | 'REJECTED';
    approved_by?: string;
    comments?: string;
  }): Promise<AssetsResponse> => {
    const status = payload.status === 'APPROVED' ? 'approve' : 'reject';
    const response = await axiosInstance.post(
      `${UPDATE_ASSET_REQUEST_ROUTE}/${payload.request_id}/${status}`,
      {
        approved_by: payload.approved_by,
        comments: payload.comments
      }
    );
    return response.data;
  }
};
