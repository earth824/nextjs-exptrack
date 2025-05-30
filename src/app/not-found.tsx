import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center space-y-3">
        <h2 className="text-6xl font-extrabold">404</h2>
        <p className="text-3xl font-bold">Oops! Page not found</p>
        <p className="text-muted-foreground text-sm">Sorry, we couldn&apos;t find the page you&apos;re looking for</p>
      </div>
      <div className="mt-8">
        <Button asChild variant="outline">
          <a>Go Back Home</a>
        </Button>
      </div>
    </div>
  );
}
