'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TransactionItemAction() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>
          <Link href="" className="w-full">
            Duplicate
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="" className="w-full">
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <Button className="h-auto p-0 has-[>svg]:px-0 w-full justify-start" variant="ghost">
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
