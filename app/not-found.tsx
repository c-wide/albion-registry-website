import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex flex-grow flex-col items-center justify-center">
			<Ghost className="mb-4 h-16 w-16" />
			<h1 className="mb-2 text-4xl font-bold">404</h1>
			<p className="mb-6 text-xl">Page Not Found</p>
			<Link href="/" className="text-blue-500 hover:text-blue-600">
				Return to Homepage
			</Link>
		</div>
	);
}
