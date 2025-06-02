import AuthCard from '@/components/auth/auth-card';
import SignInForm from '@/components/auth/sign-in-form';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign In'
};

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect('/transaction');

  return (
    <AuthCard title="Sign in to your account" description="Enter your credentials to access to your account.">
      <SignInForm />
      <div className="text-center text-sm mt-4">
        <span>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </AuthCard>
  );
}
