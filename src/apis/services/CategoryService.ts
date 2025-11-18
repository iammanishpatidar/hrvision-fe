import axiosInstance from '@/utils/api';
import { FETCH_CATEGORY_ROUTE } from '../constants/route';
import { CategoriesResponse } from '@/types';

export const CategoryService = {
    fetchCategories: async (): Promise<CategoriesResponse> => {
        const response = await axiosInstance.get(FETCH_CATEGORY_ROUTE);
        return response.data;
    },
};