"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Для работы с куками
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);
      window.location.href = "/"; // Перенаправление после успешного входа
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
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your real estate account</p>
        </div>

        <div className="mt-8 rounded-lg bg-card p-8 shadow-md card-hover">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                className="search-input pl-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-highlight hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="search-input pl-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full btn-highlight">
              Sign in
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-highlight hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}