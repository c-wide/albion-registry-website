"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Sun className="h-[1.2rem] w-[1.2rem]" />
					<span className="ml-1.5 font-semibold">Light</span>
					{theme === "light" ? (
						<Check className="ml-1.5 h-[1.2rem] w-[1.2rem]" />
					) : null}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Moon className="h-[1.2rem] w-[1.2rem]" />
					<span className="ml-1.5 font-semibold">Dark</span>
					{theme === "dark" ? (
						<Check className="ml-1.5 h-[1.2rem] w-[1.2rem]" />
					) : null}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<Monitor className="h-[1.2rem] w-[1.2rem]" />
					<span className="ml-1.5 font-semibold">System</span>
					{theme === "system" ? (
						<Check className="ml-1.5 h-[1.2rem] w-[1.2rem]" />
					) : null}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
