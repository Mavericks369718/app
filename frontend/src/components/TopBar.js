import React from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const TopBar = () => {
  const {
    currentPage,
    currentChatId,
    chats,
    models,
    currentModel,
    setCurrentModel,
    setSidebarOpen
  } = useApp();

  const getPageTitle = () => {
    if (currentPage === 'chats') {
      const currentChat = chats.find(chat => chat.id === currentChatId);
      return currentChat?.title || 'New Chat';
    }
    if (currentPage === 'models') return 'Models';
    if (currentPage === 'settings') return 'Settings';
    return 'Local LLM Studio';
  };

  const installedModels = models.filter(m => m.installed);
  const currentModelData = models.find(m => m.id === currentModel);

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6">
      <div className="flex items-center justify-between w-full">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs sm:max-w-md">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Model selector */}
          {installedModels.length > 0 && (
            <Select value={currentModel} onValueChange={setCurrentModel}>
              <SelectTrigger className="w-[180px] sm:w-[220px] bg-gray-50 border-gray-200">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {installedModels.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name.split(' ').slice(0, 3).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Status indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700">Local</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
