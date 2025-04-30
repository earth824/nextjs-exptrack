'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInCredentials } from '@/lib/actions/user.action';
import { signInSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormInput = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const form = useForm<FormInput>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema)
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FormInput> = data => {
    startTransition(async () => {
      const result = await signInCredentials(data);
      if (result.isCredentialsError) {
        form.setError('email', { message: result.message });
        form.setError('password', { message: result.message });
        return;
      }
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      if (result.success) {
        console.log('first');
        toast.success(result.message);
      }
    });
  };

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

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Loader className="animate-spin" /> Signing you in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </Form>
  );
}
