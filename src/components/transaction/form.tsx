'use client';

import DatePicker from '@/components/shared/date-picker';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transactionFormSchema } from '@/schemas/transaction.schema';
import { ActionResult } from '@/types/action-result.type';
import { Category, SerializeTransactionWithCategory, TransactionFormInput } from '@/types/transaction.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

type CreateTransactionFormProps = {
  type: 'create';
  transaction?: SerializeTransactionWithCategory;
  action: (data: TransactionFormInput) => Promise<ActionResult>;
};

type EditTransactionFormProps = {
  type: 'edit';
  transaction: SerializeTransactionWithCategory;
  action: (id: string, data: TransactionFormInput) => Promise<ActionResult>;
};

type TransactionFormProps = {
  categoriesMap: { expenses: Category[]; incomes: Category[] };
} & (CreateTransactionFormProps | EditTransactionFormProps);

export default function TransactionForm({ categoriesMap, type, action, transaction }: TransactionFormProps) {
  const { expenses, incomes } = categoriesMap;

  const form = useForm<TransactionFormInput>({
    defaultValues: {
      type: transaction?.category.type ?? 'expense',
      amount: transaction?.amount ?? '',
      date: transaction?.date ?? new Date(),
      payee: transaction?.payee ?? '',
      categoryId: transaction?.categoryId ?? expenses[0].id
    },
    resolver: zodResolver(transactionFormSchema)
  });
  const selectedType = useWatch({ control: form.control, name: 'type' });
  const [isPending, startTransition] = useTransition();

  const categories = form.getValues('type') === 'expense' ? expenses : incomes;

  useEffect(() => {
    if (selectedType === 'expense') {
      form.setValue('categoryId', transaction?.category.type === 'expense' ? transaction.categoryId : expenses[0].id);
    } else {
      form.setValue('categoryId', transaction?.category.type === 'income' ? transaction.categoryId : incomes[0].id);
    }
  }, [selectedType, expenses, incomes, form, transaction?.category.type, transaction?.categoryId]);

  const onSubmit: SubmitHandler<TransactionFormInput> = data => {
    startTransition(async () => {
      const res = type === 'create' ? await action(data) : await action(transaction.id, data);
      if (!res.success) {
        toast.error(res.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 items-start">
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
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
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
          <Button disabled={isPending} className="w-32">
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                {type === 'create' ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              <>{type === 'create' ? 'Create' : 'Update'}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
