import Link from "next/link";
import { DiscordIcon } from "@/components/icons/discord-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center justify-between">
				<Link className="text-lg font-extrabold tracking-tight" href="/">
					{siteConfig.websiteName}
				</Link>
				<div className="flex items-center gap-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" asChild>
									<Link
										href={siteConfig.githubRepoUrl}
										target="_blank"
										rel="noreferrer"
									>
										<GithubIcon className="h-[1.2rem] w-[1.2rem] fill-current" />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-sm font-medium">GitHub</p>
								<p className="text-xs text-muted-foreground">
									View the source code on GitHub
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" asChild>
									<Link
										href={siteConfig.discordInviteUrl}
										target="_blank"
										rel="noreferrer"
									>
										<DiscordIcon className="h-[1.2rem] w-[1.2rem] fill-current" />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-sm font-medium">Discord</p>
								<p className="text-xs text-muted-foreground">
									Join the Discord server for support
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
