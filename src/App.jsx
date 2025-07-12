import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage.jsx';
import Dashboard from '@/pages/Dashboard.jsx';
import AIProjectManagement from '@/pages/AIProjectManagement.jsx';
import ConversationalAI from '@/pages/ConversationalAI.jsx';
import IntelligentResearch from '@/pages/IntelligentResearch.jsx';
import Settings from '@/pages/Settings.jsx';
import Login from '@/pages/Login.jsx';
import GeminiChat from './components/chat';
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-project-management" element={<AIProjectManagement />} />
              <Route path="/conversational-ai" element={<ConversationalAI />} />
              <Route path="/intelligent-research" element={<IntelligentResearch />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/chat" element={<GeminiChat/>}/>
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;