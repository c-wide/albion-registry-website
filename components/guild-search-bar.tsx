"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { SearchGuild } from "albion-sdk";
import { debounce } from "remeda";
import type { AlbionRegion } from "@/config/site-config";
import { cn } from "@/lib/utils";
import { searchGuilds } from "@/actions/search-guilds";
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

export function SearchBar({ region }: { region: AlbionRegion }) {
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

			const newGuilds = await searchGuilds(region, guildName);

			setGuilds(newGuilds);
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
