import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Albion Registry",
	description:
		"Detailed historical records of Albion Online's players, guilds, and alliances",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("min-h-screen", GeistSans.className)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex min-h-screen flex-col">
						<SiteHeader />
						{children}
						<Analytics />
						<SpeedInsights />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
