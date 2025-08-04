import { motion } from 'framer-motion';
import {
  Lightbulb,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Users,
  DollarSign,
  Target,
  LineChart,
  BarChart,
  Calendar
} from 'lucide-react';
import { useEffect, useState } from 'react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { kpiMetrics } from '@/api/auth';

const Insights = () => {
  const [timeFrame, setTimeFrame] = useState('7days');

  const [kpis, setKpi] = useState({
    conversionRate: 0,
    averageDealSize: 0,
    averageSalesCycle: 0,
    winRate: 0
  });

  useEffect(() => {
    const fetchKpi = async () => {
      try {
        const res = await kpiMetrics();
        setKpi(res);
        console.log("res", res);
      } catch (err) {
        console.error("KPI Fetch Error", err?.response?.data || err.message);
      }
    };
    fetchKpi();
  }, []);

  const insightCategories = [
    { id: 'all', name: 'All Insights' },
    { id: 'leads', name: 'Lead Insights' },
    { id: 'revenue', name: 'Revenue Insights' },
    { id: 'performance', name: 'Performance Insights' },
    { id: 'opportunities', name: 'Opportunities' },
  ];

  // Mock insights data
  const insightsData = [
    {
      id: '1',
      category: 'leads',
      type: 'opportunity',
      title: 'Lead Scoring Pattern Detected',
      description: 'Tech industry leads that engage with product demo emails have a 72% higher conversion rate.',
      timestamp: '2 hours ago',
      icon: Lightbulb,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: '2',
      category: 'revenue',
      type: 'trend',
      title: 'Revenue Growth Trend',
      description: 'Your monthly recurring revenue has increased by 18% compared to the previous quarter.',
      timestamp: '5 hours ago',
      icon: TrendingUp,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: '3',
      category: 'performance',
      type: 'alert',
      title: 'Follow-up Needed',
      description: '5 high-value leads haven\'t been contacted in the last 7 days. Prompt follow-up recommended.',
      timestamp: '1 day ago',
      icon: AlertCircle,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      id: '4',
      category: 'leads',
      type: 'opportunity',
      title: 'Potential Lead Source',
      description: 'LinkedIn campaigns are generating leads with 35% higher qualification rate than other sources.',
      timestamp: '1 day ago',
      icon: Lightbulb,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: '5',
      category: 'revenue',
      type: 'trend',
      title: 'Deal Size Increasing',
      description: 'Average deal size has increased by 22% for enterprise clients in the last quarter.',
      timestamp: '2 days ago',
      icon: TrendingUp,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: '6',
      category: 'opportunities',
      type: 'opportunity',
      title: 'Cross-Sell Opportunity',
      description: '35% of your existing customers show high propensity for premium add-on services.',
      timestamp: '3 days ago',
      icon: Lightbulb,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
  ];

  // Recommended actions
  const recommendedActions = [
    {
      id: '1',
      title: 'Reach out to high-value leads',
      description: '5 high-scoring leads haven\'t been contacted in 7 days',
      icon: Users,
      action: 'View Leads'
    },
    {
      id: '2',
      title: 'Review sales pipeline',
      description: '8 deals in negotiation stage need attention',
      icon: BarChart,
      action: 'View Pipeline'
    },
    {
      id: '3',
      title: 'Schedule follow-up meetings',
      description: '12 leads ready for demo presentation',
      icon: Calendar,
      action: 'Schedule'
    },
  ];

  // Render insight card based on insight type
  const renderInsightCard = (insight: typeof insightsData[0]) => {
    return (
      <motion.div
        key={insight.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${insight.iconBg}`}>
                <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
              </div>
              <Badge variant="outline" className="text-xs font-normal">
                <Clock className="mr-1 h-3 w-3" />
                {insight.timestamp}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg mb-2">{insight.title}</CardTitle>
            <CardDescription>{insight.description}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <Badge className="capitalize">{insight.category}</Badge>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link to="/leads">
                <span>Take Action</span>
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Insights</h1>
              <p className="text-muted-foreground">AI-powered business intelligence to help you make better decisions</p>
            </div>

            <div className="flex items-center gap-3">
              <Select
                defaultValue={timeFrame}
                onValueChange={setTimeFrame}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="quarter">This quarter</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Key Performance Metrics</CardTitle>
                <CardDescription>AI-analyzed performance indicators for your business</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">Lead Conversion Rate</p>
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12%
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">23.5%</p>
                    <p className="text-xs text-muted-foreground mt-1">vs 21.0% last period</p>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">Avg. Deal Size</p>
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.3%
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">₹8,245</p>
                    <p className="text-xs text-muted-foreground mt-1">vs ₹7,612 last period</p>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">Sales Cycle</p>
                      <div className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +2.1%
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">18 days</p>
                    <p className="text-xs text-muted-foreground mt-1">vs 17.6 days last period</p>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5.4%
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">35.2%</p>
                    <p className="text-xs text-muted-foreground mt-1">vs 33.4% last period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Key Performance Metrics</CardTitle>
              <CardDescription>AI-analyzed performance indicators for your business</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Lead Conversion Rate</p>
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12%
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-2">{kpis?.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">vs 21.0% last period</p>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Avg. Deal Size</p>
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.3%
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-2">₹{kpis?.averageDealSize}</p>
                  <p className="text-xs text-muted-foreground mt-1">vs ₹7,612 last period</p>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Sales Cycle</p>
                    <div className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1%
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-2">{kpis.averageSalesCycle} days</p>
                  <p className="text-xs text-muted-foreground mt-1">vs 17.6 days last period</p>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.4%
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-2">{kpis?.winRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">vs 33.4% last period</p>
                </div>

              </div>
            </CardContent>
          </Card>


          <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
              <TabsList>
                {insightCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* All Insights Tab */}
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insightsData.map(insight => renderInsightCard(insight))}
              </div>
            </TabsContent>

            {/* Other category tabs */}
            {insightCategories.slice(1).map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insightsData
                    .filter(insight => insight.category === category.id)
                    .map(insight => renderInsightCard(insight))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>AI Forecasts</CardTitle>
                <CardDescription>Predictions based on your historical data and market trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded mr-3">
                        <Target className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-medium">Revenue Forecast</h3>
                    </div>
                    <Badge>Q3 2023</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on current pipeline and conversion rates, projected quarterly revenue is:
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">₹1.24M</span>
                    <span className="text-green-600 text-sm font-medium mb-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +14% vs target
                    </span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded mr-3">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <h3 className="font-medium">Lead Generation Forecast</h3>
                    </div>
                    <Badge>Next 30 days</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on current marketing campaigns and seasonal trends:
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">285 leads</span>
                    <span className="text-green-600 text-sm font-medium mb-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.3% vs previous period
                    </span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded mr-3">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="font-medium">Conversion Rate Forecast</h3>
                    </div>
                    <Badge>Next quarter</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Projected lead-to-customer conversion rate based on process improvements:
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">26.4%</span>
                    <span className="text-green-600 text-sm font-medium mb-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.9% vs current rate
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>AI-prioritized tasks to improve your results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedActions.map(action => (
                  <div key={action.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded flex-shrink-0">
                        <action.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                        <Button size="sm" variant="outline">{action.action}</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">View All Recommendations</Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Insights;
