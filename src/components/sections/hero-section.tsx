'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full filter blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full filter blur-3xl"
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="container max-w-6xl mx-auto px-6 pt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3">
            <motion.div variants={itemVariants}>
              <span className="inline-block py-2 px-4 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary text-sm rounded-full mb-6 font-medium">
                🚀 Full-Stack Developer • Software Engineer @ Bosch
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 leading-tight"
              style={{ minHeight: 'fit-content', overflow: 'visible' }}
            >
              <span className="block mb-2">Hi, I'm</span>
              <motion.span 
                className="hero-name bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ 
                  display: 'inline-block',
                  minHeight: 'fit-content',
                  paddingBottom: '0.2em',
                  marginBottom: '0.1em'
                }}
              >
                Gaurav Raj
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Results-driven Full-Stack Developer with 1.9+ years of experience architecting scalable, 
              cloud-native applications. Proficient in MERN stack, microservices, and system design principles.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onClick={() => handleScroll('projects')}
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={() => handleScroll('contact')}
              >
                <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Let's Connect
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-6"
            >
              <span className="text-sm text-muted-foreground">Follow me:</span>
              {[
                { icon: Github, href: 'https://github.com/grajrb', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/gaurav-raj1/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:gauravupadhayay9801@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <social.icon size={20} />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Profile/Animation */}
          <div className="lg:col-span-2 flex justify-center">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-6xl font-bold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  GR
                </motion.div>
              </motion.div>
              
              {/* Floating Tech Icons */}
              {['React.js', 'Node.js', 'TypeScript', 'AWS', 'Docker'].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="absolute text-xs bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1"
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${10 + (index % 2) * 80}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleScroll('about')}
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
