import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import { simulateLoading } from '@/lib/utils';
import { filterTransactionSchema } from '@/schemas/transaction.schema';
import {
  SerializeTransactionWithCategory,
  TransactionFindManyArgs,
  TransactionWhereInput,
  TransactionWithCategory
} from '@/types/transaction.type';

export async function getTransactions(filter?: unknown): Promise<TransactionWithCategory[]> {
  const user = await getAuthUser();

  const where: TransactionWhereInput = { userId: user.id };

  const findArgs: TransactionFindManyArgs = {
    where,
    orderBy: [{ date: 'desc' }, { updatedAt: 'desc' }]
  };

  const { data, success } = filterTransactionSchema.safeParse(filter);

  if (!success) return prisma.transaction.findMany({ ...findArgs, include: { category: true } });

  const { search, type, categoryId, date_gte, date_lte } = data;

  if (search) {
    where.payee = { contains: search, mode: 'insensitive' };
  }

  if (type) {
    if (type !== 'all') where.category = { type };
  }

  if (categoryId && categoryId !== 'all') {
    where.categoryId = categoryId;
  }

  if (date_gte) {
    where.date = { gte: new Date(date_gte) };
  }

  if (date_lte) {
    where.date = { lte: new Date(date_lte) };
  }

  return prisma.transaction.findMany({ ...findArgs, include: { category: true } });
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
