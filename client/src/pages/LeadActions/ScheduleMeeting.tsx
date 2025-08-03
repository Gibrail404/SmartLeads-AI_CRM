
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  FileText, 
  PlusCircle, 
  User, 
  Building, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  X
} from 'lucide-react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ScheduleMeeting = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  
  const addLead = (leadId: string) => {
    if (!selectedLeads.includes(leadId)) {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };
  
  const removeLead = (leadId: string) => {
    setSelectedLeads(selectedLeads.filter(id => id !== leadId));
  };
  
  const scheduleMeeting = () => {
    toast({
      title: "Meeting Scheduled",
      description: `Meeting scheduled for ${date ? format(date, 'PPP') : 'No date selected'} with ${selectedLeads.length} attendees.`,
    });
  };
  
  // Sample leads
  const leads = [
    { id: '1', name: 'John Smith', company: 'Acme Corp', email: 'john.smith@acme.com' },
    { id: '2', name: 'Sarah Johnson', company: 'Tech Solutions Inc', email: 'sarah.j@techsolutions.com' },
    { id: '3', name: 'Michael Brown', company: 'Global Services', email: 'michael.b@globalservices.com' },
    { id: '4', name: 'Lisa Chen', company: 'Innovative Tech', email: 'lisa.chen@innovtech.com' },
    { id: '5', name: 'David Wilson', company: 'First Capital', email: 'david.w@firstcapital.com' },
  ];
  
  // Sample meeting templates
  const meetingTemplates = [
    { id: '1', name: 'Initial Discovery Call', duration: '30 min' },
    { id: '2', name: 'Product Demo', duration: '45 min' },
    { id: '3', name: 'Proposal Review', duration: '60 min' },
    { id: '4', name: 'Contract Negotiation', duration: '45 min' },
  ];
  
  // Sample time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM'
  ];
  
  // Sample upcoming meetings
  const upcomingMeetings = [
    { id: '1', title: 'Product Demo', attendees: ['John Smith', 'Sarah Johnson'], date: 'Tomorrow, 10:00 AM' },
    { id: '2', title: 'Initial Discovery', attendees: ['Michael Brown'], date: 'Mar 25, 2:30 PM' },
    { id: '3', title: 'Contract Negotiation', attendees: ['Lisa Chen', 'David Wilson'], date: 'Mar 28, 1:00 PM' },
  ];
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Schedule Meeting</h1>
              <p className="text-muted-foreground">Set up meetings with your leads and clients.</p>
            </div>
            <Button onClick={scheduleMeeting}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Meeting Title</label>
                    <Input placeholder="Enter meeting title..." />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Time</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Duration</label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Meeting Type</label>
                      <Select defaultValue="video">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">
                            <div className="flex items-center">
                              <Video className="h-4 w-4 mr-2" />
                              Video Call
                            </div>
                          </SelectItem>
                          <SelectItem value="in-person">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              In Person
                            </div>
                          </SelectItem>
                          <SelectItem value="phone">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              Phone Call
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location/Link</label>
                    <Input placeholder="Enter meeting location or video link..." />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <Textarea 
                      placeholder="Enter meeting agenda and notes..." 
                      className="min-h-[100px]" 
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Attendees</label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                      {selectedLeads.length > 0 ? (
                        selectedLeads.map(leadId => {
                          const lead = leads.find(l => l.id === leadId);
                          return lead ? (
                            <Badge key={leadId} variant="secondary" className="flex items-center gap-1">
                              {lead.name}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => removeLead(leadId)} 
                              />
                            </Badge>
                          ) : null;
                        })
                      ) : (
                        <p className="text-sm text-muted-foreground">No attendees selected</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Tabs defaultValue="contacts">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contacts" className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Add Attendees</CardTitle>
                        <Input 
                          placeholder="Search..." 
                          className="max-w-[180px] h-8" 
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {leads.map(lead => (
                          <div 
                            key={lead.id} 
                            className={`flex justify-between p-3 hover:bg-muted cursor-pointer ${
                              selectedLeads.includes(lead.id) ? 'bg-primary/5 border-l-2 border-primary' : ''
                            }`}
                            onClick={() => addLead(lead.id)}
                          >
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <div className="bg-primary/10 text-primary text-xs">
                                  {lead.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{lead.name}</p>
                                <p className="text-xs text-muted-foreground">{lead.company}</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                addLead(lead.id);
                              }}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Upcoming Meetings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {upcomingMeetings.map(meeting => (
                          <div 
                            key={meeting.id} 
                            className="p-3 hover:bg-muted cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">{meeting.title}</p>
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {meeting.date}
                              </Badge>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Users className="h-3 w-3 mr-1" />
                              <span>
                                {meeting.attendees.join(', ')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="templates" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Meeting Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {meetingTemplates.map(template => (
                          <div 
                            key={template.id} 
                            className="flex justify-between p-3 hover:bg-muted cursor-pointer"
                          >
                            <div>
                              <p className="font-medium text-sm">{template.name}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{template.duration}</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Template Applied",
                                  description: `${template.name} template has been applied to the meeting.`,
                                });
                              }}
                            >
                              Use
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Create New Template
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle>My Calendar</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-3 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">March 2024</h4>
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 text-center gap-1">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-xs text-muted-foreground">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => (
                        <div 
                          key={i + 1} 
                          className={`text-xs py-1 ${
                            i + 1 === 21 ? 'bg-primary/10 text-primary rounded-full font-medium' : ''
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h4 className="font-medium text-sm mb-2">Today's Schedule</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-primary/5 rounded border border-primary/10 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-medium">Team Standup</span>
                          <span>9:00 AM</span>
                        </div>
                        <div className="mt-1 text-muted-foreground">
                          30 min • Video Call
                        </div>
                      </div>
                      <div className="p-2 bg-primary/5 rounded border border-primary/10 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-medium">Product Demo: Acme Corp</span>
                          <span>2:00 PM</span>
                        </div>
                        <div className="mt-1 text-muted-foreground">
                          45 min • Video Call
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default ScheduleMeeting;
