'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="w-10 h-9" />;

  return (
    <Button variant="ghost" onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}>
      {theme === 'light' && <Moon />}
      {theme === 'dark' && <Sun />}
    </Button>
  );
}
