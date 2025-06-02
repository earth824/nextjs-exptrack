import TransactionFormLoader from '@/components/transaction/form-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createTransaction } from '@/lib/actions/transaction.action';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Transaction'
};

export default async function CreateTransactionPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create transaction</CardTitle>
          <CardDescription>Fill out the form to create a new transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionFormLoader />
        </CardContent>
      </Card>
    </div>
  );
}
