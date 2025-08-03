
import { motion } from 'framer-motion';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Bell, Calendar, Mail, MessageSquare, User, Clock, CheckCircle2 } from 'lucide-react';

// Sample notification data
const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Sarah Johnson',
    description: 'Hey, can we discuss the proposal for Tech Solutions?',
    time: '10 minutes ago',
    read: false,
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    type: 'lead',
    title: 'New lead assigned',
    description: 'Michael Brown from Global Services has been assigned to you',
    time: '1 hour ago',
    read: false,
    avatar: '/placeholder.svg',
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Upcoming meeting',
    description: 'Call with Lisa Chen from Innovative Tech at 2:00 PM',
    time: 'in 3 hours',
    read: true,
    avatar: '/placeholder.svg',
  },
  {
    id: 4,
    type: 'system',
    title: 'System update completed',
    description: 'The CRM system has been updated to version 2.1.0',
    time: 'Yesterday',
    read: true,
    avatar: null,
  },
  {
    id: 5,
    type: 'message',
    title: 'New message from David Wilson',
    description: 'I need the latest figures for the First Capital account',
    time: '2 days ago',
    read: true,
    avatar: '/placeholder.svg',
  }
];

const NotificationItem = ({ notification }: { notification: typeof notifications[0] }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'lead': return <User className="h-4 w-4 text-green-500" />;
      case 'meeting': return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'system': return <Bell className="h-4 w-4 text-orange-500" />;
      default: return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`p-4 flex gap-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
        !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        {notification.avatar ? (
          <Avatar className="h-10 w-10">
            <img src={notification.avatar} alt="" />
          </Avatar>
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {getIcon(notification.type)}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
            {notification.title}
          </h3>
          {!notification.read && (
            <Badge variant="outline" className="h-2 w-2 rounded-full bg-blue-500" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Clock className="h-3 w-3 mr-1" />
          <span>{notification.time}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
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
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your latest activities.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Mark All as Read
              </Button>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  Notification Center
                  {unreadCount > 0 && (
                    <Badge className="bg-blue-500">{unreadCount} new</Badge>
                  )}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 border-b">
                  <TabsList className="w-full justify-start h-12">
                    <TabsTrigger value="all" className="flex items-center gap-2 data-[state=active]:bg-transparent">
                      <span>All</span>
                      <Badge variant="outline" className="ml-1">{notifications.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex items-center gap-2 data-[state=active]:bg-transparent">
                      <span>Unread</span>
                      <Badge variant="outline" className="ml-1">{unreadCount}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="messages" className="flex items-center gap-2 data-[state=active]:bg-transparent">
                      <span>Messages</span>
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-transparent">
                      <span>Alerts</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="m-0">
                  <div className="divide-y">
                    {notifications.map(notification => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="m-0">
                  <div className="divide-y">
                    {notifications.filter(n => !n.read).map(notification => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="messages" className="m-0">
                  <div className="divide-y">
                    {notifications.filter(n => n.type === 'message').map(notification => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="alerts" className="m-0">
                  <div className="divide-y">
                    {notifications.filter(n => n.type !== 'message').map(notification => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="p-4 text-center border-t">
                <Button variant="ghost" className="text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Clear All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Notifications;
