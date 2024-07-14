import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useHistoryData } from "@/lib/use-history";

type HistoryProps<T> = {
	title: string;
	description: string;
	fetchUrl: string;
	pageSize?: number;
	renderItem: (item: T, index: number) => React.ReactNode;
	emptyState: React.ReactNode;
};

export function History<T>({
	title,
	description,
	fetchUrl,
	pageSize,
	renderItem,
	emptyState,
}: HistoryProps<T>) {
	const { data, isLoading, size, setSize } = useHistoryData<T>(
		fetchUrl,
		pageSize,
	);

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView) {
			setSize((prevSize) => prevSize + 1);
		}
	}, [inView, setSize]);

	if (isLoading) {
		return <Skeleton className="h-40 w-60 sm:w-96" />;
	}

	if (!data) return null;

	const hasReachedEnd = data[data.length - 1].length < 10;
	const isLoadingMore =
		size > 0 && data && typeof data[size - 1] === "undefined";

	return (
		<div className="rounded-md border p-3 pr-5 shadow-lg">
			<div className="flex flex-col gap-0.5 pb-3 pr-3">
				<h1 className="text-2xl font-semibold leading-none tracking-tight">
					{title}
				</h1>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>

			{data[0].length === 0 ? (
				emptyState
			) : (
				<ScrollArea className="max-h-[429px] overflow-y-auto">
					{data.flat().map((item, index) => renderItem(item, index))}
					{isLoadingMore && (
						<div className="mt-2 flex justify-center">
							<LoaderCircle className="animate-spin" />
						</div>
					)}
					{!hasReachedEnd && !isLoadingMore && (
						<div ref={ref} className="h-10" />
					)}
					{hasReachedEnd && !isLoadingMore && (
						<div className="text-center text-sm text-muted-foreground">
							<p>No more history found.</p>
						</div>
					)}
				</ScrollArea>
			)}
		</div>
	);
}
