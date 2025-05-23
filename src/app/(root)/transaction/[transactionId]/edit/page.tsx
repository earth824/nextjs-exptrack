import TransactionFormLoader from '@/components/transaction/form-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Transaction'
};

type EditTransactionPageProps = {
  params: Promise<{ transactionId: string }>;
};

export default async function EditTransactionPage({ params }: EditTransactionPageProps) {
  const { transactionId } = await params;

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl text-muted-foreground">Transaction</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit transaction</CardTitle>
          <CardDescription>Fill out the form to update your transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionFormLoader transactionId={transactionId} type="edit" />
        </CardContent>
      </Card>
    </div>
  );
}
