import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockModels, mockChats, defaultSettings } from '../mock';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('chats');
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('llama-3-8b');
  const [settings, setSettings] = useState(defaultSettings);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('llm-chats');
    const savedModels = localStorage.getItem('llm-models');
    const savedSettings = localStorage.getItem('llm-settings');
    const savedCurrentModel = localStorage.getItem('llm-current-model');

    setChats(savedChats ? JSON.parse(savedChats) : mockChats);
    setModels(savedModels ? JSON.parse(savedModels) : mockModels);
    setSettings(savedSettings ? JSON.parse(savedSettings) : defaultSettings);
    setCurrentModel(savedCurrentModel || 'llama-3-8b');
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('llm-chats', JSON.stringify(chats));
    }
  }, [chats]);

  useEffect(() => {
    if (models.length > 0) {
      localStorage.setItem('llm-models', JSON.stringify(models));
    }
  }, [models]);

  useEffect(() => {
    localStorage.setItem('llm-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('llm-current-model', currentModel);
  }, [currentModel]);

  const createNewChat = () => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      timestamp: new Date().toISOString(),
      messages: []
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    return newChat;
  };

  const addMessage = (chatId, message) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, message];
          const firstUserMessage = updatedMessages.find(m => m.role === 'user');
          const newTitle = chat.messages.length === 0 && firstUserMessage
            ? firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '')
            : chat.title;
          
          return {
            ...chat,
            messages: updatedMessages,
            title: newTitle,
            timestamp: new Date().toISOString()
          };
        }
        return chat;
      });
    });
  };

  const deleteChat = (chatId) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const updateModelInstallation = (modelId, installed, progress = 0) => {
    setModels(prevModels => 
      prevModels.map(model => 
        model.id === modelId 
          ? { ...model, installed, downloadProgress: progress }
          : model
      )
    );
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === currentChatId);
  };

  const getCurrentModelData = () => {
    return models.find(model => model.id === currentModel);
  };

  const value = {
    currentPage,
    setCurrentPage,
    chats,
    setChats,
    currentChatId,
    setCurrentChatId,
    models,
    currentModel,
    setCurrentModel,
    settings,
    updateSettings,
    sidebarOpen,
    setSidebarOpen,
    createNewChat,
    addMessage,
    deleteChat,
    updateModelInstallation,
    getCurrentChat,
    getCurrentModelData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
