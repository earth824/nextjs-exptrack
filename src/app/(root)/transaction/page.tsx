import { TransactionListSkeleton } from '@/components/transaction/skeleton';
import TransactionList from '@/components/transaction/transaction-list';

import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Transaction'
};

type TransactionPageProps = {
  searchParams?: Promise<Partial<Record<string, string | undefined>>>;
};

export default async function TransactionPage(props: TransactionPageProps) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <Suspense key={`${Math.random()}`} fallback={<TransactionListSkeleton />}>
        <TransactionList query={searchParams} />
      </Suspense>
    </div>
  );
}
