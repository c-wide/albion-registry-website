"use client";

import Link from "next/link";
import { CalendarDaysIcon, UsersRound } from "lucide-react";
import { EmptyHistory } from "@/components/empty-history";
import { History } from "@/components/history";
import { HistoryParams } from "@/components/player-history";
import { siteConfig } from "@/config/site-config";
import { formatDateString } from "@/lib/utils";

type GuildPlayerHistory = {
	player_id: string;
	name: string;
	first_seen: string;
	last_seen: string;
};

export function GuildPlayerHistory({ entityType, region, id }: HistoryParams) {
	const url = `${siteConfig.albionRegistryBaseApiUrl}/history/${entityType}/${region}/${id}/players`;

	return (
		<History<GuildPlayerHistory>
			title="Guild Player History"
			description="Review guild's historical player associations"
			fetchUrl={url}
			pageSize={25}
			emptyState={
				<EmptyHistory
					heading="No history found."
					description="No player has participated in an event while part of this guild."
					icon={UsersRound}
				/>
			}
			renderItem={(player) => (
				<div
					key={`${player.player_id}_${player.first_seen}`}
					className="pb-2 last:pb-0"
				>
					<Link
						href={`/player/${region}/${player.player_id}`}
						className="font-medium hover:underline hover:underline-offset-2"
					>
						{player.name}
					</Link>

					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<CalendarDaysIcon className="h-3 w-3 shrink-0" />
						{formatDateString(player.first_seen)} -{" "}
						{formatDateString(player.last_seen)}
					</div>
				</div>
			)}
		/>
	);
}
