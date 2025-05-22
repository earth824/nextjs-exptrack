import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col gap-2 h-screen w-full">
      <Image src="/images/logo.png" alt="logo" width={72} height={72} />
      <Loader2 className="animate-spin text-blue-500" />
    </div>
  );
}
