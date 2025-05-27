import FilterToggle from '@/components/transaction/filter-toggle';
import { TransactionListSkeleton } from '@/components/transaction/skeleton';
import TransactionList from '@/components/transaction/transaction-list';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/lib/datas/category.data';

import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Transaction'
};

type TransactionPageProps = {
  searchParams?: Promise<Partial<Record<string, string | undefined>>>;
};

export default async function TransactionPage(props: TransactionPageProps) {
  const searchParams = await props.searchParams;
  const categoriesPromise = getCategories();

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <div className="flex justify-end items-center">
        <div className="flex gap-2">
          <FilterToggle categoriesPromise={categoriesPromise} />
          <Button variant="outline" asChild>
            <Link href="/transaction/create">
              <Plus />
            </Link>
          </Button>
        </div>
      </div>
      <Suspense key={`${Math.random()}`} fallback={<TransactionListSkeleton />}>
        <TransactionList query={searchParams} />
      </Suspense>
    </div>
  );
}
