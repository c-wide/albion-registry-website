"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { RegionSelector } from "@/components/region-selector";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { siteConfig, type AlbionRegion } from "@/config/site-config";
import { SELECTED_REGION_KEY } from "@/lib/local-storage";
import { isValidRegion, loadRegion } from "@/lib/region";
import { SearchResult } from "@/lib/search-entities";

export const LazyEntitySearch = dynamic(
	() => import("@/components/entity-search").then((mod) => mod.EntitySearch),
	{
		loading: () => (
			<div className="flex justify-center gap-2">
				<LoaderCircle className="animate-spin" />
				Loading content...
			</div>
		),
		ssr: false,
	},
);

export function EntitySearch() {
	const router = useRouter();
	const [region, setRegion] = useState<AlbionRegion | null>(null);
	const [entity, setEntity] = useState<SearchResult | null>(null);

	useEffect(() => {
		setRegion(loadRegion());
	}, []);

	if (region === null) {
		return null;
	}

	const handleRegionChange = (selectedRegion: string) => {
		if (!isValidRegion(selectedRegion)) return;
		setRegion(selectedRegion);
		localStorage.setItem(SELECTED_REGION_KEY, selectedRegion);
	};

	const handleNavigate = () => {
		if (!entity) {
			toast.warning("Please select a player, guild, or alliance");
			return;
		}

		router.push(`${entity.type}/${region.toLowerCase()}/${entity.id}`);
	};

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col gap-2 sm:flex-row">
				<SearchBar region={region} entity={entity} setEntity={setEntity} />

				<div className="flex justify-center">
					<RegionSelector
						currentRegion={region}
						regionList={siteConfig.albionServerRegions}
						handleRegionChange={handleRegionChange}
					/>
				</div>
			</div>

			<div className="mt-4 flex justify-center">
				<Button onClick={handleNavigate}>View History</Button>
			</div>
		</div>
	);
}
