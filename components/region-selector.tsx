import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function RegionSelector({
	currentRegion,
	regionList,
	handleRegionChange,
}: {
	currentRegion: string;
	regionList: Array<string>;
	handleRegionChange: (region: string) => void;
}) {
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
