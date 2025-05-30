'use server';

import prisma from '@/lib/db/prisma';
import { signUpExcludeConfirmSchema } from '@/schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { CredentialsSignin } from 'next-auth';

export async function signUpCredentials() {}

export async function signInCredentials() {}

export async function signOutUser() {}
