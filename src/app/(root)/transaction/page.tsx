import TransactionList from '@/components/transaction/transaction-list';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transaction'
};

export default async function TransactionPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      {/* <TransactionList /> */}
    </div>
  );
}
