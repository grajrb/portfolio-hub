import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { LeetCodeIcon } from '@/components/icons/leetcode-icon';
import { trackSocialClick, trackResumeView } from '@/lib/analytics';

const navLinks = [
	{ name: 'Home', href: '#home' },
	{ name: 'About', href: '#about' },
	{ name: 'Projects', href: '#projects' },
	{ name: 'Skills', href: '#skills' },
	{ name: 'Contact', href: '#contact' },
	// { name: 'Blog', href: '#blog' }, // Blog link commented out
];

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('home');
	const lastScrollYRef = useRef(0);

	// Add a scroll function to handle navigation
	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
		e.preventDefault();
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			window.scrollTo({
				top: targetSection.offsetTop,
				behavior: 'smooth',
			});
			setActiveSection(targetId);
		}
	};

	useEffect(() => {
		let ticking = false;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const update = () => {
			const currentY = window.scrollY;
			setIsScrolled(currentY > 10);
			if (!mobileMenuOpen && !prefersReducedMotion) {
				if (currentY > 120 && currentY > lastScrollYRef.current) {
					setHidden(true);
				} else {
					setHidden(false);
				}
			} else if (prefersReducedMotion) {
				setHidden(false); // Always show if user prefers reduced motion
			}
			const sections = document.querySelectorAll('section[id]');
			const scrollPosition = currentY + 100;
			sections.forEach((section) => {
				const el = section as HTMLElement;
				const sectionTop = el.offsetTop;
				const sectionHeight = el.clientHeight;
				const sectionId = section.getAttribute('id') || '';
				if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
					setActiveSection(sectionId);
				}
			});
			lastScrollYRef.current = currentY;
					
			// measure -> mutate cycle done
			ticking = false;
		};
		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(update);
				ticking = true;
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [mobileMenuOpen]);

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black text-white shadow-lg will-change-transform',
				isScrolled ? 'py-3' : 'py-5',
				hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
			)}
			aria-label="Main navigation"
		>
			<div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
				<a
					href="#home"
					onClick={(e) => handleNavClick(e, 'home')}
					className="font-display text-xl font-bold relative z-10 focus:outline-none focus:ring-2 focus:ring-primary/70 text-white"
				>
					Gaurav Raj
				</a>
				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
					{navLinks.map((link) => (
						// Comment out Blog link rendering
						link.name === 'Blog' ? null : (
							<a
								key={link.name}
								href={link.href}
								onClick={(e) => handleNavClick(e, link.href.substring(1))}
								className={cn(
									'text-sm font-medium transition-colors link-hover-effect rounded focus:outline-none focus:ring-2 focus:ring-primary/70 text-white',
									activeSection === link.href.substring(1)
										? 'text-primary' : 'hover:text-primary',
								)}
								aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
							>
								{link.name}
							</a>
						)
					))}
					<a
						href="https://github.com/grajrb"
						target="_blank"
						rel="noopener noreferrer"
						className="button-hover-effect"
						onClick={() => trackSocialClick('github')}
					>
						<Button size="icon" variant="ghost" className="text-white">
							<Github size={20} />
							<span className="sr-only">GitHub</span>
						</Button>
					</a>
					<a
						href="https://www.linkedin.com/in/gaurav-raj1/"
						target="_blank"
						rel="noopener noreferrer"
						className="button-hover-effect"
						onClick={() => trackSocialClick('linkedin')}
					>
						<Button size="icon" variant="ghost" className="text-white">
							<Linkedin size={20} />
							<span className="sr-only">LinkedIn</span>
						</Button>
					</a>
					<a
						href="https://leetcode.com/graj_rb/"
						target="_blank"
						rel="noopener noreferrer"
						className="button-hover-effect"
						onClick={() => trackSocialClick('leetcode')}
					>
						<Button size="icon" variant="ghost" className="text-white">
							<LeetCodeIcon size={20} />
							<span className="sr-only">LeetCode</span>
						</Button>
					</a>
					<a
						href="https://drive.google.com/file/d/1Wr0rt4ivdyNs-WSEbeEwhiDoyLc6RL1k/view?usp=sharing"
						target="_blank"
						rel="noopener noreferrer"
						className="button-hover-effect"
						onClick={trackResumeView}
					>
						<Button className="text-white">View Resume</Button>
					</a>
				</nav>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden flex items-center text-foreground"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle menu"
				>
					{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			<div
				className={cn(
					'fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out md:hidden',
					mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
				)}
			>
				<nav className="flex flex-col items-center space-y-8 px-6">
					{navLinks.map((link) => (
						// Comment out Blog link rendering
						link.name === 'Blog' ? null : (
							<a
								key={link.name}
								href={link.href}
								className={cn(
									'text-lg font-medium transition-colors',
									activeSection === link.href.substring(1)
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground',
								)}
								onClick={(e) => {
									handleNavClick(e, link.href.substring(1));
									setMobileMenuOpen(false);
								}}
							>
								{link.name}
							</a>
						)
					))}
					<a
						href="https://github.com/grajrb"
						target="_blank"
						rel="noopener noreferrer"
						className="button-hover-effect"
						onClick={() => trackSocialClick('github')}
					>
						<Button size="icon" variant="ghost" className="text-white">
							<Github size={20} />
							<span className="sr-only">GitHub</span>
						</Button>
					</a>
					<a
						href="https://www.linkedin.com/in/gaurav-raj1/"
						target="_blank"
						rel="noopener noreferrer"
						className="button-hover-effect"
						onClick={() => trackSocialClick('linkedin')}
					>
						<Button size="icon" variant="ghost" className="text-white">
							<Linkedin size={20} />
							<span className="sr-only">LinkedIn</span>
						</Button>
					</a>
					<a
						href="https://leetcode.com/graj_rb/"
						target="_blank"
						rel="noopener noreferrer"
						className="button-hover-effect"
						onClick={() => trackSocialClick('leetcode')}
					>
						<Button size="icon" variant="ghost" className="text-white">
							<LeetCodeIcon size={20} />
							<span className="sr-only">LeetCode</span>
						</Button>
					</a>
					<a
						href="https://drive.google.com/file/d/1Wr0rt4ivdyNs-WSEbeEwhiDoyLc6RL1k/view?usp=sharing"
						target="_blank"
						rel="noopener noreferrer"
						className="w-full button-hover-effect"
						onClick={trackResumeView}
					>
						<Button className="mt-4 w-full text-white">View Resume</Button>
					</a>
				</nav>
			</div>
		</header>
	);
};
