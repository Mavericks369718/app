import React, { useState } from 'react';
import { Search, Download, Trash2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { deviceInfo } from '../mock';

const ModelCard = ({ model, onInstall, onDelete, onSetDefault, isDefault }) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [progress, setProgress] = useState(0);

  const getCompatibilityStyle = () => {
    switch (model.compatibility) {
      case 'great':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'heavy':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCompatibilityText = () => {
    switch (model.compatibility) {
      case 'great':
        return 'Great for your device';
      case 'good':
        return 'Should work well';
      case 'heavy':
        return 'Might be slow';
      default:
        return 'Too big for device';
    }
  };

  const handleInstall = async () => {
    setIsInstalling(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          onInstall(model.id);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{model.name}</h3>
          <Badge variant="outline" className="text-xs">
            {model.source}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {model.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Download size:</span>
          <span className="font-medium text-gray-900">{model.downloadSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">RAM needed:</span>
          <span className="font-medium text-gray-900">{model.ramNeeded}</span>
        </div>
      </div>

      <div className={`text-xs font-medium px-3 py-2 rounded-lg border mb-4 ${getCompatibilityStyle()}`}>
        {getCompatibilityText()}
      </div>

      {isInstalling ? (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-600 text-center">Downloading {progress}%...</p>
        </div>
      ) : model.installed ? (
        <div className="flex space-x-2">
          {isDefault ? (
            <Button disabled className="flex-1" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Default Model
            </Button>
          ) : (
            <Button
              onClick={() => onSetDefault(model.id)}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              Set as Default
            </Button>
          )}
          <Button
            onClick={() => onDelete(model.id)}
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleInstall}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="sm"
          disabled={model.compatibility === 'heavy'}
        >
          <Download className="w-4 h-4 mr-2" />
          Download & Install
        </Button>
      )}
    </div>
  );
};

const ModelsPage = () => {
  const { models, updateModelInstallation, currentModel, setCurrentModel } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSize = sizeFilter === 'all' || model.size === sizeFilter;
    const matchesType = typeFilter === 'all' || model.type === typeFilter;
    return matchesSearch && matchesSize && matchesType;
  });

  const handleInstall = (modelId) => {
    updateModelInstallation(modelId, true);
  };

  const handleDelete = (modelId) => {
    updateModelInstallation(modelId, false);
  };

  const handleSetDefault = (modelId) => {
    setCurrentModel(modelId);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="px-4 lg:px-6 py-6 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Models</h2>
            <p className="text-sm text-gray-600">Pick and manage models that run on your device</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">Your Device</p>
                <p className="text-sm text-gray-700">
                  Estimated: {deviceInfo.ram} RAM, {deviceInfo.vram} VRAM – {deviceInfo.recommendation}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search models (e.g. Llama 3, Gemma)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 lg:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredModels.map(model => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onInstall={handleInstall}
                  onDelete={handleDelete}
                  onSetDefault={handleSetDefault}
                  isDefault={currentModel === model.id}
                />
              ))}
            </div>
            {filteredModels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No models found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ModelsPage;
