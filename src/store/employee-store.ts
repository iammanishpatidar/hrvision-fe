import { create } from 'zustand';

interface EmployeeStore {
  employees: any[];
  setEmployees: (employees: any[]) => void;
  categories: any[];
  setCategories: (categories: any[]) => void;
}

export const useEmployeeStore = create<EmployeeStore>(set => ({
  employees: [],
  categories: [],
  setEmployees: (employees: any[]) => set({ employees }),
  setCategories: (categories: any[]) => set({ categories }),
}));
