import TransactionPagination from '@/components/transaction/pagination';
import TransactionItem from '@/components/transaction/transaction-item';
import { Button } from '@/components/ui/button';
import { getTotalTransactions, getTransactions } from '@/lib/datas/transaction.data';
import { FilePlus2 } from 'lucide-react';
import Link from 'next/link';

type TransactionListProps = {
  query?: Partial<Record<string, string | undefined>>;
};

export default async function TransactionList({ query }: TransactionListProps) {
  const [transactions, total] = await Promise.all([getTransactions(query), getTotalTransactions(query)]);

  if (transactions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <FilePlus2 className="w-24 h-24" />
        <h2 className="text-xl font-medium text-center">
          You haven&apos;t made any transactions or no transactions found with your current filter settings.
        </h2>
        <span className="text-muted-foreground">Add a new transaction or modify your filters to see more results.</span>
        <Button variant="outline" asChild>
          <Link href="/transaction/create">Add Transaction</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ul>
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      <TransactionPagination total={total} />
    </>
  );
}
