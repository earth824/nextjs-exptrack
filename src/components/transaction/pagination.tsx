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
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TransactionPagination({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('limit')) || 5;
  const totalPages = Math.ceil(total / perPage);
  const allPages = generatePagination(currentPage, totalPages);

  const handleChangeRowPerPage = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === '5') {
      newSearchParams.delete('limit');
    } else {
      newSearchParams.set('limit', value);
    }
    newSearchParams.delete('page');
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const createNextUrl = (pageNumber: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (pageNumber <= 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', `${pageNumber}`);
    }

    return `${pathname}?${newSearchParams.toString()}`;
  };

  return (
    <div className="flex justify-between items-center pb-4">
      <span className="text-muted-foreground text-sm">
        {(currentPage - 1) * perPage + 1} to {currentPage === totalPages ? total : currentPage * perPage} of {total}{' '}
        transactions
      </span>
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-2 justify-end w-full">
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
        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createNextUrl(currentPage - 1)}
                className={cn(currentPage === 1 && 'pointer-events-none opacity-25')}
              />
            </PaginationItem>
            {allPages.map((el, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={createNextUrl(el === '...' ? (i === 0 ? currentPage - 2 : currentPage + 2) : el)}
                  isActive={currentPage === el}
                  className={cn(currentPage === el && 'pointer-events-none')}
                >
                  {el}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              href={createNextUrl(currentPage + 1)}
              className={cn(currentPage === totalPages && 'pointer-events-none opacity-25')}
            />
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
