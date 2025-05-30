import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col gap-2 h-screen w-full">
      <img />
      <Loader2 className="animate-spin text-blue-500" />
    </div>
  );
}
