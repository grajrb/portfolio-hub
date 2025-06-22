import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3 glass" : "py-5 bg-transparent"
      )}
    >
      <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">        <a href="#home" className="font-display text-xl font-bold relative z-10">
          Gaurav Raj
        </a>        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === link.href.substring(1)
                  ? "text-primary link-hover-effect"
                  : "text-muted-foreground hover:text-foreground link-hover-effect"
              )}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/grajrb"
            target="_blank"
            rel="noopener noreferrer"
            className="button-hover-effect"
          >
            <Button size="icon" variant="ghost">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/gaurav-raj1/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-hover-effect"
          >
            <Button size="icon" variant="ghost">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </a>
          <a
            href="https://leetcode.com/graj_rb/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-hover-effect"
          >
            <Button size="icon" variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                <path d="m14.5 15 3 3 3-3"/>
              </svg>
              <span className="sr-only">LeetCode</span>
            </Button>
          </a>          <a
            href="https://drive.google.com/file/d/1tgTLeAkjkJ_Jz5-_OEZxZ6UCVw0xaH4n/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="button-hover-effect"
          >
            <Button>Resume</Button>
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
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <nav className="flex flex-col items-center space-y-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-lg font-medium transition-colors",
                activeSection === link.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}          <a
            href="https://github.com/grajrb"
            target="_blank"
            rel="noopener noreferrer"
            className="button-hover-effect"
          >
            <Button size="icon" variant="ghost">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/gaurav-raj1/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-hover-effect"
          >
            <Button size="icon" variant="ghost">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </a>
          <a
            href="https://leetcode.com/graj_rb/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-hover-effect"
          >
            <Button size="icon" variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                <path d="m14.5 15 3 3 3-3"/>
              </svg>
              <span className="sr-only">LeetCode</span>
            </Button>
          </a>
          <Button
            className="mt-4 w-full button-hover-effect"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resume
          </Button>
        </nav>
      </div>
    </header>
  );
};
