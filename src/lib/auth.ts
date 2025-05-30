import { authConfig } from '@/config/auth.config';
import prisma from '@/lib/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
