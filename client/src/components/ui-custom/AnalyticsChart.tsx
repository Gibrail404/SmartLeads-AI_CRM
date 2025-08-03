import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart as LineChartIcon, PieChart } from 'lucide-react';

const data = [
  { name: 'Jan', total: 3200, leads: 24, conversions: 8 },
  { name: 'Feb', total: 4500, leads: 35, conversions: 12 },
  { name: 'Mar', total: 3800, leads: 30, conversions: 10 },
  { name: 'Apr', total: 6000, leads: 45, conversions: 20 },
  { name: 'May', total: 5300, leads: 41, conversions: 18 },
  { name: 'Jun', total: 7500, leads: 58, conversions: 28 },
  { name: 'Jul', total: 8200, leads: 64, conversions: 32 },
  { name: 'Aug', total: 7800, leads: 60, conversions: 30 },
  { name: 'Sep', total: 9000, leads: 70, conversions: 35 },
  { name: 'Oct', total: 9500, leads: 74, conversions: 38 },
  { name: 'Nov', total: 8800, leads: 68, conversions: 33 },
  { name: 'Dec', total: 10200, leads: 80, conversions: 42 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 p-3 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
        <p className="font-medium text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>
              {entry.name}: {
                entry.name === 'Revenue' 
                  ? `₹${entry.value.toLocaleString('en-IN')}`
                  : entry.value.toLocaleString()
              }
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

type ChartType = 'area' | 'bar' | 'line';
type DataType = 'total' | 'leads' | 'conversions';

const AnalyticsChart = () => {
  const [timeRange, setTimeRange] = useState('ytd');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [dataType, setDataType] = useState<DataType>('total');

  const getChartData = () => {
    switch (timeRange) {
      case 'week':
        return data.slice(-4);
      case 'month':
        return data.slice(-6);
      case 'quarter':
        return data.slice(-3);
      default:
        return data;
    }
  };

  const renderChart = () => {
    const chartData = getChartData();
    
    const formatYAxis = (value: number) => {
      if (dataType === 'total') {
        return `₹${(value / 1000).toFixed(0)}k`;
      }
      return value.toString();
    };
    
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            {dataType === 'total' && (
              <Area 
                type="monotone" 
                dataKey="total" 
                name="Revenue" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
            )}
            {dataType === 'leads' && (
              <Area 
                type="monotone" 
                dataKey="leads" 
                name="Leads" 
                stroke="#8b5cf6" 
                fillOpacity={1} 
                fill="url(#colorLeads)" 
              />
            )}
            {dataType === 'conversions' && (
              <Area 
                type="monotone" 
                dataKey="conversions" 
                name="Conversions" 
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#colorConversions)" 
              />
            )}
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            {dataType === 'total' && (
              <Bar 
                dataKey="total" 
                name="Revenue" 
                fill="#3b82f6" 
                barSize={30} 
                radius={[4, 4, 0, 0]} 
              />
            )}
            {dataType === 'leads' && (
              <Bar 
                dataKey="leads" 
                name="Leads" 
                fill="#8b5cf6" 
                barSize={30} 
                radius={[4, 4, 0, 0]} 
              />
            )}
            {dataType === 'conversions' && (
              <Bar 
                dataKey="conversions" 
                name="Conversions" 
                fill="#22c55e" 
                barSize={30} 
                radius={[4, 4, 0, 0]} 
              />
            )}
          </BarChart>
        );
        
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            {dataType === 'total' && (
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            )}
            {dataType === 'leads' && (
              <Line 
                type="monotone" 
                dataKey="leads" 
                name="Leads" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, fill: '#8b5cf6' }}
              />
            )}
            {dataType === 'conversions' && (
              <Line 
                type="monotone" 
                dataKey="conversions" 
                name="Conversions" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, fill: '#22c55e' }}
              />
            )}
          </LineChart>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>
              {dataType === 'total' && 'Revenue generated over time'}
              {dataType === 'leads' && 'Lead acquisition over time'}
              {dataType === 'conversions' && 'Lead conversions over time'}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={dataType}
              onValueChange={(value) => setDataType(value as DataType)}
            >
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Select data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total">Revenue</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="conversions">Conversions</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-end mb-4">
          <div className="inline-flex border rounded-md overflow-hidden">
            <Button 
              variant={chartType === 'area' ? 'default' : 'ghost'} 
              size="sm"
              className={`h-8 rounded-none ${chartType === 'area' ? '' : 'text-gray-500'}`}
              onClick={() => setChartType('area')}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Area
            </Button>
            <Button 
              variant={chartType === 'bar' ? 'default' : 'ghost'} 
              size="sm"
              className={`h-8 rounded-none ${chartType === 'bar' ? '' : 'text-gray-500'}`}
              onClick={() => setChartType('bar')}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Bar
            </Button>
            <Button 
              variant={chartType === 'line' ? 'default' : 'ghost'} 
              size="sm"
              className={`h-8 rounded-none ${chartType === 'line' ? '' : 'text-gray-500'}`}
              onClick={() => setChartType('line')}
            >
              <LineChartIcon className="h-4 w-4 mr-1" />
              Line
            </Button>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
