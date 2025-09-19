"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@/components/theme-provider";
import client from "@/app/lib/apolloClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
