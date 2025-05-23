import TransactionFilter from '@/components/transaction/filter';
import TransactionList from '@/components/transaction/transaction-list';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Plus, Search } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transaction'
};

export default function TransactionPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <div className="flex justify-end items-center">
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Search />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">Search</DialogTitle>
                <DialogDescription>Complete the form below to apply filters and refine your search.</DialogDescription>
              </DialogHeader>
              <TransactionFilter />
            </DialogContent>
          </Dialog>

          <Button variant="outline" asChild>
            <Link href="/transaction/create">
              <Plus />
            </Link>
          </Button>
        </div>
      </div>
      <TransactionList />
    </div>
  );
}
