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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TransactionPagination({}: { total: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeRowPerPage = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === '5') {
      newSearchParams.delete('limit');
    } else {
      newSearchParams.set('limit', value);
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 w-full">
        <span className="text-sm">Rows per page</span>
        <Select defaultValue="5" onValueChange={handleChangeRowPerPage}>
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
  );
}
