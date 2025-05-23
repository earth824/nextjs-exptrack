'use server';

import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import { insertOrUpdateTransactionSchema } from '@/schemas/transaction.schema';
import { ActionResult } from '@/types/action-result.type';
import { TransactionFormInput } from '@/types/transaction.type';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

export async function createTransaction(rawData: TransactionFormInput): Promise<ActionResult> {
  try {
    const user = await getAuthUser();

    const { data, success } = insertOrUpdateTransactionSchema.safeParse(rawData);
    if (!success) {
      return { success: false, message: 'Validation error' };
    }
    await prisma.transaction.create({ data: { ...data, userId: user.id } });
    revalidatePath('/transaction');
    redirect('/transaction');
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Internal server error' };
  }
}

export async function updateTransaction(id: string, rawData: TransactionFormInput): Promise<ActionResult> {
  try {
    const user = await getAuthUser();

    const transaction = await prisma.transaction.findUnique({ where: { id } });

    if (!transaction) return { success: false, message: 'Transaction was not found' };
    if (transaction.userId !== user.id) return { success: false, message: 'No permission to update this transaction' };

    const { data, success } = insertOrUpdateTransactionSchema.safeParse(rawData);
    if (!success) {
      return { success: false, message: 'Validation error' };
    }
    await prisma.transaction.update({ data, where: { id } });
    revalidatePath('/transaction');
    redirect('/transaction');
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Internal server error' };
  }
}
