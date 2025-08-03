
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, UserPlus, Clock, Calendar, List, CheckCircle, XCircle, Play, Pause, Mic, MicOff } from 'lucide-react';
import PageLayout from '@/components/ui-custom/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { toast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CallLead = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedLead, setSelectedLead] = useState<{id: string, name: string, company: string, phone: string} | null>(null);
  
  const startCall = () => {
    if (selectedLead) {
      setIsCallActive(true);
      toast({
        title: "Call Started",
        description: `Connected to ${selectedLead.name}`,
      });
    } else {
      toast({
        title: "No Lead Selected",
        description: "Please select a lead to call",
        variant: "destructive",
      });
    }
  };
  
  const endCall = () => {
    setIsCallActive(false);
    toast({
      title: "Call Ended",
      description: `Call with ${selectedLead?.name} has ended.`,
    });
  };
  
  // Sample leads
  const leads = [
    { id: '1', name: 'John Smith', company: 'Acme Corp', phone: '(555) 123-4567', lastContact: '2 days ago' },
    { id: '2', name: 'Sarah Johnson', company: 'Tech Solutions Inc', phone: '(555) 987-6543', lastContact: '1 week ago' },
    { id: '3', name: 'Michael Brown', company: 'Global Services', phone: '(555) 456-7890', lastContact: '3 days ago' },
    { id: '4', name: 'Lisa Chen', company: 'Innovative Tech', phone: '(555) 789-0123', lastContact: 'Today' },
    { id: '5', name: 'David Wilson', company: 'First Capital', phone: '(555) 234-5678', lastContact: 'Yesterday' },
  ];
  
  // Recent calls
  const recentCalls = [
    { id: '1', name: 'Lisa Chen', company: 'Innovative Tech', status: 'Completed', duration: '12:45', date: 'Today, 10:30 AM' },
    { id: '2', name: 'David Wilson', company: 'First Capital', status: 'Missed', duration: '0:00', date: 'Yesterday, 2:15 PM' },
    { id: '3', name: 'John Smith', company: 'Acme Corp', status: 'Completed', duration: '8:22', date: 'Mar 15, 2024' },
    { id: '4', name: 'Sarah Johnson', company: 'Tech Solutions Inc', status: 'Completed', duration: '15:07', date: 'Mar 14, 2024' },
  ];
  
  // Call scripts
  const callScripts = [
    { id: '1', title: 'Initial Outreach', description: 'For first contact with new leads' },
    { id: '2', title: 'Follow-up Call', description: 'After sending a proposal' },
    { id: '3', title: 'Qualification Script', description: 'Determine lead fit and needs' },
    { id: '4', title: 'Demo Scheduling', description: 'Book a product demonstration' },
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
              <h1 className="text-2xl font-bold tracking-tight">Call Lead</h1>
              <p className="text-muted-foreground">Connect with your leads and customers via phone.</p>
            </div>
            {selectedLead && (
              <Badge variant="outline" className="px-3 py-1">
                <Phone className="mr-2 h-4 w-4 text-primary" />
                Selected: {selectedLead.name}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className={isCallActive ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>Call Center</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  {selectedLead ? (
                    <div className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary">
                        <div className="text-3xl font-semibold text-primary">
                          {selectedLead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </Avatar>
                      <h3 className="text-xl font-medium">{selectedLead.name}</h3>
                      <p className="text-muted-foreground mb-2">{selectedLead.company}</p>
                      <p className="text-lg font-medium mb-6">{selectedLead.phone}</p>
                      
                      {isCallActive ? (
                        <div className="space-y-6">
                          <div className="text-center">
                            <p className="text-2xl font-mono">00:00:{callDuration.toString().padStart(2, '0')}</p>
                            <p className="text-sm text-muted-foreground">Call in progress</p>
                          </div>
                          <div className="flex justify-center gap-4">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-12 w-12 rounded-full"
                              onClick={() => setIsMuted(!isMuted)}
                            >
                              {isMuted ? (
                                <MicOff className="h-6 w-6 text-destructive" />
                              ) : (
                                <Mic className="h-6 w-6" />
                              )}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-12 w-12 rounded-full"
                              onClick={endCall}
                            >
                              <Phone className="h-6 w-6 rotate-135" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          size="lg" 
                          className="rounded-full px-8"
                          onClick={startCall}
                        >
                          <Phone className="mr-2 h-5 w-5" />
                          Start Call
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Lead Selected</h3>
                      <p className="text-muted-foreground mb-6">Select a lead from the list to start a call.</p>
                    </div>
                  )}
                </CardContent>
                {isCallActive && (
                  <CardFooter className="flex-col gap-4">
                    <div className="w-full">
                      <h4 className="text-sm font-medium mb-2">Call Notes</h4>
                      <Textarea 
                        placeholder="Take notes during your call..." 
                        className="min-h-[100px]" 
                      />
                    </div>
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Follow-up
                      </Button>
                      <Button variant="outline" size="sm">
                        <List className="mr-2 h-4 w-4" />
                        Create Task
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
              
              {!isCallActive && (
                <Card>
                  <CardHeader>
                    <CardTitle>Call Preparation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Call Objective</h4>
                      <Input placeholder="What's the purpose of this call?" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Talking Points</h4>
                      <Textarea 
                        placeholder="Enter the main points you want to discuss..." 
                        className="min-h-[100px]" 
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="space-y-6">
              <Tabs defaultValue="leads">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="scripts">Scripts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="leads" className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Contact List</CardTitle>
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
                              selectedLead?.id === lead.id ? 'bg-primary/5 border-l-2 border-primary' : ''
                            }`}
                            onClick={() => setSelectedLead(lead)}
                          >
                            <div>
                              <p className="font-medium text-sm">{lead.name}</p>
                              <p className="text-xs text-muted-foreground">{lead.company}</p>
                              <p className="text-xs">{lead.phone}</p>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recent" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Calls</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {recentCalls.map(call => (
                          <div 
                            key={call.id} 
                            className="flex justify-between p-3 hover:bg-muted cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{call.name}</p>
                                {call.status === 'Completed' ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {call.status}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    {call.status}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{call.company}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{call.date}</span>
                                <span className="mx-1">•</span>
                                <span>{call.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="scripts" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Call Scripts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {callScripts.map(script => (
                          <div 
                            key={script.id} 
                            className="flex justify-between p-3 hover:bg-muted cursor-pointer"
                          >
                            <div>
                              <p className="font-medium text-sm">{script.title}</p>
                              <p className="text-xs text-muted-foreground">{script.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" size="sm">
                        Create New Script
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default CallLead;
