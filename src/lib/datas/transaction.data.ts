import { auth, authenticateUser } from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import { filterTransactionWithPaginationSchema } from '@/schemas/transaction.schema';
import {
  FilterTransactionWithPagination,
  SerializeTransactionWithCategory,
  TransactionFindManyArgs,
  TransactionWhereInput,
  TransactionWithCategory
} from '@/types/transaction.type';
import { redirect } from 'next/navigation';

export async function getTransactions(filter?: unknown): Promise<TransactionWithCategory[]> {
  const user = await authenticateUser();

  const defaultLimit = 5;

  const where: TransactionWhereInput = { userId: user.id };

  const findArgs: TransactionFindManyArgs = {
    where,
    orderBy: [{ date: 'desc' }, { updatedAt: 'desc' }],
    take: defaultLimit
  };

  const { data, success } = filterTransactionWithPaginationSchema.safeParse(filter);

  if (!success) return prisma.transaction.findMany({ ...findArgs, include: { category: true } });

  const { sort, order, page, limit } = data;
  const whereFilter = getWhereFilter(data);
  findArgs.where = { ...findArgs.where, ...whereFilter };

  if (sort && sort !== 'default')
    findArgs.orderBy = [{ [sort]: order === 'desc' ? 'desc' : 'asc' }, { updatedAt: 'desc' }];

  if (limit) {
    findArgs.take = limit;
  }

  if (page && page > 1) {
    findArgs.skip = (page - 1) * (limit ?? defaultLimit);
  }

  return prisma.transaction.findMany({ ...findArgs, include: { category: true } });
}

export async function getTotalTransactions(filter?: unknown): Promise<number> {
  const { data, success } = filterTransactionWithPaginationSchema.safeParse(filter);
  if (!success) return prisma.transaction.count({ where: { userId: '' } });
  const whereFilter = getWhereFilter(data);
  return prisma.transaction.count({ where: { userId: '', ...whereFilter } });
}

function getWhereFilter(data: FilterTransactionWithPagination): TransactionWhereInput {
  const where: TransactionWhereInput = {};
  const { search, type, category, date_gte, date_lte } = data;

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

  return where;
}

export async function getTransactionById(id: string): Promise<SerializeTransactionWithCategory | null> {
  const user = await authenticateUser();
  const transaction = await prisma.transaction.findUnique({
    where: { id, userId: user.id },
    include: { category: true }
  });
  if (transaction) {
    return { ...transaction, amount: transaction.amount.toFixed(2) };
  }
  return null;
}
