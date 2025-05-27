import { Skeleton } from '@/components/ui/skeleton';

export function TransactionListSkeleton() {
  return (
    <>
      <ul>
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </ul>
      <PaginationSkeleton />
    </>
  );
}

export function TransactionItemSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center p-3 border border-accent/55 not-last:border-b-0">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Skeleton className="h-6 w-30" />
          <Skeleton className="h-9 w-10" />
        </div>
      </div>
    </>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex justify-between items-center pb-4">
      <Skeleton className="h-5 w-44" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-70" />
      </div>
    </div>
  );
}
