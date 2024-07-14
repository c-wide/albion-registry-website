import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type RegionSelectorProps<T extends readonly string[]> = {
	currentRegion: T[number];
	regionList: T;
	handleRegionChange: (region: T[number]) => void;
};

export function RegionSelector<T extends readonly string[]>({
	currentRegion,
	regionList,
	handleRegionChange,
}: RegionSelectorProps<T>) {
	return (
		<Select value={currentRegion} onValueChange={handleRegionChange}>
			<SelectTrigger className="w-[110px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{regionList.map((region) => (
					<SelectItem key={region} value={region}>
						{region}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
