"use client";

import Link from "next/link";
import { CalendarDaysIcon, UsersRound } from "lucide-react";
import { EmptyHistory } from "@/components/empty-history";
import { History } from "@/components/history";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site-config";
import { formatDateString } from "@/lib/utils";

export type HistoryParams = {
	entityType: string;
	region: string;
	id: string;
};

type PlayerHistory = {
	alliances: Array<{
		alliance_id: string;
		name: string;
		tag: string;
		first_seen: string;
		last_seen: string;
	}>;
	guild_id: string;
	name: string;
	first_seen: string;
	last_seen: string;
};

export function PlayerHistory({ entityType, region, id }: HistoryParams) {
	const url = `${siteConfig.albionRegistryBaseApiUrl}/history/${entityType}/${region}/${id}`;

	return (
		<History<PlayerHistory>
			title="Player History"
			description="Review players' historical guild and alliance associations"
			fetchUrl={url}
			emptyState={
				<EmptyHistory
					heading="No history found."
					description="This player hasn't participated in any events while part of a guild."
					icon={UsersRound}
				/>
			}
			renderItem={(guild) => (
				<div
					key={`${guild.guild_id}_${guild.first_seen}`}
					className="ml-2 pb-3 last:pb-0"
				>
					<Link
						href={`/guild/${region}/${guild.guild_id}`}
						className="font-medium hover:underline hover:underline-offset-2"
					>
						{guild.name}
					</Link>

					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<CalendarDaysIcon className="h-3 w-3 shrink-0" />
						{formatDateString(guild.first_seen)} -{" "}
						{formatDateString(guild.last_seen)}
					</div>

					{guild.alliances.length > 0 && (
						<div className="mt-2 flex flex-col gap-2">
							{guild.alliances.map((alliance) => (
								<div
									key={`${alliance.alliance_id}_${alliance.first_seen}`}
									className="border-l border-muted"
								>
									<div className="flex flex-col gap-1 pl-2">
										<Link href={`/alliance/${region}/${alliance.alliance_id}`}>
											<div className="flex items-center gap-1">
												<Badge variant="outline">{alliance.tag}</Badge>
												<p className="text-sm font-medium hover:underline hover:underline-offset-2">
													{alliance.name}
												</p>
											</div>
										</Link>

										<div className="flex items-center gap-1 text-xs text-muted-foreground">
											<CalendarDaysIcon className="h-3 w-3 shrink-0" />
											{formatDateString(alliance.first_seen)} -{" "}
											{formatDateString(alliance.last_seen)}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		/>
	);
}
