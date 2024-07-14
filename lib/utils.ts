import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDateString(dateString: string) {
	const utc = new Date(dateString).toUTCString();
	const iso = new Date(utc).toISOString();
	return iso.split("T")[0];
}

export async function fetcher<T>(url: string) {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`An error occurred while fetching data: ${url}`);
	}
	return (await res.json()) as T;
}
