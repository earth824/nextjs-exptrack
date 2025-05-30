'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TransactionPagination() {
  return (
    <div className="flex justify-between items-center pb-4">
      <span className="text-muted-foreground text-sm">transactions</span>
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-2 justify-end w-full">
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
        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="pointer-events-none opacity-25" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#"></PaginationLink>
            </PaginationItem>
            <PaginationNext href="#" />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function generatePagination(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 2) return [1, 2, 3, '...'];
  if (currentPage >= totalPages - 1) return ['...', totalPages - 2, totalPages - 1, totalPages];
  return ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
}
