'use client';

import DatePicker from '@/components/shared/date-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { filterTransactionSchema } from '@/schemas/transaction.schema';
import { Category, FilterTransactionFormInput } from '@/types/transaction.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type TransactionFilterProps = {
  close: () => void;
  categories: Category[];
};

export default function TransactionFilter({ close, categories }: TransactionFilterProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialType = (searchParams.get('type') as 'expense' | 'income') ?? 'all';
  const date_gte = searchParams.get('date_gte');
  const initialDate_gte = date_gte ? new Date(date_gte) : null;
  const date_lte = searchParams.get('date_lte');
  const initialDate_lte = date_lte ? new Date(date_lte) : null;

  const form = useForm<FilterTransactionFormInput>({
    resolver: zodResolver(filterTransactionSchema),
    defaultValues: {
      search: searchParams.get('search') ?? '',
      type: initialType,
      categoryId: searchParams.get('categoryId') ?? 'all',
      date_gte: initialDate_gte,
      date_lte: initialDate_lte
    }
  });

  const onSubmit: SubmitHandler<FilterTransactionFormInput> = data => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (data.search) {
      newSearchParams.set('search', data.search);
    } else {
      newSearchParams.delete('search');
    }

    if (data.type && data.type !== 'all') {
      newSearchParams.set('type', data.type);
    } else {
      newSearchParams.delete('type');
    }

    if (data.categoryId && data.categoryId !== 'all') {
      newSearchParams.set('categoryId', data.categoryId);
    } else {
      newSearchParams.delete('categoryId');
    }

    if (data.date_gte) {
      newSearchParams.set('date_gte', format(data.date_gte, 'yyyy-MM-dd'));
    } else {
      newSearchParams.delete('date_gte');
    }

    if (data.date_lte) {
      newSearchParams.set('date_lte', format(data.date_lte, 'yyyy-MM-dd'));
    } else {
      newSearchParams.delete('date_lte');
    }

    close();
    setTimeout(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }, 0);
  };

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-xs">Search</FormLabel>
              <FormControl>
                <Input placeholder="Enter your search term" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_gte"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Date</FormLabel>
              <DatePicker field={field} placeholder="Pick a start date" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_lte"
          render={({ field }) => (
            <FormItem className="items-end">
              <DatePicker field={field} placeholder="Pick an end date" />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="amount_min"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter min amount" {...field} />
              </FormControl>
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="amount_max"
          render={({ field }) => (
            <FormItem className="items-end">
              <FormControl>
                <Input placeholder="Enter max amount" {...field} />
              </FormControl>
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Order By</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select order by" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="direction"
          render={({ field }) => (
            <FormItem className="items-end">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select order direction" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="asc">Asc</SelectItem>
                  <SelectItem value="desc">Desc</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        /> */}

        <div className="col-span-2 flex justify-between items-center">
          <Button>Search</Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              form.reset({ categoryId: 'all', type: 'all', search: '', date_gte: null, date_lte: null });
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
