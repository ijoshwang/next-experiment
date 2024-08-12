'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginAction } from '@/lib/auth.action';
import {
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Loader2Icon,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { ErrorCode } from '@/types/error';
import { toast } from 'sonner';

type InputType = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email' })
    .email('Please enter a valid email address'),
  password: z
    .string({
      required_error: 'Password cannot be empty',
    })
    .min(1, { message: 'Please enter your password' }),
});

interface Props {
  callbackUrl?: string;
}

const LoginForm = ({ callbackUrl }: Props) => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<InputType>({
    // validate inputs
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

  const onSubmit = async (values: InputType) => {
    try {
      setIsLoading(true);
      const response = await loginAction(values);

      console.log('---[onSubmit]loginAction response:');
      console.log(response);

      if (!!response.error) {
        setError(response.error);
      } else {
        // login successful, update session
        // await update()
        // router.refresh()
        // router.push(callbackUrl ? callbackUrl : "/")
        toast('Login Successful, Welcome back!');
      }
    } catch (error) {
      console.log('---[catch] error:', error);
      // setError("Check your Credentials")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        // action={formAction}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <Input placeholder="Your Email" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="ml-7" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-5 h-5" />
                      <div className="relative w-full">
                        <Input
                          type={isVisiblePass ? 'text' : 'password'}
                          placeholder="Your password"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={toggleVisblePass}
                          className="absolute right-1 top-0 bottom-0 w-8 h-8 m-auto"
                        >
                          {isVisiblePass ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="ml-7" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-3">
          {/* <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/forgot-password"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot Password?
            </Link>
          </p> */}
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/register" className="hover:text-primary">
              {"Don't have an account? "}
              <b>Register</b>
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
