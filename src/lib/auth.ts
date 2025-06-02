import { authConfig } from '@/config/auth.config';
import prisma from '@/lib/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const { signIn, signOut, handlers, auth } = NextAuth(authConfig);

const authUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string()
});

export async function authenticateUser() {
  const session = await auth();

  if (!session) redirect('/signin');
  // session user: { email?:string; name?:string; image?:string  }
  const { data, success } = authUserSchema.safeParse(session.user);
  if (!success) redirect('/signin');
  return data;
}
