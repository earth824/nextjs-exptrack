'use server';

import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import { signUpExcludeConfirmSchema } from '@/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { CredentialsSignin } from 'next-auth';

export async function signUpCredentials(formInput: unknown) {
  try {
    const { success, data, error } = signUpExcludeConfirmSchema.safeParse(formInput);

    if (!success) {
      return { success: false, validationError: error.flatten().fieldErrors };
    }

    const existUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existUser) {
      return { success: false, validationError: { email: ['Email already in use'] } };
    }

    data.password = await bcrypt.hash(data.password, 10);
    await prisma.user.create({ data });
    return { success: true, message: 'Account has been created' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Something went wrong' };
  }
}

export async function signInCredentials(formInput: Record<string, unknown>) {
  try {
    await signIn('credentials', { ...formInput, redirect: false });
    return { success: true, message: 'Successfully signed in' };
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { success: false, isCredentialsError: true, message: 'Invalid credentials' };
    }
    return { success: false, message: 'Something went wrong' };
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/signin' });
}
