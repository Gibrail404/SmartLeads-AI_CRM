import { motion } from 'framer-motion';
import { useState } from 'react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState('area');
  const [leadStatus, setLeadStatus] = useState('all');
  const [leadSource, setLeadSource] = useState('all');

  // Sample data for analytics
  const performanceData = [
    { name: 'Jan', leads: 45, conversions: 12, revenue: 24000 },
    { name: 'Feb', leads: 52, conversions: 18, revenue: 36000 },
    { name: 'Mar', leads: 48, conversions: 15, revenue: 30000 },
    { name: 'Apr', leads: 61, conversions: 22, revenue: 44000 },
    { name: 'May', leads: 55, conversions: 19, revenue: 38000 },
    { name: 'Jun', leads: 67, conversions: 28, revenue: 56000 },
    { name: 'Jul', leads: 59, conversions: 24, revenue: 48000 },
    { name: 'Aug', leads: 72, conversions: 31, revenue: 62000 }
  ];

  const sourceData = [
    { name: 'Website', value: 35, color: '#8884d8' },
    { name: 'Social Media', value: 28, color: '#82ca9d' },
    { name: 'Email Campaign', value: 20, color: '#ffc658' },
    { name: 'Referrals', value: 12, color: '#ff7c7c' },
    { name: 'Direct', value: 5, color: '#8dd1e1' }
  ];

  const conversionData = [
    { stage: 'Leads', count: 520, percentage: 100 },
    { stage: 'Qualified', count: 312, percentage: 60 },
    { stage: 'Proposals', count: 156, percentage: 30 },
    { stage: 'Negotiations', count: 78, percentage: 15 },
    { stage: 'Closed Won', count: 52, percentage: 10 }
  ];

  const recentLeads = [
    { id: 1, name: 'Alice Johnson', company: 'Tech Corp', source: 'Website', status: 'Hot', value: 15000 },
    { id: 2, name: 'Bob Smith', company: 'Finance Ltd', source: 'Social Media', status: 'Warm', value: 12000 },
    { id: 3, name: 'Carol Brown', company: 'Retail Inc', source: 'Email', status: 'Cold', value: 8000 },
    { id: 4, name: 'David Wilson', company: 'Manufacturing Co', source: 'Referral', status: 'Hot', value: 22000 },
    { id: 5, name: 'Emma Davis', company: 'Consulting Group', source: 'Website', status: 'Warm', value: 18000 }
  ];

  const renderChart = () => {
    const commonProps = {
      data: performanceData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="leads" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="conversions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="leads" fill="#8884d8" />
            <Bar dataKey="conversions" fill="#82ca9d" />
          </BarChart>
        );
      case 'line':
        return (
          <RechartsLineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="conversions" stroke="#82ca9d" strokeWidth={2} />
          </RechartsLineChart>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Lead Analytics</h1>
              <p className="text-muted-foreground">In-depth analysis of your lead performance and conversion metrics.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Time Range:</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Lead Status:</label>
                  <Select value={leadStatus} onValueChange={setLeadStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Lead Source:</label>
                  <Select value={leadSource} onValueChange={setLeadSource}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="email">Email Campaign</SelectItem>
                      <SelectItem value="referral">Referrals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% vs last month
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">24.8%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3.2% vs last month
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Revenue Generated</p>
                    <p className="text-2xl font-bold">₹3.2M</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +18.7% vs last month
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Deal Size</p>
                    <p className="text-2xl font-bold">₹25.6K</p>
                    <p className="text-xs text-red-600 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -2.1% vs last month
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Lead Performance Trends</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant={chartType === 'area' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('area')}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={chartType === 'bar' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('bar')}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={chartType === 'line' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('line')}
                      >
                        <LineChart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    {renderChart()}
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Lead Sources Pie Chart */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData.map((stage, index) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">{stage.stage}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{stage.count} leads</span>
                        <span className="text-sm text-muted-foreground">{stage.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent High-Value Leads */}
          <Card>
            <CardHeader>
              <CardTitle>High-Value Leads Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Lead</th>
                      <th className="text-left py-3 px-4 font-medium">Company</th>
                      <th className="text-left py-3 px-4 font-medium">Source</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Est. Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{lead.name}</td>
                        <td className="py-3 px-4">{lead.company}</td>
                        <td className="py-3 px-4">{lead.source}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            lead.status === 'Hot' ? 'destructive' : 
                            lead.status === 'Warm' ? 'default' : 'secondary'
                          }>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">₹{lead.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Analytics;