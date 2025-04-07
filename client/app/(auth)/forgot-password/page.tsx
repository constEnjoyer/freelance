"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send reset link");
        return;
      }

      const data = await response.json();
      setSuccess(data.message);
      console.log("Reset link sent:", data);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-highlight text-highlight-foreground">
            <span className="font-bold">Rb</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Forgot password?</h1>
          <p className="mt-2 text-muted-foreground">Enter your email and we'll send you a reset link</p>
        </div>

        <div className="mt-8 rounded-lg bg-card p-8 shadow-md card-hover">
          <form onSubmit={handleForgotPassword} className="space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                required
                className="search-input pl-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full btn-highlight">
              Send reset link
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-highlight hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}