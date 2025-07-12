
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
  },
  preferences: {
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
  },
  integrations: {
    slack: false,
    jira: false,
    github: false,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateSecurity: (state, action) => {
      state.security = { ...state.security, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateIntegrations: (state, action) => {
      state.integrations = { ...state.integrations, ...action.payload };
    },
  },
});

export const {
  updateNotifications,
  updateSecurity,
  updatePreferences,
  updateIntegrations,
} = settingsSlice.actions;

export default settingsSlice.reducer;
