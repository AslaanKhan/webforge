"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { ModeToggle } from "@/providers/theme-provider/page";
import { v4 } from "uuid";
import Link from "next/link";

// Zod schema for form validation
const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  avatarUrl: z.string().url("Invalid URL"),
  email: z.string().email("Invalid email address"),
  passwordHash: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['COMPANY_OWNER', 'COMPANY_ADMIN', 'SUBACCOUNT_USER', 'SUBACCOUNT_GUEST']), // Assuming ADMIN and USER are the possible roles
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const handleSubmit = async (values: SignupFormInputs) => {
    try {
      await axiosInstance
        .post("/auth/signup", {
          ...values,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: v4(),
        })
        .then((res) => {
          if (res.status === 200) {
            toast({
              variant: "default",
              title: "Signup Successful",
              description: `${res.data.message}`,
            });
            router.push("/company");
          } else {
            toast({
              variant: "destructive",
              title: "Signup Failed",
              description: `There was an error creating your account. ${res.data.message}`,
            });
            throw new Error("Signup failed");
          }
        });
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <div className="justify-end flex">
          <ModeToggle />
        </div>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Signup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your avatar URL" {...field} />
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
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordHash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="COMPANY_OWNER">Company Owner</option>
                        <option value="COMPANY_ADMIN">Company Admin</option>
                        <option value="SUBACCOUNT_USER">Subaccount User</option>
                        <option value="SUBACCOUNT_GUEST">Subaccount Guest</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing up..." : "Signup"}
              </Button>
              <Link href="/sign-in">Sign In</Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
