import Menu from '@/components/layouts/menu';
import ThemeToggle from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { APP_NAME } from '@/constants';
import { signOutUser } from '@/lib/actions/user.action';
import { auth } from '@/lib/auth';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Header() {
  const session = await auth();
  if (!session) {
    redirect('/signin');
  }
  return (
    <header className="sticky border-b">
      <div className="px-4 py-2 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/">
          <Image src="/images/logo.png" width={40} height={40} alt={APP_NAME} />
        </Link>
        <div className="flex items-center gap-4">
          <Menu />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full w-9 h-9 bg-blue-500 hover:bg-blue-400 text-white">
                {session.user?.name?.charAt(0)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>{<h2 className="font-bold">{session.user?.name}</h2>}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <form action={signOutUser} className="w-full">
                  <Button variant="ghost" className="w-full justify-start">
                    <LogOutIcon />
                    <span>Log out</span>
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
