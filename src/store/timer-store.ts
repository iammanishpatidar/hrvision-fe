import { create } from 'zustand';

interface TimerState {
  isTimerRunning: boolean;
  workingHoursCompleted: number;
  timeTrackingData: any | null;
  startTimer: () => void;
  stopTimer: () => void;
  incrementWorkingHours: () => void;
  resetWorkingHours: () => void;
  setTimeTrackingData: (data: any) => void;
  clearStartTimerStates: () => void;
}

export const useTimerStore = create<TimerState>(set => ({
  isTimerRunning: false,
  workingHoursCompleted: 0,
  timeTrackingData: null,
  startTimer: () => set({ isTimerRunning: true }),
  stopTimer: () => set({ isTimerRunning: false }),
  incrementWorkingHours: () =>
    set(state => ({ workingHoursCompleted: state.workingHoursCompleted + 1 })),
  resetWorkingHours: () => set({ workingHoursCompleted: 0 }),
  setTimeTrackingData: (data: any) => set({ timeTrackingData: data }),
  clearStartTimerStates: () => set({ timeTrackingData: null }),
}));
