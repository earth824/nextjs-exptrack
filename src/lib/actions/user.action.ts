'use server';

import prisma from '@/lib/db/prisma';
import { signUpExcludeConfirmSchema } from '@/schemas/auth.schema';
import bcrypt from 'bcryptjs';

export async function signUpCredentials(credentials: unknown) {
  try {
    const { success, data, error } = signUpExcludeConfirmSchema.safeParse(credentials);

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
