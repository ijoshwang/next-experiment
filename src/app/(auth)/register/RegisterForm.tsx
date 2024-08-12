'use client'

import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordStrength } from 'check-password-strength'
import { AlertCircle, Eye, EyeOff, Info } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'

import PasswordStrength from '@/components/PasswordStrength'
import TooltipWrapper from '@/components/TooltipWrapper'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerAction } from '@/lib/auth.action'
import { registerFormSchema } from '@/lib/formSchema'

const RegisterForm = () => {
  const [state, formAction] = useFormState(registerAction, undefined)
  const router = useRouter()
  const [passStrength, setPassStrength] = useState(0) // State to track password strength.
  const [isVisiblePass, setIsVisiblePass] = useState(false) // State to toggle password visibility.

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    formAction(values)
  }

  useEffect(() => {
    if (state?.success) {
      toast('Your account has been created! ', {
        description: 'Please check your email for verification.',
      })
      router.push('/login')
    }
  }, [state?.success, router])

  const toggleVisblePass = () => {
    setIsVisiblePass((prev) => !prev)
  } // Toggle password visibility.

  const { password } = form.watch() // Watch the password input for changes.
  useEffect(() => {
    setPassStrength(passwordStrength(password).id) // Update password strength on change.
  }, [password])

  return (
    <>
      <Form {...form}>
        <form
          // action={formAction}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Your email"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Email addresses can be used to retrieve passwords and obtain
                  product information
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password" className="flex gap-2">
                  <span>Password</span>
                  <TooltipWrapper title="Password must be 6~20 characters, and contain at least 1 small letter, 1 capital letter, 1 number and 1 special character.">
                    <Info className="w-4 h-4" />
                  </TooltipWrapper>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      type={isVisiblePass ? 'text' : 'password'}
                      placeholder="Your Password"
                      {...field}
                      required
                      className="pr-10"
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display password strength component */}
          <PasswordStrength passStrength={passStrength} />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm password
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your Password"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {state?.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state?.error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            Register
          </Button>

          <div>
            <Link href="/login">
              Have an account? <b>Login</b>
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}

export default RegisterForm
