"use client";

import { ThemeProvider } from "./ThemeContext"; // Import your ThemeProvider
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {/* Add other providers here if needed */}
      {children}
    </ThemeProvider>
  );
}
