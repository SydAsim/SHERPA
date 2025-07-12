
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Globe,
  Palette,
  Users,
  Database,
  Key,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Layout/Navbar';
import Sidebar from '@/components/Layout/Sidebar';
import {
  updateNotifications,
  updateSecurity,
  updatePreferences,
  updateIntegrations,
} from '@/store/slices/settingsSlice';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const handleNotificationChange = (key, value) => {
    dispatch(updateNotifications({ [key]: value }));
    toast({
      title: "Settings updated",
      description: "Notification preferences have been saved.",
    });
  };

  const handleSecurityChange = (key, value) => {
    dispatch(updateSecurity({ [key]: value }));
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved.",
    });
  };

  const handlePreferenceChange = (key, value) => {
    dispatch(updatePreferences({ [key]: value }));
    toast({
      title: "Preferences updated",
      description: "Your preferences have been saved.",
    });
  };

  const handleIntegrationChange = (key, value) => {
    dispatch(updateIntegrations({ [key]: value }));
    toast({
      title: "Integration updated",
      description: `${key} integration has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleExportData = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Settings - SHERPA AI Vulnerability Management</title>
        <meta name="description" content="Configure your SHERPA AI settings, notifications, security preferences, and integrations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        
        <div className="ml-64 pt-16">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    <SettingsIcon className="h-8 w-8 text-primary" />
                    Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your account preferences and system configuration
                  </p>
                </div>
              </div>

              <Tabs defaultValue="notifications" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Notification Settings
                      </CardTitle>
                      <CardDescription>
                        Configure how you receive alerts and updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">Email Notifications</span>
                          <p className="text-sm text-muted-foreground">
                            Receive vulnerability alerts via email
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.email}
                          onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">Push Notifications</span>
                          <p className="text-sm text-muted-foreground">
                            Get real-time alerts in your browser
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.push}
                          onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">SMS Alerts</span>
                          <p className="text-sm text-muted-foreground">
                            Critical alerts sent to your mobile device
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.sms}
                          onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>
                        Manage your account security and access controls
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">Two-Factor Authentication</span>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={settings.security.twoFactorAuth}
                          onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                        />
                      </div>

                      <div className="space-y-2">
                        <span className="font-medium">Session Timeout (minutes)</span>
                        <Input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                          className="w-32"
                        />
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after period of inactivity
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="font-medium">Password Expiry (days)</span>
                        <Input
                          type="number"
                          value={settings.security.passwordExpiry}
                          onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
                          className="w-32"
                        />
                        <p className="text-sm text-muted-foreground">
                          Require password change after specified days
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-primary" />
                        User Preferences
                      </CardTitle>
                      <CardDescription>
                        Customize your SHERPA experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <span className="font-medium">Language</span>
                        <select
                          value={settings.preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          className="w-full p-2 border rounded-md bg-background"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <span className="font-medium">Timezone</span>
                        <select
                          value={settings.preferences.timezone}
                          onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                          className="w-full p-2 border rounded-md bg-background"
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Standard Time</option>
                          <option value="PST">Pacific Standard Time</option>
                          <option value="GMT">Greenwich Mean Time</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <span className="font-medium">Date Format</span>
                        <select
                          value={settings.preferences.dateFormat}
                          onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                          className="w-full p-2 border rounded-md bg-background"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integrations" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        Third-Party Integrations
                      </CardTitle>
                      <CardDescription>
                        Connect SHERPA with your existing tools and services
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">Slack Integration</span>
                          <p className="text-sm text-muted-foreground">
                            Send vulnerability alerts to Slack channels
                          </p>
                        </div>
                        <Switch
                          checked={settings.integrations.slack}
                          onCheckedChange={(checked) => handleIntegrationChange('slack', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">Jira Integration</span>
                          <p className="text-sm text-muted-foreground">
                            Create tickets automatically for vulnerabilities
                          </p>
                        </div>
                        <Switch
                          checked={settings.integrations.jira}
                          onCheckedChange={(checked) => handleIntegrationChange('jira', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">GitHub Integration</span>
                          <p className="text-sm text-muted-foreground">
                            Sync with GitHub security advisories
                          </p>
                        </div>
                        <Switch
                          checked={settings.integrations.github}
                          onCheckedChange={(checked) => handleIntegrationChange('github', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Account Management
                      </CardTitle>
                      <CardDescription>
                        Manage your account information and data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <span className="font-medium">Full Name</span>
                          <Input placeholder="Enter your full name" />
                        </div>

                        <div className="space-y-2">
                          <span className="font-medium">Email Address</span>
                          <Input type="email" placeholder="Enter your email" />
                        </div>

                        <div className="space-y-2">
                          <span className="font-medium">Organization</span>
                          <Input placeholder="Enter your organization" />
                        </div>

                        <Button onClick={handleSaveProfile}>
                          Save Profile
                        </Button>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-4">Data Management</h3>
                        <div className="space-y-4">
                          <Button variant="outline" onClick={handleExportData}>
                            <Database className="h-4 w-4 mr-2" />
                            Export Data
                          </Button>
                          
                          <Button variant="destructive" onClick={handleResetSettings}>
                            Reset All Settings
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
