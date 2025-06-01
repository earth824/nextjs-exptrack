'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInCredentials } from '@/lib/actions/user.action';
import { signInSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormInput = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const form = useForm<FormInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FormInput> = data => {
    startTransition(async () => {
      await signInCredentials(data);
    });
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" type="password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>Sign In</Button>
      </form>
    </Form>
  );
}
