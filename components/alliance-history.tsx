"use client";

import Link from "next/link";
import { CalendarDaysIcon, UsersRound } from "lucide-react";
import { EmptyHistory } from "@/components/empty-history";
import { History } from "@/components/history";
import { HistoryParams } from "@/components/player-history";
import { siteConfig } from "@/config/site-config";
import { formatDateString } from "@/lib/utils";

type AllianceHistory = {
	guild_id: string;
	name: string;
	first_seen: string;
	last_seen: string;
};

export function AllianceHistory({ entityType, region, id }: HistoryParams) {
	const url = `${siteConfig.albionRegistryBaseApiUrl}/history/${entityType}/${region}/${id}/guilds`;

	return (
		<History<AllianceHistory>
			title="Alliance History"
			description="Review alliances' historical guild associations"
			fetchUrl={url}
			emptyState={
				<EmptyHistory
					heading="No history found."
					description="No guild has participated in an event while part of this alliance."
					icon={UsersRound}
				/>
			}
			renderItem={(guild) => (
				<div
					key={`${guild.guild_id}_${guild.first_seen}`}
					className="pb-2 last:pb-0"
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
				</div>
			)}
		/>
	);
}
