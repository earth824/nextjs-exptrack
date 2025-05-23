import { authConfig } from '@/config/auth.config';
import prisma from '@/lib/db/prisma';
import { authUserSchema } from '@/schemas/auth.schema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { redirect } from 'next/navigation';

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST }
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig
});

export async function getAuthUser() {
  const session = await auth();

  if (!session?.user) {
    redirect('/signin');
  }

  const { data, success, error } = authUserSchema.safeParse(session.user);
  if (!success) {
    console.log(error);
    redirect('/signin');
  }

  return data;
}
