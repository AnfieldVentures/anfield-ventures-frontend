
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays, differenceInWeeks } from "date-fns";

export const InvestmentCard = ({ investment }) => {
  const startDate = new Date(investment.startDate);
  const currentDate = new Date();
  
  const formatDate = (date) => {
    return format(date, 'MMM dd, yyyy');
  };
  
  const calculateProgress = () => {
    if (investment.plan === 'daily') {
      // Assuming daily plans run for 30 days
      const daysPassed = differenceInDays(currentDate, startDate);
      return Math.min(100, (daysPassed / 30) * 100);
    } else {
      // Assuming weekly plans run for 12 weeks
      const weeksPassed = differenceInWeeks(currentDate, startDate);
      return Math.min(100, (weeksPassed / 12) * 100);
    }
  };
  
  const calculateExpectedReturn = () => {
    if (investment.plan === 'daily') {
      const dailyReturn = investment.amount * (investment.returnRate / 100);
      return dailyReturn * 30; // 30 days total
    } else {
      const weeklyReturn = investment.amount * (investment.returnRate / 100);
      return weeklyReturn * 12; // 12 weeks total
    }
  };
  
  const calculateCurrentReturn = () => {
    if (investment.plan === 'daily') {
      const daysPassed = differenceInDays(currentDate, startDate);
      const dailyReturn = investment.amount * (investment.returnRate / 100);
      return dailyReturn * daysPassed;
    } else {
      const weeksPassed = differenceInWeeks(currentDate, startDate);
      const weeklyReturn = investment.amount * (investment.returnRate / 100);
      return weeklyReturn * weeksPassed;
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg capitalize">
            {investment.plan} Investment
          </CardTitle>
          <Badge variant="outline" className={getStatusColor(investment.status)}>
            {investment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Principal Amount</span>
              <span className="font-semibold">${investment.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Return Rate</span>
              <span className="font-semibold">{investment.returnRate}% {investment.plan === 'daily' ? 'daily' : 'weekly'}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Start Date</span>
              <span className="font-semibold">{formatDate(startDate)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Expected Return</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                +${calculateExpectedReturn().toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{calculateProgress().toFixed(0)}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
          
          <div className="bg-muted p-3 rounded-md">
            <div className="flex justify-between text-sm">
              <span>Current Return</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                +${calculateCurrentReturn().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
