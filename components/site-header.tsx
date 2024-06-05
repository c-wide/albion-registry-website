import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center justify-between">
				<Link className="text-lg font-extrabold tracking-tight" href="/">
					albion.tools
				</Link>
				<div className="flex items-center">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
