import { redirect } from "next/navigation";
import { AllianceHistory } from "@/components/alliance-history";
import { GuildAllianceHistory } from "@/components/guild-alliance-history";
import { GuildPlayerHistory } from "@/components/guild-player-history";
import { InfoCard } from "@/components/info-card";
import { PlayerHistory } from "@/components/player-history";
import { isValidRegion } from "@/lib/region";

type RouteParams = {
	entityType: string;
	region: string;
	id: string;
};

export default function Page({ params }: { params: RouteParams }) {
	if (
		["player", "guild", "alliance"].includes(params.entityType) === false ||
		!isValidRegion(
			`${params.region.charAt(0).toUpperCase()}${params.region.slice(1)}`,
		)
	) {
		redirect("/");
	}

	return (
		<div className="container mt-4 flex flex-grow flex-col justify-start gap-4 sm:flex-row sm:justify-center">
			<div className="flex items-start justify-center">
				<InfoCard
					entityType={params.entityType}
					region={params.region}
					id={params.id}
				/>
			</div>

			<div className="flex min-w-0 items-start justify-center">
				{params.entityType === "player" ? (
					<PlayerHistory
						entityType={params.entityType}
						region={params.region}
						id={params.id}
					/>
				) : params.entityType === "guild" ? (
					<div className="flex flex-col items-start gap-4 sm:flex-row">
						<GuildPlayerHistory
							entityType={params.entityType}
							region={params.region}
							id={params.id}
						/>

						<GuildAllianceHistory
							entityType={params.entityType}
							region={params.region}
							id={params.id}
						/>
					</div>
				) : (
					<AllianceHistory
						entityType={params.entityType}
						region={params.region}
						id={params.id}
					/>
				)}
			</div>
		</div>
	);
}
