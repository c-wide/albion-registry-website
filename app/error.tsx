"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error() {
	return (
		<div className="flex flex-grow flex-col items-center justify-center">
			<AlertTriangle className="mb-4 h-16 w-16" />
			<h1 className="mb-2 text-4xl font-bold">Uh oh!</h1>
			<p className="mb-6 text-xl">We&apos;re sorry, something went wrong.</p>
			<Link href="/" className="text-blue-500 hover:text-blue-600">
				Return to Homepage
			</Link>
		</div>
	);
}
