'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center space-y-3">
        <h2 className="text-6xl font-extrabold">500</h2>
        <p className="text-3xl font-bold">Oops! Something went wrong</p>
        <p className="text-muted-foreground text-sm">
          The server encoutered an internal server error and was unable to complete your request
        </p>
      </div>
      <div className="mt-8">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
