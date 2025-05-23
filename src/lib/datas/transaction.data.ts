import prisma from '@/lib/db/prisma';
import { SerializeTransactionWithCategory, TransactionWithCategory } from '@/types/transaction.type';

export async function getTransactions(): Promise<TransactionWithCategory[]> {
  return prisma.transaction.findMany({ orderBy: { date: 'desc' }, include: { category: true } });
}

export async function getTransactionById(id: string): Promise<SerializeTransactionWithCategory | null> {
  const transaction = await prisma.transaction.findUnique({ where: { id }, include: { category: true } });
  if (transaction) {
    return { ...transaction, amount: transaction.amount.toFixed(2) };
  }
  return null;
}
