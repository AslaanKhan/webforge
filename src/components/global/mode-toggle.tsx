"use client"

import * as React from "react"
import { ComputerIcon, Moon, MoonIcon, Sun, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <RadioGroup defaultValue="system" className="flex flex-row border p-1 rounded-xl dark:bg-gray-600">
    //   <div className="flex items-center space-x-2">
    //     <RadioGroupItem value="light" id="r1" className="hidden" />
    //     <Label onClick={() => setTheme("light")} htmlFor="r1" className="cursor-pointer  bg-primary" ><SunIcon/></Label>
    //   </div>
    //   <div className="flex items-center space-x-2">
    //     <RadioGroupItem value="dark" id="r2" className="hidden" />
    //     <Label onClick={() => setTheme("dark")} htmlFor="r2" className="cursor-pointer"><MoonIcon/></Label>
    //   </div>
    //   <div className="flex items-center space-x-2">
    //     <RadioGroupItem value="system" id="r3" className="hidden" />
    //     <Label onClick={() => setTheme("system")} htmlFor="r3" className="cursor-pointer"><ComputerIcon/></Label>
    //   </div>
    // </RadioGroup>
  )
}
