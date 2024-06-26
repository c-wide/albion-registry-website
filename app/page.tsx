import Balance from "react-wrap-balancer";
import { GuildSearch } from "@/components/guild-search";

// TODO: padding at bottom
// TODO: add site footer
// TODO: handle async errors, error bounderies, 404 page

export default function Home() {
	return (
		<div className="container flex-grow">
			<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 pt-20">
				<h1 className="text-center text-5xl font-bold leading-[1.1] tracking-tighter">
					Albion Registry
				</h1>

				<Balance className="max-w-[750px] text-center text-lg font-light text-foreground">
					Albion Registry offers a detailed historical record of Albion
					Online&apos;s players, guilds, and alliances.
				</Balance>
			</section>

			<section className="pt-8">
				<GuildSearch />
			</section>
		</div>
	);
}
