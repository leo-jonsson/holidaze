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
import Checkbox from "@/app/components/Checkbox";
import { useState } from "react";
import FileUploader from "@/app/components/common/FileUploader";

const defaultAvatarURLs = [
  "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740252117027-4275d3f84385?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isVenueManager, setIsVenueManager] = useState<boolean>(false);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string>(
    defaultAvatarURLs[0]
  );

  const onSubmit = async (values: RegisterFormValues) => {
    const registrationData = {
      name: values.name,
      email: values.email,
      password: values.password,
      venueManager: isVenueManager,
      avatar: {
        url: selectedAvatarUrl!,
        alt: `Profile picture of ${values.name}`,
      },
    };

    console.log(registrationData, "registration data");

    try {
      const res = await register(registrationData);

      if (res.data) {
        console.log("Registration successful:", res.data);
        router.push("/auth/login");
      } else {
        form.setError("email", {
          type: "manual",
          message:
            res.errors?.[0]?.message ||
            "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    }
  };

  const handleAvatarSelect = (url: string) => {
    setSelectedAvatarUrl(url);
  };

  const handleFileUpload = (urls: string[]) => {
    if (urls && urls.length > 0) {
      setSelectedAvatarUrl(urls[0]);
    }
  };

  const isDefaultAvatarSelected = defaultAvatarURLs.includes(selectedAvatarUrl);

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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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

            <FormItem>
              <FormLabel>Choose Avatar</FormLabel>
              <div className="grid">
                <div className="flex space-x-3">
                  {defaultAvatarURLs.map((url) => (
                    <div
                      key={url}
                      className={`relative size-14 rounded-full overflow-hidden cursor-pointer border-2 ${
                        selectedAvatarUrl === url
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => handleAvatarSelect(url)}
                    >
                      <img
                        src={url}
                        alt="Default Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}

                  {!isDefaultAvatarSelected && selectedAvatarUrl && (
                    <div
                      className={`relative size-14 rounded-full overflow-hidden cursor-pointer border-2 ${
                        !isDefaultAvatarSelected
                          ? "border-primary"
                          : "border-transparent"
                      } flex items-center justify-center bg-muted`}
                    >
                      <img
                        src={selectedAvatarUrl}
                        alt="Uploaded Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4 grid gap-2">
                  <FileUploader
                    shouldReset={false}
                    endpoint="imageUploader"
                    onUrlsChange={handleFileUpload}
                  />
                </div>
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
