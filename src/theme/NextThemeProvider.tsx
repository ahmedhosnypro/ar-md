"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export default function NextThemesProvider({
  children,
  ...props
}: Readonly<React.ComponentProps<typeof ThemeProvider>>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
