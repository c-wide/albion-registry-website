"use server";

import { AlbionSDK, type SearchGuild } from "albion-sdk";
import type { AlbionRegion } from "@/config/site-config";

export async function searchGuilds(
	region: AlbionRegion,
	guildName: string,
): Promise<Array<SearchGuild>> {
	const sdk = new AlbionSDK(region);
	const searchRes = await sdk.search(guildName);
	return searchRes.guilds;
}
