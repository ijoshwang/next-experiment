import { z } from 'zod';

export const registerFormSchema = z
  .object({
    username: z
      .string({
        required_error: 'Username is required',
      })
      .min(2, {
        message: 'Username must be at least 2 characters.',
      })
      .max(30, {
        message: 'Username must not be longer than 30 characters.',
      }),
    email: z
      .string({
        required_error: 'Please Input email.',
      })
      .email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, 'Password must be up to 20 characters')
      .regex(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$'
        ),
        'Password must contain at least 1 small letter, 1 capital letter, 1 number and 1 special character'
      ),
    confirmPassword: z
      .string({ required_error: 'Confirm your password is required' })
      .min(6, 'Password must have at least 6 characters')
      .max(20, 'Password must be up to 20 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password and Confirm Password doesn't match!",
  });
