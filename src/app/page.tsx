import ExampleImage from '@/components/home/example-image';
import ThemeToggle from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shark Tracker No.1 Expense Manager'
};

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/images/logo.png" width={40} height={40} alt={APP_NAME} />
          <span className="font-bold text-2xl text-blue-400">{APP_NAME}</span>
        </Link>
        <ThemeToggle />
      </header>
      <div className="flex items-center gap-12 flex-1">
        <div className="flex flex-col gap-8 w-2/5">
          <h1 className="text-5xl font-bold">Simple way to manage personal finances</h1>
          <p className="text-muted-foreground font-medium">
            It takes seconds to record daily transactions. Put them into clear and visualized categories such as
            Expense: Food, Shopping or Income: Salary, Investment.
          </p>
          <Button asChild className="self-start">
            <Link href="/signin">Start for free</Link>
          </Button>
        </div>
        <div className="w-3/5">
          <ExampleImage />
        </div>
      </div>
    </div>
  );
}
