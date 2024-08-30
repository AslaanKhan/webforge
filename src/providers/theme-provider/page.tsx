"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button variant="ghost" className={``} size="icon" onClick={() => theme === 'dark' ? setTheme("light") : setTheme("dark")}>
        <SunIcon
          className={`h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hidden dark:block`}           
        />
        <MoonIcon
          className={`h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:scale-0 dark:rotate-90 dark:hidden`}          
        />
      </Button>
    </>
  );
}
