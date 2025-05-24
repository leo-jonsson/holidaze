"use client";

import { useRouter } from "next/navigation";
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
import { register } from "@/api/auth";
import { registerSchema } from "@/api/zod";
import { Checkbox } from "@/components/common/checkbox";
import { useState } from "react";

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isVenueManager, setIsVenueManager] = useState<boolean>(false);

  const onSubmit = async (values: RegisterFormValues) => {
    const registrationData = {
      name: values.name,
      email: values.email,
      password: values.password,
      venueManager: isVenueManager,
    };

    console.log(registrationData);
    try {
      const res = await register(registrationData);

      console.log(registrationData, "test");

      if (res.data) {
        console.log("Registration successful:", res.data);
        router.push("/auth/login");
      } else {
        console.error("Registration failed:", res);
        form.setError("email", {
          type: "manual",
          message: "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      form.setError("email", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <Section className="min-h-[70vh]">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={isVenueManager}
                  onCheckedChange={(checked) => setIsVenueManager(!!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Register as a venue manager</FormLabel>
              </div>
            </FormItem>

            <Button type="submit" className="w-full" label="Sign up" />
          </form>
        </Form>

        <div className="flex justify-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default RegisterPage;
