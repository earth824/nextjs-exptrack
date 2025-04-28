'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/schemas/auth.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormInput = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const form = useForm<FormInput>({
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit: SubmitHandler<FormInput> = data => {};

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button>Create account</Button>
      </form>
    </Form>
  );
}
