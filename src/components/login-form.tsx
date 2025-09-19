"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/app/requests/mutation";
import { useRouter } from "next/navigation"; // 👈 Ավելացրու սա

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // 👈 Init router

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      router.push("/dashboard"); // 👈 No page reload
    },
    onError: () => {
      alert("Մուտքը ձախողվեց");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    login({ variables: { username, password } });
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Մուտք գործել հաշիվ</CardTitle>
          <CardDescription>
            Մուտքագրեք տվյալները մուտք գործելու համար
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Մուտքանուն / Էլ․հասցե</Label>
                <Input
                  id="email"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Գաղտնաբառ</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}>
                {loading ? "Մուտք..." : "Մուտք գործել"}
              </Button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-4">
                Սխալ մուտքանուն կամ գաղտնաբառ
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
