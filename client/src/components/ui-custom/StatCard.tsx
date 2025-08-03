
import { ReactNode } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  HelpCircle,
  InfoIcon
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  tooltip?: string;
  loading?: boolean;
  className?: string;
  footer?: ReactNode;
  isCurrency?: boolean;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  change,
  tooltip,
  loading = false,
  className = '',
  footer,
  isCurrency = false
}: StatCardProps) => {
  // Format the value with Indian Rupee symbol if it's a currency
  const formattedValue = isCurrency 
    ? typeof value === 'number' 
      ? `₹${value.toLocaleString('en-IN')}`
      : `₹${value}`
    : value;

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-subtle ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {description && (
            <CardDescription className="text-xs">{description}</CardDescription>
          )}
        </div>
        {icon && (
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
        ) : (
          <div className="text-2xl font-bold">{formattedValue}</div>
        )}
        
        {change && (
          <div className="flex items-center mt-2 text-xs">
            <span 
              className={`flex items-center ${
                change.trend === 'up' 
                  ? 'text-success' 
                  : change.trend === 'down' 
                    ? 'text-destructive' 
                    : 'text-gray-500'
              }`}
            >
              {change.trend === 'up' ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : change.trend === 'down' ? (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              ) : null}
              {Math.abs(change.value)}%
            </span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">from last month</span>
          </div>
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default StatCard;
