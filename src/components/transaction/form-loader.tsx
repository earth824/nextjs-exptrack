import TransactionForm from '@/components/transaction/form';
import { createTransaction, updateTransaction } from '@/lib/actions/transaction.action';
import { getCategoriesMapByType } from '@/lib/datas/category.data';
import { getTransactionById } from '@/lib/datas/transaction.data';
import { notFound } from 'next/navigation';

type CreateTransactionFormLoaderProps = {
  type: 'create';
  transactionId?: string;
};

type EditTransactionFormProps = {
  type: 'edit';
  transactionId: string;
};

type TransactionFormLoaderProps = CreateTransactionFormLoaderProps | EditTransactionFormProps;

export default async function TransactionFormLoader({ type, transactionId }: TransactionFormLoaderProps) {
  const [categoriesMap, transaction] = await Promise.all([
    getCategoriesMapByType(),
    transactionId ? getTransactionById(transactionId) : null
  ]);

  if (type === 'create') {
    return (
      <TransactionForm
        type={type}
        categoriesMap={categoriesMap}
        action={createTransaction}
        transaction={transaction ?? undefined}
      />
    );
  }

  if (!transaction) {
    notFound();
  }

  return (
    <TransactionForm categoriesMap={categoriesMap} type={type} transaction={transaction} action={updateTransaction} />
  );
}
