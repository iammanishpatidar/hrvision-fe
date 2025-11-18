import axiosInstance from '@/utils/api';
import {
  CREATE_TIME_TRACKING_ROUTE,
  FETCH_TIME_TRACKING_ROUTE,
  STOP_TIME_TRACKING_ROUTE,
} from '../constants/route';

export const TimeTrackingService = {
  createTimeTracking: async (payload: any, userId: string) => {
    const res = await axiosInstance.post(CREATE_TIME_TRACKING_ROUTE, payload, {
      headers: {
        'X-User-ID': userId,
      },
    });
    return res.data;
  },
  fetchTimeTracking: async (userId: string) => {
    const res = await axiosInstance.get(FETCH_TIME_TRACKING_ROUTE, {
      headers: {
        'X-User-ID': userId,
      },
    });
    return res.data;
  },
  stopTimeTracking: async (userId: string, id: string) => {
    const res = await axiosInstance.patch(
      `${STOP_TIME_TRACKING_ROUTE}/${id}`,
      {},
      {
        headers: {
          'X-User-ID': userId,
        },
      }
    );
    return res.data;
  },
};
