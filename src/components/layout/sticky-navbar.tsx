'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { trackSocialClick, trackResumeView } from '@/lib/analytics';
import { LeetCodeIcon } from '@/components/icons/leetcode-icon';
import { Button } from '@/components/ui/button';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/#hero' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
  // Disabled: Newsletter (coming soon)
  // { name: 'Newsletter', href: '/newsletter' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/grajrb', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/gaurav-raj1/', icon: Linkedin },
  { name: 'LeetCode', href: 'https://leetcode.com/u/gauravraj_9/', icon: LeetCodeIcon },
  { name: 'Email', href: 'mailto:gauravupadhayay9801@gmail.com', icon: Mail },
];

export function StickyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const activeSection = useActiveSection();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const update = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      if (!isMobileMenuOpen && !prefersReducedMotion) {
        if (currentY > 120 && currentY > lastScrollYRef.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else if (prefersReducedMotion) {
        setHidden(false);
      }
      lastScrollYRef.current = currentY;
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
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [isMobileMenuOpen]);

  // With CSS scroll-margin + safe area compensation we rely on native anchor scrolling.
  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavFocus = (item: string) => {
    setHoveredItem(item);
    // Blur other nav items
    navigation.forEach((nav) => {
      if (nav.name !== item) {
        const element = document.querySelector(`[data-nav="${nav.name}"]`);
        element?.classList.add('blur-sm', 'opacity-50');
      }
    });
  };

  const handleNavBlur = () => {
    setHoveredItem(null);
    // Remove blur from all nav items
    navigation.forEach((nav) => {
      const element = document.querySelector(`[data-nav="${nav.name}"]`);
      element?.classList.remove('blur-sm', 'opacity-50');
    });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,padding] duration-300 will-change-transform',
        isScrolled
          ? 'glass-effect shadow-lg py-2'
          : 'bg-transparent py-4'
      )}
    >
      {/* Blur overlay for mobile menu (re-added) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.button
            type="button"
            key="mobile-blur-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-xl md:hidden"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      {/* Overlay for mobile menu (blur + darken) */}
      {/* No fullscreen overlay in reverted version */}
      <nav className="container-wrapper section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="text-xl font-bold text-primary"
            >
              Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                data-nav={item.name}
                whileHover={{ y: -2 }}
                onMouseEnter={() => handleNavFocus(item.name)}
                onMouseLeave={handleNavBlur}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'nav-link',
                    activeSection === item.href.replace('/#', '') && 'active',
                    hoveredItem && hoveredItem !== item.name && 'blur-sm opacity-50'
                  )}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => link.name === 'LeetCode' ? trackSocialClick('leetcode') : link.name === 'GitHub' ? trackSocialClick('github') : link.name === 'LinkedIn' ? trackSocialClick('linkedin') : undefined}
              >
                <link.icon size={18} />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
            <motion.a
              href="https://drive.google.com/file/d/1jMbCCCSAS9bXaRr6Lxu90biP9hOJFlCR/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium px-3 py-1 rounded-md border border-border hover:border-primary/40 transition-colors text-muted-foreground hover:text-primary"
              onClick={trackResumeView}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence>
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Navigation (reverted collapsible panel with overlay) */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden relative z-40"
            >
              <div className="py-4 space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 text-lg font-medium transition-colors',
                        activeSection === item.href.replace('/#', '')
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      onClick={() => handleNavClick(item.href)}
                      aria-label={`Go to ${item.name} section`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                  className="flex items-center space-x-6 pt-4 border-t border-border"
                >
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.9 }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => link.name === 'LeetCode' ? trackSocialClick('leetcode') : link.name === 'GitHub' ? trackSocialClick('github') : link.name === 'LinkedIn' ? trackSocialClick('linkedin') : undefined}
                    >
                      <link.icon size={20} />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  ))}
                  <motion.a
                    href="https://drive.google.com/file/d/1jMbCCCSAS9bXaRr6Lxu90biP9hOJFlCR/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.9 }}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    onClick={trackResumeView}
                  >
                    Resume
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
