import { motion } from 'framer-motion';
import { useState } from 'react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Filter, 
  ListFilter, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Users, 
  CreditCard,
  BarChart3 
} from 'lucide-react';
import SalesKanban from '@/components/ui-custom/SalesKanban';
import { LeadData } from '@/components/ui-custom/LeadCard';
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
import StatCard from '@/components/ui-custom/StatCard';

const Pipeline = () => {
  const [showAddDealForm, setShowAddDealForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    stage: "all",
    value: "all",
    age: "all",
    assignee: "all"
  });
  const [activeTab, setActiveTab] = useState("list");

  const leads: LeadData[] = [
    {
      id: "1",
      name: 'John Smith',
      company: 'Acme Corp',
      email: 'john.smith@acme.com',
      phone: '(555) 123-4567',
      status: 'New',
      aiScore: 85,
      lastContact: '2 days ago',
      value: 5000,
    },
    {
      id: "2",
      name: 'Sarah Johnson',
      company: 'Tech Solutions Inc',
      email: 'sarah.j@techsolutions.com',
      phone: '(555) 987-6543',
      status: 'Contacted',
      aiScore: 72,
      lastContact: '1 week ago',
      value: 8500,
    },
    {
      id: "3",
      name: 'Michael Brown',
      company: 'Global Services',
      email: 'michael.b@globalservices.com',
      phone: '(555) 456-7890',
      status: 'Qualified',
      aiScore: 93,
      lastContact: '3 days ago',
      value: 12000,
    },
    {
      id: "4",
      name: 'Lisa Chen',
      company: 'Innovative Tech',
      email: 'lisa.chen@innovtech.com',
      phone: '(555) 789-0123',
      status: 'Proposal',
      aiScore: 68,
      lastContact: 'Today',
      value: 15000,
    },
    {
      id: "5",
      name: 'David Wilson',
      company: 'First Capital',
      email: 'david.w@firstcapital.com',
      phone: '(555) 234-5678',
      status: 'Negotiation',
      aiScore: 91,
      lastContact: 'Yesterday',
      value: 22000,
    },
    {
      id: "6",
      name: 'Jennifer Lee',
      company: 'Modern Solutions',
      email: 'jennifer@modernsolutions.com',
      phone: '(555) 111-2222',
      status: 'Won',
      aiScore: 95,
      lastContact: '3 days ago',
      value: 30000,
    }
  ];

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddDealForm(false);
  };

  const StageFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mr-2">
          <ListFilter className="mr-2 h-4 w-4" />
          Stage
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Deal Stage</h4>
          <RadioGroup 
            defaultValue={filters.stage}
            onValueChange={(value) => setFilters({...filters, stage: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-stages" />
              <Label htmlFor="all-stages">All Stages</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">New Leads</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contacted" id="contacted" />
              <Label htmlFor="contacted">Contacted</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="qualified" id="qualified" />
              <Label htmlFor="qualified">Qualified</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="proposal" id="proposal" />
              <Label htmlFor="proposal">Proposal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="negotiation" id="negotiation" />
              <Label htmlFor="negotiation">Negotiation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="closed" id="closed" />
              <Label htmlFor="closed">Closed</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );

  const DealValueFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mr-2">
          <CreditCard className="mr-2 h-4 w-4" />
          Deal Value
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Deal Value</h4>
          <RadioGroup 
            defaultValue={filters.value}
            onValueChange={(value) => setFilters({...filters, value: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-values" />
              <Label htmlFor="all-values">All Values</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low-value" />
              <Label htmlFor="low-value">Under ₹10,000</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium-value" />
              <Label htmlFor="medium-value">₹10,000 - ₹50,000</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high-value" />
              <Label htmlFor="high-value">Over ₹50,000</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );

  const AgeFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mr-2">
          <Calendar className="mr-2 h-4 w-4" />
          Deal Age
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Deal Age</h4>
          <RadioGroup 
            defaultValue={filters.age}
            onValueChange={(value) => setFilters({...filters, age: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-ages" />
              <Label htmlFor="all-ages">All Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="week" id="week" />
              <Label htmlFor="week">This Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="month" id="month" />
              <Label htmlFor="month">This Month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quarter" id="quarter" />
              <Label htmlFor="quarter">This Quarter</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );

  const AssigneeFilter = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 mr-2">
          <Users className="mr-2 h-4 w-4" />
          Assignee
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Assigned To</h4>
          <RadioGroup 
            defaultValue={filters.assignee}
            onValueChange={(value) => setFilters({...filters, assignee: value})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-assignees" />
              <Label htmlFor="all-assignees">All Assignees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="me" id="me" />
              <Label htmlFor="me">Assigned to Me</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unassigned" id="unassigned" />
              <Label htmlFor="unassigned">Unassigned</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="team" id="team" />
              <Label htmlFor="team">My Team</Label>
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
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
              <p className="text-muted-foreground">Track and manage your deals from lead to close.</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              <Dialog open={showAddDealForm} onOpenChange={setShowAddDealForm}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Add Deal</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Deal</DialogTitle>
                    <DialogDescription>
                      Enter details for the new deal. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddDeal}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" placeholder="Enter company name" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Contact Name</Label>
                        <Input id="contact-name" placeholder="Enter contact name" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="deal-value">Deal Value (₹)</Label>
                          <Input id="deal-value" type="number" placeholder="0" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="deal-stage">Deal Stage</Label>
                          <Select required defaultValue="new">
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New Lead</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="proposal">Proposal</SelectItem>
                              <SelectItem value="negotiation">Negotiation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Phone</Label>
                        <Input id="phone" type="tel" placeholder="+91 12345 67890" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" type="button" onClick={() => setShowAddDealForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Deal</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Pipeline Value"
              value={92500}
              icon={<BarChart3 className="h-4 w-4 text-primary" />}
              change={{ value: 12, trend: 'up' }}
              isCurrency={true}
            />
            <StatCard
              title="Open Deals"
              value={15}
              icon={<CreditCard className="h-4 w-4 text-primary" />}
              change={{ value: 5, trend: 'up' }}
            />
            <StatCard
              title="Avg. Deal Size"
              value={18500}
              icon={<ListFilter className="h-4 w-4 text-primary" />}
              change={{ value: 3, trend: 'down' }}
              isCurrency={true}
            />
            <StatCard
              title="Avg. Sales Cycle"
              value="14 days"
              icon={<Clock className="h-4 w-4 text-primary" />}
              change={{ value: 2, trend: 'down' }}
            />
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-muted/50 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filter Pipeline</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <StageFilter />
                <DealValueFilter />
                <AgeFilter />
                <AssigneeFilter />
              </div>
            </motion.div>
          )}

          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Pipeline Overview</CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="grid w-auto grid-cols-1">

                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="kanban" className="mt-0">
                  <div className="w-full overflow-x-auto">
                    <SalesKanban leads={leads} />
                  </div>
                </TabsContent>
                <TabsContent value="list" className="mt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stage</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AI Score</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{lead.company}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>{lead.name}</div>
                              <div className="text-sm text-gray-500">{lead.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">₹{lead.value.toLocaleString('en-IN')}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 
                                lead.status === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                                lead.status === 'Qualified' ? 'bg-cyan-100 text-cyan-800' :
                                lead.status === 'Proposal' ? 'bg-amber-100 text-amber-800' :
                                lead.status === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                                'bg-green-100 text-green-800'}`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {lead.lastContact}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                                  {lead.aiScore}%
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Pipeline;
