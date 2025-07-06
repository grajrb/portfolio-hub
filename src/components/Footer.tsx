import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  // Add a scroll function to handle navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-black text-white py-14 shadow-2xl rounded-t-3xl" aria-label="Site Footer">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl font-extrabold mb-4 tracking-tight">Gaurav Raj</h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-base md:text-lg">
              Software Engineer specializing in full-stack development and DevOps.
            </p>
            <nav className="flex space-x-4 mt-2" aria-label="Social media">
              <a
                href="https://github.com/grajrb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/70 transition-colors hover:text-primary hover:bg-white/10 shadow-md"
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
                aria-label="LinkedIn"
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/70 transition-colors hover:text-primary hover:bg-white/10 shadow-md"
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
                aria-label="LeetCode"
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/70 transition-colors hover:text-primary hover:bg-white/10 shadow-md"
              >
                <Button size="icon" variant="ghost" className="text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                    <path d="m14.5 15 3 3 3-3"/>
                  </svg>
                  <span className="sr-only">LeetCode</span>
                </Button>
              </a>
              <a
                href="mailto:gauravupadhayay9801@gmail.com"
                aria-label="Email"
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/70 transition-colors hover:text-primary hover:bg-white/10 shadow-md"
              >
                <Button size="icon" variant="ghost" className="text-white">
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </Button>
              </a>
            </nav>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-3" aria-label="Footer navigation">
              <a href="#home" className="text-gray-400 hover:text-white transition-all rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-all rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => handleNavClick(e, 'about')}>About</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-all rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
              <a href="#skills" className="text-gray-400 hover:text-white transition-all rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-all rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
              <a href="#blog" className="text-gray-400 hover:text-white transition-all rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a>
            </nav>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">gauravupadhayay9801@gmail.com</p>
              <p className="mb-2">Coimbatore, Tamil Nadu, India</p>
              <p className="mb-2">+91 7992425448</p>
            </address>
            <form className="mt-6 flex flex-col gap-3" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Subscribe to newsletter"
                className="rounded-lg px-4 py-2 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/70 transition-all"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="bg-primary text-white rounded-lg px-4 py-2 font-semibold shadow-md hover:bg-primary/80 transition-all focus:outline-none focus:ring-2 focus:ring-primary/70"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center border-t border-white/20">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a
              href="#/privacy-policy"
              className="hover:text-white transition-colors underline-animation focus:outline-none focus:ring-2 focus:ring-primary/70"
            >
              Privacy Policy
            </a>
            <a
              href="#/terms-of-service"
              className="hover:text-white transition-colors underline-animation focus:outline-none focus:ring-2 focus:ring-primary/70"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
