'use client';

import { cn } from '@/lib/utils';
import { LayoutGrid, LucideIcon, ReceiptText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Menu = {
  path: string;
  title: string;
  icon: LucideIcon;
};

const menus: Menu[] = [
  { path: '/', title: 'Dashboard', icon: LayoutGrid },
  { path: '/transaction', title: 'Transaction', icon: ReceiptText }
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
            'rounded-full px-4 py-2 text-muted-foreground flex gap-2 items-center',
            pathname.split('/')[1] === menu.path.split('/')[1] ? 'text-blue-500' : 'hover:bg-muted'
          )}
        >
          <Icon icon={menu.icon} />
          {menu.title}
        </Link>
      ))}
    </nav>
  );
}

type IconProps = {
  icon: LucideIcon;
};

function Icon({ icon: RenderedIcon }: IconProps) {
  return <RenderedIcon className="h-4 w-4" />;
}
