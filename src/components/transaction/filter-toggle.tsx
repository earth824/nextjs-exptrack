'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import TransactionFilter from '@/components/transaction/filter';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { use, useState } from 'react';
import { Category } from '@/types/transaction.type';

type FilterToggleProps = {
  categoriesPromise: Promise<Category[]>;
};

export default function FilterToggle({ categoriesPromise }: FilterToggleProps) {
  const [open, setOpen] = useState(false);
  const categories = use(categoriesPromise);
  console.log(open);
  const close = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <TransactionFilter close={close} categories={categories} />
      </DialogContent>
    </Dialog>
  );
}
