import React from 'react';
import { MessageSquare, Cpu, Settings, Plus, Trash2, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const Sidebar = () => {
  const {
    currentPage,
    setCurrentPage,
    chats,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    deleteChat,
    sidebarOpen,
    setSidebarOpen
  } = useApp();

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleNewChat = () => {
    createNewChat();
    setCurrentPage('chats');
  };

  const handleChatClick = (chatId) => {
    setCurrentChatId(chatId);
    setCurrentPage('chats');
  };

  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Local LLM Studio</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-3 border-b border-gray-200">
          <nav className="space-y-1">
            <button
              onClick={() => setCurrentPage('chats')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'chats'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chats</span>
            </button>
            <button
              onClick={() => setCurrentPage('models')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'models'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Cpu className="w-5 h-5" />
              <span>Models</span>
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'settings'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Chats Section */}
        {currentPage === 'chats' && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-3">
              <Button
                onClick={handleNewChat}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="px-3 pb-3 space-y-1">
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatClick(chat.id)}
                    className={`group relative flex items-start p-3 rounded-lg cursor-pointer transition-colors ${
                      currentChatId === chat.id
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {chat.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {formatTimestamp(chat.timestamp)}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-7 w-7"
                      onClick={(e) => handleDeleteChat(e, chat.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <div>Version 1.0.0</div>
            <a href="#" className="text-blue-600 hover:underline mt-1 inline-block">
              Help & About
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
