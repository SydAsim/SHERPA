import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [
    {
      id: 1,
      name: 'Q1 Security Audit',
      status: 'In Progress',
      priority: 'High',
      progress: 65,
      dueDate: '2024-03-31',
      assignees: ['John Doe', 'Jane Smith'],
      vulnerabilities: 12,
      aiInsights: 'Critical SQL injection patterns detected. Recommend immediate patching.',
    },
    {
      id: 2,
      name: 'Infrastructure Hardening',
      status: 'Planning',
      priority: 'Medium',
      progress: 25,
      dueDate: '2024-04-15',
      assignees: ['Mike Johnson'],
      vulnerabilities: 8,
      aiInsights: 'Network segmentation gaps identified. AI suggests firewall rule optimization.',
    },
    {
      id: 3,
      name: 'Compliance Review',
      status: 'Completed',
      priority: 'Low',
      progress: 100,
      dueDate: '2024-02-28',
      assignees: ['Sarah Wilson', 'Tom Brown'],
      vulnerabilities: 3,
      aiInsights: 'All compliance requirements met. Minimal security gaps detected.',
    },
  ],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload };
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addProject, updateProject, setLoading, setError } = projectSlice.actions;

export default projectSlice.reducer;