'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInCredentials } from '@/lib/actions/user.action';
import { signInSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormInput = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const form = useForm<FormInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = data => {
    startTransition(async () => {
      const result = await signInCredentials(data);
      console.log(result);
      if (result.success) {
        toast.success(result.message);
        router.push('/transaction');
      } else {
        form.setError('email', { message: result.message });
        form.setError('password', { message: result.message });
        toast.error(result.message);
      }
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
