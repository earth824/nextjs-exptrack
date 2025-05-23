import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import { SerializeTransactionWithCategory, TransactionWithCategory } from '@/types/transaction.type';

export async function getTransactions(): Promise<TransactionWithCategory[]> {
  const user = await getAuthUser();

  return prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: [{ date: 'desc' }, { updatedAt: 'desc' }],
    include: { category: true }
  });
}

export async function getTransactionById(id: string): Promise<SerializeTransactionWithCategory | null> {
  const user = await getAuthUser();

  const transaction = await prisma.transaction.findUnique({
    where: { id, userId: user.id },
    include: { category: true }
  });
  if (transaction) {
    return { ...transaction, amount: transaction.amount.toFixed(2) };
  }
  return null;
}
