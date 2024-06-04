"use server";

import { AlbionSDK, type SearchResponse } from "albion-sdk";
import type { AlbionRegion } from "@/config/site-config";

export async function searchGuilds(
	region: AlbionRegion,
	guildName: string,
): Promise<SearchResponse> {
	const sdk = new AlbionSDK(region);

	return await sdk.search(guildName);
}
