import { Bot, Database, Swords } from "lucide-react";
import Balance from "react-wrap-balancer";
import { FeatureLinkCard } from "@/components/feature-link-card";

// TODO: padding at bottom
// TODO: add site footer
// TODO: handle async errors, error bounderies, 404 page

export default function Home() {
	return (
		<div className="container flex-grow">
			<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 pb-16 pt-20">
				<h1 className="text-center text-5xl font-bold leading-[1.1] tracking-tighter">
					Data-Driven Insights for the Albion Online Community
				</h1>

				<Balance className="max-w-[750px] text-center text-lg font-light text-foreground">
					Gain a competitive edge with our data-driven tools, designed to help
					you uncover critical insights, optimize guild performance, and make
					smarter decisions.
				</Balance>
			</section>

			<section className="flex flex-wrap justify-center gap-6">
				<FeatureLinkCard
					href="/guild-attendance"
					header="Guild Battles Attendance Report"
					subheader="Track guild member attendance over the past 14 days"
					Icon={Swords}
				/>

				<FeatureLinkCard
					href="/registry"
					header="Albion Registry"
					subheader="Explore past affiliations of players, guilds, & alliances"
					disabled
					Icon={Database}
				/>

				<FeatureLinkCard
					href="/agm"
					header="Albion Guild Manager"
					subheader="A feature-rich Discord bot to supercharge community management"
					disabled
					Icon={Bot}
				/>
			</section>
		</div>
	);
}
