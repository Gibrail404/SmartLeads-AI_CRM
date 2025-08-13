import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StatCard from '@/components/ui-custom/StatCard';
import { getPipelines } from '@/api/auth';
import Loader from '@/components/ui/loader';

const Pipeline = () => {
  const [showAddDealForm, setShowAddDealForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [filters, setFilters] = useState({
    stage: "all_stages",
    dealValue: "all_values",
    dealAge: "all_time",
  });
  const [pipelineData, setPipelineData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchPipelineData = async () => {
    setLoading(true);
    try {
      const res = await getPipelines(filters);
      setPipelineData(res);
      console.log("pipelineData", res.data);
    } catch (error) {
      console.error("Error fetching pipeline data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelineData();
  }, [filters]);

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
            onValueChange={(value) => setFilters({ ...filters, stage: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all_stages" id="all_stages" />
              <Label htmlFor="all_stages">All Stages</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">New</Label>
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
            defaultValue={filters.dealValue}
            onValueChange={(value) => setFilters({ ...filters, dealValue: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all_values" id="all_values" />
              <Label htmlFor="all_values">All Values</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="under_200000" id="under_200000" />
              <Label htmlFor="under_200000">Under ₹200,000</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="200000_500000" id="200000_500000" />
              <Label htmlFor="200000_500000">₹200,000 - ₹500,000</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="over_500000" id="over_500000" />
              <Label htmlFor="over_500000">Over ₹500,000</Label>
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
            defaultValue={filters.dealAge}
            onValueChange={(value) => setFilters({ ...filters, dealAge: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all_time" id="all_time" />
              <Label htmlFor="all_time">All Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="this_week" id="this_week" />
              <Label htmlFor="this_week">This Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="this_month" id="this_month" />
              <Label htmlFor="this_month">This Month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="this_quarter" id="this_quarter" />
              <Label htmlFor="this_quarter">This Quarter</Label>
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
              <h1 className="text-2xl font-bold tracking-tight">Pipeline</h1>
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
            {loading ? (
              <div className="col-span-4 flex justify-center py-6">
                <Loader />
              </div>
            ) : (
              <>
                <StatCard
                  title="Total Pipeline Value"
                  value={`${pipelineData?.totalValue}K`}
                  icon={<BarChart3 className="h-4 w-4 text-primary" />}
                  change={{ value: 12, trend: 'up' }}
                  isCurrency={true}
                />
                <StatCard
                  title="Open Deals"
                  value={pipelineData?.totalNewDeals}
                  icon={<CreditCard className="h-4 w-4 text-primary" />}
                  change={{ value: 5, trend: 'up' }}
                />
                <StatCard
                  title="Avg. Deal Size"
                  value={`${pipelineData?.avgDealSizeK}K`}
                  icon={<ListFilter className="h-4 w-4 text-primary" />}
                  change={{ value: 3, trend: 'down' }}
                  isCurrency={true}
                />
                <StatCard
                  title="Avg. Cycle"
                  value={`${pipelineData?.avgCycle} days`}
                  icon={<Clock className="h-4 w-4 text-primary" />}
                  change={{ value: 2, trend: 'down' }}
                />
              </>
            )}
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
                        {pipelineData?.deals?.map((lead, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium capitalize">{lead.company}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="capitalize">{lead.name}</div>
                              <div className="text-sm text-gray-500">{lead.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">
                                ₹
                                {Number(lead.value.replace(/[^0-9.-]+/g, "")).toLocaleString("en-IN")}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${lead.stage?.toLowerCase() === "new"
                                    ? "bg-blue-100 text-blue-800"
                                    : lead.stage?.toLowerCase() === "contacted"
                                      ? "bg-purple-100 text-purple-800"
                                      : lead.stage?.toLowerCase() === "qualified"
                                        ? "bg-cyan-100 text-cyan-800"
                                        : lead.stage?.toLowerCase() === "proposal"
                                          ? "bg-amber-100 text-amber-800"
                                          : lead.stage?.toLowerCase() === "negotiation"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-green-100 text-green-800"
                                  }`}
                              >
                                {lead.stage}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {lead.lastContact}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                                  {lead.aiScore}
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
