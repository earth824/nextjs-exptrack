import Header from '@/components/layouts/header';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) redirect('/signin');

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto ">
        <div className="p-4 max-w-7xl mx-auto w-full h-full">{children}</div>
      </main>
      <footer className="text-center p-4 border-t">Copyright © 2025 Dev Nest. All rights reserved.</footer>
    </div>
  );
}
