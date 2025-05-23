import { z } from 'zod';

export const transactionFormSchema = z.object({
  type: z.enum(['expense', 'income'], { message: 'Type must be expense or income' }),
  payee: z.string().min(1, 'Payee is required'),
  date: z.date(),
  categoryId: z.string().uuid('Invalid category id'),
  amount: z
    .string()
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, 'Amount must be a positive number with a maximum of two decimal digits')
    .refine(value => +value, 'Amount must be a positive number with a maximum of two decimal digits')
});

/* eslint-disable @typescript-eslint/no-unused-vars */
export const insertOrUpdateTransactionSchema = transactionFormSchema.transform(
  ({ type, ...excludeType }) => excludeType
);
