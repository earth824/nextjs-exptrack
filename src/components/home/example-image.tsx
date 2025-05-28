'use client';

import lightImage from '/public/images/light-app.png';
import darkImage from '/public/images/dark-app.png';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExampleImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="w-full aspect-[16/9] bg-accent/10" />;

  return (
    <div className="w-full aspect-[16/9] relative border rounded-xl overflow-hidden">
      <Image src={theme === 'dark' ? darkImage : lightImage} alt="app example" fill sizes="60vw" priority />
    </div>
  );
}
