'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { VALIDATION_MESSAGE } from '@/config';
import { addCollectedUser } from '@/lib/action';
import { ICollectedUser } from '@/types';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * Validation:
 * The name field should only take strings, and it must be all capital letters
 * The nickname should not have any restrictions
 * The age should be between 5 and 15
 */
const formSchema = z.object({
  name: z.string().regex(/^[A-Z\s]+$/, {
    message: VALIDATION_MESSAGE.name,
  }),
  nickname: z
    .string({
      required_error: VALIDATION_MESSAGE.nickname,
    })
    .min(1, {
      message: 'Nickname is required',
    }),
  age: z
    .string()
    .transform((val) => (val === '' ? undefined : parseInt(val, 10)))
    .pipe(
      z
        .number({
          required_error: 'Age is required',
        })
        .min(5, {
          message: VALIDATION_MESSAGE.age,
        })
        .max(15, {
          message: VALIDATION_MESSAGE.age,
        })
        .nullable()
    ),
});

const FormAdd = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nickname: '',
      age: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      const newUser = await addCollectedUser(values as ICollectedUser);
      console.log('add successful new user:', newUser);
      if (newUser) {
        form.reset();

        toast(`${newUser.name} Added successful`, {
          // description: ``,
          action: {
            label: 'Go Home',
            onClick: () => {
              router.push('/');
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Please input name" {...field} />
                </FormControl>
                <FormDescription>{VALIDATION_MESSAGE.name}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input placeholder="Please input nickname" {...field} />
                </FormControl>
                <FormDescription>This is nickname.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Please input age"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>{VALIDATION_MESSAGE.age}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormAdd;
