import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export function SiteHeader() {
	return (
		<header className="w-full border-b border-border/40">
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
