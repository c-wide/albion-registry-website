import { SELECTED_REGION_KEY } from "@/lib/local-storage";
import { AlbionRegion, siteConfig } from "@/config/site-config";

export function isValidRegion(region: string): region is AlbionRegion {
	return siteConfig.albionServerRegions.includes(region as AlbionRegion);
}

export function loadRegion(): AlbionRegion {
	const defaultRegion = siteConfig.albionServerRegions[0];
	const storedRegion = localStorage.getItem(SELECTED_REGION_KEY);

	if (!storedRegion) {
		localStorage.setItem(SELECTED_REGION_KEY, defaultRegion);
		return defaultRegion;
	}

	if (!isValidRegion(storedRegion)) {
		localStorage.setItem(SELECTED_REGION_KEY, defaultRegion);
		return defaultRegion;
	}

	return storedRegion;
}
