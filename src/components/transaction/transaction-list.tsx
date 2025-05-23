import TransactionItem from '@/components/transaction/transaction-item';
import { Button } from '@/components/ui/button';
import { getTransactions } from '@/lib/datas/transaction.data';
import { FilePlus2 } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default async function TransactionList() {
  const transactions = await getTransactions();

  if (transactions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <FilePlus2 className="w-24 h-24" />
        <h2 className="text-xl font-medium text-center">
          You haven&apos;t made any transactions or no transactions found with your current filter settings.
        </h2>
        <span className="text-muted-foreground">Add a new transaction or modify your filters to see more results.</span>
        <Button variant="outline" asChild>
          <Link href="/transaction/create">Add Transaction</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ul>
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      <div className="flex justify-between items-center pb-4">
        <span className="text-muted-foreground text-sm">1 to 10 of 50 transactions</span>
        <div className="flex items-center gap-2">
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
    </>
  );
}
