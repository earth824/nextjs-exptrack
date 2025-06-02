import TransactionForm from '@/components/transaction/form';
import { createTransaction, updateTransaction } from '@/lib/actions/transaction.action';
import { getCategoriesMapByType } from '@/lib/datas/category.data';
import { getTransactionById } from '@/lib/datas/transaction.data';

export default async function TransactionFormLoader({ id }: { id?: string }) {
  const [categoryMap, transaction] = await Promise.all([getCategoriesMapByType(), id ? getTransactionById(id) : null]);

  if (transaction)
    return (
      <TransactionForm categoryMap={categoryMap} type="update" action={updateTransaction} transaction={transaction} />
    );
  return <TransactionForm categoryMap={categoryMap} type="create" action={createTransaction} />;
}
