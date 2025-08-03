
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { LeadData } from './LeadCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the stages for our Kanban board
const stages = [
  { id: 'new', name: 'New Leads', color: 'bg-blue-500' },
  { id: 'contacted', name: 'Contacted', color: 'bg-purple-500' },
  { id: 'qualified', name: 'Qualified', color: 'bg-cyan-500' },
  { id: 'proposal', name: 'Proposal', color: 'bg-amber-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500' },
  { id: 'closed', name: 'Closed', color: 'bg-green-500' },
];

interface SalesKanbanProps {
  leads: LeadData[];
  onLeadMove?: (leadId: string, stage: string) => void;
}

const SalesKanban = ({ leads, onLeadMove }: SalesKanbanProps) => {
  const isMobile = useIsMobile();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Group leads by their status
  const leadsByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = leads.filter(lead => {
      // Map the lead status to the stage
      const status = lead.status.toLowerCase();
      if (status === 'won' || status === 'lost') return stage.id === 'closed';
      if (status === 'new') return stage.id === 'new';
      if (status === 'contacted') return stage.id === 'contacted';
      if (status === 'qualified') return stage.id === 'qualified';
      if (status === 'proposal') return stage.id === 'proposal';
      if (status === 'negotiation') return stage.id === 'negotiation';
      return false;
    });
    return acc;
  }, {} as Record<string, LeadData[]>);

  const handlePrevStage = () => {
    setActiveStageIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextStage = () => {
    setActiveStageIndex(prev => Math.min(stages.length - 1, prev + 1));
  };

  return (
    <div className="w-full">
      {isMobile ? (
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={handlePrevStage} 
              disabled={activeStageIndex === 0}
              className="rounded-full h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${stages[activeStageIndex].color}`}></span>
              <span className="font-medium">{stages[activeStageIndex].name}</span>
            </div>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={handleNextStage} 
              disabled={activeStageIndex === stages.length - 1}
              className="rounded-full h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <motion.div
            key={stages[activeStageIndex].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            <Card className="h-full border-t-4" style={{ borderTopColor: stages[activeStageIndex].color.replace('bg-', '') }}>
              <CardHeader className="px-3 py-3 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">{stages[activeStageIndex].name}</CardTitle>
                  <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
                    {leadsByStage[stages[activeStageIndex].id]?.length || 0}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-3 min-h-[300px]">
                <div className="space-y-3">
                  {leadsByStage[stages[activeStageIndex].id]?.length ? (
                    leadsByStage[stages[activeStageIndex].id].map(lead => (
                      <div 
                        key={lead.id}
                        className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
                      >
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.company}</div>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                            AI Score: {lead.aiScore}%
                          </div>
                          <div className="text-xs font-medium">
                            ₹{lead.value.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-10 text-center text-gray-500 dark:text-gray-400">
                      <PlusCircle className="h-8 w-8 mb-2 opacity-50" />
                      <p className="text-sm">No leads in this stage</p>
                      <Button size="sm" variant="outline" className="mt-3">
                        Add Lead
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {stages.map((stage) => (
            <div key={stage.id} className="h-full">
              <Card className="h-full border-t-4" style={{ borderTopColor: stage.color.replace('bg-', '') }}>
                <CardHeader className="px-3 py-3 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                    <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
                      {leadsByStage[stage.id]?.length || 0}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-3 min-h-[400px] max-h-[60vh] overflow-y-auto scrollbar-hide">
                  <div className="space-y-3">
                    {leadsByStage[stage.id]?.length ? (
                      leadsByStage[stage.id].map(lead => (
                        <motion.div 
                          key={lead.id}
                          whileHover={{ y: -2 }}
                          className="p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
                        >
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.company}</div>
                          <div className="mt-2 flex justify-between items-center">
                            <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                              AI Score: {lead.aiScore}%
                            </div>
                            <div className="text-xs font-medium">
                              ₹{lead.value.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-10 text-center text-gray-500 dark:text-gray-400">
                        <PlusCircle className="h-8 w-8 mb-2 opacity-50" />
                        <p className="text-sm">No leads here</p>
                        <Button size="sm" variant="ghost" className="mt-3">
                          Add Lead
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesKanban;
