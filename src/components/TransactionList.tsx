
import { Transaction } from "../utils/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

export const TransactionList = ({ transactions, limit }: TransactionListProps) => {
  const displayTransactions = limit 
    ? transactions.slice(0, limit) 
    : transactions;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const formatAmount = (amount: number, type: string) => {
    return `${type === 'withdrawal' ? '-' : type === 'deposit' ? '+' : ''} $${amount.toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'deposit':
        return 'text-green-600 dark:text-green-400';
      case 'withdrawal':
        return 'text-red-600 dark:text-red-400';
      case 'return':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayTransactions.length > 0 ? (
            displayTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="capitalize">
                  <span className={getTypeColor(transaction.type)}>
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell className={getTypeColor(transaction.type)}>
                  {formatAmount(transaction.amount, transaction.type)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
