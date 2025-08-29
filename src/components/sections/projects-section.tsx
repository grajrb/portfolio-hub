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
    title: 'AI-Powered Portfolio Assistant',
    description: 'An intelligent resume builder and ATS analyzer using OpenAI and advanced NLP to optimize job applications.',
    image: '/projects/ai-portfolio.jpg',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Prisma', 'AI/ML'],
    category: 'AI/ML',
    github: 'https://github.com/grajrb/ai-portfolio',
    demo: 'https://ai-portfolio-demo.vercel.app',
    status: 'Featured',
    stats: { stars: 47, forks: 12, users: '2.3k' },
  },
  {
    id: 2,
    title: 'Real-time Chat Platform',
    description: 'Scalable messaging platform with real-time communication, file sharing, and advanced user management.',
    image: '/projects/chat-platform.jpg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    category: 'Full-Stack',
    github: 'https://github.com/grajrb/chat-platform',
    demo: 'https://chat-platform-demo.vercel.app',
    status: 'Completed',
    stats: { stars: 32, forks: 8, users: '1.5k' },
  },
  {
    id: 3,
    title: 'E-commerce Analytics Dashboard',
    description: 'Comprehensive analytics dashboard with real-time metrics, data visualization, and performance insights.',
    image: '/projects/analytics-dashboard.jpg',
    tags: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    category: 'Data Viz',
    github: 'https://github.com/grajrb/analytics-dashboard',
    demo: 'https://analytics-demo.vercel.app',
    status: 'Completed',
    stats: { stars: 28, forks: 6, users: '890' },
  },
  {
    id: 4,
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
    image: '/projects/fitness-tracker.jpg',
    tags: ['React Native', 'Expo', 'Firebase', 'Redux', 'Maps API'],
    category: 'Mobile',
    github: 'https://github.com/grajrb/fitness-tracker',
    demo: 'https://fitness-app-demo.expo.dev',
    status: 'In Progress',
    stats: { stars: 19, forks: 4, users: '567' },
  },
  {
    id: 5,
    title: 'Cloud Infrastructure Manager',
    description: 'DevOps tool for managing cloud resources with automated deployments, monitoring, and cost optimization.',
    image: '/projects/cloud-manager.jpg',
    tags: ['Go', 'Docker', 'Kubernetes', 'AWS', 'Terraform'],
    category: 'DevOps',
    github: 'https://github.com/grajrb/cloud-manager',
    demo: 'https://cloud-manager-demo.com',
    status: 'Featured',
    stats: { stars: 63, forks: 15, users: '1.2k' },
  },
  {
    id: 6,
    title: 'Blockchain Voting System',
    description: 'Secure and transparent voting platform built on blockchain technology with smart contracts.',
    image: '/projects/blockchain-voting.jpg',
    tags: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
    category: 'Blockchain',
    github: 'https://github.com/grajrb/blockchain-voting',
    demo: 'https://voting-dapp.vercel.app',
    status: 'Completed',
    stats: { stars: 41, forks: 9, users: '743' },
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
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-secondary/10">
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
          <AnimatePresence mode="wait">
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
