'use client';

import { SignUpFormData, SignUpSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/forms/FormField';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { OctagonAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    const toastId = toast.loading('Signing up...');
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/landing",
      },
      {
        onSuccess: () => {
          setPending(false);
          toast.success(' Signed up successfully', { id: toastId });
          router.push("/landing");
        },
        onError: ({ error }) => {
          setPending(false);
          toast.error('Failed to sign up. Please try again', { id: toastId });
          setError(error.message);
        },
      }
    );
  };

  const onSocial = (provider: 'github' | 'google') => {
    const toastId = toast.loading('Signing up...');
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: '/landing',
      },
      {
        onSuccess: () => {
          setPending(false);
          toast.success('Signed up successfully', { id: toastId });
          router.push('/landing');
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
          toast.error('Failed to sign up. Please try again', { id: toastId });
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Let&apos;s get started</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <CustomFormField
                      name="name"
                      label="Name"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="grid gap-3">
                    <CustomFormField
                      name="email"
                      label="Email"
                      placeholder="mqT0V@example.com"
                      type="email"
                    />
                  </div>
                  <div className="grid gap-3">
                    <CustomFormField
                      name="password"
                      label="Password"
                      placeholder="**************"
                      type="password"
                    />
                  </div>
                  <div className="grid gap-3">
                    <CustomFormField
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="**************"
                      type="password"
                    />
                  </div>

                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlert className="w-4 h-4 !text-destructive" />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}
                  <Button disabled={pending} type="submit" className="w-full">
                    {pending ? 'Logging in...' : 'Sign Up'}
                  </Button>
                </div>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => {
                      onSocial('google');
                    }}
                  >
                    <FaGoogle />
                    Login with Google
                  </Button>
                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => {
                      onSocial('github');
                    }}
                  >
                    <FaGithub />
                    Login with Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                 Already have an account?{' '}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
