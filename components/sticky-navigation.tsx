'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/src/components/ui/button';
import { Home, User, Code2, Briefcase, Mail, ChevronUp } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
];

export function StickyNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after scrolling past hero section
      setIsVisible(window.scrollY > 100);
      
      // Show scroll to top button
      setShowScrollTop(window.scrollY > 400);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <motion.div
                  className="text-xl font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Portfolio
                </motion.div>

                <div className="flex items-center space-x-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Button
                        variant={activeSection === item.id ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          'flex items-center gap-2 transition-all duration-300',
                          activeSection === item.id
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'hover:bg-muted'
                        )}
                      >
                        {item.icon}
                        <span className="hidden md:inline">{item.label}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
