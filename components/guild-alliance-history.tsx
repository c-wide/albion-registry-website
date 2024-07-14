"use client";

import Link from "next/link";
import { CalendarDaysIcon, UsersRound } from "lucide-react";
import { EmptyHistory } from "@/components/empty-history";
import { History } from "@/components/history";
import { HistoryParams } from "@/components/player-history";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site-config";
import { formatDateString } from "@/lib/utils";

type GuildAllianceHistory = {
	alliance_id: string;
	name: string;
	tag: string;
	first_seen: string;
	last_seen: string;
};

export function GuildAllianceHistory({
	entityType,
	region,
	id,
}: HistoryParams) {
	const url = `${siteConfig.albionRegistryBaseApiUrl}/history/${entityType}/${region}/${id}/alliances`;

	return (
		<History<GuildAllianceHistory>
			title="Guild Alliance History"
			description="Review guild's historical alliance associations"
			fetchUrl={url}
			emptyState={
				<EmptyHistory
					heading="No history found."
					description="This guild has not participated in any events while part of an alliance."
					icon={UsersRound}
				/>
			}
			renderItem={(alliance) => (
				<div
					key={`${alliance.alliance_id}_${alliance.first_seen}`}
					className="border-l border-muted pb-3 last:pb-0"
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
			)}
		/>
	);
}
