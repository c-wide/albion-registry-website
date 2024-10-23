export const siteConfig = {
	websiteName: "Albion Registry",
	albionServerRegions: ["Americas", "Asia", "Europe"],
	albionRegistryBaseApiUrl: "https://registry-api.albion.tools",
	discordInviteUrl: "https://discord.gg/x86PwqWtDv",
	githubRepoUrl:
		"https://github.com/c-wide?tab=repositories&q=albion&type=&language=&sort=",
} as const;

export type AlbionRegion = (typeof siteConfig.albionServerRegions)[number];
