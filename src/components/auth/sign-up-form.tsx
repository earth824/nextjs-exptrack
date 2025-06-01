'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas/auth.schema';
import { z } from 'zod';
import { useTransition } from 'react';
import { simulateLoading } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { signUpCredentials } from '@/lib/actions/user.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type FormInput = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const form = useForm<FormInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { confirmPassword: '', email: '', password: '', firstName: '', lastName: '' }
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit: SubmitHandler<FormInput> = data => {
    startTransition(async () => {
      const result = await signUpCredentials(data);
      if (result.success) {
        toast.success(result.message);
        router.push('/signin');
      } else {
        if (result.error?.email) {
          form.setError('email', { message: result.error?.email[0] });
        }
        toast.error(result.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm your password" type="password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Loader className="animate-spin" /> Creating your account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  );
}
