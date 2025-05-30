import TransactionPagination from '@/components/transaction/pagination';
import TransactionItem from '@/components/transaction/transaction-item';
import { Button } from '@/components/ui/button';
import { FilePlus2 } from 'lucide-react';
import Link from 'next/link';

export default async function TransactionList() {
  if (false) {
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
        <TransactionItem />
      </ul>
      <TransactionPagination />
    </>
  );
}
