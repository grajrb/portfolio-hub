import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Construction, Home } from 'lucide-react';

export const metadata = {
	title: 'Page Under Construction'
};

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-background via-muted/30 to-background">
			<div className="max-w-xl">
				<div className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
					<Construction className="w-10 h-10 text-primary" />
				</div>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">This part is currently in building phase</h1>
				<p className="text-muted-foreground mb-8 leading-relaxed">
					The page you tried to access is still under construction or not yet published. I'm actively working on it.
					In the meantime, you can explore other sections of the portfolio.
				</p>
				<div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
					<Button asChild size="lg" className="w-full sm:w-auto">
						<Link href="/">
							<Home className="w-4 h-4 mr-2" />
							Back to Home
						</Link>
					</Button>
					<Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
						<Link href="/contact">Contact Me</Link>
					</Button>
				</div>
				<p className="mt-10 text-xs text-muted-foreground">If you believe this is a mistake, please refresh or report the issue via the contact page.</p>
			</div>
		</div>
	);
}
