'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Menu = {
  path: string;
  title: string;
};

const menus: Menu[] = [
  { path: '/', title: 'Dashboard' },
  { path: '/transaction', title: 'Transaction' }
];

export default function Menu() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center">
      {menus.map(menu => (
        <Link
          key={menu.title}
          href={menu.path}
          className={cn(
            'rounded-full px-4 py-2 text-muted-foreground',
            pathname === menu.path ? 'text-blue-500' : 'hover:bg-muted'
          )}
        >
          {menu.title}
        </Link>
      ))}
    </nav>
  );
}
