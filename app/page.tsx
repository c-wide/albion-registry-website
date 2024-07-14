import Balance from "react-wrap-balancer";
import { LazyEntitySearch } from "@/components/entity-search";

export default function Home() {
	return (
		<div className="container mt-6 flex-grow sm:mt-20">
			<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2">
				<h1 className="text-center text-5xl font-bold leading-[1.1] tracking-tighter">
					Explore Albion&apos;s History
				</h1>

				<Balance className="max-w-[750px] text-center text-lg font-light text-foreground">
					View player, guild, and alliance affiliations throughout Albion
					Online&apos;s history.
				</Balance>
			</section>

			<section className="pt-8">
				<LazyEntitySearch />
			</section>
		</div>
	);
}
