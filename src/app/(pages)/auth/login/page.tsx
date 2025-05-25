"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/components/common/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/common/Form";
import Input from "@/app/components/common/Input";
import Link from "next/link";
import Section from "@/app/components/common/Section";
import { login } from "@/api/auth";
import { loginSchema } from "@/api/zod";
import { getBookingsByProfileName } from "@/api/bookings";
import { useState } from "react";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    console.log(values);
    setLoginError(null);

    try {
      const res = await login(values, dispatch);

      if (res.data?.name) {
        await getBookingsByProfileName(res.data.name, dispatch);
        router.push("/");
      } else {
        console.error("Login failed or user name not found in response:", res);
        setLoginError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Section className="min-h-[70vh]">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loginError && (
              <p className="text-destructive text-sm text-center">
                {loginError}
              </p>
            )}
            <Button type="submit" className="w-full" label="Sign in" />
          </form>
        </Form>

        <div className="flex justify-center mt-4">
          <p className="text-sm text-muted-foreground">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default LoginPage;
