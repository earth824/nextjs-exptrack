import { transactionFormSchema } from '@/schemas/transaction.schema';
import { z } from 'zod';

export { type TransactionType } from '@/lib/db/generated/prisma';
export { type Category, type Transaction } from '@/lib/db/generated/prisma';

export type TransactionFormInput = z.infer<typeof transactionFormSchema>;
