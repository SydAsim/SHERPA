import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/store/slices/authSlice';
import vulnerabilitySlice from '@/store/slices/vulnerabilitySlice';
import aiSlice from '@/store/slices/aiSlice';
import settingsSlice from '@/store/slices/settingsSlice';
import projectSlice from '@/store/slices/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    vulnerabilities: vulnerabilitySlice,
    ai: aiSlice,
    settings: settingsSlice,
    projects: projectSlice,
  },
});