import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import { OptionalFilterTransactionSchema } from '@/schemas/transaction.schema';
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

  const { data, success } = OptionalFilterTransactionSchema.safeParse(filter);

  if (!success) return prisma.transaction.findMany({ ...findArgs, include: { category: true } });

  const { search, type, category, date_gte, date_lte, sort, order } = data;

  if (search) where.payee = { contains: search, mode: 'insensitive' };
  if (type && type !== 'all') where.category = { type };
  if (category && category !== 'all') where.categoryId = category;

  const whereDate: TransactionWhereInput['date'] = {};
  if (date_gte) {
    whereDate.gte = new Date(date_gte);
    where.date = whereDate;
  }
  if (date_lte) {
    whereDate.lte = new Date(date_lte);
    where.date = whereDate;
  }

  if (sort && sort !== 'default')
    findArgs.orderBy = [{ [sort]: order === 'desc' ? 'desc' : 'asc' }, { updatedAt: 'desc' }];

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
