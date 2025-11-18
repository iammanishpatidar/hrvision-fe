import { create } from 'zustand';

type LoaderStore = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const useLoaderStore = create<LoaderStore>(set => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export default useLoaderStore;
