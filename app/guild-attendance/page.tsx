import Balance from "react-wrap-balancer";
import { GuildSearch } from "@/components/guild-search";

export const maxDuration = 60;

export default function Home() {
	return (
		<div className="container flex-grow">
			<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-24 pb-20">
				<h1 className="text-center text-5xl font-bold leading-[1.1] tracking-tighter">
					Guild Battles Attendance Report
				</h1>

				<Balance className="max-w-[750px] text-center text-lg font-light text-foreground">
					Easily track your guild&apos;s participation and individual member
					contributions in Albion Online battles over the last 14 days.
				</Balance>

				<div className="mt-6">
					<GuildSearch />
				</div>
			</section>
		</div>
	);
}
