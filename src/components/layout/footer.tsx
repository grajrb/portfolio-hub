'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone,
  Code2,
  Coffee,
  ExternalLink
} from 'lucide-react';

const footerLinks = {
  pages: [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ],
  services: [
    { name: 'Web Development', href: '/#projects' },
    { name: 'AI Integration', href: '/#projects' },
    { name: 'Technical Consulting', href: '/#contact' },
    { name: 'Code Review', href: '/#contact' },
  ],
  tools: [
    { name: 'Resume Assistant', href: '/resume-assistant' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Blog', href: '/#' },
    { name: 'Resources', href: '/#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/grajrb', icon: Github, color: 'hover:text-gray-900 dark:hover:text-gray-100' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/gaurav-raj1/', icon: Linkedin, color: 'hover:text-blue-600' },
  { name: 'Email', href: 'mailto:gauravupadhayay9801@gmail.com', icon: Mail, color: 'hover:text-red-500' },
];

const contactInfo = [
  { icon: MapPin, text: 'Coimbatore, Tamil Nadu, India' },
  { icon: Phone, text: '+91 7992425448' },
  { icon: Mail, text: 'gauravupadhayay9801@gmail.com' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/20 border-t border-border">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
                  <Code2 size={16} className="text-white" />
                </div>
                <span className="text-xl font-bold">Portfolio Hub</span>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                Crafting exceptional digital experiences through modern web technologies, 
                AI integration, and innovative solutions. Let's build something amazing together.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-center space-x-3 text-sm text-muted-foreground"
                  >
                    <item.icon size={16} />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-colors ${social.color}`}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon size={20} />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                {footerLinks.pages.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <h3 className="font-semibold mb-4 mt-8">Services</h3>
              <div className="space-y-3">
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Tools & Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-semibold mb-4">Tools & Resources</h3>
              <div className="space-y-3 mb-8">
                {footerLinks.tools.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span>{link.name}</span>
                    {link.href.startsWith('http') && (
                      <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Status */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Available for projects
                  </span>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  <Coffee size={12} className="mr-1" />
                  Open to new opportunities
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="py-8 border-t border-border"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Get weekly insights on web development, AI, and industry trends
            </p>
            <Button asChild>
              <Link href="/newsletter">
                Subscribe to Newsletter
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <Separator />
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <span>© {currentYear} Portfolio Hub. Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>by Gaurav Raj</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center space-x-6 text-sm"
            >
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Badge variant="outline" className="text-xs">
                Built with Next.js
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
