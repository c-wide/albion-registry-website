"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/guild-search-bar";
import { RegionSelector } from "@/components/region-selector";
import { Button } from "@/components/ui/button";
import { GUILD_SEARCH_REGION_KEY } from "@/config/local-storage";
import { siteConfig, type AlbionRegion } from "@/config/site-config";

// TODO: load previously searched guilds?
// TODO: cancel API call / debounce on region change or popover closed
// TODO: handle async errors, error bounderies, 404 page
// TODO: add site footer

function isValidRegion(region: string): region is AlbionRegion {
	return siteConfig.albionServerRegions.includes(region as AlbionRegion);
}

function loadRegion(): AlbionRegion {
	const defaultRegion = siteConfig.albionServerRegions[0];
	const storedRegion = localStorage.getItem(GUILD_SEARCH_REGION_KEY);

	if (!storedRegion) {
		localStorage.setItem(GUILD_SEARCH_REGION_KEY, defaultRegion);
		return defaultRegion;
	}

	if (!isValidRegion(storedRegion)) {
		localStorage.setItem(GUILD_SEARCH_REGION_KEY, defaultRegion);
		return defaultRegion;
	}

	return storedRegion;
}

export function GuildSearch() {
	const router = useRouter();
	const [region, setRegion] = useState<AlbionRegion | null>(null);

	useEffect(() => {
		setRegion(loadRegion());
	}, []);

	const handleRegionChange = (selectedRegion: string) => {
		if (!isValidRegion(selectedRegion)) return;
		setRegion(selectedRegion);
		localStorage.setItem(GUILD_SEARCH_REGION_KEY, selectedRegion);
	};

	if (region === null) {
		return null;
	}

	return (
		<>
			<div className="flex flex-col gap-2 sm:flex-row">
				<SearchBar region={region} />

				<div className="flex justify-center">
					<RegionSelector
						currentRegion={region}
						regionList={
							siteConfig.albionServerRegions as unknown as Array<string>
						}
						handleRegionChange={handleRegionChange}
					/>
				</div>
			</div>

			<div className="mt-4 flex justify-center">
				<Button onClick={() => router.push(`/${region}/7fa0sf78asyf78y`)}>
					Generate Report
				</Button>
			</div>
		</>
	);
}
