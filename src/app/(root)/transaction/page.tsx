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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

export default function TransactionPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-full">
          <span className="text-sm">Rows per page</span>
          <Select defaultValue="5">
            <SelectTrigger className="w-18">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      {/* <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <FilePlus2 className="w-16 h-16" />
        <h2 className="text-xl font-medium text-center">
          You haven&apos;t made any transactions or no transactions found with your current filter settings.
        </h2>
        <span className="text-muted-foreground">Add a new transaction or modify your filters to see more results.</span>
        <Button variant="outline">Add Transaction</Button>
      </div> */}

      <TransactionList />
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-sm">1 to 10 of 50 transactions</span>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">...</PaginationLink>
              </PaginationItem>
              <PaginationNext href="#" />
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
