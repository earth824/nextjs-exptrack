'use server';

import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import { signUpExcludeConfirmSchema } from '@/schemas/auth.schema';
import { ActionResult } from '@/types/action-result.type';
import bcrypt from 'bcryptjs';
import { CredentialsSignin } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function signUpCredentials(rawData: unknown): Promise<ActionResult> {
  try {
    const { data, error, success } = signUpExcludeConfirmSchema.safeParse(rawData);
    if (!success) {
      return { success: false, message: 'Validation error', error: error.flatten().fieldErrors };
    }

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      return { success: false, message: 'Email already in use', error: { email: ['Email already in use'] } };
    }

    data.password = await bcrypt.hash(data.password, 10);
    await prisma.user.create({ data });
    return { success: true, message: 'Account has been created' };
  } catch (error) {
    return { success: false, message: 'Internal server error' };
  }
}

export async function signInCredentials(data: Record<string, string>): Promise<ActionResult> {
  try {
    await signIn('credentials', { ...data, redirect: false });
    return { success: true, message: 'Sign In successfully' };
  } catch (error) {
    return { success: false, message: 'Invalid credentials' };
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/signin' });
}
