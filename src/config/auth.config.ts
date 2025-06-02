import prisma from '@/lib/db/prisma';
import { signInSchema } from '@/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: '/signin'
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const data = signInSchema.parse(credentials);
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user || !user.password) return null;

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) return null;
        // User: { email?:string, name?: string, id?:string, image?:string }
        return { id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` };
      }
    })
  ],
  callbacks: {
    jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ token, session }) {
      if (token.id) session.user.id = token.id;

      return session;
    }
  }
} satisfies NextAuthConfig;
