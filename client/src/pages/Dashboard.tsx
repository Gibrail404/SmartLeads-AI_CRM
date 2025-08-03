
import { motion } from 'framer-motion';
import { 
  Users, 
  LineChart, 
  DollarSign, 
  Target, 
  BarChart3, 
  Zap,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/ui-custom/StatCard';
import AnalyticsChart from '@/components/ui-custom/AnalyticsChart';
import LeadCard, { LeadData } from '@/components/ui-custom/LeadCard';
import ChatAssistant from '@/components/ui-custom/ChatAssistant';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/ui-custom/PageLayout';

// Mock data
const topLeads: LeadData[] = [
  {
    id: '1',
    name: 'John Roberts',
    email: 'john.roberts@acme.com',
    phone: '(555) 123-4567',
    company: 'Acme Corp',
    status: 'Qualified',
    aiScore: 92,
    lastContact: '2 days ago',
    assignedTo: {
      name: 'Sarah Collins',
    }
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.wilson@globex.com',
    phone: '(555) 987-6543',
    company: 'Globex Industries',
    status: 'Proposal',
    aiScore: 88,
    lastContact: '1 day ago',
    assignedTo: {
      name: 'Michael Chen',
    }
  },
  {
    id: '3',
    name: 'Robert Miller',
    email: 'robert.miller@initech.com',
    phone: '(555) 456-7890',
    company: 'Initech',
    status: 'Negotiation',
    aiScore: 79,
    lastContact: '5 days ago',
    assignedTo: {
      name: 'Sarah Collins',
    }
  }
];

const Dashboard = () => {
  // For staggered animations
  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <PageLayout paddingTop={false}>
      <div className="pt-20 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening with your business today.
            </p>
          </motion.div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Select defaultValue="today">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            
            <Link to="/reports">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <StatCard
              title="Total Revenue"
              value="$125,430"
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              change={{ value: 12.5, trend: 'up' }}
              tooltip="Total revenue generated this period"
            />
          </motion.div>
          
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <StatCard
              title="New Leads"
              value={256}
              icon={<Target className="h-5 w-5 text-primary" />}
              change={{ value: 8.2, trend: 'up' }}
              tooltip="New leads acquired this period"
            />
          </motion.div>
          
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <StatCard
              title="Conversion Rate"
              value="23.5%"
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
              change={{ value: 2.1, trend: 'up' }}
              tooltip="Percentage of leads that convert to customers"
            />
          </motion.div>
          
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <StatCard
              title="Active Customers"
              value={1428}
              icon={<Users className="h-5 w-5 text-primary" />}
              change={{ value: 3.2, trend: 'up' }}
              tooltip="Total number of active customers"
            />
          </motion.div>
        </div>
        
        {/* Charts and AI section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnalyticsChart />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Insights</h3>
                    <p className="text-sm text-gray-500">Powered by machine learning</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-medium mb-2 text-primary">Revenue Forecast</h4>
                    <p className="text-sm">Based on current trends, you're projected to exceed your quarterly target by <span className="font-semibold">14%</span>.</p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-medium mb-2 text-primary">Lead Quality</h4>
                    <p className="text-sm">Your lead quality has improved by <span className="font-semibold">8.3%</span> this month. Technology sector leads are converting best.</p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-medium mb-2 text-primary">Recommended Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                        Follow up with 5 high-value leads
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                        Review proposals in negotiation stage
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                        Schedule demos for qualified leads
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Link to="/insights">
                  <Button className="w-full mt-4">View All Insights</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Top Leads Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Top AI-Scored Leads</h2>
              <Link to="/leads">
                <Button variant="outline" size="sm">View All Leads</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topLeads.map((lead, index) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Lead Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/lead-actions/send-email">
              <Button variant="outline" className="w-full h-12 justify-start px-4">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>Send Email</span>
              </Button>
            </Link>
            <Link to="/lead-actions/call-lead">
              <Button variant="outline" className="w-full h-12 justify-start px-4">
                <Users className="h-5 w-5 mr-2" />
                <span>Call Lead</span>
              </Button>
            </Link>
            <Link to="/lead-actions/schedule-meeting">
              <Button variant="outline" className="w-full h-12 justify-start px-4">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Schedule Meeting</span>
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* AI Chatbot Assistant */}
        <ChatAssistant />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
