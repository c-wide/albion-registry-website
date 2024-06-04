"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { SearchGuild } from "albion-sdk";
import { debounce } from "remeda";
import { AlbionRegion, siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RegionSelector } from "./region-selector";
import { searchGuilds } from "@/actions/searchGuilds";

function SearchBar({ region }: { region: AlbionRegion }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [guilds, setGuilds] = useState<Array<SearchGuild>>([]);
	const [selectedGuild, setSelectedGuild] = useState<SearchGuild | null>(null);

	useEffect(() => {
		setSelectedGuild(null);
		setGuilds([]);
	}, [region]);

	const handleSearch = debounce(
		async (guildName: string) => {
			if (guildName === "") return;

			setGuilds([]);
			setLoading(true);

			const res = await searchGuilds(region, guildName);

			setGuilds(res.guilds);
			setLoading(false);
		},
		{ waitMs: 500 },
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{selectedGuild ? selectedGuild.Name : "Select a guild..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder="Search guilds..."
						onInput={(e) => handleSearch.call(e.currentTarget.value)}
					/>
					<CommandEmpty>
						{loading ? (
							<div className="flex justify-center items-center gap-2">
								<LoaderCircle className="animate-spin" />
								Searching guilds...
							</div>
						) : (
							"No guild found."
						)}
					</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{guilds.map((guild) => (
								<CommandItem
									key={guild.Id}
									value={guild.Id}
									onSelect={(currentValue) => {
										const guild = guilds.find(
											(guild) => guild.Id === currentValue,
										);

										setSelectedGuild(guild ?? null);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selectedGuild?.Id === guild.Id
												? "opacity-100"
												: "opacity-0",
										)}
									/>
									{guild.Name}
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export function GuildSearch() {
	const router = useRouter();
	const [region, setRegion] = useState<AlbionRegion>(
		siteConfig.albionServerRegions[0],
	);

	const handleRegionChange = (selectedRegion: string) => {
		if (
			siteConfig.albionServerRegions.includes(selectedRegion as AlbionRegion)
		) {
			setRegion(selectedRegion as AlbionRegion);
		}
	};

	return (
		<>
			<div className="flex gap-2">
				<SearchBar region={region} />

				<RegionSelector
					currentRegion={region}
					regionList={
						siteConfig.albionServerRegions as unknown as Array<string>
					}
					handleRegionChange={handleRegionChange}
				/>
			</div>

			<div className="mt-4 flex justify-center">
				<Button onClick={() => router.push(`/${region}/7fa0sf78asyf78y`)}>
					Generate Report
				</Button>
			</div>
		</>
	);
}
