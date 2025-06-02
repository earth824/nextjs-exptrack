'use client';

import DatePicker from '@/components/shared/date-picker';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transactionFormSchema } from '@/schemas/transaction.schema';
import { ActionResult } from '@/types/action-result.type';
import {
  SerializeTransactionWithCategory,
  TransactionFormInput,
  TransactionWithCategory
} from '@/types/transaction.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { useEffect } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

type CreateFormProps = {
  type: 'create';
  action: (data: TransactionFormInput) => Promise<ActionResult>;
};

type UpdateFormProps = {
  type: 'update';
  action: (id: string, data: TransactionFormInput) => Promise<ActionResult>;
  transaction: SerializeTransactionWithCategory;
};

type TransactionFormProps = {
  categoryMap: { expenses: Category[]; incomes: Category[] };
} & (CreateFormProps | UpdateFormProps);

export default function TransactionForm(props: TransactionFormProps) {
  const { categoryMap, action, type } = props;
  const { expenses, incomes } = categoryMap;
  const form = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: type === 'update' ? props.transaction.category.type : 'expense',
      payee: type === 'update' ? props.transaction.payee : '',
      amount: type === 'update' ? props.transaction.amount : '',
      date: type === 'update' ? props.transaction.date : new Date(),
      categoryId: type === 'update' ? props.transaction.categoryId : expenses[0].id
    }
  });

  const selectedType = useWatch({ control: form.control, name: 'type' });

  useEffect(() => {
    if (selectedType === 'expense') {
      form.setValue('categoryId', expenses[0].id);
    } else {
      form.setValue('categoryId', incomes[0].id);
    }
  }, [selectedType]);

  const categories = form.getValues('type') === 'expense' ? expenses : incomes;

  const onSubmit: SubmitHandler<TransactionFormInput> = async data => {
    if (type === 'create') {
      await action(data);
    } else {
      await action(props.transaction.id, data);
    }
  };

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-6 items-start" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-xs">Transaction Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-0">
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="expense" className="hidden" />
                    </FormControl>
                    <FormLabel>
                      <Button
                        asChild
                        variant={field.value === 'expense' ? 'default' : 'outline'}
                        className="w-24 rounded-r-none border-r-0 cursor-pointer"
                      >
                        <span>Expense</span>
                      </Button>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="income" className="hidden" />
                    </FormControl>
                    <FormLabel>
                      <Button
                        asChild
                        variant={field.value === 'income' ? 'default' : 'outline'}
                        className="w-24 rounded-l-none cursor-pointer"
                      >
                        <span>Income</span>
                      </Button>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Payee</FormLabel>
              <FormControl>
                <Input placeholder="Enter a payee" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Transaction Date</FormLabel>
              <DatePicker field={field} placeholder="Pick a transaction date" />
              <FormMessage className="text-xs" />
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
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter an amount" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex gap-6 justify-end">
          <Button variant="outline" asChild className="w-32">
            <Link href="/transaction">Cancel</Link>
          </Button>
          <Button className="w-32">{type === 'create' ? 'Create' : 'Update'}</Button>
        </div>
      </form>
    </Form>
  );
}
