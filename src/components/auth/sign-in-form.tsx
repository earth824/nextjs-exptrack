'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormInput = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const form = useForm<FormInput>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema)
  });

  const onSubmit: SubmitHandler<FormInput> = data => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

        <Button>Sign In</Button>
      </form>
    </Form>
  );
}
