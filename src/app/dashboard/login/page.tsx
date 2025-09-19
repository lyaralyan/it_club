// app/login/page.tsx
"use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async () => {
  //   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/graphql", {
  //     method: "POST",
  //     credentials: "include", // ⭐ ստանալու կամ ուղարկելու cookie
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //         mutation Login($username: String!, $password: String!) {
  //           login(username: $username, password: $password) {
  //             token
  //             user { id role }
  //           }
  //         }
  //       `,
  //       variables: { username, password },
  //     }),
  //   });

  //   const data = await res.json();
  //   if (data?.data?.login?.token) {
  //     // optionally save to localStorage or let backend set cookie
  //     window.location.href = "/dashboard";
  //   } else {
  //     alert("Մուտքը ձախողվեց");
  //   }
  // };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <LoginForm />
    </div>
  );
}
