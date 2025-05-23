'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { deleteTransaction } from '@/lib/actions/transaction.action';
import { EllipsisVertical, Loader } from 'lucide-react';
import Link from 'next/link';
import { FormEventHandler, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function TransactionItemAction({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    startTransition(async () => {
      const { success, message } = await deleteTransaction(id);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      setOpen(false);
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>
          <Link href={`/transaction/create?id=${id}`} className="w-full">
            Duplicate
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/transaction/${id}/edit`} className="w-full">
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <form onSubmit={handleSubmit} className="w-full">
            <Button className="h-auto p-0 has-[>svg]:px-0 w-full justify-start" variant="ghost" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
