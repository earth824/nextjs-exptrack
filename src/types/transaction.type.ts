import { Prisma } from '@/lib/db/generated/prisma';
import { transactionFormSchema } from '@/schemas/transaction.schema';
import { z } from 'zod';

export { type TransactionType, type Category, type Transaction } from '@/lib/db/generated/prisma';

/* eslint-disable @typescript-eslint/no-unused-vars */
const transactionWithCategory = Prisma.validator<Prisma.TransactionDefaultArgs>()({ include: { category: true } });
export type TransactionWithCategory = Prisma.TransactionGetPayload<typeof transactionWithCategory>;
export type SerializeTransactionWithCategory = Omit<TransactionWithCategory, 'amount'> & { amount: string };

export type TransactionFormInput = z.infer<typeof transactionFormSchema>;
