import { z } from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .regex(/^[a-zA-Z0-9]{6,}$/, 'Password must have at least 6 characters and contains only letter and number'),
    confirmPassword: z
      .string()
      .regex(
        /^[a-zA-Z0-9]{6,}$/,
        'Confirm password must have at least 6 characters and contains only letter and number'
      )
  })
  .refine(value => value.password === value.confirmPassword, {
    message: "Password and confirm password didn't match",
    path: ['confirmPassword']
  });

/* eslint-disable @typescript-eslint/no-unused-vars */
export const signUpExcludeConfirmSchema = signUpSchema.transform(({ confirmPassword, ...rest }) => rest);

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required')
});

export const authUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  image: z.string().optional()
});
