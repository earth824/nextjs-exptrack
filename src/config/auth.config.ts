import prisma from '@/lib/db/prisma';
import { signInSchema } from '@/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';

const privateRoutes: RegExp[] = [/\/transaction\/?.*/];
const redirectIfAuthRoutes: RegExp[] = [/\/signin/, /\/signup/];

export const authConfig = {
  pages: {
    signIn: '/signin'
  },
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

        return { id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` };
      }
    })
  ],
  callbacks: {
    authorized({ auth, request }) {
      if (!auth && privateRoutes.some(route => route.test(request.nextUrl.pathname))) {
        return false;
      }

      if (redirectIfAuthRoutes.some(route => route.test(request.nextUrl.pathname)) && auth) {
        return NextResponse.redirect(new URL('/transaction', request.url));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ token, session }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
