import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { debounce } from "remeda";
import invariant from "tiny-invariant";
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
import type { AlbionRegion } from "@/config/site-config";
import { SearchResult, useSearchEntities } from "@/lib/search-entities";
import { cn } from "@/lib/utils";

export type SearchBarProps = {
	region: AlbionRegion;
	entity: SearchResult | null;
	setEntity: (entity: SearchResult | null) => void;
};

export function SearchBar({ region, entity, setEntity }: SearchBarProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const { data, isLoading } = useSearchEntities(region, query);

	useEffect(() => {
		setEntity(null);
		setQuery("");
	}, [region, setEntity]);

	const handleSearch = debounce(setQuery, {
		waitMs: 500,
	});

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[300px] justify-between"
				>
					<div className="truncate">
						{entity
							? `${entity.tag && `[${entity.tag}] `}${entity.name}`
							: "Select an entity..."}
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder="Search entities..."
						onInput={(e) => handleSearch.call(e.currentTarget.value)}
					/>
					<CommandList>
						<CommandEmpty>
							{isLoading ? (
								<div className="flex justify-center gap-2">
									<LoaderCircle className="animate-spin" />
									Searching entities...
								</div>
							) : (
								"No entities found."
							)}
						</CommandEmpty>
						{Object.entries(data ?? {}).map(([entityType, entityList]) => (
							<CommandGroup
								key={entityType}
								heading={`${entityType
									.charAt(0)
									.toUpperCase()}${entityType.slice(1)}s`}
							>
								{entityList.map((entityItem) => (
									<CommandItem
										key={`${entityItem.type}::${entityItem.id}`}
										value={`${entityItem.type}::${entityItem.id}`}
										onSelect={(currentValue) => {
											const [entityType, entityId] = currentValue.split("::");

											invariant(data, "data is expected to be defined");
											const list = data[entityType as keyof typeof data];
											invariant(
												list,
												"entity type is expected to exist in data",
											);

											const newEntity = list.find(
												(e) => e.id === entityId && e.id !== entity?.id,
											);

											setEntity(newEntity ?? null);
											setOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												entity?.type === entityItem.type &&
													entity?.id === entityItem.id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{entityItem.tag && `[${entityItem.tag}] `}
										{entityItem.name}
									</CommandItem>
								))}
							</CommandGroup>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
