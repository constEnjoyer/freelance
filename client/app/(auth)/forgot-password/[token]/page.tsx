"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use } from "react"; // Импортируем use из React

export default function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>; // Параметры теперь являются промисом
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Используем React.use() для получения токена из промиса params
  const { token } = use(params);

  const handleResetPassword = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Password reset failed");
        return;
      }

      const data = await response.json();
      setSuccess(data.message);
      console.log("Password reset successful:", data);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Reset password</h1>
          <p className="mt-2 text-muted-foreground">Enter your new password</p>
        </div>

        <div className="mt-8 rounded-lg bg-card p-8 shadow-md card-hover">
          <form onSubmit={handleResetPassword} className="space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                required
                className="search-input pl-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="search-input pl-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full btn-highlight">
              Reset password
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