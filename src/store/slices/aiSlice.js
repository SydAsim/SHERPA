
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  currentConversation: null,
  insights: [],
  scenarios: [],
  researchData: [],
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (state.currentConversation) {
        state.currentConversation.messages.push(action.payload);
      }
    },
    startNewConversation: (state, action) => {
      const newConversation = {
        id: Date.now(),
        title: action.payload.title || 'New Conversation',
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.conversations.push(newConversation);
      state.currentConversation = newConversation;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    addInsight: (state, action) => {
      state.insights.push(action.payload);
    },
    addScenario: (state, action) => {
      state.scenarios.push(action.payload);
    },
    addResearchData: (state, action) => {
      state.researchData.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addMessage,
  startNewConversation,
  setCurrentConversation,
  addInsight,
  addScenario,
  addResearchData,
  setLoading,
  setError,
} = aiSlice.actions;

export default aiSlice.reducer;
