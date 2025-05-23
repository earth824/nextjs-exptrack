import TransactionForm from '@/components/transaction/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createTransaction } from '@/lib/actions/transaction.action';
import { getCategoriesMapByType } from '@/lib/datas/category.data';

export default async function CreateTransactionPage() {
  const categoriesMap = getCategoriesMapByType();

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create transaction</CardTitle>
          <CardDescription>Fill out the form to create a new transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm categoriesMap={categoriesMap} type="create" action={createTransaction} />
        </CardContent>
      </Card>
    </div>
  );
}
