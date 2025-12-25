import React from 'react';
import { FolderOpen, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';

const SettingsPage = () => {
  const { settings, updateSettings, models } = useApp();

  const installedModels = models.filter(m => m.installed);

  const handleSliderChange = (field) => (value) => {
    updateSettings({ [field]: value[0] });
  };

  const handleSwitchChange = (field) => (checked) => {
    updateSettings({ [field]: checked });
  };

  const handleSelectChange = (field) => (value) => {
    updateSettings({ [field]: value });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="px-4 lg:px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>Manage your application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme">Theme</Label>
                    <p className="text-sm text-gray-500">Choose your interface theme</p>
                  </div>
                  <Select value={settings.theme} onValueChange={handleSelectChange('theme')}>
                    <SelectTrigger className="w-[180px]" id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark" disabled>Dark (Coming soon)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="language">Language</Label>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                  <Select value={settings.language} onValueChange={handleSelectChange('language')}>
                    <SelectTrigger className="w-[180px]" id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Model & Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Model & Performance</CardTitle>
                <CardDescription>Configure model behavior and resource usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="default-model">Default Model</Label>
                    <p className="text-sm text-gray-500">Model used for new conversations</p>
                  </div>
                  <Select
                    value={settings.defaultModel}
                    onValueChange={handleSelectChange('defaultModel')}
                    disabled={installedModels.length === 0}
                  >
                    <SelectTrigger className="w-[220px]" id="default-model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {installedModels.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name.split(' ').slice(0, 3).join(' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ram-usage">Max System RAM Usage</Label>
                    <span className="text-sm font-medium text-gray-900">{settings.maxRamUsage}%</span>
                  </div>
                  <Slider
                    id="ram-usage"
                    value={[settings.maxRamUsage]}
                    onValueChange={handleSliderChange('maxRamUsage')}
                    min={25}
                    max={95}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Limit how much RAM the application can use for models
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label htmlFor="prefer-smaller">Prefer smaller, faster models</Label>
                    <p className="text-sm text-gray-500">Optimize for speed over quality</p>
                  </div>
                  <Switch
                    id="prefer-smaller"
                    checked={settings.preferSmaller}
                    onCheckedChange={handleSwitchChange('preferSmaller')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label htmlFor="gpu-acceleration">Enable GPU acceleration</Label>
                    <p className="text-sm text-gray-500">Use GPU if available for faster inference</p>
                  </div>
                  <Switch
                    id="gpu-acceleration"
                    checked={settings.gpuAcceleration}
                    onCheckedChange={handleSwitchChange('gpuAcceleration')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Storage */}
            <Card>
              <CardHeader>
                <CardTitle>Storage</CardTitle>
                <CardDescription>Manage model storage and disk usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Models storage used:</span>
                    <span className="font-medium text-gray-900">{settings.storageUsed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available disk space:</span>
                    <span className="font-medium text-gray-900">{settings.storageAvailable}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button variant="outline" className="flex-1">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Open Models Folder
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Unused Models
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Control your data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-900">
                    All inference happens locally on your device. No chat content is sent to external servers.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label htmlFor="anonymous-stats">Send anonymous usage statistics</Label>
                    <p className="text-sm text-gray-500">Help us improve the app with anonymous data</p>
                  </div>
                  <Switch
                    id="anonymous-stats"
                    checked={settings.anonymousStats}
                    onCheckedChange={handleSwitchChange('anonymousStats')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SettingsPage;
