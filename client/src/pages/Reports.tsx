import { motion } from 'framer-motion';
import { 
  BarChart, 
  FileText, 
  Download, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Filter, 
  Users, 
  Layers,
  X,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Indian Rupee symbol: ₹ - Define this component before it's used
const DollarSign = (props) => (
  <div className="flex items-center justify-center">
    <span className="text-lg font-semibold">₹</span>
  </div>
);

const Reports = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "all",
    reportType: "all",
    scheduled: "all",
    format: "all"
  });
  
  const reportTypes = [
    {
      id: 'sales',
      name: 'Sales Reports',
      description: 'Track revenue, deal size, and sales performance',
      icon: DollarSign,
      count: 12
    },
    {
      id: 'leads',
      name: 'Lead Reports',
      description: 'Monitor lead sources, conversion, and scoring',
      icon: Users,
      count: 8
    },
    {
      id: 'performance',
      name: 'Performance Reports',
      description: 'Analyze team and individual sales performance',
      icon: BarChart,
      count: 5
    },
    {
      id: 'pipeline',
      name: 'Pipeline Reports',
      description: 'Examine your sales pipeline and deal stages',
      icon: Layers,
      count: 7
    }
  ];
  
  const savedReports = {
    sales: [
      { id: '1', name: 'Monthly Revenue Report', lastRun: '2 days ago', scheduled: true, format: 'PDF' },
      { id: '2', name: 'Quarterly Sales Summary', lastRun: '1 week ago', scheduled: true, format: 'Excel' },
      { id: '3', name: 'Annual Sales Performance', lastRun: '1 month ago', scheduled: false, format: 'PDF' },
      { id: '4', name: 'Product Revenue Breakdown', lastRun: '3 days ago', scheduled: true, format: 'Excel' },
      { id: '5', name: 'Regional Sales Comparison', lastRun: '4 days ago', scheduled: false, format: 'PDF' },
    ],
    leads: [
      { id: '1', name: 'Lead Source Analysis', lastRun: '1 day ago', scheduled: true, format: 'PDF' },
      { id: '2', name: 'Lead Conversion Report', lastRun: '5 days ago', scheduled: false, format: 'Excel' },
      { id: '3', name: 'Lead Scoring Effectiveness', lastRun: '1 week ago', scheduled: true, format: 'PDF' },
    ],
    performance: [
      { id: '1', name: 'Sales Team Performance', lastRun: '2 days ago', scheduled: true, format: 'Excel' },
      { id: '2', name: 'Individual Rep Metrics', lastRun: '3 days ago', scheduled: false, format: 'PDF' },
    ],
    pipeline: [
      { id: '1', name: 'Pipeline Stage Analysis', lastRun: '1 day ago', scheduled: true, format: 'PDF' },
      { id: '2', name: 'Deal Velocity Report', lastRun: '4 days ago', scheduled: false, format: 'Excel' },
      { id: '3', name: 'Win/Loss Analysis', lastRun: '1 week ago', scheduled: true, format: 'PDF' },
    ]
  };
  
  const filterReports = (reports) => {
    return reports.filter(report => {
      if (filters.format !== "all" && report.format !== filters.format) return false;
      if (filters.scheduled !== "all") {
        const isScheduled = filters.scheduled === "scheduled";
        if (report.scheduled !== isScheduled) return false;
      }
      return true;
    });
  };
  
  const currentReports = filterReports(savedReports[activeTab as keyof typeof savedReports] || []);
  
  const handleCreateReport = (e) => {
    e.preventDefault();
    // In a real app, we would save the form data here
    setShowCreateForm(false);
    // For demo purposes, we'll just close the form
  };
  
  const DateRangeFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mr-2">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Select Date Range</h4>
          <RadioGroup 
            defaultValue={filters.dateRange}
            onValueChange={(value) => setFilters({...filters, dateRange: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-dates" />
              <Label htmlFor="all-dates">All Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="week" id="this-week" />
              <Label htmlFor="this-week">This Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="month" id="this-month" />
              <Label htmlFor="this-month">This Month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quarter" id="this-quarter" />
              <Label htmlFor="this-quarter">This Quarter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="year" id="this-year" />
              <Label htmlFor="this-year">This Year</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
  
  const ScheduledFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mr-2">
          <Clock className="mr-2 h-4 w-4" />
          {filters.scheduled === "all" ? "All Reports" : 
           filters.scheduled === "scheduled" ? "Scheduled" : "Manual"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Report Frequency</h4>
          <RadioGroup 
            defaultValue={filters.scheduled}
            onValueChange={(value) => setFilters({...filters, scheduled: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-schedules" />
              <Label htmlFor="all-schedules">All Reports</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scheduled" id="scheduled" />
              <Label htmlFor="scheduled">Scheduled Reports</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual">Manual Reports</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
  
  const FormatFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mr-2">
          <FileText className="mr-2 h-4 w-4" />
          {filters.format === "all" ? "All Formats" : filters.format}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Report Format</h4>
          <RadioGroup 
            defaultValue={filters.format}
            onValueChange={(value) => setFilters({...filters, format: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-formats" />
              <Label htmlFor="all-formats">All Formats</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PDF" id="pdf" />
              <Label htmlFor="pdf">PDF</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Excel" id="excel" />
              <Label htmlFor="excel">Excel</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );

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
              <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground">Generate insights from your CRM data</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogTrigger asChild>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Create Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Report</DialogTitle>
                    <DialogDescription>
                      Design a custom report to analyze your CRM data
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateReport}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input id="report-name" placeholder="Enter report name" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="report-type">Report Type</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Sales Report</SelectItem>
                            <SelectItem value="leads">Lead Report</SelectItem>
                            <SelectItem value="performance">Performance Report</SelectItem>
                            <SelectItem value="pipeline">Pipeline Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date-range">Date Range</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                            <SelectItem value="year">This Year</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="format">Format</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="schedule" />
                        <label
                          htmlFor="schedule"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Schedule this report
                        </label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" type="button" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Report</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-muted/50 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filter Reports</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFilters(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <DateRangeFilter />
                <ScheduledFilter />
                <FormatFilter />
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((type) => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${activeTab === type.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => setActiveTab(type.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === type.id ? 'bg-primary' : 'bg-muted'}`}>
                      <type.icon className={`h-5 w-5 ${activeTab === type.id ? 'text-white' : 'text-foreground'}`} />
                    </div>
                    <Badge>{type.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <CardDescription className="mt-1">{type.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{reportTypes.find(t => t.id === activeTab)?.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentReports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No reports match your filters</h3>
                  <p className="text-muted-foreground mb-4">Try changing your filter criteria or create a new report</p>
                  <Button onClick={() => {
                    setFilters({
                      dateRange: "all",
                      reportType: "all",
                      scheduled: "all",
                      format: "all"
                    });
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {report.lastRun}
                          </div>
                        </TableCell>
                        <TableCell>
                          {report.scheduled ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Scheduled
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200">
                              Manual
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">Run</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Reports that were recently generated or viewed</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                  <TabsTrigger value="viewed">Recently Viewed</TabsTrigger>
                  <TabsTrigger value="generated">Recently Generated</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {Object.values(savedReports).flat().slice(0, 5).map(report => (
                    <div key={report.id} className="flex justify-between items-center p-3 rounded-md hover:bg-muted">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground">Generated {report.lastRun}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="viewed" className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Monthly Revenue Report</p>
                        <p className="text-sm text-muted-foreground">Viewed yesterday</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="generated" className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Lead Source Analysis</p>
                        <p className="text-sm text-muted-foreground">Generated 1 day ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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

export default Reports;
