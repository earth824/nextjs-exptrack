'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function FilterToggle() {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Search</DialogTitle>
          <DialogDescription>Complete the form below to apply filters and refine your search.</DialogDescription>
        </DialogHeader>
        {/* <TransactionFilter /> */}
      </DialogContent>
    </Dialog>
  );
}
