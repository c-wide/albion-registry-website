import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/utils";

export function useHistoryData<T>(fetchUrl: string, pageSize = 10) {
	return useSWRInfinite<Array<T>>(
		(pageIdx: number) => `${fetchUrl}?offset=${pageIdx * pageSize}`,
		fetcher<T[]>,
		{ initialSize: 1, revalidateFirstPage: false },
	);
}
