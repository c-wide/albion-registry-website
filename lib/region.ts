import { GUILD_SEARCH_REGION_KEY } from "@/config/local-storage";
import { AlbionRegion, siteConfig } from "@/config/site-config";

export function isValidRegion(region: string): region is AlbionRegion {
	return siteConfig.albionServerRegions.includes(region as AlbionRegion);
}

export function loadRegion(): AlbionRegion {
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
