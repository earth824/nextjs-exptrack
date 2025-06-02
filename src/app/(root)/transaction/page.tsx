import { TransactionListSkeleton } from '@/components/transaction/skeleton';
import TransactionList from '@/components/transaction/transaction-list';

import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Transaction'
};

export default async function TransactionPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <Suspense fallback={<TransactionListSkeleton />}>
        <TransactionList />
      </Suspense>
    </div>
  );
}
