import AuthCard from '@/components/auth/auth-card';
import SignUpForm from '@/components/auth/sign-up-form';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <AuthCard title="Create new account" description="Get Started - It's free.">
      <SignUpForm />
      <div className="text-center text-sm mt-4">
        <span>
          Already have an account?{' '}
          <Link href="/signin" className="hover:underline">
            Sign In
          </Link>
        </span>
      </div>
    </AuthCard>
  );
}
