import TransactionItemAction from '@/components/transaction/transaction-item-action';
import { formatDecimalWithComma } from '@/lib/utils';
import { TransactionWithCategory } from '@/types/transaction.type';
import { format } from 'date-fns';
import Image from 'next/image';

type Props = {
  transaction: TransactionWithCategory;
};

export default function TransactionItem({ transaction }: Props) {
  const {
    category: { image },
    payee,
    date,
    amount,
    id
  } = transaction;
  return (
    <li className="flex justify-between items-center border not-last:border-b-0 p-3 border-l-6 bg-card border-l-green-600">
      <div className="flex gap-4 items-center">
        <Image src={image as string} alt="category" width={48} height={48} />
        <div>
          <h2 className="font-semibold">{payee}</h2>
          <span className="text-xs text-muted-foreground">{format(date, 'dd MMM yyyy')}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-green-600">&#3647; {formatDecimalWithComma(amount)}</span>
        <TransactionItemAction id={id} />
      </div>
    </li>
  );
}
