'use client';

import DatePicker from '@/components/shared/date-picker';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { filterTransactionSchema } from '@/schemas/transaction.schema';
import { Category, FilterTransactionFormInput } from '@/types/transaction.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type TransactionFilterProps = {
  close: () => void;
  categories: Category[];
};

export default function TransactionFilter({ close, categories }: TransactionFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialType = searchParams.get('type');
  const initialDateGte = searchParams.get('date_gte');
  const initialDateLte = searchParams.get('date_lte');
  const initialSort = searchParams.get('sort');
  const initialOrder = searchParams.get('order');

  const form = useForm<FilterTransactionFormInput>({
    resolver: zodResolver(filterTransactionSchema),
    defaultValues: {
      search: searchParams.get('search') ?? '',
      type: initialType === 'income' || initialType === 'expense' ? initialType : 'all',
      category: searchParams.get('category') ?? 'all',
      date_gte: initialDateGte ? new Date(initialDateGte) : null,
      date_lte: initialDateLte ? new Date(initialDateLte) : null,
      sort: initialSort === 'amount' || initialSort === 'date' || initialSort === 'payee' ? initialSort : 'default',
      order: initialOrder === 'asc' || initialOrder === 'desc' ? initialOrder : 'default'
    }
  });

  const onSubmit: SubmitHandler<FilterTransactionFormInput> = data => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (data.search) {
      newSearchParams.set('search', data.search);
    } else {
      newSearchParams.delete('search');
    }

    if (data.type !== 'all') {
      newSearchParams.set('type', data.type);
    } else {
      newSearchParams.delete('type');
    }

    if (data.category !== 'all') {
      newSearchParams.set('category', data.category);
    } else {
      newSearchParams.delete('category');
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

    if (data.sort !== 'default') {
      newSearchParams.set('sort', data.sort);
      if (data.order === 'desc') {
        newSearchParams.set('order', 'desc');
      } else {
        newSearchParams.delete('order');
      }
    } else {
      newSearchParams.delete('sort');
      newSearchParams.delete('order');
    }

    newSearchParams.delete('page');

    close();
    router.replace(`/transaction?${newSearchParams.toString()}`);
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
          name="category"
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

        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Sort By</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select sort by" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="payee">Payee</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem className="items-end">
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
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
        />

        <div className="col-span-2 flex justify-between items-center">
          <Button>Search</Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              form.reset({
                category: 'all',
                type: 'all',
                search: '',
                date_gte: null,
                date_lte: null,
                sort: 'default',
                order: 'default'
              });
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
