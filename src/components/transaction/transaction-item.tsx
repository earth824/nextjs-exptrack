import TransactionItemAction from '@/components/transaction/transaction-item-action';

export default function TransactionItem() {
  return (
    <li className="flex justify-between items-center border not-last:border-b-0 p-3 border-l-6 bg-card border-l-green-600">
      <div className="flex gap-4 items-center">
        <img alt="category" width={48} height={48} />
        <div>
          <h2 className="font-semibold">Payee</h2>
          <span className="text-xs text-muted-foreground">Date</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-green-600">&#3647; 100</span>
        <TransactionItemAction />
      </div>
    </li>
  );
}
