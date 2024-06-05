import type { ComponentType } from "react";
import Link from "next/link";
import Balance from "react-wrap-balancer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FeatureLinkCard({
	href,
	header,
	subheader,
	disabled,
	Icon,
}: {
	href: string;
	header: string;
	subheader: string;
	disabled?: boolean;
	Icon: ComponentType<{ className?: string }>;
}) {
	return (
		<Link href={href} className={cn(disabled && "pointer-events-none")}>
			<div
				className={`px-1 py-4 ${
					disabled ? "gap-4" : "gap-7"
				} h-64 w-72 border rounded-lg flex flex-col items-center shadow-lg shadow-gray-500/50 hover:shadow-xl hover:shadow-gray-500/50 active:shadow-inner active:shadow-gray-500/50 dark:shadow-none dark:hover:bg-slate-900/30 dark:active:bg-slate-800/30`}
			>
				<div className="border rounded-full p-3">
					<Icon className="h-12 w-12 shrink-0 stroke-1" />
				</div>

				{disabled && <Badge>Coming Soon!</Badge>}

				<div>
					<h1 className="text-2xl text-center font-semibold leading-none tracking-tight">
						{header}
					</h1>

					<Balance className="pt-1 text-center text-sm font-light text-foreground">
						{subheader}
					</Balance>
				</div>
			</div>
		</Link>
	);
}