import React from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ChatsPage from './components/ChatsPage';
import ModelsPage from './components/ModelsPage';
import SettingsPage from './components/SettingsPage';

const AppContent = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'chats':
        return <ChatsPage />;
      case 'models':
        return <ModelsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ChatsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        {renderPage()}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
