import TransactionItem from '@/components/transaction/transaction-item';
import { getTransactions } from '@/lib/datas/transaction.data';

export default async function TransactionList() {
  const transactions = await getTransactions();
  return (
    <ul>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}
