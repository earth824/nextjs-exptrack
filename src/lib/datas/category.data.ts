import prisma from '@/lib/db/prisma';
import { Category, TransactionType } from '@/types/transaction.type';

export async function getCategoriesByType(type: TransactionType) {
  return prisma.category.findMany({ where: { type }, orderBy: [{ sequence: 'desc' }, { name: 'asc' }] });
}

export async function getCategoriesMapByType(): Promise<{ expenses: Category[]; incomes: Category[] }> {
  const [expenses, incomes] = await Promise.all([getCategoriesByType('expense'), getCategoriesByType('income')]);
  return { expenses, incomes };
}
