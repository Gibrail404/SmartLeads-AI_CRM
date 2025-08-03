
import { motion } from 'framer-motion';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Lock, User, Globe, Mail, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>
            <Button>Save Changes</Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-2">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span className="hidden md:inline">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="hidden md:inline">Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="integration" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden md:inline">Integrations</span>
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="hidden md:inline">Privacy</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <h2 className="text-xl font-semibold">Profile Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input id="job-title" placeholder="Sales Representative" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <h2 className="text-xl font-semibold">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive email updates about your account activity</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Lead Alerts</h3>
                        <p className="text-sm text-muted-foreground">Get notified when a new lead is assigned to you</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Task Reminders</h3>
                        <p className="text-sm text-muted-foreground">Receive reminders about upcoming deadlines</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                  <div className="space-y-4">
                    <Button variant="outline">Change Password</Button>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="integration" className="space-y-6">
                  <h2 className="text-xl font-semibold">Connected Services</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Google Calendar</h3>
                        <p className="text-sm text-muted-foreground">Sync your meetings and appointments</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Microsoft 365</h3>
                        <p className="text-sm text-muted-foreground">Integrate with your Microsoft account</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Slack</h3>
                        <p className="text-sm text-muted-foreground">Get notified in your Slack channels</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="space-y-6">
                  <h2 className="text-xl font-semibold">Privacy Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Data Sharing</h3>
                        <p className="text-sm text-muted-foreground">Allow us to use your data for product improvement</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Communications</h3>
                        <p className="text-sm text-muted-foreground">Receive marketing emails and promotions</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Settings;
