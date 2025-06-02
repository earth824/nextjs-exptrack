import ThemeToggle from '@/components/shared/theme-toggle';
import FilterToggle from '@/components/transaction/filter-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOutUser } from '@/lib/actions/user.action';
import { auth, authenticateUser } from '@/lib/auth';
import { LogOutIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Header() {
  // const session = await auth();
  const user = await authenticateUser();

  return (
    <header className="sticky border-b">
      <div className="px-4 py-2 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/">
          <Image src="/images/logo.png" alt="App logo" width={40} height={40} />
        </Link>
        <div className="flex items-center gap-4">
          <FilterToggle />
          <Button variant="ghost" asChild>
            <Link href="/transaction/create">
              <Plus />
            </Link>
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full w-9 h-9 bg-blue-500 hover:bg-blue-400 text-white">
                {user.name.charAt(0).toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>
                <h2 className="font-bold">{user.name}</h2>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                {/* <form action={signOutUser}> */}
                <Button variant="ghost" className="w-full justify-start" onClick={signOutUser}>
                  <LogOutIcon />
                  <span>Log out</span>
                </Button>
                {/* </form> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
