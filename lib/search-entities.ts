import useSWR from "swr";
import { AlbionRegion, siteConfig } from "@/config/site-config";

export type SearchResult = {
	type: "player" | "guild" | "alliance";
	id: string;
	name: string;
	tag: string;
};

async function fetcher(url: string) {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("An error occurred while searching entities");
	}
	const data: Array<SearchResult> = await res.json();
	return Object.groupBy(data, ({ type }) => type);
}

export function useSearchEntities(region: AlbionRegion, query: string) {
	const params = new URLSearchParams();
	params.set("q", query);

	const url = `${
		siteConfig.albionRegistryBaseApiUrl
	}/search/entities/${region.toLowerCase()}?${params.toString()}`;

	return useSWR(query.length > 0 ? url : null, fetcher);
}
