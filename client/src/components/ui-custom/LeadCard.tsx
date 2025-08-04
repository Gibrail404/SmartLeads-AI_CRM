
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Mail,
  Phone,
  MoreHorizontal,
  Clock,
  Zap
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  aiScore: number;
  lastContact?: string;
  value?: number;
  assignedTo?: {
    name: string;
    avatar?: string;
  };
}

interface LeadCardProps {
  lead: LeadData;
  onUpdate?: (lead: LeadData) => void;
}

const LeadCard = ({ lead, onUpdate }: LeadCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500';
      case 'Contacted': return 'bg-purple-500';
      case 'Qualified': return 'bg-cyan-500';
      case 'Proposal': return 'bg-amber-500';
      case 'Negotiation': return 'bg-orange-500';
      case 'Won': return 'bg-green-500';
      case 'Lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className={`${getStatusColor(lead.status)} text-white px-2 py-0.5 text-xs font-medium rounded-full`}>
              {lead.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Lead Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <Link to="/lead-actions/send-email">
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Send Email</span>
                  </DropdownMenuItem>
                </Link>

                <Link to="/lead-actions/call-lead">
                  <DropdownMenuItem>
                    <Phone className="mr-2 h-4 w-4" />
                    <span>Call Lead</span>
                  </DropdownMenuItem>
                </Link>

                <Link to="/lead-actions/schedule-meeting">
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Schedule Meeting</span>
                  </DropdownMenuItem>
                </Link>


                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Lead</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="text-lg font-semibold mt-2">{lead.name}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">{lead.company}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{lead.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{lead.phone}</span>
            </div>
            {lead.lastContact && (
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Last contact: {lead.lastContact}</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium">AI Score</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(lead.aiScore)}`}>{lead.aiScore}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(lead.aiScore)} transition-all duration-300`}
                style={{ width: `${lead.aiScore}%` }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          {lead.assignedTo ? (
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <div className="bg-primary text-primary-foreground text-xs">
                  {lead.assignedTo.name.split(' ').map(n => n[0]).join('')}
                </div>
              </Avatar>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Assigned to {lead.assignedTo.name}
              </span>
            </div>
          ) : (
            <Button size="sm" variant="outline" className="text-xs h-8">
              Assign Lead
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LeadCard;
