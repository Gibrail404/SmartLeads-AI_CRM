import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  TrendingUp,
  TrendingDown,
  Users,
  IndianRupee,
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
import { getAnalytics } from '@/api/auth';


const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState('area');
  const [leadStatus, setLeadStatus] = useState('all');
  const [leadSource, setLeadSource] = useState('all');

  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();
        setAnalyticsData(res);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="p-8 text-center text-muted-foreground">Loading analytics...</div>
      </PageLayout>
    );
  }

  if (!analyticsData) {
    return (
      <PageLayout>
        <div className="p-8 text-center text-red-500">Failed to load analytics data.</div>
      </PageLayout>
    );
  }

  // Data for analytics

  const getMonthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'short' }); // "Jun"
  };

  const rawPerformanceData = analyticsData?.performanceData || [];

  const monthlyPerformanceMap = {};

  rawPerformanceData.forEach(stageData => {
    const stage = stageData.stage;
    stageData.trend.forEach(({ date, count }) => {
      const month = getMonthName(date);

      if (!monthlyPerformanceMap[month]) {
        monthlyPerformanceMap[month] = {
          name: month,
          leads: 0,
          conversions: 0,
          revenue: 0
        };
      }

      monthlyPerformanceMap[month].leads += count;

      if (stage === 'Won') {
        monthlyPerformanceMap[month].conversions += count;
      }
    });
  });

  const performanceData = Object.values(monthlyPerformanceMap);


  const sourceData = analyticsData?.leadSourceData?.map(item => ({
    name: item.source,
    value: item.count,
    color: item.color,
  })) || [];

  const conversionData = analyticsData?.conversionData?.map(item => ({
    stage: item.stage,
    count: item.count,
    percentage: item.percentage,
  })) || [];

  const recentLeads = analyticsData?.recentLeads?.map((lead, index) => ({
    id: index + 1, // Assigning sequential IDs
    name: lead.name,
    company: lead.company,
    source: lead.source,
    status: lead.status,
    value: lead.value,
  })) || [];


  // handle export 
  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    // 1. Metrics Sheet
    const metricsData = [
      ['Metric', 'Value'],
      ['Total Leads', analyticsData?.metrics?.totalLeads],
      ['Conversion Rate (%)', analyticsData?.metrics?.conversionRate],
      ['Revenue Generated', analyticsData?.metrics?.revenueGenerated],
      ['Average Deal Size', analyticsData?.metrics?.avgDealSize],
    ];
    const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData);
    XLSX.utils.book_append_sheet(wb, metricsSheet, 'Metrics');

    // 2. Performance Trends Sheet
    const trendsSheet = XLSX.utils.json_to_sheet(performanceData);
    XLSX.utils.book_append_sheet(wb, trendsSheet, 'Performance Trends');

    // 3. Lead Sources Sheet
    const leadSources = sourceData.map(({ name, value }) => ({
      Source: name,
      Count: value
    }));
    const sourceSheet = XLSX.utils.json_to_sheet(leadSources);
    XLSX.utils.book_append_sheet(wb, sourceSheet, 'Lead Sources');

    // 4. Conversion Funnel Sheet
    const conversionSheet = XLSX.utils.json_to_sheet(conversionData.map(({ stage, count, percentage }) => ({
      Stage: stage,
      Count: count,
      Percentage: percentage
    })));
    XLSX.utils.book_append_sheet(wb, conversionSheet, 'Conversion Funnel');

    // 5. High-Value Leads Sheet
    const leadsSheet = XLSX.utils.json_to_sheet(recentLeads.map(({ name, company, source, status, value }) => ({
      Name: name,
      Company: company,
      Source: source,
      Status: status,
      Value: value
    })));
    XLSX.utils.book_append_sheet(wb, leadsSheet, 'High-Value Leads');

    // Export workbook
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'Lead_Analytics_Export.xlsx');
  };

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
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
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
                    <p className="text-2xl font-bold">{analyticsData?.metrics?.totalLeads}</p>
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
                    <p className="text-2xl font-bold">{analyticsData?.metrics?.conversionRate}%</p>
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
                    <p className="text-2xl font-bold">₹{analyticsData?.metrics?.revenueGenerated}</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +18.7% vs last month
                    </p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Deal Size</p>
                    <p className="text-2xl font-bold">₹{analyticsData?.metrics?.avgDealSize}</p>
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
                            lead.status === 'Lost' ? 'destructive' :
                              lead.status === 'Open' ? 'outline' :
                                lead.status === 'Qualified' ? 'secondary' :
                                  lead.status === 'Won' ? 'default' : 'outline'
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