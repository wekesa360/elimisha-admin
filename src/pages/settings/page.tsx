// src/pages/settings/page.tsx
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSelector } from './components/theme-selector';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface SettingsState {
  emailNotifications: boolean;
  marketingEmails: boolean;
  activityDigest: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    emailNotifications: true,
    marketingEmails: false,
    activityDigest: true,
  });

  const updateSetting = (key: keyof SettingsState) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      toast.success('Settings updated successfully');
      return newSettings;
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" />

      <div className="grid gap-6">
        <Card className='rounded-none'>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the appearance of the application
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Select your preferred theme
              </p>
            </div>
            <ThemeSelector />
          </CardContent>
        </Card>

        <Card className='rounded-none'>
          <CardHeader>
            <CardTitle>Notifications (Coming Soon)</CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about your account activity
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => updateSetting('emailNotifications')}
              />
            </div>
            {/* <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Marketing Emails</h3>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and updates
                </p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={() => updateSetting('marketingEmails')}
              />
            </div> */}
            {/* <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Activity Digest</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly digest of your activity
                </p>
              </div>
              <Switch
                checked={settings.activityDigest}
                onCheckedChange={() => updateSetting('activityDigest')}
              />
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}