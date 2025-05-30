import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOutIcon, Plus } from 'lucide-react';

export default async function Header() {
  return (
    <header className="sticky border-b">
      <div className="px-4 py-2 flex justify-between items-center max-w-7xl mx-auto w-full">
        <a>
          <img />
        </a>
        <div className="flex items-center gap-4">
          {/* <FilterToggle /> */}
          <Button variant="ghost" asChild>
            <a>
              <Plus />
            </a>
          </Button>
          {/* <ThemeToggle /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full w-9 h-9 bg-blue-500 hover:bg-blue-400 text-white">J</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>
                <h2 className="font-bold">John Doe</h2>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <Button variant="ghost" className="w-full justify-start">
                  <LogOutIcon />
                  <span>Log out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
