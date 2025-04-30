import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/db/prisma';
import { signInSchema } from '@/schemas/auth.schema';
import bcrypt from 'bcryptjs';

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST }
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const { data, success } = signInSchema.safeParse(credentials);
        if (!success) return null;

        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user || !user.password) return null;

        const isPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!isPasswordMatch) return null;

        return { id: user.id, email: user.email };
      }
    })
  ]
});
