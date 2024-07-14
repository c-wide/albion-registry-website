import Balance from "react-wrap-balancer";
import { siteConfig } from "@/config/site-config";

export default function Home() {
	return (
		<div className="container mt-6 flex-grow sm:mt-20">
			<div className="mx-auto flex max-w-[980px] flex-col items-center gap-8">
				<section className="flex flex-col items-center gap-4">
					<h1 className="text-center text-5xl font-bold leading-[1.1] tracking-tighter">
						Privacy Policy
					</h1>

					<Balance className="max-w-[750px] text-center font-light text-foreground">
						{siteConfig.websiteName} does not collect any personal information
						from users. However, we do collect some information about your
						device and browser to help us improve our service. Along with the
						services listed below, we also use your device to store your
						preferences and settings for this website.
					</Balance>
				</section>

				<section className="flex w-full flex-col items-center gap-4">
					<div className="flex max-w-[750px] flex-col items-center">
						<a
							href="https://vercel.com/docs/analytics/privacy-policy"
							className="mb-2 font-medium underline underline-offset-2"
							target="_blank"
							rel="noreferrer"
						>
							Vercel Analytics
						</a>

						<Balance className="text-center text-sm font-light text-foreground">
							We use Vercel Analytics to collect anonymous usage data about our
							users. This data is used to improve our service and to help us
							understand how our users are using our service. We do not share
							this data with third parties.
						</Balance>
					</div>

					<div className="flex max-w-[750px] flex-col items-center">
						<a
							href="https://vercel.com/docs/speed-insights/privacy-policy"
							className="mb-2 font-medium underline underline-offset-2"
							target="_blank"
							rel="noreferrer"
						>
							Vercel Speed Insights
						</a>

						<Balance className="text-center text-sm font-light text-foreground">
							Same as Vercel Analytics, we use Vercel Speed Insights to improve
							our service and your experience. We do not share this data with
							third parties.
						</Balance>
					</div>
				</section>
			</div>
		</div>
	);
}
