import { LucideIcon } from "lucide-react";

type EmptyHistoryProps = {
	heading: string;
	description: string;
	icon: LucideIcon;
};

export function EmptyHistory({
	heading,
	description,
	icon: Icon,
}: EmptyHistoryProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-1 p-3">
			<Icon className="h-12 w-12 text-muted-foreground" />

			<div className="text-center">
				<p className="text-sm font-medium">{heading}</p>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
}
