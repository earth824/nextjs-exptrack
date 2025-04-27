import ThemeToggle from '@/components/shared/theme-toggle';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PropsWithChildren } from 'react';

type AuthCardProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export default function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card className="w-full sm:w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardAction>
          <ThemeToggle />
        </CardAction>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
