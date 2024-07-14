"use client";

import Image from "next/image";
import { CalendarDaysIcon } from "lucide-react";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site-config";
import { fetcher, formatDateString } from "@/lib/utils";

export type InfoCardParams = {
	entityType: string;
	region: string;
	id: string;
};

type EntityInfo = {
	id: string;
	name: string;
	tag?: string;
	avatar?: string;
	avatar_ring?: string;
	first_seen: string;
	last_seen: string;
};

const defaultAvatar = "AVATAR_01";
const defaultAvatarRing = "AVATARRING_NONPREMIUM";

export function InfoCard({ entityType, region, id }: InfoCardParams) {
	const { data, isLoading } = useSWR(
		`${siteConfig.albionRegistryBaseApiUrl}/entity/${entityType}/${region}/${id}`,
		fetcher<EntityInfo>,
	);

	if (isLoading) {
		return <Skeleton className="h-60 w-60" />;
	}

	if (!data) return;

	const avatar = data.avatar ?? defaultAvatar;
	const avatarRing = data.avatar_ring ?? defaultAvatarRing;

	return (
		<div className="flex w-60 flex-col items-center rounded-md border p-3 shadow-lg">
			<div className="relative h-20 w-20">
				{entityType === "player" ? (
					<>
						<Image
							src={`/HUMAN_MALE_${avatar}.png`}
							alt="Avatar"
							width={60}
							height={60}
							className="absolute inset-0 m-auto rounded-full object-cover"
						/>
						<Image
							src={`/${avatarRing}.png`}
							alt="Avatar Ring"
							width={80}
							height={80}
							className="absolute inset-0 object-cover"
						/>
					</>
				) : (
					<Image
						src={`https://render.albiononline.com/v1/guild/logo.png?symbol=66&schema=SCHEMA_01&primarySchemaColor=3&secondarySchemaColor=2&size=200&symbolColor=3&symbolScale=0.95&type=${
							entityType === "guild"
								? "ACTIVE_GUILD_CRYSTAL_LEADER"
								: "ACTIVE_ALLIANCE"
						}`}
						alt="Avatar"
						layout="fill"
						objectFit="contain"
						className="mt-2 scale-[1.5]"
						priority
					/>
				)}
			</div>

			<div className="mt-3 flex flex-col items-center gap-1">
				{data.tag && <Badge variant="outline">{data.tag}</Badge>}
				<div className="break-all text-center text-xl font-bold">
					{data.name}
				</div>
			</div>

			<div className="mt-3 flex flex-col gap-2">
				<div className="flex flex-col items-center">
					<div className="flex items-center text-xs text-muted-foreground">
						<CalendarDaysIcon className="mr-1 h-3 w-3 shrink-0" />
						First Seen
					</div>
					<div className="text-sm font-semibold">
						{formatDateString(data.first_seen)}
					</div>
				</div>

				<div className="flex flex-col items-center">
					<div className="flex items-center text-xs text-muted-foreground">
						<CalendarDaysIcon className="mr-1 h-3 w-3 shrink-0" />
						Last Seen
					</div>
					<div className="text-sm font-semibold">
						{formatDateString(data.last_seen)}
					</div>
				</div>
			</div>
		</div>
	);
}
