import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Github, Mail, Phone, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
	{
		id: 1,
		title: 'EzCommerce',
		description:
			'Full-stack e-commerce platform built with MERN stack featuring user authentication, product management, shopping cart, orders, and admin panel. Designed for scalability and easy customization.',
		tags: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
		githubUrl: 'https://github.com/grajrb/EzCommerce',
	},
	{
		id: 2,
		title: 'EventBookingSystem',
		description:
			'A modern full-stack app for browsing, booking, and managing events with real-time updates and admin features.',
		tags: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
		githubUrl: 'https://github.com/grajrb/EventBookingSystem',
	},
	{
		id: 3,
		title: 'ProSyncHub',
		description:
			'Real-time, full-stack industrial asset management and predictive maintenance platform with IoT data ingestion, work order management, and analytics.',
		tags: ['TypeScript', 'React', 'Firebase', 'IoT', 'Analytics'],
		githubUrl: 'https://github.com/grajrb/ProSyncHub',
	},
	{
		id: 4,
		title: 'CryptoChatSphere',
		description:
			'Modern decentralized messaging application that combines traditional chat functionality with Web3 capabilities. Users can connect crypto wallets and engage in real-time conversations.',
		tags: ['TypeScript', 'React', 'Web3', 'Blockchain'],
		githubUrl: 'https://github.com/grajrb/crypto-chat-sphere',
	},
	{
		id: 5,
		title: 'Portfolio Hub',
		description:
			'A modern, responsive portfolio website built with TypeScript, React, and Vite. Features reusable UI components, project showcase, skills display, and contact information.',
		tags: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
		githubUrl: 'https://github.com/grajrb/portfolio-hub',
	},
	{
		id: 6,
		title: 'Task Management with Blockchain Rewards',
		description:
			'Manage tasks efficiently and earn token rewards for productivity. TaskToken combines task management with blockchain incentives.',
		tags: ['TypeScript', 'React', 'Blockchain', 'Smart Contracts'],
		githubUrl: 'https://github.com/grajrb/Task-Management',
	},
	{
		id: 7,
		title: 'NewsContextGPT',
		description:
			'An AI-powered news analysis tool that provides context and insights for current news articles using advanced language processing.',
		tags: ['TypeScript', 'React', 'OpenAI', 'News API'],
		githubUrl: 'https://github.com/grajrb/NewsContextGPT',
	},
	{
		id: 8,
		title: 'SecureAuthHub',
		description:
			'A comprehensive authentication system with multi-factor authentication, OAuth integration, and advanced security features.',
		tags: ['TypeScript', 'Node.js', 'Security', 'OAuth'],
		githubUrl: 'https://github.com/grajrb/SecureAuthHub',
	},
	{
		id: 9,
		title: 'Lexi Legal Assistant',
		description:
			'AI-powered legal assistant application to help with legal document analysis and legal query resolution.',
		tags: ['JavaScript', 'AI', 'Legal Tech', 'NLP'],
		githubUrl: 'https://github.com/grajrb/lexi-legal-assistant',
	},
	{
		id: 10,
		title: 'Product Recommendation Engine',
		description:
			'Recommendation model for providing the best combos of items using Market Basket Analysis with Apriori Algorithm for retail optimization.',
		tags: ['Python', 'Machine Learning', 'Data Science', 'Apriori'],
		githubUrl: 'https://github.com/grajrb/Product-Recommendation-Engine',
	},
	{
		id: 11,
		title: 'LLM API',
		description:
			'Large Language Model API implementation for various natural language processing tasks and AI applications.',
		tags: ['Python', 'Machine Learning', 'API', 'NLP'],
		githubUrl: 'https://github.com/grajrb/LLM-Api',
	},
	{
		id: 12,
		title: 'LinkedIn Automation',
		description:
			'Automation tool for LinkedIn interactions and networking activities to streamline professional connections.',
		tags: ['TypeScript', 'Automation', 'LinkedIn', 'Selenium'],
		githubUrl: 'https://github.com/grajrb/Linkdlen-Automation',
	},
];

export const ProjectsSection = () => {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);
	return (
		<section
			id="projects"
			className="py-24 md:py-32 bg-white dark:bg-dark-bg reveal-on-scroll"
			aria-label="Projects"
		>
			<div className="container max-w-6xl mx-auto px-6">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="section-title font-display text-3xl md:text-4xl font-extrabold mb-4">
						My <span className="text-primary">Projects</span>
					</h2>
					<p className="section-subtitle mx-auto text-lg md:text-xl text-muted-foreground">
						A showcase of my development work, featuring full-stack applications, web3
						technologies, and AI integrations.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<div
							key={project.id}
							className={cn(
								'reveal-on-scroll',
								index % 3 === 1 ? 'delay-100' : index % 3 === 2 ? 'delay-200' : ''
							)}
						>
							<Card
								className={cn(
									'overflow-hidden h-full transition-all duration-300 bg-card dark:bg-card-dark-bg hover:shadow-lg border border-border/60 rounded-2xl shadow-card group',
									hoveredCard === project.id ? 'shadow-lg scale-[1.025]' : ''
								)}
								onMouseEnter={() => setHoveredCard(project.id)}
								onMouseLeave={() => setHoveredCard(null)}
								tabIndex={0}
								aria-label={`Project: ${project.title}`}
							>
								<CardHeader>
									<CardTitle className="font-display text-xl font-bold">
										{project.title}
									</CardTitle>
									<CardDescription className="text-muted-foreground">
										{project.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2 mb-4">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="text-xs font-medium py-1 px-2 bg-secondary rounded-full text-muted-foreground"
											>
												{tag}
											</span>
										))}
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<a
										className="button-hover-effect inline-flex items-center justify-center px-4 py-2 border border-border/60 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/70"
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`View code for ${project.title}`}
									>
										<Github size={16} className="mr-1" /> Code
									</a>
								</CardFooter>
							</Card>
						</div>
					))}
				</div>
				<div className="mt-12 text-center reveal-on-scroll">
					<a
						className="button-hover-effect inline-flex items-center justify-center px-6 py-3 border border-border/60 rounded text-lg font-medium hover:shadow-lg transition-all duration-300"
						href="https://github.com/grajrb?tab=repositories"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Github size={18} className="mr-2" />
						View More Projects
					</a>
				</div>
			</div>
		</section>
	);
};
