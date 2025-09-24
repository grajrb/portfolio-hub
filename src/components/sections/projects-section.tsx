'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Filter,
  Search,
  Star,
  Users,
  GitFork
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const projects = [
  {
    id: 1,
    title: 'EzCommerce',
    description: 'Full-stack e-commerce platform built with MERN stack featuring user authentication, product management, shopping cart, orders, and admin panel. Designed for scalability and easy customization.',
    image: '/projects/ezcommerce.jpg',
    tags: ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Express.js'],
    category: 'Full-Stack',
    github: 'https://github.com/grajrb/EzCommerce',
    demo: 'https://ezcommerce-demo.vercel.app',
    status: 'Featured',
    stats: { stars: 0, forks: 0, users: '1.5k' },
  },
  {
    id: 2,
    title: 'EventBookingSystem',
    description: 'Modern Event Management Platform with real-time updates, secure booking system, comprehensive event management, and responsive admin dashboard with analytics.',
    image: '/projects/event-booking.jpg',
    tags: ['TypeScript', 'React.js', 'Node.js', 'MongoDB', 'Real-time'],
    category: 'Full-Stack',
    github: 'https://github.com/grajrb/EventBookingSystem',
    demo: 'https://event-booking-demo.vercel.app',
    status: 'Completed',
    stats: { stars: 0, forks: 0, users: '890' },
  },
  {
    id: 3,
    title: 'ProSyncHub',
    description: 'Real-time, full-stack industrial asset management and predictive maintenance platform with IoT data ingestion, work order management, and analytics dashboard.',
    image: '/projects/prosync.jpg',
    tags: ['TypeScript', 'React', 'Firebase', 'IoT', 'Analytics'],
    category: 'Full-Stack',
    github: 'https://github.com/grajrb/ProSyncHub',
    demo: 'https://prosync-demo.vercel.app',
    status: 'Featured',
    stats: { stars: 0, forks: 0, users: '567' },
  },
  {
    id: 4,
    title: 'CryptoChatSphere',
    description: 'Modern decentralized messaging application that combines traditional chat functionality with Web3 capabilities. Users can connect crypto wallets and engage in real-time conversations.',
    image: '/projects/crypto-chat.jpg',
    tags: ['TypeScript', 'React', 'Web3.js', 'Blockchain', 'WebSocket'],
    category: 'Blockchain',
    github: 'https://github.com/grajrb/crypto-chat-sphere',
    demo: 'https://crypto-chat-demo.vercel.app',
    status: 'In Progress',
    stats: { stars: 0, forks: 0, users: '743' },
  },
  {
    id: 5,
    title: 'Portfolio Hub',
    description: 'Modern, responsive portfolio website built with TypeScript, React, and Vite. Features reusable UI components, project showcase, skills display, and contact information.',
    image: '/projects/portfolio.jpg',
    tags: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    category: 'Full-Stack',
    github: 'https://github.com/grajrb/portfolio-hub',
    demo: 'https://portfolio-hub-chi.vercel.app/',
    status: 'Featured',
    stats: { stars: 0, forks: 0, users: '1.2k' },
  },
  {
    id: 6,
    title: 'Task Management with Blockchain Rewards',
    description: 'Innovative task management system that combines productivity tracking with blockchain incentives. Users earn token rewards for completing tasks efficiently.',
    image: '/projects/task-blockchain.jpg',
    tags: ['TypeScript', 'React', 'Blockchain', 'Smart Contracts', 'Web3'],
    category: 'Blockchain',
    github: 'https://github.com/grajrb/Task-Management',
    demo: 'https://task-blockchain-demo.vercel.app',
    status: 'Completed',
    stats: { stars: 0, forks: 0, users: '432' },
  },
  {
    id: 7,
    title: 'NewsContextGPT',
    description: 'AI-powered news analysis tool that provides context and insights for current news articles using advanced language processing and sentiment analysis.',
    image: '/projects/news-gpt.jpg',
    tags: ['TypeScript', 'React', 'OpenAI', 'News API', 'NLP'],
    category: 'AI/ML',
    github: 'https://github.com/grajrb/NewsContextGPT',
    demo: 'https://news-context-demo.vercel.app',
    status: 'Completed',
    stats: { stars: 0, forks: 0, users: '321' },
  },
  {
    id: 8,
    title: 'SecureAuthHub',
    description: 'Comprehensive authentication system with multi-factor authentication, OAuth integration, and advanced security features for modern web applications.',
    image: '/projects/secure-auth.jpg',
    tags: ['TypeScript', 'Node.js', 'Security', 'OAuth', 'JWT'],
    category: 'DevOps',
    github: 'https://github.com/grajrb/SecureAuthHub',
    demo: 'https://secure-auth-demo.vercel.app',
    status: 'Completed',
    stats: { stars: 0, forks: 0, users: '654' },
  },
  {
    id: 9,
    title: 'Product Recommendation Engine',
    description: 'Machine learning-based recommendation system using Market Basket Analysis with Apriori Algorithm for retail optimization and sales improvement.',
    image: '/projects/ml-recommendation.jpg',
    tags: ['Python', 'Machine Learning', 'Data Science', 'Apriori', 'Pandas'],
    category: 'AI/ML',
    github: 'https://github.com/grajrb/Product-Recommendation-Engine',
    demo: 'https://recommendation-demo.streamlit.app',
    status: 'Completed',
    stats: { stars: 0, forks: 0, users: '289' },
  },
  {
    id: 10,
    title: 'Lexi Legal Assistant',
    description: 'AI-powered legal assistant application for document analysis, legal query resolution, and automated legal research with natural language processing.',
    image: '/projects/legal-ai.jpg',
    tags: ['JavaScript', 'AI', 'Legal Tech', 'NLP', 'Document Analysis'],
    category: 'AI/ML',
    github: 'https://github.com/grajrb/lexi-legal-assistant',
    demo: 'https://lexi-legal-demo.vercel.app',
    status: 'In Progress',
    stats: { stars: 0, forks: 0, users: '167' },
  },
];

const categories = ['All', 'Featured', 'AI/ML', 'Full-Stack', 'Mobile', 'DevOps', 'Data Viz', 'Blockchain'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || 
                           project.category === activeCategory || 
                           project.status === activeCategory;
    const matchesSearch = searchQuery === '' || 
                         project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
  <section id="projects" className="py-20 bg-gradient-to-b from-background to-secondary/10 scroll-mt-32 md:scroll-mt-40 safe-scroll-offset">
      <motion.div 
        ref={ref}
        className="container max-w-7xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Featured
            <span className="text-primary"> Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative solutions spanning AI integration, full-stack development, 
            and cutting-edge technologies that solve real-world problems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="relative overflow-hidden group"
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group"
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center">
                      <div className="text-4xl font-bold text-primary/30">
                        {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </div>
                    </div>
                    
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4"
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        asChild
                        className="backdrop-blur-sm"
                      >
                        <Link href={project.demo} target="_blank">
                          <Play size={16} className="mr-2" />
                          Demo
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        asChild
                        className="backdrop-blur-sm"
                      >
                        <Link href={project.github} target="_blank">
                          <Github size={16} className="mr-2" />
                          Code
                        </Link>
                      </Button>
                    </motion.div>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant={project.status === 'Featured' ? 'default' : 'secondary'}
                        className={project.status === 'Featured' ? 'bg-gradient-to-r from-primary to-purple-500' : ''}
                      >
                        {project.status === 'Featured' && <Star size={12} className="mr-1" />}
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star size={14} />
                          <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork size={14} />
                          <span>{project.stats.forks}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{project.stats.users}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No projects found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Interested in working together on your next project?
          </p>
          <Button 
            size="lg" 
            className="group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Collaborate
            <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
