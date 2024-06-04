export const siteConfig = {
	albionServerRegions: ["Americas", "Asia", "Europe"],
} as const;

export type AlbionRegion = (typeof siteConfig.albionServerRegions)[number];
