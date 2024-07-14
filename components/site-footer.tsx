import Link from "next/link";
import Balance from "react-wrap-balancer";
import { siteConfig } from "@/config/site-config";

export function SiteFooter() {
	return (
		<footer className="mt-6 min-h-14 w-full border-t border-border/40 p-4">
			<div className="container flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between sm:gap-0">
				<div className="flex items-center">
					<Balance className="max-w-xs text-center text-xs text-muted-foreground sm:text-left">
						{siteConfig.websiteName} is not affiliated with, endorsed, or
						sponsored by Albion Online or Sandbox Interactive GmbH
					</Balance>
				</div>

				<div className="flex items-center">
					<Link
						href="/privacy"
						className="text-sm text-muted-foreground hover:underline hover:underline-offset-4"
					>
						Privacy Policy
					</Link>
				</div>
			</div>
		</footer>
	);
}
